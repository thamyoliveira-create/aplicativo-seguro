// Professora redefine a senha de um aluno
const { sendJson, verificarProfessor, admin, emailPadrao, variantes, lerCorpo } = require("../_lib/admin.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Método não permitido." });
  try {
    const prof = await verificarProfessor(req);
    const body = lerCorpo(req);
    const senha = String(body.senha || "");
    if (senha.length < 6) return sendJson(res, 400, { error: "A nova senha precisa ter pelo menos 6 caracteres." });
    const email = emailPadrao(body.ra);
    if (!email) return sendJson(res, 400, { error: "Digite o RA do aluno (ex.: 113384100-4)." });
    const A = await admin();
    const contas = await A.buscarContas(variantes(email));
    if (!contas.length) return sendJson(res, 404, { error: "Não existe conta com esse RA. Cadastre o aluno primeiro." });
    for (const u of contas) await A.trocarSenha(u.localId, senha);
    console.log(`[redefinir-senha] ${prof.email} -> ${contas.map((u) => u.email).join(", ")}`);
    return sendJson(res, 200, { ok: true, contas: contas.map((u) => u.email) });
  } catch (e) {
    return sendJson(res, e.status || 500, { error: e.message || "Erro ao redefinir a senha." });
  }
};
