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

      const resText = await res.text();
      if (resText.trim().startsWith("{")) {
        const data = JSON.parse(resText);
        if (data.success && (data.questoes || data.resultado?.questoes)) {
          return data;
        }
      }
    } catch (err) {
      console.warn("API remota indisponível, usando motor pedagógico local:", err);
    }

    return this.generateMockQuestionsClientSide({
      disciplina,
      anoTurma,
      tema,
      quantidade: parseInt(quantidade) || 3,
      tipoQuestoes: tipoQuestoes || "mistas"
    });
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

      const resText = await res.text();
      if (resText.trim().startsWith("{")) {
        const data = JSON.parse(resText);
        if (data.success && data.resultado?.questoes?.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Estruturador remoto indisponível, usando parser no navegador:", err);
    }

    return this.parseDocumentTextClientSide(texto, nomeArquivo);
  },

  parseDocumentTextClientSide(texto, nomeArquivo = "") {
    const lines = (texto || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const questoes = [];
    let currentQ = null;
    const qStartRegex = /^(?:quest[aã]o|exerc[ií]cio|item|\d+)[\s.:\-)]+/i;
    const altRegex = /^([a-eA-E])[\s.:\)\-]+(.*)$/;

    for (let line of lines) {
      if (/^\[---.*---\]$/.test(line)) continue;

      if (qStartRegex.test(line)) {
        if (currentQ) questoes.push(currentQ);
        currentQ = {
          id: `q_imp_${questoes.length + 1}_${Date.now()}`,
          tipo: "multipla_escolha",
          enunciado: line.replace(qStartRegex, "").trim() || line,
          peso: 2.5,
          alternativas: [],
          correta: "A",
          respostaEsperada: ""
        };
        continue;
      }

      const altMatch = line.match(altRegex);
      if (altMatch && currentQ) {
        const letra = altMatch[1].toUpperCase();
        const altTexto = altMatch[2].trim();
        const isMarked = /(\*|\(x\)|\(correta\)|gabarito)/i.test(altTexto);
        const cleanTexto = altTexto.replace(/(\*|\(x\)|\(correta\)|gabarito)/gi, "").trim();

        if (isMarked) currentQ.correta = letra;
        currentQ.alternativas.push({
          id: letra,
          texto: cleanTexto || altTexto,
          correta: (letra === currentQ.correta)
        });
        continue;
      }

      if (currentQ) {
        if (currentQ.alternativas.length === 0) {
          currentQ.enunciado += " " + line;
        } else {
          const lastAlt = currentQ.alternativas[currentQ.alternativas.length - 1];
          lastAlt.texto += " " + line;
        }
      } else if (line.length > 10) {
        currentQ = {
          id: `q_imp_${questoes.length + 1}_${Date.now()}`,
          tipo: "multipla_escolha",
          enunciado: line,
          peso: 2.5,
          alternativas: [],
          correta: "A",
          respostaEsperada: ""
        };
      }
    }

    if (currentQ) questoes.push(currentQ);

    // Ajustar questões que não tiveram alternativas
    questoes.forEach(q => {
      if (!q.alternativas || q.alternativas.length < 2) {
        q.tipo = "dissertativa";
        q.respostaEsperada = q.respostaEsperada || "Critérios e pontos essenciais para a correção.";
        delete q.alternativas;
        delete q.correta;
      } else {
        q.alternativas.forEach(a => {
          a.correta = (a.id === q.correta);
        });
      }
    });

    const tituloSugerido = (nomeArquivo || "").replace(/\.[^/.]+$/, "") || "Avaliação Estruturada";
    return {
      success: true,
      resultado: {
        tituloSugerido,
        disciplinaSugerida: "Geral",
        anoTurmaSugerido: "8º Ano Fundamental",
        questoes
      }
    };
  },

  generateMockQuestionsClientSide({ disciplina, anoTurma, tema, quantidade = 3, tipoQuestoes = "mistas" }) {
    const questoes = [];
    const qtd = parseInt(quantidade) || 3;

    for (let i = 1; i <= qtd; i++) {
      const isDiss = tipoQuestoes === "dissertativa" || (tipoQuestoes === "mistas" && i === qtd);
      if (isDiss) {
        questoes.push({
          id: `q_gen_d_${i}_${Date.now()}`,
          tipo: "dissertativa",
          enunciado: `Discorra detalhadamente sobre a relevância de "${tema}" no contexto da disciplina de ${disciplina || "Geral"} para a turma de ${anoTurma || "Ensino Fundamental"}.`,
          habilidadeBNCC: "EM13CHS102",
          peso: 2.5,
          respostaEsperada: `O estudante deve analisar criticamente os conceitos fundamentais de ${tema}, contextualizando causas, desdobramentos e impactos práticos.`
        });
      } else {
        questoes.push({
          id: `q_gen_m_${i}_${Date.now()}`,
          tipo: "multipla_escolha",
          enunciado: `Considerando o tema "${tema}" estudado em ${disciplina || "Geral"}, assinale a alternativa que apresenta a afirmação conceitualmente correta:`,
          habilidadeBNCC: "EF08CI05",
          peso: 2.5,
          correta: "A",
          alternativas: [
            { id: "A", texto: `Definição exata e pedagogicamente consolidada referente a ${tema}.`, correta: true },
            { id: "B", texto: `Interpretação incorreta que confunde causas e consequências de ${tema}.`, correta: false },
            { id: "C", texto: `Afirmação anacrônica e descontextualizada sobre o conteúdo abordado.`, correta: false },
            { id: "D", texto: `Hipótese que desconsidera os princípios normativos e científicos do tema.`, correta: false }
          ]
        });
      }
    }

    return {
      success: true,
      resultado: {
        tituloSugerido: `Avaliação de ${disciplina || "Geral"}: ${tema}`,
        disciplinaSugerida: disciplina || "Geral",
        anoTurmaSugerido: anoTurma || "8º Ano Fundamental",
        questoes
      },
      questoes
    };
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
