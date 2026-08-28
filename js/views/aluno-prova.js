/**
 * View: Ambiente de Prova Blindado do Estudante
 */

const AlunoProvaView = {
  async render(params = {}) {
    const root = document.getElementById("app-root");
    const codigo = params.codigo || "GEO-8B-2026";

    // 1. Obter ou criar dados do estudante
    let aluno = null;
    const stored = sessionStorage.getItem("aluno_ativo");
    if (stored) {
      aluno = JSON.parse(stored);
    } else {
      // Perfil de demonstração se acessado diretamente
      aluno = {
        nome: "Gabriel Santos de Oliveira",
        ra: "108.452.981-3/SP",
        email: "gabriel.oliveira452@aluno.educacao.sp.gov.br",
        codigoAtividade: codigo
      };
      sessionStorage.setItem("aluno_ativo", JSON.stringify(aluno));
    }

    // 2. Carregar a atividade
    root.innerHTML = `
      <div class="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-slate-300 text-sm font-medium">Carregando ambiente de avaliação seguro...</p>
        </div>
      </div>
    `;

    let atividade = null;
    try {
      atividade = await DB.getAtividadePorCodigo(codigo);
    } catch (e) {
      console.warn("Erro ao buscar atividade:", e);
    }

    if (!atividade) {
      root.innerHTML = `
        <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
            <h2 class="text-xl font-bold text-red-600 mb-2">Atividade Não Encontrada</h2>
            <p class="text-slate-600 text-sm mb-6">O código "${codigo}" não foi localizado no sistema.</p>
            <a href="#aluno" class="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold">Voltar</a>
          </div>
        </div>
      `;
      return;
    }

    // Gerar ID de submissão
    const submissaoId = `sub-${aluno.ra.replace(/[^0-9]/g, "")}-${Date.now().toString().slice(-4)}`;

    // Respostas carregadas do rascunho ou vazias
    const draft = DB.obterRascunhoAluno(atividade.id);
    let respostas = (draft && draft.respostas) || {};
    let questaoAtualIndex = 0;
    let tempoRestanteSegundos = (atividade.tempoLimiteMinutos || 45) * 60;
    let tempoGastoSegundos = 0;

    // Embaralhar questões se configurado e se não houver rascunho prévio
    let questoes = [...(atividade.questoes || [])];
    if (atividade.configuracoesSeguranca?.embaralharQuestoes && !draft) {
      questoes = questoes.sort(() => Math.random() - 0.5);
    }

    // 3. Renderizar Estrutura Principal da Prova
    root.innerHTML = `
      <div id="exam-wrapper" class="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800 relative">
        <!-- Topo da Prova (Fixo e Seguro) -->
        <header class="bg-[#002b66] text-white py-3 px-4 md:px-8 shadow-lg border-b-4 border-[#dc2626] sticky top-0 z-50">
          <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-blue-500/20 text-yellow-400 flex items-center justify-center border border-white/20">
                <i data-lucide="shield-alert" class="w-5 h-5"></i>
              </div>
              <div>
                <h1 class="font-bold text-sm md:text-base leading-tight">${atividade.titulo}</h1>
                <p class="text-[11px] text-blue-200">${atividade.disciplina} • ${atividade.anoTurma}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- Cronômetro -->
              <div id="exam-timer-box" class="bg-blue-950/80 px-3.5 py-1.5 rounded-xl border border-blue-400/30 flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-blue-300"></i>
                <span id="exam-timer" class="font-mono font-bold text-sm text-yellow-300">45:00</span>
              </div>

              <!-- Identificação do Aluno -->
              <div class="hidden sm:flex items-center gap-2 bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-400/20 text-xs">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-400"></i>
                <div class="text-left">
                  <div class="font-semibold text-white truncate max-w-[140px]">${aluno.nome}</div>
                  <div class="text-[10px] text-blue-300 font-mono">${aluno.ra}</div>
                </div>
              </div>

              <!-- Indicador de Salvamento -->
              <div id="save-status-indicator" class="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="hidden md:inline">Salvo</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Barra de Navegação de Questões -->
        <div class="bg-white border-b border-slate-200 py-2.5 px-4 sticky top-[60px] z-40 shadow-sm">
          <div class="max-w-5xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2 overflow-x-auto py-1" id="question-nav-pills">
              <!-- Renderizado via JS -->
            </div>
            <div class="text-xs font-semibold text-slate-500 pl-4 whitespace-nowrap">
              <span id="answered-count">0</span> de ${questoes.length} respondidas
            </div>
          </div>
        </div>

        <!-- Conteúdo da Questão Atual -->
        <main class="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col justify-center">
          <div id="question-container" class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 transition-all">
            <!-- Renderizado dinamicamente -->
          </div>
        </main>

        <!-- Barra Inferior de Ações -->
        <footer class="bg-white border-t border-slate-200 py-3.5 px-4 md:px-8 shadow-inner sticky bottom-0 z-40">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <button
              id="btn-prev-question"
              class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs md:text-sm hover:bg-slate-50 flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span>Anterior</span>
            </button>

            <div class="flex items-center gap-3">
              <button
                id="btn-next-question"
                class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs md:text-sm flex items-center gap-1.5 shadow transition-all"
              >
                <span>Próxima</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>

              <button
                id="btn-finalizar-prova"
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span>Finalizar Avaliação</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // 4. Iniciar Motor de Segurança Blindado
    window.securityEngine.init(
      aluno,
      atividade,
      submissaoId,
      (infractions, latestItem) => {
        console.log("Infração registrada:", latestItem);
      }
    );

    // Tentar ativar tela cheia
    if (atividade.configuracoesSeguranca?.telaCheiaObrigatoria) {
      setTimeout(() => {
        window.securityEngine.requestFullscreen();
      }, 300);
    }

    // 5. Funções de Navegação e Renderização de Questões
    function updateNavPills() {
      const pillsContainer = document.getElementById("question-nav-pills");
      if (!pillsContainer) return;

      let html = "";
      let answeredTotal = 0;

      questoes.forEach((q, idx) => {
        const isCurrent = idx === questaoAtualIndex;
        const hasAnswer = !!respostas[q.id] && String(respostas[q.id]).trim().length > 0;
        if (hasAnswer) answeredTotal++;

        const bgClass = isCurrent
          ? "bg-blue-600 text-white font-bold ring-2 ring-blue-600 ring-offset-2"
          : hasAnswer
          ? "bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200";

        html += `
          <button
            onclick="AlunoProvaView.goToQuestion(${idx})"
            class="w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all flex-shrink-0 ${bgClass}"
          >
            ${idx + 1}
          </button>
        `;
      });

      pillsContainer.innerHTML = html;
      const countEl = document.getElementById("answered-count");
      if (countEl) countEl.innerText = answeredTotal;

      const prevBtn = document.getElementById("btn-prev-question");
      if (prevBtn) prevBtn.disabled = questaoAtualIndex === 0;

      const nextBtn = document.getElementById("btn-next-question");
      if (nextBtn) {
        if (questaoAtualIndex === questoes.length - 1) {
          nextBtn.classList.add("hidden");
        } else {
          nextBtn.classList.remove("hidden");
        }
      }
    }

    function renderCurrentQuestion() {
      const q = questoes[questaoAtualIndex];
      const container = document.getElementById("question-container");
      if (!container || !q) return;

      const currentResp = respostas[q.id] || "";
      const isDissertativa = q.tipo === "dissertativa";

      let html = `
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold font-mono">
              Questão ${questaoAtualIndex + 1} de ${questoes.length}
            </span>
            ${q.habilidadeBNCC ? `
              <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                BNCC: ${q.habilidadeBNCC}
              </span>
            ` : ""}
          </div>
          <span class="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
            Valor: ${q.peso || 2.5} pts
          </span>
        </div>
      `;

      // Texto de Apoio
      if (q.textoApoio) {
        html += `
          <div class="bg-blue-50/70 border-l-4 border-blue-500 p-4 rounded-r-xl text-slate-700 text-xs md:text-sm mb-6 leading-relaxed">
            <div class="font-bold text-blue-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              Texto de Apoio / Contexto:
            </div>
            ${q.textoApoio.replace(/\n/g, "<br>")}
          </div>
        `;
      }

      // Enunciado
      html += `
        <div class="text-sm md:text-base font-semibold text-slate-900 mb-6 leading-relaxed">
          ${q.enunciado.replace(/\n/g, "<br>")}
        </div>
      `;

      // Múltipla Escolha vs Dissertativa
      if (!isDissertativa) {
        let alternativas = [...(q.alternativas || [])];
        if (atividade.configuracoesSeguranca?.embaralharAlternativas && !draft) {
          // Mantém as alternativas com seus IDs originais
        }

        html += `<div class="space-y-3 mb-4">`;
        alternativas.forEach((alt) => {
          const isSelected = currentResp === alt.id;
          const altClass = isSelected
            ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/30"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80";

          html += `
            <label
              onclick="AlunoProvaView.selectOption('${q.id}', '${alt.id}')"
              class="flex items-start gap-3.5 p-4 rounded-2xl border ${altClass} cursor-pointer transition-all duration-150 select-none group"
            >
              <div class="w-6 h-6 rounded-full border-2 ${isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"} flex items-center justify-center flex-shrink-0 text-xs font-bold uppercase transition-colors">
                ${alt.id}
              </div>
              <span class="text-xs md:text-sm text-slate-800 leading-relaxed pt-0.5">${alt.texto}</span>
            </label>
          `;
        });
        html += `</div>`;
      } else {
        html += `
          <div class="mb-4">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
              <span>Sua Resposta Dissertativa *</span>
              <span id="char-counter" class="text-slate-400 font-mono text-[11px] font-normal">${currentResp.length} caracteres</span>
            </label>
            <textarea
              id="dissertativa-input"
              rows="6"
              placeholder="Digite sua resposta completa e fundamentada aqui..."
              class="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm leading-relaxed outline-none transition-all font-sans bg-slate-50/50"
              oninput="AlunoProvaView.onDissertativaInput('${q.id}', this.value)"
            >${currentResp}</textarea>
            <p class="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <i data-lucide="info" class="w-3.5 h-3.5 text-blue-500"></i>
              Fundamente seus argumentos com clareza. Sua resposta é salva automaticamente enquanto você digita.
            </p>
          </div>
        `;
      }

      container.innerHTML = html;
      if (window.lucide) window.lucide.createIcons();
      updateNavPills();
    }

    // Métodos públicos para interação
    AlunoProvaView.goToQuestion = (idx) => {
      questaoAtualIndex = idx;
      renderCurrentQuestion();
    };

    AlunoProvaView.selectOption = (questaoId, altId) => {
      respostas[questaoId] = altId;
      DB.salvarRascunhoAluno(atividade.id, respostas, submissaoId);
      renderCurrentQuestion();
      showSavePulse();
    };

    AlunoProvaView.onDissertativaInput = (questaoId, text) => {
      respostas[questaoId] = text;
      const counter = document.getElementById("char-counter");
      if (counter) counter.innerText = `${text.length} caracteres`;
      DB.salvarRascunhoAluno(atividade.id, respostas, submissaoId);
      showSavePulse();
    };

    function showSavePulse() {
      const ind = document.getElementById("save-status-indicator");
      if (ind) {
        ind.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> <span class="hidden md:inline">Salvando...</span>`;
        setTimeout(() => {
          ind.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> <span class="hidden md:inline">Salvo às ${new Date().toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit", second:"2-digit"})}</span>`;
        }, 600);
      }
    }

    // Cronômetro da Prova
    const timerInterval = setInterval(() => {
      tempoRestanteSegundos--;
      tempoGastoSegundos++;
      const timerEl = document.getElementById("exam-timer");
      if (timerEl) {
        const mins = Math.floor(tempoRestanteSegundos / 60);
        const secs = tempoRestanteSegundos % 60;
        timerEl.innerText = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        if (tempoRestanteSegundos <= 300) {
          const timerBox = document.getElementById("exam-timer-box");
          if (timerBox) timerBox.classList.add("bg-red-900/90", "border-red-500", "animate-pulse");
        }
      }

      if (tempoRestanteSegundos <= 0) {
        clearInterval(timerInterval);
        alert("Tempo limite esgotado! Sua avaliação será enviada automaticamente.");
        finalizarProva();
      }
    }, 1000);

    // Eventos dos Botões de Ação
    document.getElementById("btn-prev-question").onclick = () => {
      if (questaoAtualIndex > 0) {
        questaoAtualIndex--;
        renderCurrentQuestion();
      }
    };

    document.getElementById("btn-next-question").onclick = () => {
      if (questaoAtualIndex < questoes.length - 1) {
        questaoAtualIndex++;
        renderCurrentQuestion();
      }
    };

    async function finalizarProva() {
      clearInterval(timerInterval);

      const answeredTotal = Object.keys(respostas).filter(k => !!respostas[k] && String(respostas[k]).trim().length > 0).length;
      const confirmMsg = `Você respondeu ${answeredTotal} de ${questoes.length} questões. Deseja enviar definitivamente a sua avaliação?`;
      if (!confirm(confirmMsg)) return;

      // Desativar travas antes do fechamento
      window.securityEngine.destroy();

      // Salvar submissão na API
      const submissaoFinal = {
        id: submissaoId,
        atividadeId: atividade.id,
        alunoNome: aluno.nome,
        alunoEmail: aluno.email,
        alunoRA: aluno.ra,
        turma: atividade.anoTurma,
        dataInicio: new Date(Date.now() - tempoGastoSegundos * 1000).toISOString(),
        dataEnvio: new Date().toISOString(),
        tempoGastoSegundos: tempoGastoSegundos,
        status: "entregue",
        infracoes: window.securityEngine.infractions,
        respostas: respostas
      };

      try {
        await DB.salvarSubmissao(submissaoFinal);
        DB.limparRascunhoAluno(atividade.id);
      } catch (err) {
        console.warn("Erro ao registrar submissão final:", err);
      }

      // Tela de Confirmação e Sucesso com Confete
      root.innerHTML = `
        <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
          <div class="bg-white text-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg w-full text-center border-4 border-emerald-500">
            <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <i data-lucide="check-check" class="w-10 h-10"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Avaliação Entregue!</h2>
            <p class="text-slate-600 text-sm mb-6 leading-relaxed">
              Parabéns, <strong>${aluno.nome}</strong>! Suas respostas foram salvas com sucesso no sistema da professora.
            </p>

            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
              <div class="flex justify-between border-b border-slate-200 pb-1.5">
                <span class="text-slate-500">Atividade:</span>
                <span class="font-bold text-slate-800">${atividade.titulo}</span>
              </div>
              <div class="flex justify-between border-b border-slate-200 pb-1.5">
                <span class="text-slate-500">Registro do Aluno (RA):</span>
                <span class="font-mono font-semibold text-slate-800">${aluno.ra}</span>
              </div>
              <div class="flex justify-between border-b border-slate-200 pb-1.5">
                <span class="text-slate-500">Tempo de Prova:</span>
                <span class="font-semibold text-slate-800">${Math.floor(tempoGastoSegundos / 60)}m ${tempoGastoSegundos % 60}s</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Ocorrências de Segurança:</span>
                <span class="font-semibold ${window.securityEngine.infractions.totalTrocasAba > 0 ? "text-amber-600" : "text-emerald-600"}">
                  ${window.securityEngine.infractions.totalTrocasAba === 0 ? "Nenhuma infração registrada ✨" : `${window.securityEngine.infractions.totalTrocasAba} trocas de aba`}
                </span>
              </div>
            </div>

            <a href="#" class="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#002b66] hover:bg-[#001f4d] text-white font-bold rounded-xl shadow-lg transition-all text-sm">
              <span>Voltar à Página Inicial</span>
              <i data-lucide="home" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();

      // Disparar confetes festivos
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }

    document.getElementById("btn-finalizar-prova").onclick = finalizarProva;

    // Renderizar a primeira questão
    renderCurrentQuestion();
  }
};

window.AlunoProvaView = AlunoProvaView;
