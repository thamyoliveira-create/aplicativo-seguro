/**
 * Módulo de Inteligência Artificial Gemini 3.7 Flash - Atividade Segura
 */

const AIService = {
  async gerarQuestoes({
    disciplina,
    anoTurma,
    tema,
    estilo = "Prova Paulista",
    qtdMultiplaEscolha = 2,
    qtdDissertativa = 1,
    habilidadeBNCC = "",
    textoBase = ""
  }) {
    try {
      const res = await fetch("/api/gemini/gerar-questoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disciplina,
          anoTurma,
          tema,
          estilo,
          qtdMultiplaEscolha,
          qtdDissertativa,
          habilidadeBNCC,
          textoBase
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Falha ao gerar questões com IA");
      }
      return data;
    } catch (err) {
      console.error("Erro no AIService.gerarQuestoes:", err);
      throw err;
    }
  },

  async corrigirDissertativa({
    enunciado,
    respostaAluno,
    respostaEsperada,
    criteriosCorrecao,
    pesoMaximo = 5.0
  }) {
    try {
      const res = await fetch("/api/gemini/corrigir-dissertativa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enunciado,
          respostaAluno,
          respostaEsperada,
          criteriosCorrecao,
          pesoMaximo
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Falha na correção por IA");
      }
      return data.correcao;
    } catch (err) {
      console.error("Erro no AIService.corrigirDissertativa:", err);
      throw err;
    }
  }
};

window.AIService = AIService;
