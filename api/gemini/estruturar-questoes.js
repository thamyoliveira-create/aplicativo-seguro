const { callGemini, sendJson, validateText, verifyTeacher } = require("../_lib/gemini");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { success: false, error: "Método não permitido." });
  try {
    await verifyTeacher(req);
    const texto = validateText(req.body?.texto);
    const modo = req.body?.modo === "gerar" ? "gerar" : "importar";
    const qtdMultiplaEscolha = Math.max(0, Math.min(10, Number(req.body?.qtdMultiplaEscolha) || 4));
    const qtdDissertativa = Math.max(0, Math.min(10, Number(req.body?.qtdDissertativa) || 2));
    const nomeArquivo = String(req.body?.nomeArquivo || "material").slice(0, 180);
    const instrucaoModo = modo === "importar"
      ? "Transcreva e estruture somente as questões existentes. Preserve enunciados, alternativas e gabarito; não invente questões. Uma lista de subitens a, b, c com comandos como calcule, identifique, escreva ou justifique NÃO é múltipla escolha: mantenha como questão dissertativa com os subitens no enunciado. Classifique como multipla_escolha somente quando houver opções mutuamente exclusivas para o aluno assinalar e um gabarito correto."
      : `Crie exatamente ${qtdMultiplaEscolha} questões multipla_escolha, cada uma com quatro alternativas plausíveis (A, B, C, D) e uma única correta, e exatamente ${qtdDissertativa} questões dissertativas. Use o material apenas como fonte temática. Contextualize todas, exija interpretação, inferência e aplicação e evite respostas óbvias.`;

    const resultado = await callGemini({
      systemInstruction: `Você elabora avaliações escolares em português brasileiro. ${instrucaoModo} Retorne JSON válido com tituloSugerido, disciplinaSugerida, anoTurmaSugerido e questoes. Cada questão deve ter id, tipo (multipla_escolha ou dissertativa), enunciado, textoApoio, habilidadeBNCC, peso e respostaEsperada. Questões objetivas também devem ter correta e alternativas com id, texto e correta.`,
      prompt: `Arquivo: ${nomeArquivo}\nModo: ${modo}\n\nCONTEÚDO DO MATERIAL:\n${texto}`
    });

    const questoes = Array.isArray(resultado.questoes) ? resultado.questoes.slice(0, 30).map((questao) => {
      const alternativas = Array.isArray(questao.alternativas) ? questao.alternativas.filter((alt) => String(alt?.texto || "").trim()) : [];
      const temAlternativasReais = alternativas.length >= 2;
      if (temAlternativasReais) return { ...questao, tipo: "multipla_escolha", alternativas };
      const { alternativas: _alternativas, correta: _correta, ...dissertativa } = questao;
      return { ...dissertativa, tipo: "dissertativa" };
    }) : [];
    if (!questoes.length) throw Object.assign(new Error("Nenhuma questão foi identificada ou gerada."), { status: 422 });
    return sendJson(res, 200, { success: true, resultado: { ...resultado, questoes } });
  } catch (error) {
    return sendJson(res, error.status || 500, { success: false, error: error.message || "Falha ao processar o material." });
  }
};
