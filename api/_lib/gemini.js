const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyBbg3rwkyNxT4Mesa8BzUXwDf4OOq-l1ko";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.7-flash";
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

async function callGemini({ systemInstruction, prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw Object.assign(new Error("A chave GEMINI_API_KEY ainda não foi configurada na Vercel."), { status: 503 });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: "application/json"
        }
      })
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || "A IA não conseguiu processar o material.";
    throw Object.assign(new Error(message), { status: response.status });
  }
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  if (!text) throw Object.assign(new Error("A IA não retornou questões."), { status: 502 });
  return parseGeminiJson(text);
}

function validateText(value, max = 60000) {
  const text = String(value || "").trim();
  if (text.length < 20) throw Object.assign(new Error("O material possui pouco texto legível."), { status: 400 });
  return text.slice(0, max);
}

module.exports = { callGemini, sendJson, validateText, verifyTeacher };
