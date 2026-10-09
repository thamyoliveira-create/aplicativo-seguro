// Aluno consulta a própria série (liberada pelo painel da professora)
const { sendJson, usuarioDoToken, admin, emailPadrao } = require("../_lib/admin.js");

module.exports = async (req, res) => {
  try {
    const u = await usuarioDoToken(req);
    const email = emailPadrao(u.email);
    if (!email) return sendJson(res, 200, { serie: null });
    const doc = await (await admin()).lerDoc("studentSeries", email);
    return sendJson(res, 200, { serie: doc?.serie || null, sala: doc?.sala || null });
  } catch (e) {
    return sendJson(res, e.status || 500, { error: e.message || "Erro ao consultar a série." });
  }
};
