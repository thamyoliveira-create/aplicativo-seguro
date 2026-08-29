const { callGemini, sendJson, validateText, verifyTeacher } = require("../_lib/gemini");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { success: false, error: "Método não permitido." });
  try {
    await verifyTeacher(req);
    const texto = validateText(req.body?.texto);
    const modo = req.body?.modo === "gerar" ? "gerar" : "importar";
    const nomeArquivo = String(req.body?.nomeArquivo || "material").slice(0, 180);
    const instrucaoModo = modo === "importar"
      ? "Transcreva e estruture somente as questões existentes. Preserve enunciados, alternativas e gabarito; não invente questões."
      : "Crie novas questões contextualizadas usando o material como fonte. Exija interpretação, inferência e aplicação; evite respostas óbvias.";

    const resultado = await callGemini({
      systemInstruction: `Você elabora avaliações escolares em português brasileiro. ${instrucaoModo} Retorne JSON válido com tituloSugerido, disciplinaSugerida, anoTurmaSugerido e questoes. Cada questão deve ter id, tipo (multipla_escolha ou dissertativa), enunciado, textoApoio, habilidadeBNCC, peso e respostaEsperada. Questões objetivas também devem ter correta e alternativas com id, texto e correta.`,
      prompt: `Arquivo: ${nomeArquivo}\nModo: ${modo}\n\nCONTEÚDO DO MATERIAL:\n${texto}`
    });

    const questoes = Array.isArray(resultado.questoes) ? resultado.questoes.slice(0, 30) : [];
    if (!questoes.length) throw Object.assign(new Error("Nenhuma questão foi identificada ou gerada."), { status: 422 });
    return sendJson(res, 200, { success: true, resultado: { ...resultado, questoes } });
  } catch (error) {
    return sendJson(res, error.status || 500, { success: false, error: error.message || "Falha ao processar o material." });
  }
};
