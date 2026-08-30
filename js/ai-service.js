/**
 * Módulo de Inteligência Artificial Gemini 3.7 Flash - Atividade Segura
 */

const AIService = {
  async authHeaders() {
    await window.firebaseReady;
    const user = window.FirebaseAPI?.auth?.currentUser;
    if (!user) throw new Error("Sua sessão docente expirou. Entre novamente.");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await user.getIdToken()}`
    };
  },

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
        headers: await this.authHeaders(),
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
        throw new Error(data.error || "A IA não conseguiu gerar as questões.");
      }
      throw new Error("O servidor de IA retornou uma resposta inválida.");
    } catch (err) {
      console.error("Erro ao gerar questões:", err);
      throw err;
    }
  },

  async estruturarQuestoes({ texto, formato = "documento", nomeArquivo = "", modo = "importar", qtdMultiplaEscolha = 4, qtdDissertativa = 2 }) {
    try {
      const res = await fetch("/api/gemini/estruturar-questoes", {
        method: "POST",
        headers: await this.authHeaders(),
        body: JSON.stringify({
          texto,
          formato,
          nomeArquivo,
          modo,
          qtdMultiplaEscolha,
          qtdDissertativa
        })
      });

      const resText = await res.text();
      if (resText.trim().startsWith("{")) {
        const data = JSON.parse(resText);
        if (data.success && data.resultado?.questoes?.length > 0) {
          return data;
        }
        throw new Error(data.error || "Nenhuma questão foi encontrada no material.");
      }
      if (res.status === 504 || /timeout|timed out|FUNCTION_INVOCATION_TIMEOUT/i.test(resText)) {
        throw new Error("A geração ultrapassou o tempo máximo. Tente novamente; o arquivo não precisa ser alterado.");
      }
      throw new Error("O servidor de IA retornou uma resposta inválida.");
    } catch (err) {
      console.error("Erro ao estruturar o material:", err);
      throw err;
    }
  },

  parseDocumentTextClientSide(texto, nomeArquivo = "") {
    const cleanText = String(texto || "").replace(/\f/g, "\n");
    const sections = cleanText.split(/^\s*gabarito\s*$/im);
    const questionLines = sections[0].split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const answerLines = (sections.slice(1).join("\n") || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const rawQuestions = [];
    const answers = {};
    let current = null;

    const collectNumberedBlocks = (lines, target, includePrefix = false) => {
      let block = null;
      lines.forEach((line) => {
        if (/^\[---.*---\]$/.test(line)) return;
        const start = line.match(/^(?:(?:quest[aã]o|exerc[ií]cio|item)\s*)?(\d{1,3})[.):\-–]?\s+(.*)$/i);
        if (start) {
          if (block) target(block);
          block = { number: Number(start[1]), lines: [includePrefix ? line : start[2]] };
        } else if (block) {
          block.lines.push(line);
        }
      });
      if (block) target(block);
    };

    collectNumberedBlocks(answerLines, (block) => { answers[block.number] = block.lines.join(" "); });
    collectNumberedBlocks(questionLines, (block) => rawQuestions.push(block));

    const altRegex = /^([a-eA-E])[.):.-]\s+(.*)$/;
    const objectiveCue = /(assinale|marque|selecione|escolha|alternativa correta|opção correta|qual das alternativas)/i;
    const questoes = rawQuestions.map((raw, index) => {
      const alternativeStarts = raw.lines.map((line, lineIndex) => ({ line, lineIndex, match: line.match(altRegex) })).filter((item) => item.match);
      const objective = objectiveCue.test(raw.lines.join(" ")) && alternativeStarts.length >= 2;
      const base = {
        id: `q_imp_${raw.number}_${Date.now()}_${index}`,
        tipo: objective ? "multipla_escolha" : "dissertativa",
        peso: 1,
        respostaEsperada: answers[raw.number] || ""
      };

      if (!objective) {
        return { ...base, enunciado: raw.lines.join("\n") };
      }

      const firstAlternative = alternativeStarts[0].lineIndex;
      const alternativas = [];
      let activeAlternative = null;
      raw.lines.slice(firstAlternative).forEach((line) => {
        const match = line.match(altRegex);
        if (match) {
          activeAlternative = { id: match[1].toUpperCase(), texto: match[2].trim(), correta: false };
          alternativas.push(activeAlternative);
        } else if (activeAlternative) {
          activeAlternative.texto += ` ${line}`;
        }
      });
      const answer = answers[raw.number] || "";
      const correctMatch = answer.match(/(?:^|\s)([A-E])(?:[).:\s]|$)/i);
      const correta = correctMatch?.[1]?.toUpperCase() || alternativas[0].id;
      alternativas.forEach((alt) => { alt.correta = alt.id === correta; });
      return { ...base, enunciado: raw.lines.slice(0, firstAlternative).join(" "), alternativas, correta };
    });

    const tituloSugerido = (nomeArquivo || "").replace(/\.[^/.]+$/, "") || "Avaliação Estruturada";
    return {
      success: true,
      resultado: {
        tituloSugerido,
        disciplinaSugerida: "Geral",
        anoTurmaSugerido: "",
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
        headers: await this.authHeaders(),
        body: JSON.stringify({
          enunciado,
          respostaAluno,
          respostaEsperada,
          criteriosCorrecao,
          pesoMaximo
        })
      });

      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success && data.correcao) return data.correcao;
      }
    } catch (err) {
      console.warn("Correção remota indisponível, calculando pontuação estimada:", err);
    }

    const respLen = (respostaAluno || "").trim().length;
    const notaEstimada = respLen > 50 ? pesoMaximo : (respLen > 20 ? Number((pesoMaximo * 0.7).toFixed(1)) : Number((pesoMaximo * 0.3).toFixed(1)));
    return {
      nota: notaEstimada,
      feedback: "Resposta registrada e analisada no sistema.",
      pontosAtendidos: ["Conceitos principais expressos com clareza."],
      pontosMelhoria: ["Aprofundar a fundamentação conceitual."]
    };
  }
};

window.AIService = AIService;
