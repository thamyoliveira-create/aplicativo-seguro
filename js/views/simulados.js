const SimuladosView = {
  state: {
    simuladoId: "1serie_dia1",
    serie: "1serie",
    dia: "1",
    componente: "todos",
    dificuldade: "todas",
    busca: "",
    answers: {},
    currentIndex: 0,
    startedAt: null,
    remainingSeconds: 0,
    timer: null,
    feedback: null,
    secureMode: false,
    cloudStatus: "local",
    cloudMessage: "Salvo neste dispositivo",
    cloudTimer: null
  },

  render(params = {}) {
    if (!window.SimuladosData) {
      document.getElementById("app-root").innerHTML = `
        <main class="min-h-screen hero-mesh flex items-center justify-center p-6">
          <section class="glass-card rounded-3xl p-8 max-w-xl text-center border border-slate-700">
            <h1 class="text-2xl font-black text-white">Dados dos simulados não carregados</h1>
            <p class="text-slate-300 mt-3">Recarregue a página para tentar novamente.</p>
            <a href="#" class="inline-flex mt-6 px-5 py-3 rounded-2xl bg-brand-600 text-white font-bold shadow-glow-blue">Voltar ao início</a>
          </section>
        </main>`;
      return;
    }

    const parts = window.location.hash.replace(/^#\/?/, "").split("/");
    if (parts[1] === "prova" && parts[2]) return this.renderProva(parts[2]);
    if (parts[1] === "treino") {
      if (parts[2] !== undefined && !isNaN(Number(parts[2]))) {
        this.state.currentIndex = Math.max(0, Number(parts[2]));
      }
      return this.renderTreino();
    }
    this.destroySecurity();
    this.renderCatalogo();
  },

  esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  },

  getSelectedConfig() {
    return window.SimuladosData.getConfig(this.state.simuladoId) || window.SimuladosData.getAllConfigs()[0];
  },

  getFilteredQuestions() {
    return window.SimuladosData.getQuestoesPorFiltro({
      serie: this.state.serie,
      dia: this.state.dia,
      componente: this.state.componente,
      dificuldade: this.state.dificuldade,
      busca: this.state.busca
    });
  },

  dificuldadeClass(dificuldade) {
    return {
      "Fácil": "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
      "Média": "bg-amber-500/15 text-amber-300 border-amber-500/25",
      "Desafio": "bg-rose-500/15 text-rose-300 border-rose-500/25",
      "Referência": "bg-slate-500/15 text-slate-300 border-slate-500/25"
    }[dificuldade] || "bg-slate-500/15 text-slate-300 border-slate-500/25";
  },

  cloudBadge() {
    const states = {
      synced: { icon: "cloud-check", text: "Salvo na nuvem", cls: "bg-emerald-500/10 border-emerald-500/25 text-emerald-200" },
      syncing: { icon: "refresh-cw", text: "Sincronizando...", cls: "bg-brand-500/10 border-brand-500/25 text-brand-100 animate-pulse" },
      error: { icon: "cloud-off", text: "Falha ao sincronizar", cls: "bg-rose-500/10 border-rose-500/25 text-rose-200" },
      local: { icon: "hard-drive", text: "Salvo neste dispositivo", cls: "bg-amber-500/10 border-amber-500/25 text-amber-200" }
    };
    const state = states[this.state.cloudStatus] || states.local;
    return `<span id="cloud-status-badge" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold ${state.cls}" title="${this.esc(this.state.cloudMessage)}"><i data-lucide="${state.icon}" class="w-3.5 h-3.5"></i>${state.text}</span>`;
  },

  setCloudStatus(status, message) {
    this.state.cloudStatus = status;
    this.state.cloudMessage = message || "";
    const badge = document.getElementById("cloud-status-badge");
    if (badge) {
      badge.outerHTML = this.cloudBadge();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  scheduleCloudSync(simuladoId, mode = "prova") {
    clearTimeout(this.state.cloudTimer);
    this.setCloudStatus("syncing", "Salvando progresso na nuvem...");
    this.state.cloudTimer = setTimeout(async () => {
      try {
        await DB.salvarProgressoSimulado({ simuladoId, mode, answers: this.state.answers, status: "draft" });
        this.setCloudStatus("synced", "Progresso salvo na nuvem.");
      } catch (err) {
        this.setCloudStatus("local", err.message || "Salvo neste dispositivo.");
      }
    }, 1500);
  },

  renderCatalogo() {
    const root = document.getElementById("app-root");
    const configs = window.SimuladosData.getAllConfigs();
    const stats = window.SimuladosData.getEstatisticas();
    const questoes = this.getFilteredQuestions();
    const componentes = [...new Set(window.SIMULADOS_QUESTOES
      .filter(q => q.serieSlug === this.state.serie && String(q.dia) === String(this.state.dia))
      .map(q => q.componente))];

    root.innerHTML = `
      <main class="min-h-screen hero-mesh text-slate-100 selection:bg-brand-600 selection:text-white pb-16">
        <header class="glass-nav sticky top-0 z-50 px-4 md:px-8 py-4">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <a class="landing-logo" href="#"><span class="brand-stamp" aria-hidden="true">AS</span><b>Atividade Segura</b></a>
            <nav class="flex items-center gap-2 text-xs sm:text-sm">
              ${this.cloudBadge()}
              <a href="#" class="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5">Início</a>
              <a href="#aluno" class="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5">Aluno</a>
              <a href="#professor" class="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5">Docente</a>
            </nav>
          </div>
        </header>

        <section class="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div class="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-center">
            <div>
              <p class="eyebrow"><span></span>PROVÃO PAULISTA 2026</p>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mt-4">Simulados oficiais<br><em class="text-brand-300 not-italic">questão por questão.</em></h1>
              <p class="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">Treine com foco total: veja cada questão individualmente, navegue diretamente pelo número e confira o gabarito oficial com taxa histórica de acerto.</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                ${this.statCard(stats.total, "questões", "book-open-check")}
                ${this.statCard("4", "cadernos", "files")}
                ${this.statCard("2", "séries EM", "graduation-cap")}
                ${this.statCard("1 por 1", "foco total", "layers")}
              </div>
            </div>

            <div class="glass-card rounded-[2rem] border border-white/10 p-5 md:p-6 shadow-card-hover">
              <div class="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p class="text-[11px] font-black tracking-[0.2em] text-brand-300 uppercase">Escolha um caderno</p>
                  <h2 class="text-2xl font-black text-white mt-1">Modo Simulado Oficial</h2>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-300 border border-brand-500/30 flex items-center justify-center shadow-glow-blue">
                  <i data-lucide="timer" class="w-6 h-6"></i>
                </div>
              </div>
              <div class="grid gap-3">
                ${configs.map(config => this.simuladoCard(config)).join("")}
              </div>
            </div>
          </div>

          <!-- Seção de Treino por Questão Única com Filtros -->
          <section class="mt-12 glass-card rounded-[2rem] border border-white/10 p-5 md:p-8">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <p class="text-[11px] font-black tracking-[0.2em] text-emerald-300 uppercase">Treino por questão única</p>
                <h2 class="text-2xl md:text-3xl font-black text-white mt-1">Banco de Questões Catalogado</h2>
                <p class="text-sm text-slate-400 mt-1">${questoes.length} questão(ões) filtradas. Clique no número ou card para resolver individualmente.</p>
              </div>
              <button type="button" id="btn-start-treino-first" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold shadow-glow-emerald transition-all">
                <i data-lucide="play-circle" class="w-5 h-5"></i> Começar Treino na Q01
              </button>
            </div>

            <!-- Filtros -->
            <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Série</span><select id="sim-filter-serie" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"><option value="1serie">1ª Série EM</option><option value="2serie">2ª Série EM</option></select></label>
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Dia</span><select id="sim-filter-dia" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"><option value="1">Dia 1</option><option value="2">Dia 2</option></select></label>
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Componente</span><select id="sim-filter-componente" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"><option value="todos">Todos os componentes</option>${componentes.map(c => `<option value="${this.esc(c)}">${this.esc(c)}</option>`).join("")}</select></label>
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Dificuldade</span><select id="sim-filter-dificuldade" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"><option value="todas">Todas as dificuldades</option><option>Fácil</option><option>Média</option><option>Desafio</option><option>Referência</option></select></label>
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Buscar</span><input id="sim-filter-busca" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand-500 focus:outline-none" placeholder="assunto, descritor..." value="${this.esc(this.state.busca)}"></label>
            </div>

            <!-- Seletor Rápido de Questões (Pills 1..N) -->
            <div class="mb-6 p-4 rounded-2xl bg-dark-950/70 border border-slate-800">
              <p class="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2.5 flex items-center justify-between">
                <span>Ir Direto para uma Questão:</span>
                <span class="text-xs text-brand-300 font-mono">${questoes.length} disponíveis</span>
              </p>
              <div class="flex items-center gap-1.5 flex-wrap max-h-36 overflow-y-auto py-1">
                ${questoes.map((q, idx) => `
                  <button
                    type="button"
                    data-open-single-question="${idx}"
                    class="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-brand-600 hover:border-brand-400 hover:text-white transition-all shadow-sm"
                    title="Q${String(q.numero).padStart(2, '0')}: ${this.esc(q.assunto)}"
                  >
                    Q${String(q.numero).padStart(2, '0')}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Lista de Questões com Ação de Abrir Unicamente -->
            <div class="grid lg:grid-cols-2 gap-3 max-h-[36rem] overflow-auto pr-1">
              ${questoes.slice(0, 60).map((q, idx) => this.questionPreview(q, idx)).join("")}
            </div>
            ${questoes.length > 60 ? `<p class="text-xs text-slate-400 mt-4">Mostrando 60 primeiras questões. Use os filtros para refinar o conjunto.</p>` : ""}
          </section>

          <!-- Downloads e Gabarito -->
          <section class="mt-12 grid md:grid-cols-5 gap-4">
            ${configs.map(config => this.downloadCard(config)).join("")}
            <article class="glass-card rounded-3xl border border-amber-500/30 p-5 flex flex-col gap-4 bg-amber-950/10">
              <div class="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30"><i data-lucide="key-round"></i></div>
              <div><h3 class="font-black text-white">Gabarito oficial</h3><p class="text-xs text-slate-400 mt-1">PDF consolidado com as respostas dos 4 cadernos.</p></div>
              <a href="assets/simulados/Gabarito_Simulado_Provao_2026.pdf" target="_blank" class="mt-auto px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-bold text-center transition-all">Abrir gabarito</a>
            </article>
          </section>
        </section>
      </main>`;

    document.getElementById("sim-filter-serie").value = this.state.serie;
    document.getElementById("sim-filter-dia").value = this.state.dia;
    document.getElementById("sim-filter-componente").value = this.state.componente;
    document.getElementById("sim-filter-dificuldade").value = this.state.dificuldade;
    this.bindCatalogEvents();
    if (window.lucide) window.lucide.createIcons();
  },

  statCard(value, label, icon) {
    return `<div class="glass-card rounded-2xl border border-white/10 p-4"><i data-lucide="${icon}" class="w-5 h-5 text-brand-300 mb-2"></i><div class="text-2xl font-black text-white">${value}</div><div class="text-[11px] uppercase tracking-wider text-slate-400 font-bold">${label}</div></div>`;
  },

  simuladoCard(config) {
    return `<article class="rounded-2xl border border-slate-700 bg-dark-950/75 p-4 hover:border-brand-500/60 transition-all">
      <div class="flex items-start justify-between gap-3">
        <div><h3 class="font-black text-white">${this.esc(config.serie)} · Dia ${config.dia}</h3><p class="text-xs text-slate-400 mt-1 leading-relaxed">${this.esc(config.descricao)}</p></div>
        <span class="px-2.5 py-1 rounded-lg bg-brand-500/15 text-brand-200 text-[11px] font-black border border-brand-500/30">${config.totalQuestoes}Q</span>
      </div>
      <div class="flex flex-wrap gap-2 mt-4">
        <a href="#simulados/prova/${config.id}" class="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow-blue transition-all">Iniciar Prova Passo a Passo</a>
        <a href="${config.pdfUrl}" target="_blank" class="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 transition-all">Abrir PDF</a>
        <button type="button" data-import-simulado="${config.id}" class="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-500/25 transition-all">Importar</button>
      </div>
    </article>`;
  },

  downloadCard(config) {
    return `<article class="glass-card rounded-3xl border border-white/10 p-5 flex flex-col gap-4">
      <div class="w-11 h-11 rounded-2xl bg-brand-500/15 text-brand-300 flex items-center justify-center border border-brand-500/25"><i data-lucide="file-text"></i></div>
      <div><h3 class="font-black text-white">${this.esc(config.serie)} · Dia ${config.dia}</h3><p class="text-xs text-slate-400 mt-1">${config.totalQuestoes} questões · ${config.componentes.length} componentes.</p></div>
      <a href="${config.pdfUrl}" target="_blank" class="mt-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold text-center transition-all">Abrir / baixar PDF</a>
    </article>`;
  },

  questionPreview(q, index) {
    const taxa = q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}% acerto`;
    return `<article class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4 hover:border-brand-500/40 transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-[11px] font-black tracking-wider text-brand-300 uppercase">Q${String(q.numero).padStart(2, "0")} · ${this.esc(q.componente)}</p>
            <h3 class="font-black text-white mt-1 leading-snug">${this.esc(q.assunto)}</h3>
          </div>
          <span class="px-2 py-1 rounded-lg border text-[11px] font-bold ${this.dificuldadeClass(q.dificuldade)} flex-shrink-0">${q.dificuldade}</span>
        </div>
        <p class="text-xs text-slate-400 mt-2.5 leading-relaxed"><b>Edital:</b> ${this.esc(q.conteudoEdital)}</p>
        <p class="text-xs text-slate-500 mt-1.5"><b>Descritor:</b> ${this.esc(q.descritor)}</p>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
        <div class="flex items-center gap-2">
          <span class="px-2 py-1 rounded-lg bg-slate-800/90 text-slate-300 font-mono">${taxa}</span>
          <span class="px-2 py-1 rounded-lg bg-slate-800/90 text-slate-300 font-mono">Gabarito: ${q.respostaCorreta}</span>
        </div>
        <button
          type="button"
          data-open-single-question="${index}"
          class="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-all shadow-glow-blue inline-flex items-center gap-1"
        >
          <span>Resolver Questão</span> <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </button>
      </div>
    </article>`;
  },

  bindCatalogEvents() {
    const update = () => {
      this.state.serie = document.getElementById("sim-filter-serie").value;
      this.state.dia = document.getElementById("sim-filter-dia").value;
      this.state.simuladoId = `${this.state.serie}_dia${this.state.dia}`;
      this.state.componente = document.getElementById("sim-filter-componente").value;
      this.state.dificuldade = document.getElementById("sim-filter-dificuldade").value;
      this.state.busca = document.getElementById("sim-filter-busca").value.trim();
      this.state.currentIndex = 0;
      this.renderCatalogo();
    };
    ["sim-filter-serie", "sim-filter-dia", "sim-filter-componente", "sim-filter-dificuldade"].forEach(id => document.getElementById(id)?.addEventListener("change", update));
    document.getElementById("sim-filter-busca")?.addEventListener("input", () => {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(update, 250);
    });
    document.querySelectorAll("[data-import-simulado]").forEach(btn => btn.onclick = () => this.importarSimulado(btn.dataset.importSimulado));

    document.getElementById("btn-start-treino-first")?.addEventListener("click", () => {
      this.state.currentIndex = 0;
      window.location.hash = "#simulados/treino/0";
    });

    document.querySelectorAll("[data-open-single-question]").forEach(btn => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.openSingleQuestion || 0);
        this.state.currentIndex = idx;
        window.location.hash = `#simulados/treino/${idx}`;
      };
    });
  },

  // ============================================================
  // TREINO POR QUESTÃO ÚNICA (PASSO A PASSO COM NAVEGADOR DE PÍLULAS)
  // ============================================================

  renderTreino() {
    const questoes = this.getFilteredQuestions();
    const root = document.getElementById("app-root");

    if (!questoes || questoes.length === 0) {
      root.innerHTML = `
        <main class="min-h-screen hero-mesh text-slate-100 flex items-center justify-center p-6">
          <section class="glass-card rounded-3xl p-8 max-w-md w-full text-center border border-slate-700">
            <div class="w-14 h-14 bg-amber-950/80 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <i data-lucide="filter-x" class="w-7 h-7"></i>
            </div>
            <h2 class="text-xl font-bold text-white mb-2">Nenhuma questão encontrada</h2>
            <p class="text-slate-400 text-xs mb-6">Ajuste os filtros de disciplina, dia ou dificuldade no catálogo.</p>
            <a href="#simulados" class="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-blue">
              Voltar ao Catálogo
            </a>
          </section>
        </main>`;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    if (this.state.currentIndex < 0) this.state.currentIndex = 0;
    if (this.state.currentIndex >= questoes.length) this.state.currentIndex = questoes.length - 1;

    const q = questoes[this.state.currentIndex];
    const stats = JSON.parse(localStorage.getItem("simulados_provao_2026_stats") || "{}");
    const answeredCount = questoes.filter(item => !!stats[item.id] && stats[item.id].attempts > 0).length;
    const progressPct = Math.round((answeredCount / questoes.length) * 100);

    root.innerHTML = `
      <main class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-600 selection:text-white pb-6">

        <!-- Header Fixo de Navegação -->
        <header class="glass-nav sticky top-0 z-50 px-4 md:px-8 py-3 border-b border-slate-800">
          <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <a href="#simulados" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all border border-slate-700">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> <span>Filtros / Catálogo</span>
              </a>
              <div>
                <h1 class="font-extrabold text-sm md:text-base text-white leading-tight">Treino de Questões</h1>
                <p class="text-[11px] text-slate-400 font-mono">${this.state.serie === '1serie' ? '1ª Série EM' : '2ª Série EM'} · Dia ${this.state.dia} ${this.state.componente !== 'todos' ? '· ' + this.esc(this.state.componente) : ''}</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              ${this.cloudBadge()}
              <span class="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-700 text-xs font-bold text-slate-200 font-mono">
                Questão ${this.state.currentIndex + 1} de ${questoes.length}
              </span>
            </div>
          </div>

          <!-- Barra de Progresso Superior -->
          <div class="max-w-5xl mx-auto mt-2.5">
            <div class="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-brand-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </header>

        <!-- Barra de Pílulas Numéricas para Navegação Rápida (1 por 1) -->
        <div class="bg-dark-900/90 border-b border-slate-800/80 py-2.5 px-4 sticky top-[62px] z-40 backdrop-blur-md">
          <div class="max-w-5xl mx-auto flex items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin" id="treino-nav-pills">
              ${questoes.map((item, idx) => {
                const isCurrent = idx === this.state.currentIndex;
                const stat = stats[item.id];
                const hasAttempt = !!stat && stat.attempts > 0;
                const isCorrect = hasAttempt && stat.correct > 0;

                let pillClass = "bg-dark-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800";
                if (isCurrent) {
                  pillClass = "bg-brand-600 text-white font-black ring-2 ring-brand-400 ring-offset-2 ring-offset-dark-950 shadow-glow-blue scale-105";
                } else if (hasAttempt) {
                  pillClass = isCorrect
                    ? "bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40"
                    : "bg-amber-950 text-amber-300 font-bold border border-amber-500/40";
                }

                return `
                  <button
                    type="button"
                    data-treino-jump="${idx}"
                    class="w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all flex-shrink-0 font-mono ${pillClass}"
                    title="Q${String(item.numero).padStart(2, '0')} - ${this.esc(item.componente)}"
                  >
                    ${item.numero}
                  </button>
                `;
              }).join("")}
            </div>
            <div class="text-xs font-semibold text-slate-400 whitespace-nowrap hidden sm:block pl-2">
              <span class="text-white font-bold">${answeredCount}</span>/${questoes.length} respondidas
            </div>
          </div>
        </div>

        <!-- Conteúdo da Questão Única -->
        <main class="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col justify-center">
          <article class="glass-card rounded-3xl p-6 md:p-9 shadow-2xl border border-slate-700/70 transition-all">

            <!-- Cabeçalho da Questão -->
            <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 text-xs font-extrabold font-mono border border-brand-500/30">
                  Questão ${q.numero} (${this.state.currentIndex + 1} de ${questoes.length})
                </span>
                <span class="px-3 py-1 rounded-xl bg-dark-900 text-slate-200 text-xs font-bold border border-slate-800">
                  ${this.esc(q.componente)}
                </span>
                <span class="px-3 py-1 rounded-xl border text-xs font-bold ${this.dificuldadeClass(q.dificuldade)}">
                  ${q.dificuldade}
                </span>
              </div>
              <a href="${q.pdfUrl}" target="_blank" class="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 inline-flex items-center gap-1.5 transition-all">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-400"></i> <span>Caderno Oficial PDF</span>
              </a>
            </div>

            <!-- Contexto e Descritores -->
            <div class="rounded-2xl border border-slate-800 bg-dark-950/80 p-5 mb-6">
              <h2 class="text-lg md:text-xl font-black text-white leading-snug">${this.esc(q.assunto)}</h2>
              <div class="grid md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
                <p class="text-slate-300"><b class="text-slate-400">Conteúdo do Edital:</b> ${this.esc(q.conteudoEdital)}</p>
                <p class="text-slate-400"><b class="text-slate-400">Descritor BNCC:</b> ${this.esc(q.descritor)}</p>
              </div>
              <div class="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <i data-lucide="info" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Consulte o enunciado original completo e figuras no PDF oficial.</span>
              </div>
            </div>

            <!-- Alternativas (A, B, C, D, E) -->
            <div class="mb-6">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Escolha a Alternativa:</label>
              <div class="grid sm:grid-cols-5 gap-3">
                ${["A", "B", "C", "D", "E"].map(opt => {
                  const stat = stats[q.id];
                  const isSelected = stat?.lastAnswer === opt;
                  const isCorrectAnswer = opt === q.respostaCorreta;

                  let btnClass = "border-slate-800 bg-dark-950/70 text-slate-200 hover:border-brand-500/60 hover:bg-dark-900";
                  if (stat?.lastAnswer) {
                    if (isSelected && isCorrectAnswer) {
                      btnClass = "border-emerald-500 bg-emerald-950/80 text-emerald-200 ring-2 ring-emerald-500/40 font-black shadow-glow-emerald";
                    } else if (isSelected && !isCorrectAnswer) {
                      btnClass = "border-rose-500 bg-rose-950/80 text-rose-200 ring-2 ring-rose-500/40 font-black";
                    } else if (isCorrectAnswer) {
                      btnClass = "border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-bold";
                    }
                  }

                  return `
                    <button
                      type="button"
                      data-treino-answer="${opt}"
                      class="rounded-2xl border p-4.5 font-black text-xl flex flex-col items-center justify-center gap-1 transition-all duration-150 ${btnClass}"
                    >
                      <span>${opt}</span>
                      ${stat?.lastAnswer ? `
                        <span class="text-[10px] font-mono font-normal">
                          ${isCorrectAnswer ? "✓ Correto" : isSelected ? "✗ Marcada" : ""}
                        </span>
                      ` : ""}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Feedback Imediato -->
            <div id="treino-feedback" class="mb-2">
              ${stats[q.id]?.lastAnswer ? this.renderTreinoFeedbackHtml(q, stats[q.id].lastAnswer === q.respostaCorreta) : ""}
            </div>
          </article>
        </main>

        <!-- Barra Inferior de Ações -->
        <footer class="glass-nav border-t border-slate-800/90 py-3.5 px-4 md:px-8 sticky bottom-0 z-40">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <button
              id="treino-prev"
              class="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-xs md:text-sm hover:bg-dark-900 hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              ${this.state.currentIndex === 0 ? "disabled" : ""}
            >
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span>Questão Anterior</span>
            </button>

            <button
              id="treino-next"
              class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-glow-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              ${this.state.currentIndex === questoes.length - 1 ? "disabled" : ""}
            >
              <span>Próxima Questão</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        </footer>
      </main>`;

    document.querySelectorAll("[data-treino-answer]").forEach(btn => {
      btn.onclick = () => this.answerTreino(q, btn.dataset.treinoAnswer);
    });

    document.querySelectorAll("[data-treino-jump]").forEach(btn => {
      btn.onclick = () => {
        this.state.currentIndex = Number(btn.dataset.treinoJump);
        window.location.hash = `#simulados/treino/${this.state.currentIndex}`;
        this.renderTreino();
      };
    });

    const prevBtn = document.getElementById("treino-prev");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.state.currentIndex > 0) {
          this.state.currentIndex -= 1;
          window.location.hash = `#simulados/treino/${this.state.currentIndex}`;
          this.renderTreino();
        }
      };
    }

    const nextBtn = document.getElementById("treino-next");
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.state.currentIndex < questoes.length - 1) {
          this.state.currentIndex += 1;
          window.location.hash = `#simulados/treino/${this.state.currentIndex}`;
          this.renderTreino();
        }
      };
    }

    if (window.lucide) window.lucide.createIcons();
  },

  renderTreinoFeedbackHtml(q, correct) {
    return `
      <div class="rounded-2xl border ${correct ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-rose-500/30 bg-rose-500/10 text-rose-100"} p-4.5 animate-fade-in">
        <div class="flex items-center gap-2 font-black text-sm md:text-base">
          <i data-lucide="${correct ? 'check-circle-2' : 'alert-circle'}" class="w-5 h-5 ${correct ? 'text-emerald-400' : 'text-rose-400'}"></i>
          <span>${correct ? "Parabéns, você acertou!" : "Quase lá!"}</span>
        </div>
        <p class="text-xs md:text-sm mt-2 leading-relaxed">
          Gabarito oficial: alternativa <b class="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">${q.respostaCorreta}</b>.
        </p>
        <p class="text-xs mt-2 opacity-80 pt-2 border-t border-white/10 font-mono">
          Taxa histórica de acerto na rede: ${q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}%`} · Origem: ${this.esc(q.origem)}
        </p>
      </div>
    `;
  },

  answerTreino(q, option) {
    const correct = option === q.respostaCorreta;
    const stats = this.savePracticeStat(q, correct, option);
    this.renderTreino();

    this.setCloudStatus("syncing", "Sincronizando treino na nuvem...");
    DB.sincronizarStatsTreino(stats)
      .then(() => this.setCloudStatus("synced", "Treino salvo na nuvem."))
      .catch((err) => this.setCloudStatus("local", err.message || "Treino salvo neste dispositivo."));
  },

  savePracticeStat(q, correct, option) {
    const key = "simulados_provao_2026_stats";
    const stats = JSON.parse(localStorage.getItem(key) || "{}");
    stats[q.id] = stats[q.id] || { attempts: 0, correct: 0 };
    stats[q.id].attempts += 1;
    stats[q.id].correct += correct ? 1 : 0;
    stats[q.id].lastAnswer = option;
    stats[q.id].lastAttemptAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  },

  // ============================================================
  // PROVA COMPLETA (QUESTÃO POR QUESTÃO COM CARTÃO-RESPOSTA DIGITAL)
  // ============================================================

  renderProva(simuladoId) {
    const config = window.SimuladosData.getConfig(simuladoId);
    if (!config) return this.renderCatalogo();
    this.state.simuladoId = simuladoId;
    const questoes = window.SimuladosData.getQuestoesPorSimulado(simuladoId);
    if (!this.state.startedAt || this.currentSimuladoId !== simuladoId) this.startSession(config);

    if (this.state.currentIndex < 0) this.state.currentIndex = 0;
    if (this.state.currentIndex >= questoes.length) this.state.currentIndex = questoes.length - 1;

    const q = questoes[this.state.currentIndex] || questoes[0];
    const answeredCount = Object.keys(this.state.answers).length;
    const progressPct = Math.round((answeredCount / questoes.length) * 100);

    document.getElementById("app-root").innerHTML = `
      <main class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-600 selection:text-white">

        <!-- Header Fixo de Navegação e Cronômetro -->
        <header class="glass-nav sticky top-0 z-50 px-4 md:px-8 py-3 border-b border-slate-800">
          <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <a href="#simulados" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 inline-flex items-center gap-1">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Sair
              </a>
              <div>
                <h1 class="font-black text-white text-sm md:text-base leading-tight">${this.esc(config.titulo)}</h1>
                <p class="text-[11px] text-slate-400 font-mono">${config.serie} · Dia ${config.dia} · ${questoes.length} Questões</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              ${this.cloudBadge()}
              <div class="px-3.5 py-1.5 rounded-xl bg-dark-900 border border-slate-700 font-mono font-black text-yellow-300 text-xs md:text-sm flex items-center gap-1.5 shadow-inner">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-brand-400"></i>
                <span id="sim-timer">${this.formatTime(this.state.remainingSeconds)}</span>
              </div>
              <span class="text-xs text-slate-300 font-mono hidden sm:inline">
                <b class="text-white">${answeredCount}</b>/${questoes.length}
              </span>
              <button id="finish-simulado" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-glow-emerald transition-all">
                Finalizar Prova
              </button>
            </div>
          </div>

          <!-- Barra de Progresso Superior -->
          <div class="max-w-7xl mx-auto mt-2.5">
            <div class="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-brand-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </header>

        <!-- Barra de Navegação Numérica Superior (Pills 1..N) -->
        <div class="bg-dark-900/90 border-b border-slate-800/80 py-2.5 px-4 sticky top-[62px] z-40 backdrop-blur-md">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin" id="prova-nav-pills">
              ${questoes.map((item, idx) => {
                const isCurrent = idx === this.state.currentIndex;
                const hasAnswer = !!this.state.answers[item.id];

                let pillClass = "bg-dark-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800";
                if (isCurrent) {
                  pillClass = "bg-brand-600 text-white font-black ring-2 ring-brand-400 ring-offset-2 ring-offset-dark-950 shadow-glow-blue scale-105";
                } else if (hasAnswer) {
                  pillClass = "bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40";
                }

                return `
                  <button
                    type="button"
                    data-jump="${idx}"
                    class="w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all flex-shrink-0 font-mono ${pillClass}"
                    title="Q${String(item.numero).padStart(2, '0')}: ${this.esc(item.componente)}"
                  >
                    ${item.numero}
                  </button>
                `;
              }).join("")}
            </div>
            <div class="text-xs font-semibold text-slate-400 whitespace-nowrap hidden md:block pl-2">
              <span class="text-white font-bold">${answeredCount}</span>/${questoes.length} respondidas (${progressPct}%)
            </div>
          </div>
        </div>

        <!-- Seção Principal com Questão Ativa e PDF -->
        <section class="max-w-7xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_20rem] gap-5 flex-1 w-full">

          <!-- Card da Questão Única Ativa -->
          <article class="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between">
            <div>
              <div class="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="text-[11px] font-black text-brand-300 tracking-widest uppercase">
                    Questão ${q.numero} de ${questoes.length} · ${this.esc(q.componente)}
                  </p>
                  <h2 class="text-lg md:text-xl font-black text-white mt-1">${this.esc(q.assunto)}</h2>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-lg border text-xs font-bold ${this.dificuldadeClass(q.dificuldade)}">
                    ${q.dificuldade}
                  </span>
                  <a href="${config.pdfUrl}" target="_blank" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-all">
                    Abrir PDF
                  </a>
                </div>
              </div>

              <div class="p-5 md:p-6 space-y-6">
                <!-- Informações do Edital e Descritores -->
                <div class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4.5 text-xs">
                  <p class="text-sm text-slate-300 leading-relaxed">
                    <b>Leia o enunciado completo no caderno oficial em PDF ao lado.</b> Este painel funciona como seu cartão-resposta digital seguro e sincronizado.
                  </p>
                  <div class="mt-3 pt-3 border-t border-slate-800/80 grid sm:grid-cols-2 gap-2 text-slate-400">
                    <p><b class="text-slate-300">Edital:</b> ${this.esc(q.conteudoEdital)}</p>
                    <p><b class="text-slate-300">Descritor:</b> ${this.esc(q.descritor)}</p>
                  </div>
                </div>

                <!-- Botões de Alternativa (A, B, C, D, E) -->
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Marque a Alternativa Escolhida:
                  </label>
                  <div class="grid sm:grid-cols-5 gap-3">
                    ${["A", "B", "C", "D", "E"].map(opt => {
                      const isSelected = this.state.answers[q.id] === opt;
                      return `
                        <button
                          type="button"
                          data-answer="${opt}"
                          class="rounded-2xl border ${isSelected ? "border-brand-400 bg-brand-600 text-white shadow-glow-blue scale-105" : "border-slate-700 bg-dark-950/70 text-slate-200 hover:border-brand-400 hover:bg-dark-900"} px-4 py-5 font-black text-xl transition-all duration-150 flex flex-col items-center justify-center gap-1"
                        >
                          <span>${opt}</span>
                          ${isSelected ? `<span class="text-[10px] font-mono font-normal">Marcada</span>` : ""}
                        </button>
                      `;
                    }).join("")}
                  </div>
                </div>
              </div>
            </div>

            <!-- Botões de Navegação Inferior na Questão -->
            <div class="p-5 border-t border-slate-800 flex justify-between gap-3 bg-dark-950/40">
              <button
                id="sim-prev"
                class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs md:text-sm font-bold inline-flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                ${this.state.currentIndex === 0 ? "disabled" : ""}
              >
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                <span>Questão Anterior</span>
              </button>

              <button
                id="sim-next"
                class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs md:text-sm font-bold inline-flex items-center gap-1.5 shadow-glow-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                ${this.state.currentIndex === questoes.length - 1 ? "disabled" : ""}
              >
                <span>Próxima Questão</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            </div>
          </article>

          <!-- Barra Lateral: Cartela de Respostas + PDF Embutido + Segurança -->
          <aside class="space-y-4">
            <!-- Grade Cartão-Resposta -->
            <div class="glass-card rounded-3xl border border-white/10 p-5">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[11px] uppercase tracking-wider font-black text-slate-400">Cartão-resposta digital</p>
                <span class="text-[11px] font-mono font-bold text-brand-300">${answeredCount}/${questoes.length}</span>
              </div>
              <div class="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto pr-1">
                ${questoes.map((item, idx) => `
                  <button
                    type="button"
                    data-jump="${idx}"
                    class="h-8.5 rounded-xl text-xs font-mono font-black border transition-all ${idx === this.state.currentIndex ? "bg-brand-600 border-brand-400 text-white shadow-glow-blue" : this.state.answers[item.id] ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200" : "bg-dark-950 border-slate-700 text-slate-400 hover:text-white"}"
                  >
                    ${item.numero}
                  </button>
                `).join("")}
              </div>

              <!-- Modo Seguro -->
              <label class="mt-4 flex items-start gap-3 rounded-2xl border border-slate-800 bg-dark-950/70 p-3 text-xs text-slate-300 cursor-pointer">
                <input id="secure-toggle" type="checkbox" ${this.state.secureMode ? "checked" : ""} class="mt-1 accent-blue-500">
                <span>
                  <b class="text-white block">Ambiente Seguro Ativo</b>
                  Bloqueia cópia, botão direito e monitora perda de foco.
                </span>
              </label>
            </div>

            <!-- PDF Embutido -->
            <div class="glass-card rounded-3xl border border-white/10 overflow-hidden">
              <div class="p-3 border-b border-slate-800 flex items-center justify-between text-xs bg-dark-950">
                <span class="font-bold text-slate-300 flex items-center gap-1.5"><i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-400"></i> Caderno Oficial</span>
                <a href="${config.pdfUrl}" target="_blank" class="text-brand-300 hover:underline text-[11px]">Expandir ↗</a>
              </div>
              <div class="bg-dark-950/90 h-[22rem]">
                <iframe src="${config.pdfUrl}#page=1" class="w-full h-full border-0" title="PDF oficial do simulado"></iframe>
              </div>
            </div>
          </aside>
        </section>
      </main>`;

    this.bindProvaEvents(config, questoes, q);
    if (window.lucide) window.lucide.createIcons();
  },

  startSession(config) {
    this.destroySecurity();
    this.currentSimuladoId = config.id;
    this.state.answers = JSON.parse(localStorage.getItem(`simulado_answers_${config.id}`) || "{}");
    this.state.currentIndex = 0;
    this.state.startedAt = new Date().toISOString();
    this.loadedCloudFor = null;
    this.carregarProgressoNuvem(config.id);
    this.state.remainingSeconds = config.tempoMinutos * 60;
    clearInterval(this.state.timer);
    this.state.timer = setInterval(() => {
      this.state.remainingSeconds -= 1;
      const timer = document.getElementById("sim-timer");
      if (timer) timer.textContent = this.formatTime(this.state.remainingSeconds);
      if (this.state.remainingSeconds <= 0) this.finishSimulado();
    }, 1000);
  },

  async carregarProgressoNuvem(simuladoId) {
    if (this.loadedCloudFor === simuladoId) return;
    this.loadedCloudFor = simuladoId;
    try {
      const progresso = await DB.obterProgressoSimulado(simuladoId, "prova");
      if (progresso?.answers && Object.keys(progresso.answers).length > Object.keys(this.state.answers || {}).length) {
        this.state.answers = progresso.answers;
        localStorage.setItem(`simulado_answers_${simuladoId}`, JSON.stringify(this.state.answers));
        this.setCloudStatus("synced", "Rascunho recuperado da nuvem.");
        if (this.currentSimuladoId === simuladoId) this.renderProva(simuladoId);
      } else if (progresso) {
        this.setCloudStatus("synced", "Progresso encontrado na nuvem.");
      }
    } catch (err) {
      this.setCloudStatus("local", err.message || "Salvo neste dispositivo.");
    }
  },

  bindProvaEvents(config, questoes, q) {
    document.querySelectorAll("[data-answer]").forEach(btn => btn.onclick = () => {
      this.state.answers[q.id] = btn.dataset.answer;
      localStorage.setItem(`simulado_answers_${config.id}`, JSON.stringify(this.state.answers));
      this.scheduleCloudSync(config.id, "prova");
      this.renderProva(config.id);
    });
    document.querySelectorAll("[data-jump]").forEach(btn => btn.onclick = () => {
      this.state.currentIndex = Number(btn.dataset.jump);
      this.renderProva(config.id);
    });

    const prevBtn = document.getElementById("sim-prev");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.state.currentIndex > 0) {
          this.state.currentIndex -= 1;
          this.renderProva(config.id);
        }
      };
    }

    const nextBtn = document.getElementById("sim-next");
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.state.currentIndex < questoes.length - 1) {
          this.state.currentIndex += 1;
          this.renderProva(config.id);
        }
      };
    }

    document.getElementById("finish-simulado").onclick = () => this.finishSimulado();
    document.getElementById("secure-toggle").onchange = (event) => this.toggleSecurity(event.target.checked, config);
  },

  toggleSecurity(enabled, config) {
    this.state.secureMode = enabled;
    if (!enabled) return this.destroySecurity();
    if (!window.securityEngine) return;
    window.securityEngine.init(
      { nome: "Estudante", ra: "SIMULADO", email: "simulado@local" },
      { id: config.id, titulo: config.titulo, configuracoesSeguranca: { bloquearCopiarColar: true, bloquearBotaoDireito: true, telaCheiaObrigatoria: false, marcaDaguaRA: true, detectarTrocaAba: true } },
      `local_${config.id}`,
      () => {}
    );
  },

  destroySecurity() {
    if (window.securityEngine?.active) window.securityEngine.destroy();
    this.state.secureMode = false;
  },

  finishSimulado() {
    const config = this.getSelectedConfig();
    const questoes = window.SimuladosData.getQuestoesPorSimulado(config.id);
    clearInterval(this.state.timer);
    const porComponente = {};
    let acertos = 0;
    questoes.forEach(q => {
      const ok = this.state.answers[q.id] === q.respostaCorreta;
      if (ok) acertos += 1;
      porComponente[q.componente] = porComponente[q.componente] || { total: 0, acertos: 0 };
      porComponente[q.componente].total += 1;
      porComponente[q.componente].acertos += ok ? 1 : 0;
    });
    const percent = Math.round((acertos / questoes.length) * 100);
    const resultado = {
      simuladoId: config.id,
      serie: config.serie,
      dia: config.dia,
      score: percent,
      totalQuestoes: questoes.length,
      totalAcertos: acertos,
      porComponente,
      answers: this.state.answers,
      completedAt: new Date().toISOString()
    };
    this.destroySecurity();
    document.getElementById("app-root").innerHTML = `
      <main class="min-h-screen hero-mesh text-slate-100 p-4 md:p-8 flex items-center justify-center">
        <section class="max-w-3xl w-full glass-card rounded-[2rem] border border-white/10 p-6 md:p-9 shadow-2xl">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-[11px] font-black tracking-[0.2em] text-emerald-300 uppercase">Resultado Oficial</p>
            ${this.cloudBadge()}
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-white mt-3">${percent}% de aproveitamento</h1>
          <p class="text-slate-300 text-base mt-2">Você acertou <b class="text-emerald-300">${acertos}</b> de <b class="text-white">${questoes.length}</b> questões.</p>
          <p id="cloud-result-note" class="text-xs text-slate-400 mt-2 font-mono">Salvando resultado na nuvem...</p>

          <div class="grid md:grid-cols-2 gap-3 mt-6">
            ${Object.entries(porComponente).map(([comp, row]) => `
              <div class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4">
                <b class="text-white text-sm block">${this.esc(comp)}</b>
                <p class="text-xs text-slate-400 mt-1 font-mono">${row.acertos}/${row.total} acertos · ${Math.round((row.acertos / row.total) * 100)}%</p>
              </div>
            `).join("")}
          </div>

          <div class="flex flex-wrap gap-3 mt-8 pt-4 border-t border-slate-800">
            <a href="#simulados" class="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow-blue transition-all">
              Voltar aos Simulados
            </a>
            <button id="review-simulado" class="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-sm transition-all">
              Refazer Simulado
            </button>
          </div>
        </section>
      </main>`;

    this.setCloudStatus("syncing", "Salvando resultado na nuvem...");
    DB.salvarResultadoSimulado(resultado)
      .then(() => {
        this.setCloudStatus("synced", "Resultado salvo na nuvem.");
        const note = document.getElementById("cloud-result-note");
        if (note) note.textContent = "Resultado salvo com sucesso na nuvem.";
      })
      .catch((err) => {
        this.setCloudStatus("local", err.message || "Resultado salvo neste dispositivo.");
        const note = document.getElementById("cloud-result-note");
        if (note) note.textContent = err.message || "Resultado salvo neste dispositivo.";
      });

    document.getElementById("review-simulado").onclick = () => {
      localStorage.removeItem(`simulado_answers_${config.id}`);
      this.state.startedAt = null;
      window.location.hash = `#simulados/prova/${config.id}`;
      this.renderProva(config.id);
    };

    if (window.lucide) window.lucide.createIcons();
  },

  formatTime(seconds) {
    const safe = Math.max(0, seconds || 0);
    const h = Math.floor(safe / 3600);
    const m = Math.floor((safe % 3600) / 60);
    const s = safe % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  },

  async importarSimulado(simuladoId) {
    try {
      const teacher = await TeacherAuth.session();
      if (!teacher) {
        alert("Entre no painel docente para importar este simulado como atividade.");
        window.location.hash = "#professor";
        return;
      }
      const config = window.SimuladosData.getConfig(simuladoId);
      const questoes = window.SimuladosData.getQuestoesPorSimulado(simuladoId);
      const codigo = `PP26-${config.serieSlug.replace("serie", "S")}-D${config.dia}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
      const atividade = {
        codigo,
        titulo: config.titulo,
        disciplina: "Provão Paulista",
        anoTurma: config.serie,
        status: "draft",
        tempoLimiteMinutos: config.tempoMinutos,
        instrucoes: `Simulado oficial do Provão Paulista 2026. Leia as questões no caderno PDF: ${config.pdfUrl}`,
        configuracoesSeguranca: {
          bloquearCopiarColar: true,
          bloquearBotaoDireito: true,
          telaCheiaObrigatoria: true,
          marcaDaguaRA: true,
          detectarTrocaAba: true,
          embaralharQuestoes: false,
          embaralharAlternativas: false
        },
        questoes: questoes.map(q => ({
          id: q.id,
          tipo: "multipla_escolha",
          enunciado: `Questão ${q.numero} do ${config.titulo}. Consulte o caderno PDF oficial para ler o enunciado completo. Assunto: ${q.assunto}`,
          textoApoio: `PDF oficial: ${config.pdfUrl}\nComponente: ${q.componente}\nConteúdo do edital: ${q.conteudoEdital}\nDescritor: ${q.descritor}`,
          habilidadeBNCC: q.descritor,
          peso: 1,
          correta: q.respostaCorreta,
          justificativa: `Gabarito oficial: alternativa ${q.respostaCorreta}. Taxa histórica de acerto: ${q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}%`}.`,
          alternativas: q.alternativas.map(a => ({ ...a, correta: a.id === q.respostaCorreta }))
        }))
      };
      await DB.salvarAtividade(atividade);
      alert(`Simulado importado como rascunho. Código: ${codigo}`);
      window.location.hash = "#professor";
    } catch (err) {
      alert(err.message || "Não foi possível importar o simulado.");
    }
  }
};

window.SimuladosView = SimuladosView;
