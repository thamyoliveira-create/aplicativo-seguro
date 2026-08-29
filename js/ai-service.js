/**
 * Módulo de Inteligência Artificial Gemini 3.7 Flash - Atividade Segura
 */

const AIService = {
  async gerarQuestoes({
    disciplina,
    anoTurma,
    tema,
    estilo = "Prova Paulista",
    qtdMultiplaEscolha,
    qtdDissertativa,
    quantidade,
    tipoQuestoes,
    dificuldade,
    habilidadeBNCC = "",
    textoBase = ""
  }) {
    try {
      const qtdTotal = parseInt(quantidade) || 3;
      const tipo = tipoQuestoes || "mistas";

      let finalMultipla = qtdMultiplaEscolha;
      let finalDissertativa = qtdDissertativa;

      if (finalMultipla === undefined || finalDissertativa === undefined) {
        if (tipo === "multipla_escolha") {
          finalMultipla = qtdTotal;
          finalDissertativa = 0;
        } else if (tipo === "dissertativa") {
          finalMultipla = 0;
          finalDissertativa = qtdTotal;
        } else {
          finalMultipla = Math.max(1, Math.floor(qtdTotal * 0.65));
          finalDissertativa = Math.max(1, qtdTotal - finalMultipla);
        }
      }

      const res = await fetch("/api/gemini/gerar-questoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disciplina,
          anoTurma,
          tema,
          estilo,
          quantidade: qtdTotal,
          tipoQuestoes: tipo,
          dificuldade,
          qtdMultiplaEscolha: finalMultipla,
          qtdDissertativa: finalDissertativa,
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

  async estruturarQuestoes({ texto, formato = "documento", nomeArquivo = "" }) {
    try {
      const res = await fetch("/api/gemini/estruturar-questoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto,
          formato,
          nomeArquivo
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Falha ao estruturar questões com IA");
      }
      return data;
    } catch (err) {
      console.error("Erro no AIService.estruturarQuestoes:", err);
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
