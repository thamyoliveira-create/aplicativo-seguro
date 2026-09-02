/**
 * View: Ambiente de Prova Blindado do Estudante
 * Design: High-Focus Minimalist & Pro Educational UX
 */

const AlunoProvaView = {
  async render(params = {}) {
    const root = document.getElementById("app-root");
    const codigo = params.codigo || "GEO-8B-2026";

    // 1. Obter dados do estudante
    let aluno = null;
    const stored = sessionStorage.getItem("aluno_ativo");
    if (stored) {
      aluno = JSON.parse(stored);
    } else {
      // Placeholder de demonstracao — o fluxo real preenche via login do aluno.
      aluno = {
        nome: "Aluno Visitante",
        ra: "000.000.000-0/SP",
        email: "visitante@exemplo.com",
        codigoAtividade: codigo
      };
      sessionStorage.setItem("aluno_ativo", JSON.stringify(aluno));
    }

    // 2. Carregando
    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 flex items-center justify-center text-white hero-mesh">
        <div class="text-center space-y-4">
          <div class="w-14 h-14 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-300 text-sm font-semibold tracking-wide">Iniciando ambiente de avaliação seguro...</p>
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
        <div class="min-h-screen bg-dark-950 flex items-center justify-center p-4 text-slate-100">
          <div class="glass-card p-8 rounded-3xl max-w-md w-full text-center border border-slate-700">
            <div class="w-14 h-14 bg-rose-950/80 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
              <i data-lucide="alert-triangle" class="w-7 h-7"></i>
            </div>
            <h2 class="text-xl font-bold text-white mb-2">Atividade Não Encontrada</h2>
            <p class="text-slate-400 text-xs mb-6">O código "${codigo}" não foi localizado no sistema.</p>
            <a href="#" class="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-blue">
              Voltar ao Início
            </a>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const submissaoId = `sub-${aluno.ra.replace(/[^0-9]/g, "")}-${Date.now().toString().slice(-4)}`;
    const draft = DB.obterRascunhoAluno(atividade.id);
    let respostas = (draft && draft.respostas) || {};
    let questaoAtualIndex = 0;
    let tempoRestanteSegundos = (atividade.tempoLimiteMinutos || 45) * 60;
    let tempoGastoSegundos = 0;

    let questoes = [...(atividade.questoes || [])];
    if (atividade.configuracoesSeguranca?.embaralharQuestoes && !draft) {
      questoes = questoes.sort(() => Math.random() - 0.5);
    }

    // 3. Renderizar Estrutura da Prova
    root.innerHTML = `
      <div id="exam-wrapper" class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative selection:bg-brand-600 selection:text-white">
        
        <!-- Topo da Prova (Fixo & Blindado) -->
        <header class="glass-nav sticky top-0 z-50 py-3 px-4 md:px-8 border-b border-slate-800/90">
          <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-600/20 text-yellow-400 flex items-center justify-center border border-brand-500/30 shadow-inner">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h1 class="font-extrabold text-sm md:text-base leading-tight text-white">${atividade.titulo}</h1>
                <p class="text-[11px] text-slate-400">${atividade.disciplina} • ${atividade.anoTurma}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- Cronômetro -->
              <div id="exam-timer-box" class="bg-dark-900 px-3.5 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2 shadow-inner">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-brand-400"></i>
                <span id="exam-timer" class="font-mono font-extrabold text-xs md:text-sm text-yellow-300">45:00</span>
              </div>

              <!-- Aluno Chip -->
              <div class="hidden sm:flex items-center gap-2 bg-dark-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-400"></i>
                <div class="text-left">
                  <div class="font-bold text-white truncate max-w-[130px]">${aluno.nome}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${aluno.ra}</div>
                </div>
              </div>

              <!-- Indicador de Salvamento -->
              <div id="save-status-indicator" class="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/30 font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="hidden md:inline">Salvo</span>
              </div>
            </div>
          </div>

          <!-- Barra de Progresso Superior -->
          <div class="max-w-5xl mx-auto mt-2.5">
            <div class="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div id="exam-progress-bar" class="bg-gradient-to-r from-brand-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300" style="width: 0%;"></div>
            </div>
          </div>
        </header>

        <!-- Barra de Navegação de Questões -->
        <div class="bg-dark-900/90 border-b border-slate-800/80 py-2.5 px-4 sticky top-[68px] z-40 backdrop-blur-md">
          <div class="max-w-5xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2 overflow-x-auto py-1" id="question-nav-pills">
              <!-- Renderizado via JS -->
            </div>
            <div class="text-xs font-semibold text-slate-400 pl-4 whitespace-nowrap">
              <span id="answered-count" class="text-white font-bold">0</span> de ${questoes.length} respondidas
            </div>
          </div>
        </div>

        <!-- Conteúdo da Questão Atual -->
        <main class="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col justify-center">
          <div id="question-container" class="glass-card rounded-3xl p-6 md:p-9 shadow-2xl border border-slate-700/70 transition-all">
            <!-- Renderizado dinamicamente -->
          </div>
        </main>

        <!-- Barra Inferior de Ações -->
        <footer class="glass-nav border-t border-slate-800/90 py-3.5 px-4 md:px-8 sticky bottom-0 z-40">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <button
              id="btn-prev-question"
              class="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-xs md:text-sm hover:bg-dark-900 hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span>Anterior</span>
            </button>

            <div class="flex items-center gap-3">
              <button
                id="btn-next-question"
                class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-glow-blue transition-all"
              >
                <span>Próxima</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>

              <button
                id="btn-finalizar-prova"
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-glow-emerald transition-all"
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

    // Solicitar tela cheia
    if (atividade.configuracoesSeguranca?.telaCheiaObrigatoria) {
      setTimeout(() => {
        window.securityEngine.requestFullscreen();
      }, 300);
    }

    // 5. Funções de Navegação e Renderização
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
          ? "bg-brand-600 text-white font-extrabold ring-2 ring-brand-400 ring-offset-2 ring-offset-dark-950 shadow-glow-blue"
          : hasAnswer
          ? "bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40"
          : "bg-dark-900 text-slate-400 hover:bg-dark-800 hover:text-white border border-slate-800";

        html += `
          <button
            onclick="AlunoProvaView.goToQuestion(${idx})"
            class="w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all flex-shrink-0 ${bgClass}"
          >
            ${idx + 1}
          </button>
        `;
      });

      pillsContainer.innerHTML = html;
      const countEl = document.getElementById("answered-count");
      if (countEl) countEl.innerText = answeredTotal;

      const progressBar = document.getElementById("exam-progress-bar");
      if (progressBar) {
        const pct = Math.round((answeredTotal / questoes.length) * 100);
        progressBar.style.width = `${pct}%`;
      }

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
        <div class="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
          <div class="flex items-center gap-2.5">
            <span class="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 text-xs font-extrabold font-mono border border-brand-500/30">
              Questão ${questaoAtualIndex + 1} de ${questoes.length}
            </span>
            ${q.habilidadeBNCC ? `
              <span class="px-2.5 py-1 rounded-xl bg-dark-900 text-slate-300 text-[11px] font-semibold border border-slate-800 font-mono">
                BNCC: ${q.habilidadeBNCC}
              </span>
            ` : ""}
          </div>
          <span class="text-xs font-bold text-slate-400 bg-dark-900 px-2.5 py-1 rounded-xl border border-slate-800">
            Valor: ${q.peso || 2.5} pts
          </span>
        </div>
      `;

      // Texto de Apoio
      if (q.textoApoio) {
        html += `
          <div class="bg-brand-950/40 border-l-4 border-brand-500 p-4.5 rounded-r-2xl text-slate-300 text-xs md:text-sm mb-6 leading-relaxed border-y border-r border-slate-800/80">
            <div class="font-bold text-brand-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-brand-400"></i>
              <span>Texto de Apoio / Contexto:</span>
            </div>
            ${q.textoApoio.replace(/\n/g, "<br>")}
          </div>
        `;
      }

      // Enunciado
      html += `
        <div class="text-sm md:text-base font-bold text-white mb-6 leading-relaxed">
          ${q.enunciado.replace(/\n/g, "<br>")}
        </div>
      `;

      // Alternativas ou Dissertativa
      if (!isDissertativa) {
        let alternativas = [...(q.alternativas || [])];

        html += `<div class="space-y-3 mb-5">`;
        alternativas.forEach((alt) => {
          const isSelected = currentResp === alt.id;
          const altClass = isSelected
            ? "border-brand-500 bg-brand-950/60 ring-2 ring-brand-500/30 text-white shadow-glow-blue"
            : "border-slate-800 bg-dark-900/70 hover:border-slate-700 hover:bg-dark-900 text-slate-300";

          html += `
            <label
              onclick="AlunoProvaView.selectOption('' + q.id + '', '' + alt.id + '')"
              class="flex items-start gap-3.5 p-4 rounded-2xl border ${altClass} cursor-pointer transition-all duration-150 select-none group"
            >
              <div class="w-6.5 h-6.5 rounded-full border-2 ${isSelected ? "border-brand-500 bg-brand-500 text-white" : "border-slate-600 bg-dark-950 text-slate-400 group-hover:border-slate-400"} flex items-center justify-center flex-shrink-0 text-xs font-bold uppercase transition-colors">
                ${alt.id}
              </div>
              <span class="text-xs md:text-sm leading-relaxed pt-0.5">${alt.texto}</span>
            </label>
          `;
        });
        html += `</div>`;
      } else {
        html += `
          <div class="mb-5">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span>Sua Resposta Dissertativa *</span>
              <span id="char-counter" class="text-slate-500 font-mono text-[11px] font-normal">${currentResp.length} caracteres</span>
            </label>
            <textarea
              id="dissertativa-input"
              rows="6"
              placeholder="Digite sua resposta completa e fundamentada aqui..."
              class="w-full p-4 rounded-2xl border border-slate-700 bg-dark-900/90 text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 text-sm leading-relaxed outline-none transition-all font-sans placeholder:text-slate-600"
              oninput="AlunoProvaView.onDissertativaInput('' + q.id + '', this.value)"
            >${currentResp}</textarea>
            <p class="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1.5">
              <i data-lucide="info" class="w-3.5 h-3.5 text-brand-400"></i>
              Fundamente sua resposta com clareza. Suas palavras são salvas automaticamente em tempo real.
            </p>
          </div>
        `;
      }

      container.innerHTML = html;
      if (window.lucide) window.lucide.createIcons();
      updateNavPills();
    }

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
        }, 500);
      }
    }

    // Cronômetro
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
          if (timerBox) timerBox.classList.add("bg-rose-950/90", "border-rose-500", "animate-pulse");
        }
      }

      if (tempoRestanteSegundos <= 0) {
        clearInterval(timerInterval);
        alert("Tempo limite esgotado! Sua avaliação será enviada automaticamente.");
        finalizarProva();
      }
    }, 1000);

    // Navegação
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

      window.securityEngine.destroy();

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

      // Tela de Sucesso
      root.innerHTML = `
        <div class="min-h-screen bg-dark-950 hero-mesh flex items-center justify-center p-4 text-white">
          <div class="glass-card p-8 md:p-12 rounded-3xl max-w-lg w-full text-center border border-emerald-500/40 shadow-glow-emerald">
            <div class="w-20 h-20 bg-emerald-950/80 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow-emerald border border-emerald-500/30">
              <i data-lucide="check-check" class="w-10 h-10"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Avaliação Entregue!</h2>
            <p class="text-slate-300 text-sm mb-6 leading-relaxed">
              Parabéns, <strong>${aluno.nome}</strong>! Suas respostas foram salvas com sucesso no sistema da professora.
            </p>

            <div class="bg-dark-900/90 border border-slate-800 rounded-2xl p-4.5 text-left text-xs space-y-2.5 mb-7">
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Atividade:</span>
                <span class="font-bold text-white">${atividade.titulo}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Registro do Aluno (RA):</span>
                <span class="font-mono font-semibold text-brand-300">${aluno.ra}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Tempo de Prova:</span>
                <span class="font-semibold text-white">${Math.floor(tempoGastoSegundos / 60)}m ${tempoGastoSegundos % 60}s</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Ocorrências de Segurança:</span>
                <span class="font-semibold ${window.securityEngine.infractions.totalTrocasAba > 0 ? "text-amber-400" : "text-emerald-400"}">
                  ${window.securityEngine.infractions.totalTrocasAba === 0 ? "Nenhuma infração registrada ✨" : `${window.securityEngine.infractions.totalTrocasAba} trocas de aba`}
                </span>
              </div>
            </div>

            <a href="#" class="inline-flex items-center justify-center gap-2 w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl shadow-glow-blue transition-all text-sm border border-white/10">
              <span>Voltar à Página Inicial</span>
              <i data-lucide="home" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();

      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }

    document.getElementById("btn-finalizar-prova").onclick = finalizarProva;
    renderCurrentQuestion();
  }
};

window.AlunoProvaView = AlunoProvaView;
