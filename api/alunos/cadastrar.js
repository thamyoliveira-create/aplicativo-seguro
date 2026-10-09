// Professora cadastra alunos de uma sala: cria as contas que faltam e libera a série
const { sendJson, verificarProfessor, admin, emailPadrao, variantes, lerCorpo } = require("../_lib/admin.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Método não permitido." });
  try {
    const prof = await verificarProfessor(req);
    const body = lerCorpo(req);
    const sala = String(body.sala || "").trim().toUpperCase();
    const serieNum = (sala.match(/^(\d)/) || [])[1];
    if (!serieNum) return sendJson(res, 400, { error: "Nome da sala inválido (ex.: 2A, 3C-NOITE)." });
    const senha = String(body.senha || "");
    if (senha.length < 6) return sendJson(res, 400, { error: "A senha inicial precisa ter pelo menos 6 caracteres." });
    const alunos = (Array.isArray(body.alunos) ? body.alunos : []).slice(0, 60)
      .map((a) => ({ nome: String(a.nome || "").trim(), email: emailPadrao(a.email || a.ra) }))
      .filter((a) => a.email);
    if (!alunos.length) return sendJson(res, 400, { error: "Nenhum aluno com RA válido." });

    const A = await admin();
    const existentes = new Set((await A.buscarContas(alunos.flatMap((a) => variantes(a.email)))).map((u) => u.email.toLowerCase()));
    let criados = 0, jaTinham = 0; const erros = [];
    for (const a of alunos) {
      if (variantes(a.email).some((e) => existentes.has(e))) { jaTinham++; continue; }
      try { await A.criarConta({ email: a.email, password: senha, displayName: a.nome }); criados++; }
      catch (e) {
        if (/EMAIL_EXISTS/.test(e.message)) jaTinham++;
        else erros.push(`${a.nome || a.email}: ${e.message}`);
      }
    }
    await A.gravarDocs("studentSeries", alunos.map((a) => ({
      id: a.email, campos: { serie: `${serieNum}serie`, sala, nome: a.nome, atualizadoPor: prof.email }
    })));
    console.log(`[cadastrar] ${prof.email} sala ${sala}: ${criados} criados, ${jaTinham} existentes, ${erros.length} erros`);
    return sendJson(res, 200, { ok: true, criados, jaTinham, liberados: alunos.length, erros });
  } catch (e) {
    return sendJson(res, e.status || 500, { error: e.message || "Erro ao cadastrar." });
  }
};
