const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyBbg3rwkyNxT4Mesa8BzUXwDf4OOq-l1ko";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.7-flash";
const RETIRED_MODELS = new Set(["gemini-2.5-flash", "models/gemini-2.5-flash"]);
const GEMINI_FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || "gemini-3.6-flash")
  .split(",")
  .map((model) => model.trim())
  .filter((model) => model && !RETIRED_MODELS.has(model));
const TEACHER_DOMAIN = "@professor.educacao.sp.gov.br";

function sendJson(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(payload));
}

async function verifyTeacher(req) {
  const authorization = String(req.headers.authorization || "");
  const idToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!idToken) throw Object.assign(new Error("Entre novamente como professora."), { status: 401 });

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });
  const data = await response.json();
  const user = data.users?.[0];
  const email = String(user?.email || "").toLowerCase();
  if (!response.ok || !user || !user.emailVerified || !email.endsWith(TEACHER_DOMAIN)) {
    throw Object.assign(new Error("Acesso permitido somente a professoras com e-mail institucional confirmado."), { status: 403 });
  }
  return user;
}

function parseGeminiJson(value) {
  const cleaned = String(value || "").replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGemini({ systemInstruction, prompt, maxOutputTokens = 8192, budgetMs = 270000 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw Object.assign(new Error("A chave GEMINI_API_KEY ainda não foi configurada na Vercel."), { status: 503 });

  const models = [...new Set([GEMINI_MODEL, ...GEMINI_FALLBACK_MODELS, "gemini-3.6-flash"])]
    .filter((model) => !RETIRED_MODELS.has(model))
    .slice(0, 3);
  // Modelo principal tenta 2 vezes (sobrecarga costuma passar em segundos), depois os alternativos.
  const attempts = [models[0], models[0], ...models.slice(1)];
  const requestBody = JSON.stringify({
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens,
      responseMimeType: "application/json"
    }
  });
  const deadline = Date.now() + budgetMs;
  let lastError;

  for (const [index, model] of attempts.entries()) {
    const remaining = deadline - Date.now();
    if (remaining < 15000) break;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.min(remaining, 150000));
    console.info("[gemini] geração iniciada", { model, tentativa: index + 1 });
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: requestBody, signal: controller.signal }
      );
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
        if (!text) throw Object.assign(new Error("A IA não retornou questões."), { status: 502, transient: true });
        try {
          return parseGeminiJson(text);
        } catch {
          throw Object.assign(new Error("A IA devolveu uma resposta incompleta."), { status: 502, transient: true });
        }
      }

      const transient = response.status === 408 || response.status === 429 || response.status >= 500;
      lastError = Object.assign(new Error(data?.error?.message || "A IA não conseguiu processar o material."), {
        status: response.status,
        transient
      });
      if (!transient) throw lastError;
      console.warn("[gemini] modelo indisponível; tentando de novo", { model, status: response.status });
      await sleep(Math.min(2000 * (index + 1), 6000));
    } catch (error) {
      if (error?.name === "AbortError") {
        lastError = Object.assign(new Error(`Tempo excedido no modelo ${model}.`), { status: 504, transient: true });
        console.warn("[gemini] tempo excedido; tentando alternativa", { model });
      } else if (error?.transient) {
        lastError = error;
        console.warn("[gemini] resposta inválida; tentando de novo", { model, motivo: error.message });
      } else {
        throw error;
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw Object.assign(
    new Error("A IA está temporariamente ocupada. Aguarde alguns segundos e tente gerar novamente; o arquivo continua selecionado."),
    { status: lastError?.status || 503 }
  );
}

function validateText(value, max = 60000) {
  const text = String(value || "").trim();
  if (text.length < 20) throw Object.assign(new Error("O material possui pouco texto legível."), { status: 400 });
  return text.slice(0, max);
}

module.exports = { callGemini, sendJson, validateText, verifyTeacher };
