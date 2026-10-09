// Funções de administração do Firebase sem dependências (REST + conta de serviço)
const crypto = require("crypto");
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyBbg3rwkyNxT4Mesa8BzUXwDf4OOq-l1ko";
const TEACHER_DOMAINS = ["@professor.educacao.sp.gov.br", "@prof.educacao.sp.gov.br"];
const STUDENT_DOMAIN = "@aluno.educacao.sp.gov.br";

function sendJson(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(payload));
}

function erro(msg, status) { return Object.assign(new Error(msg), { status }); }

async function usuarioDoToken(req) {
  const auth = String(req.headers.authorization || "");
  const idToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!idToken) throw erro("Entre novamente.", 401);
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken })
  });
  const data = await r.json();
  const user = data.users?.[0];
  if (!r.ok || !user?.email) throw erro("Sessão inválida. Entre novamente.", 401);
  return { ...user, email: String(user.email).toLowerCase() };
}

async function verificarProfessor(req) {
  const u = await usuarioDoToken(req);
  if (!TEACHER_DOMAINS.some((d) => u.email.endsWith(d))) throw erro("Somente professores podem fazer isso.", 403);
  return u;
}

function contaServico() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw erro("Falta configurar a chave FIREBASE_SERVICE_ACCOUNT na Vercel.", 503);
  const sa = JSON.parse(raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"));
  sa.private_key = String(sa.private_key).replace(/\\n/g, "\n");
  return sa;
}

let cache = null;
async function tokenAdmin(sa) {
  if (cache && cache.exp > Date.now() + 60000) return cache.token;
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` })
  });
  const data = await r.json();
  if (!r.ok) throw new Error("Não foi possível autenticar a chave do Firebase.");
  cache = { token: data.access_token, exp: Date.now() + (data.expires_in || 3600) * 1000 };
  return cache.token;
}

async function admin() {
  const sa = contaServico();
  const token = await tokenAdmin(sa);
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const auth = `https://identitytoolkit.googleapis.com/v1/projects/${sa.project_id}`;
  const fsBase = `projects/${sa.project_id}/databases/(default)/documents`;
  const fsUrl = `https://firestore.googleapis.com/v1/${fsBase}`;
  return {
    async buscarContas(emails) {
      if (!emails.length) return [];
      const r = await fetch(`${auth}/accounts:lookup`, { method: "POST", headers, body: JSON.stringify({ email: emails }) });
      return (await r.json()).users || [];
    },
    async criarConta({ email, password, displayName }) {
      const r = await fetch(`${auth}/accounts`, { method: "POST", headers, body: JSON.stringify({ email, password, displayName, emailVerified: true }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || "erro ao criar");
      return d;
    },
    async trocarSenha(localId, password) {
      const r = await fetch(`${auth}/accounts:update`, { method: "POST", headers, body: JSON.stringify({ localId, password }) });
      if (!r.ok) throw new Error("O Firebase recusou a troca de senha.");
    },
    async gravarDocs(colecao, docs) { // docs: [{id, campos:{chave: texto}}]
      for (let i = 0; i < docs.length; i += 400) {
        const writes = docs.slice(i, i + 400).map((d) => ({
          update: {
            name: `${fsBase}/${colecao}/${d.id}`,
            fields: Object.fromEntries(Object.entries(d.campos).map(([k, v]) => [k, { stringValue: String(v ?? "") }]))
          }
        }));
        const r = await fetch(`${fsUrl}:commit`, { method: "POST", headers, body: JSON.stringify({ writes }) });
        if (!r.ok) throw new Error("Erro ao gravar no banco: " + ((await r.json()).error?.message || r.status));
      }
    },
    async lerDoc(colecao, id) {
      const r = await fetch(`${fsUrl}/${colecao}/${encodeURIComponent(id)}`, { headers });
      if (r.status === 404) return null;
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || "Erro ao ler o banco.");
      return Object.fromEntries(Object.entries(d.fields || {}).map(([k, v]) => [k, v.stringValue]));
    }
  };
}

// RA "113384100-4" ou e-mail -> e-mail padrão "0000<ra><dig>sp@aluno..."
function emailPadrao(valor) {
  const txt = String(valor || "").trim().toLowerCase();
  const local = txt.includes("@") ? txt.split("@")[0] : txt;
  if (txt.includes("@") && !txt.endsWith(STUDENT_DOMAIN) && !txt.endsWith("@al.educacao.sp.gov.br")) return null;
  const m = /^0*(\d{6,}[0-9x])(sp)?$/.exec(local.replace(/[^0-9xsp]/g, ""));
  return m ? `0000${m[1]}sp${STUDENT_DOMAIN}` : null;
}

function variantes(email) {
  const dig = email.split("@")[0].replace(/^0+/, "").replace(/sp$/, "");
  return [email, `000${dig}sp${STUDENT_DOMAIN}`];
}

function lerCorpo(req) {
  return typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
}

module.exports = { sendJson, erro, usuarioDoToken, verificarProfessor, admin, emailPadrao, variantes, lerCorpo, STUDENT_DOMAIN };
