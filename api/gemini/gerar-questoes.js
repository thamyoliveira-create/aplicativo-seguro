const { callGemini, sendJson, verifyTeacher } = require("../_lib/gemini");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { success: false, error: "Método não permitido." });
  try {
    await verifyTeacher(req);
    const body = req.body || {};
    const tema = String(body.tema || "").trim().slice(0, 500);
    if (!tema) return sendJson(res, 400, { success: false, error: "Informe o tema da atividade." });
    const multipla = Math.max(0, Math.min(10, Number(body.qtdMultiplaEscolha) || 0));
    const dissertativa = Math.max(0, Math.min(10, Number(body.qtdDissertativa) || 0));
    const total = Math.max(1, Math.min(15, multipla + dissertativa || Number(body.quantidade) || 3));
    const textoBase = String(body.textoBase || "").trim().slice(0, 50000);

    const resultado = await callGemini({
      systemInstruction: "Você elabora itens no padrão SARESP e Prova Paulista. Crie questões contextualizadas, com interpretação, inferência e aplicação. Os distratores devem ser plausíveis e nenhuma resposta pode ser óbvia. Retorne JSON válido com tituloSugerido, instrucoes e questoes. Cada questão deve ter id, tipo, enunciado, textoApoio, habilidadeBNCC completa, peso e respostaEsperada. Objetivas também devem ter correta e quatro alternativas com id, texto e correta.",
      prompt: `Disciplina: ${String(body.disciplina || "Geral").slice(0, 100)}\nAno/turma: ${String(body.anoTurma || "").slice(0, 100)}\nTema: ${tema}\nEstilo: ${String(body.estilo || "Prova Paulista").slice(0, 80)}\nDificuldade: ${String(body.dificuldade || "alta").slice(0, 40)}\nQuantidade total: ${total}\nObjetivas: ${multipla}\nDissertativas: ${dissertativa}\nHabilidade BNCC: ${String(body.habilidadeBNCC || "").slice(0, 200)}\nMaterial de apoio:\n${textoBase || "Crie um contexto original e verificável."}`
    });
    return sendJson(res, 200, { success: true, resultado });
  } catch (error) {
    return sendJson(res, error.status || 500, { success: false, error: error.message || "Falha ao gerar as questões." });
  }
};
