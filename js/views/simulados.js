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
    cloudTimer: null,
    MIN_EXAM_MINUTES: 45
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

  simuladoIdentityKey(simuladoId) {
    return `simulado_identity_${simuladoId}`;
  },

  getSimuladoIdentity(simuladoId) {
    try {
      const data = JSON.parse(sessionStorage.getItem(this.simuladoIdentityKey(simuladoId)) || "null");
      if (data?.studentName && data?.studentRA && data?.studentEmail) return data;
    } catch (_) {}
    return null;
  },

  saveSimuladoIdentity(simuladoId, student, studentName, studentRA) {
    const identity = {
      studentId: student.id,
      studentEmail: student.email,
      studentName: String(studentName || "").trim().slice(0, 120),
      studentRA: String(studentRA || "").trim().slice(0, 40),
      simuladoId,
      confirmedAt: new Date().toISOString()
    };
    sessionStorage.setItem(this.simuladoIdentityKey(simuladoId), JSON.stringify(identity));
    return identity;
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
    const identity = mode === "prova" ? this.getSimuladoIdentity(simuladoId) : null;
    if (!identity?.studentId) {
      this.setCloudStatus("local", "Identificação incompleta. Confirme nome e RA primeiro.");
      return;
    }
    clearTimeout(this.state.cloudTimer);
    this.setCloudStatus("syncing", "Salvando progresso na nuvem...");
    this.state.cloudTimer = setTimeout(async () => {
      try {
        await DB.salvarProgressoSimulado({
          simuladoId,
          mode,
          answers: this.state.answers,
          status: "draft",
          studentName: identity.studentName,
          studentRA: identity.studentRA
        });
        this.setCloudStatus("synced", "Progresso salvo na nuvem.");
      } catch (err) {
        this.setCloudStatus("local", err.message || "Falha na nuvem; salvo neste dispositivo.");
        console.error("Cloud sync error:", err);
      }
    }, 1500);
  },

  renderCatalogo() {
    const root = document.getElementById("app-root");
    const configs = window.SimuladosData.getAllConfigs();
    const stats = window.SimuladosData.getEstatisticas();
    const questoes = this.getFilteredQuestions();
    const componentes = [...new Set(window.SIMULADOS_QUESTOES
      .filter(q => (!this.state.serie || q.serieSlug === this.state.serie) && (!this.state.dia || String(q.dia) === String(this.state.dia)))
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
              <p class="eyebrow"><span></span>PROVÃO PAULISTA &amp; ENEM 2026</p>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mt-4">Simulados oficiais<br><em class="text-brand-300 not-italic">questão por questão.</em></h1>
              <p class="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">Treine com foco total: veja cada questão individualmente, navegue diretamente pelo número e confira o gabarito oficial com taxa histórica de acerto e resoluções comentadas passo a passo.</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                ${this.statCard(stats.total, "questões", "book-open-check")}
                ${this.statCard(configs.length, "cadernos", "files")}
                ${this.statCard(Object.keys(stats.porSerie || {}).length || 3, "séries EM", "graduation-cap")}
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
              <div class="grid gap-3 max-h-[28rem] overflow-y-auto pr-1 scrollbar-thin">
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
                <p class="text-sm text-slate-400 mt-1">${questoes.length} questão(ões) filtradas. Clique no número ou card para resolver individualmente com resolução comentada.</p>
              </div>
              <button type="button" id="btn-start-treino-first" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold shadow-glow-emerald transition-all">
                <i data-lucide="play-circle" class="w-5 h-5"></i> Começar Treino na Q01
              </button>
            </div>

            <!-- Filtros -->
            <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              <label class="space-y-1.5"><span class="text-[11px] uppercase font-bold text-slate-400">Série</span><select id="sim-filter-serie" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"><option value="1serie">1ª Série EM (Provão)</option><option value="2serie">2ª Série EM (Provão)</option><option value="3serie">3ª Série EM (ENEM)</option></select></label>
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
          <section class="mt-12 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            ${configs.map(config => this.downloadCard(config)).join("")}
            <article class="glass-card rounded-3xl border border-amber-500/30 p-5 flex flex-col gap-4 bg-amber-950/10">
              <div class="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30"><i data-lucide="key-round"></i></div>
              <div><h3 class="font-black text-white">Gabarito oficial</h3><p class="text-xs text-slate-400 mt-1">PDF consolidado com as respostas dos cadernos oficiais.</p></div>
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

  renderQuestionLeftContent(q, mode = "treino") {
    const zoomBtnId = mode === "prova" ? "btn-zoom-prova-toggle" : "btn-zoom-toggle";
    const imgContainerId = mode === "prova" ? "prova-img-container" : "page-img-container";
    const imgElId = mode === "prova" ? "prova-img-el" : "page-img-el";

    if (q.enunciado) {
      return `
        <article class="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl bg-dark-950/80">
          <div class="p-3.5 px-4 border-b border-slate-800 flex items-center justify-between bg-dark-900/80">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 font-mono text-xs font-bold border border-brand-500/30">
                ${this.esc(q.origem || 'ENEM')}
              </span>
              <span class="text-xs font-bold text-slate-200">Questão ${q.numero} · ${this.esc(q.componente)}</span>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-medium">Texto Oficial Formatado</span>
          </div>

          <div class="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto scrollbar-thin text-slate-100">
            ${q.textoApoio ? `
              <div class="p-4 rounded-2xl bg-dark-900/90 border border-slate-800 text-slate-200 text-sm md:text-base leading-relaxed italic whitespace-pre-line shadow-inner border-l-4 border-l-brand-500">
                ${this.esc(q.textoApoio)}
              </div>
            ` : ""}

            <div class="text-white text-sm md:text-base font-medium leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
              ${this.esc(q.enunciado)}
            </div>

            ${Array.isArray(q.alternativas) ? `
              <div class="space-y-2 pt-2">
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Alternativas do Caderno:</p>
                ${q.alternativas.map(alt => `
                  <div class="p-3 rounded-xl bg-dark-900/60 border border-slate-800/70 text-xs md:text-sm text-slate-300 flex items-start gap-3">
                    <span class="w-6 h-6 rounded-lg bg-slate-800 text-brand-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-700 mt-0.5">${alt.id}</span>
                    <span class="leading-snug text-slate-200">${this.esc(alt.texto)}</span>
                  </div>
                `).join('')}
              </div>
            ` : q.alternativas && typeof q.alternativas === 'object' ? `
              <div class="space-y-2 pt-2">
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Alternativas do Caderno:</p>
                ${['A', 'B', 'C', 'D', 'E'].map(letra => q.alternativas[letra] ? `
                  <div class="p-3 rounded-xl bg-dark-900/60 border border-slate-800/70 text-xs md:text-sm text-slate-300 flex items-start gap-3">
                    <span class="w-6 h-6 rounded-lg bg-slate-800 text-brand-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-700 mt-0.5">${letra}</span>
                    <span class="leading-snug text-slate-200">${this.esc(q.alternativas[letra])}</span>
                  </div>
                ` : '').join('')}
              </div>
            ` : ""}
          </div>

          <div class="p-2.5 px-4 border-t border-slate-800/80 bg-dark-950/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Caderno Oficial ENEM / INEP</span>
            <span>Habilidade BNCC: ${this.esc(q.descritor || q.habilidadeBncc || "Matriz de Referência")}</span>
          </div>
        </article>
      `;
    }

    return `
      <article class="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl bg-dark-950/80">
        <div class="p-3.5 px-4 border-b border-slate-800 flex items-center justify-between bg-dark-900/80">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 font-mono text-xs font-bold border border-brand-500/30">
              Página ${q.paginaPdf || 1}
            </span>
            <span class="text-xs font-bold text-slate-200">Caderno Oficial · Questão ${q.numero}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              id="${zoomBtnId}"
              class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 inline-flex items-center gap-1 transition-all"
              title="Alternar tamanho da imagem"
            >
              <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> <span>Ampliar</span>
            </button>
          </div>
        </div>

        <div id="${imgContainerId}" class="p-2 md:p-4 max-h-[75vh] overflow-y-auto scrollbar-thin bg-slate-900/60 flex justify-center items-start">
          <img
            id="${imgElId}"
            src="${q.imagemQuestao || q.imagemPagina || `assets/simulados/pages/${q.simuladoId}_p${q.paginaPdf || 1}.webp`}"
            alt="Enunciado oficial da Questão ${q.numero} - Página ${q.paginaPdf || 1}"
            class="w-full h-auto rounded-xl shadow-lg border border-slate-800 object-contain bg-white select-none transition-transform duration-200"
            loading="eager"
          />
        </div>
        <div class="p-2.5 px-4 border-t border-slate-800/80 bg-dark-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Caderno Oficial VUNESP / SEDUC-SP</span>
          <span>Use a barra de rolagem ou o botão de ampliar para ler detalhes</span>
        </div>
      </article>
    `;
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
                <p class="text-[11px] text-slate-400 font-mono">${this.state.serie === '1serie' ? '1ª Série EM' : this.state.serie === '2serie' ? '2ª Série EM' : '3ª Série EM (ENEM)'} · Dia ${this.state.dia} ${this.state.componente !== 'todos' ? '· ' + this.esc(this.state.componente) : ''}</p>
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
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
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

        <!-- Conteúdo do Treino com Visualizador da Questão Oficial + Card de Resposta -->
        <main class="max-w-7xl mx-auto w-full p-4 md:p-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 flex-1 items-start">

          <!-- Coluna da Esquerda: Enunciado Oficial da Prova (Texto Formatado ou Imagem Oficial) -->
          ${this.renderQuestionLeftContent(q, "treino")}

          <!-- Coluna da Direita: Card de Resolução, BNCC e Feedback -->
          <div class="space-y-4">
            <article class="glass-card rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-700/70">

              <!-- Cabeçalho da Questão -->
              <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 text-xs font-extrabold font-mono border border-brand-500/30">
                    Questão ${q.numero} (${this.state.currentIndex + 1} de ${questoes.length})
                  </span>
                  <span class="px-2.5 py-1 rounded-xl bg-dark-900 text-slate-200 text-xs font-bold border border-slate-800">
                    ${this.esc(q.componente)}
                  </span>
                  <span class="px-2.5 py-1 rounded-xl border text-xs font-bold ${this.dificuldadeClass(q.dificuldade)}">
                    ${q.dificuldade}
                  </span>
                </div>
              </div>

              <!-- Contexto e Descritores -->
              <div class="rounded-2xl border border-slate-800 bg-dark-950/80 p-4 text-xs mt-4">
                <h2 class="text-base font-black text-white leading-snug mb-2">${this.esc(q.assunto)}</h2>
                <div class="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <p class="text-slate-300"><b class="text-slate-400">Conteúdo do Edital:</b> ${this.esc(q.conteudoEdital)}</p>
                  <p class="text-slate-400"><b class="text-slate-400">Descritor BNCC:</b> ${this.esc(q.descritor)}</p>
                </div>
              </div>

              <!-- Alternativas (A, B, C, D, E) -->
              <div class="mt-5">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Escolha a Alternativa:</label>
                <div class="grid grid-cols-5 gap-2.5">
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
                        class="rounded-2xl border p-3.5 font-black text-xl flex flex-col items-center justify-center gap-1 transition-all duration-150 ${btnClass}"
                      >
                        <span>${opt}</span>
                        ${stat?.lastAnswer ? `
                          <span class="text-[9px] font-mono font-normal">
                            ${isCorrectAnswer ? "✓ Correto" : isSelected ? "✗ Marcada" : ""}
                          </span>
                        ` : ""}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- Feedback Imediato -->
              <div id="treino-feedback" class="mt-4">
                ${stats[q.id]?.lastAnswer ? this.renderTreinoFeedbackHtml(q, stats[q.id].lastAnswer === q.respostaCorreta) : ""}
              </div>

              <!-- Navegação Inferior -->
              <div class="mt-6 pt-4 border-t border-slate-800 flex justify-between gap-3">
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
            </article>
          </div>
        </main>
      </main>`;

    // Zoom Toggle no Treino
    let isZoomedTreino = false;
    document.getElementById("btn-zoom-toggle")?.addEventListener("click", () => {
      isZoomedTreino = !isZoomedTreino;
      const imgEl = document.getElementById("page-img-el");
      const containerEl = document.getElementById("page-img-container");
      const btn = document.getElementById("btn-zoom-toggle");
      if (imgEl && containerEl && btn) {
        if (isZoomedTreino) {
          imgEl.style.transform = "scale(1.4)";
          imgEl.style.transformOrigin = "top center";
          containerEl.classList.remove("max-h-[75vh]");
          containerEl.classList.add("max-h-[88vh]");
          btn.innerHTML = `<i data-lucide="zoom-out" class="w-3.5 h-3.5"></i> <span>Reduzir</span>`;
        } else {
          imgEl.style.transform = "scale(1)";
          containerEl.classList.remove("max-h-[88vh]");
          containerEl.classList.add("max-h-[75vh]");
          btn.innerHTML = `<i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> <span>Ampliar</span>`;
        }
        if (window.lucide) window.lucide.createIcons();
      }
    });

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
      <div class="rounded-2xl border ${correct ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-rose-500/30 bg-rose-500/10 text-rose-100"} p-4.5 animate-fade-in space-y-3">
        <div class="flex items-center gap-2 font-black text-sm md:text-base">
          <i data-lucide="${correct ? 'check-circle-2' : 'alert-circle'}" class="w-5 h-5 ${correct ? 'text-emerald-400' : 'text-rose-400'}"></i>
          <span>${correct ? "Parabéns, você acertou!" : "Quase lá!"}</span>
        </div>
        <p class="text-xs md:text-sm leading-relaxed">
          Gabarito oficial: alternativa <b class="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">${q.respostaCorreta}</b>.
        </p>
        ${q.resolucaoComentada ? `
          <div class="p-3.5 rounded-xl bg-dark-950/90 border border-slate-700/80 text-xs md:text-sm text-slate-200 shadow-sm space-y-1.5">
            <div class="flex items-center gap-1.5 font-bold text-brand-300 uppercase tracking-wider text-[11px]">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Resolução Comentada & Análise Pedagógica</span>
            </div>
            <p class="leading-relaxed text-slate-300 whitespace-pre-line">${this.esc(q.resolucaoComentada)}</p>
            ${q.habilidadeBncc ? `<p class="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800"><b>Habilidade BNCC:</b> ${this.esc(q.habilidadeBncc)}</p>` : ''}
          </div>
        ` : ''}
        <p class="text-xs opacity-80 pt-1 border-t border-white/10 font-mono">
          Taxa histórica de acerto na rede: ${q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}%`} · Origem: ${this.esc(q.origem || 'Caderno Oficial')}
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

  renderLoginRequired(simuladoId, config) {
    document.getElementById("app-root").innerHTML = `
      <main class="min-h-screen hero-mesh text-slate-100 p-6 flex items-center justify-center">
        <section class="glass-card rounded-[2rem] p-7 md:p-9 max-w-xl w-full border border-slate-700 text-center">
          <div class="w-16 h-16 rounded-3xl bg-brand-600/20 text-brand-300 border border-brand-500/30 flex items-center justify-center mx-auto mb-5">
            <i data-lucide="shield-check" class="w-8 h-8"></i>
          </div>
          <p class="text-[11px] uppercase tracking-[0.22em] font-black text-brand-300">Acesso seguro obrigatório</p>
          <h1 class="text-2xl md:text-3xl font-black text-white mt-2">Entre com seu e-mail institucional</h1>
          <p class="text-slate-300 text-sm mt-3 leading-relaxed">Para a professora saber quem fez o simulado, a prova oficial só abre para aluno logado com e-mail <b>@aluno.educacao.sp.gov.br</b>.</p>
          <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#aluno" class="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow-blue transition-all">Entrar como aluno</a>
            <a href="#simulados" class="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-sm transition-all">Voltar aos simulados</a>
          </div>
        </section>
      </main>`;
    if (window.lucide) window.lucide.createIcons();
  },

  renderIdentityForm(config, student) {
    const savedName = this.esc(student.display_name || "");
    const savedRA = this.esc(student.studentRA || "");
    document.getElementById("app-root").innerHTML = `
      <main class="min-h-screen hero-mesh text-slate-100 p-6 flex items-center justify-center">
        <section class="glass-card rounded-[2rem] p-7 md:p-9 max-w-2xl w-full border border-slate-700">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <i data-lucide="id-card" class="w-7 h-7"></i>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-[0.22em] font-black text-emerald-300">Identificação do aluno</p>
              <h1 class="text-2xl md:text-3xl font-black text-white mt-1">Confirmar dados antes do simulado</h1>
              <p class="text-sm text-slate-400 mt-2">Esses dados serão gravados no resultado para a professora acompanhar quem realizou a atividade.</p>
            </div>
          </div>

          <form id="simulado-identity-form" class="space-y-4">
            <div class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4 text-xs text-slate-300">
              <b class="text-white block mb-1">${this.esc(config.titulo)}</b>
              E-mail institucional: <span class="font-mono text-brand-300">${this.esc(student.email)}</span>
            </div>
            <label class="block space-y-1.5">
              <span class="text-xs uppercase font-bold text-slate-400">Nome completo</span>
              <input id="simulado-student-name" class="w-full bg-dark-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none" value="${savedName}" maxlength="120" required />
            </label>
            <label class="block space-y-1.5">
              <span class="text-xs uppercase font-bold text-slate-400">RA</span>
              <input id="simulado-student-ra" class="w-full bg-dark-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none" value="${savedRA}" placeholder="Digite seu RA" maxlength="40" required />
            </label>
            <label class="flex gap-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 p-4 text-xs text-amber-100 leading-relaxed">
              <input type="checkbox" required class="mt-1 accent-amber-500" />
              <span>Confirmo que os dados estão corretos e que farei a atividade sem sair da aba.</span>
            </label>
            <p id="simulado-identity-error" class="text-rose-300 text-xs font-bold min-h-4"></p>
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" class="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-glow-emerald transition-all inline-flex items-center justify-center gap-2">
                <i data-lucide="play-circle" class="w-4 h-4"></i> Iniciar simulado seguro
              </button>
              <a href="#simulados" class="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-sm transition-all text-center">Voltar</a>
            </div>
          </form>
        </section>
      </main>`;

    document.getElementById("simulado-identity-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("simulado-student-name").value.trim();
      const ra = document.getElementById("simulado-student-ra").value.trim();
      const error = document.getElementById("simulado-identity-error");
      if (name.length < 2 || ra.length < 2) {
        error.textContent = "Informe nome completo e RA para iniciar.";
        return;
      }
      this.saveSimuladoIdentity(config.id, student, name, ra);
      this.state.startedAt = null;
      this.renderProva(config.id);
    });
    if (window.lucide) window.lucide.createIcons();
  },

  async renderProva(simuladoId) {
    const config = window.SimuladosData.getConfig(simuladoId);
    if (!config) return this.renderCatalogo();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) return this.renderLoginRequired(simuladoId, config);

    this.state.simuladoId = simuladoId;
    const identity = this.getSimuladoIdentity(simuladoId);
    if (!identity || identity.studentEmail !== student.email) return this.renderIdentityForm(config, student);

    const questoes = window.SimuladosData.getQuestoesPorSimulado(simuladoId);
    if (!this.state.startedAt || this.currentSimuladoId !== simuladoId) this.startSession(config);

    if (this.state.currentIndex < 0) this.state.currentIndex = 0;
    if (this.state.currentIndex >= questoes.length) this.state.currentIndex = questoes.length - 1;

    const q = questoes[this.state.currentIndex] || questoes[0];
    const answeredCount = Object.keys(this.state.answers).length;
    const allAnswered = answeredCount === questoes.length;
    const progressPct = Math.round((answeredCount / questoes.length) * 100);

    // Tempo mínimo obrigatório antes de enviar a prova oficial
    const minSecondsRequired = this.state.MIN_EXAM_MINUTES * 60;
    const elapsedSeconds = this.state.startedAt
      ? Math.floor((Date.now() - new Date(this.state.startedAt).getTime()) / 1000)
      : 0;
    const hasMetMinTime = elapsedSeconds >= minSecondsRequired;
    const minTimeRemaining = Math.max(0, minSecondsRequired - elapsedSeconds);
    const canSubmit = allAnswered && hasMetMinTime;

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
                <p class="text-[10px] text-emerald-300 font-mono mt-0.5">${this.esc(identity.studentName)} · RA ${this.esc(identity.studentRA)}</p>
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
              ${!hasMetMinTime
                ? `<span class="text-[10px] text-amber-300 font-mono bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/25" title="Tempo mínimo de ${this.state.MIN_EXAM_MINUTES} min">Min ${this.formatTime(minTimeRemaining)}</span>`
                : ""}
              <button id="finish-simulado" class="px-4 py-2 rounded-xl ${canSubmit ? "bg-emerald-600 hover:bg-emerald-500 shadow-glow-emerald" : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"} text-white text-xs font-black transition-all" ${canSubmit ? "" : "disabled"} title="${canSubmit ? "Enviar prova" : (!hasMetMinTime ? `Aguardando tempo mínimo de ${this.state.MIN_EXAM_MINUTES} min` : "Responda todas as questões para enviar")}">
                ${canSubmit ? "Finalizar Prova" : (!hasMetMinTime ? `Aguardar ${this.formatTime(minTimeRemaining)}` : `Faltam ${questoes.length - answeredCount}`)}
              </button>
            </div>
          </div>

          <!-- Barra de Progresso Superior -->
          <div class="max-w-7xl mx-auto mt-2.5">
            <div class="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-brand-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPct}%;"></div>
            </div>
            ${!hasMetMinTime ? `<div class="mt-2 text-[11px] text-amber-300 font-mono flex items-center gap-1.5"><i data-lucide="lock" class="w-3.5 h-3.5"></i> O botão de envio será liberado após ${this.formatTime(minTimeRemaining)} (${this.state.MIN_EXAM_MINUTES} min de prova).</div>` : ""}
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
              ${allAnswered ? `<span class="ml-2 text-emerald-300">Pronto para enviar</span>` : `<span class="ml-2 text-amber-300">faltam ${questoes.length - answeredCount}</span>`}
            </div>
          </div>
        </div>

        <!-- Seção Principal com Questão Oficial em Imagem/Texto + Card de Resolução e Cartão-Resposta -->
        <section class="max-w-7xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 flex-1 w-full items-start">

          <!-- Coluna da Esquerda: Enunciado Oficial da Questão (Texto Formatado ou Caderno Original) -->
          ${this.renderQuestionLeftContent(q, "prova")}

          <!-- Coluna da Direita: Card de Resposta e Cartão-Resposta Digital -->

          <!-- Coluna da Direita: Card de Resposta e Cartão-Resposta Digital -->
          <div class="space-y-4">

            <!-- Card da Questão Ativa -->
            <article class="glass-card rounded-3xl border border-white/10 p-5 md:p-6 shadow-2xl">
              <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <p class="text-[11px] font-black text-brand-300 tracking-widest uppercase">
                    Questão ${q.numero} de ${questoes.length} · ${this.esc(q.componente)}
                  </p>
                  <h2 class="text-base md:text-lg font-black text-white mt-1 leading-snug">${this.esc(q.assunto)}</h2>
                </div>
                <span class="px-3 py-1 rounded-xl border text-xs font-bold ${this.dificuldadeClass(q.dificuldade)}">
                  ${q.dificuldade}
                </span>
              </div>

              <!-- Informações do Edital e Descritores -->
              <div class="rounded-2xl border border-slate-800 bg-dark-950/80 p-3.5 text-xs mt-4">
                <p class="text-slate-300 mb-1"><b class="text-slate-400">Edital:</b> ${this.esc(q.conteudoEdital)}</p>
                <p class="text-slate-400"><b class="text-slate-400">Descritor BNCC:</b> ${this.esc(q.descritor)}</p>
              </div>

              <!-- Botões de Alternativa (A, B, C, D, E) -->
              <div class="mt-5">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Marque sua Alternativa:
                </label>
                <div class="grid grid-cols-5 gap-2.5">
                  ${["A", "B", "C", "D", "E"].map(opt => {
                    const isSelected = this.state.answers[q.id] === opt;
                    return `
                      <button
                        type="button"
                        data-answer="${opt}"
                        class="rounded-2xl border ${isSelected ? "border-brand-400 bg-brand-600 text-white shadow-glow-blue scale-105" : "border-slate-700 bg-dark-950/70 text-slate-200 hover:border-brand-400 hover:bg-dark-900"} p-3.5 font-black text-xl transition-all duration-150 flex flex-col items-center justify-center gap-1 cursor-pointer select-none"
                      >
                        <span>${opt}</span>
                        <span class="text-[9px] font-mono font-normal tracking-wider ${isSelected ? 'opacity-100 text-white font-bold' : 'opacity-40 text-slate-400'}">
                          ${isSelected ? "✓ Marcada" : "Opção " + opt}
                        </span>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- Botões de Navegação Inferior na Questão -->
              <div class="mt-6 pt-4 border-t border-slate-800 flex justify-between gap-3">
                <button
                  id="sim-prev"
                  class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs md:text-sm font-bold inline-flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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

            <!-- Cartão-Resposta Digital Geral -->
            <div class="glass-card rounded-3xl border border-white/10 p-4.5 shadow-xl">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[11px] uppercase tracking-wider font-black text-slate-400">Cartão-resposta digital</p>
                <span class="text-xs font-mono font-bold text-brand-300 bg-brand-950 px-2.5 py-0.5 rounded-md border border-brand-500/30">${answeredCount}/${questoes.length} respondidas</span>
              </div>
              <div class="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                ${questoes.map((item, idx) => `
                  <button
                    type="button"
                    data-jump="${idx}"
                    class="h-8 rounded-xl text-xs font-mono font-black border transition-all ${idx === this.state.currentIndex ? "bg-brand-600 border-brand-400 text-white shadow-glow-blue scale-105" : this.state.answers[item.id] ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-dark-950 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"}"
                    title="Q${String(item.numero).padStart(2, '0')}: ${this.state.answers[item.id] ? 'Marcada ' + this.state.answers[item.id] : 'Pendente'}"
                  >
                    ${item.numero}
                  </button>
                `).join("")}
              </div>

              <!-- Modo Seguro Status -->
              <div class="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
                <span class="text-[11px] text-slate-300">Ambiente Seguro Blindado: Prova sem troca de abas.</span>
              </div>
            </div>
          </div>
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
    // Zoom Toggle na Prova
    let isZoomedProva = false;
    document.getElementById("btn-zoom-prova-toggle")?.addEventListener("click", () => {
      isZoomedProva = !isZoomedProva;
      const imgEl = document.getElementById("prova-img-el");
      const containerEl = document.getElementById("prova-img-container");
      const btn = document.getElementById("btn-zoom-prova-toggle");
      if (imgEl && containerEl && btn) {
        if (isZoomedProva) {
          imgEl.style.transform = "scale(1.4)";
          imgEl.style.transformOrigin = "top center";
          containerEl.classList.remove("max-h-[75vh]");
          containerEl.classList.add("max-h-[88vh]");
          btn.innerHTML = `<i data-lucide="zoom-out" class="w-3.5 h-3.5"></i> <span>Reduzir</span>`;
        } else {
          imgEl.style.transform = "scale(1)";
          containerEl.classList.remove("max-h-[88vh]");
          containerEl.classList.add("max-h-[75vh]");
          btn.innerHTML = `<i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> <span>Ampliar</span>`;
        }
        if (window.lucide) window.lucide.createIcons();
      }
    });

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

    const finishBtn = document.getElementById("finish-simulado");
    if (finishBtn) finishBtn.onclick = () => this.finishSimulado();

    const secureToggle = document.getElementById("secure-toggle");
    if (secureToggle) secureToggle.onchange = (event) => this.toggleSecurity(event.target.checked, config);
  },

  toggleSecurity(enabled, config) {
    this.state.secureMode = enabled;
    if (!enabled) return this.destroySecurity();
    if (!window.securityEngine) return;
    const identity = this.getSimuladoIdentity(config.id) || {};
    window.securityEngine.init(
      { nome: identity.studentName || "Estudante", ra: identity.studentRA || "SIMULADO", email: identity.studentEmail || "simulado@local" },
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
    const identity = this.getSimuladoIdentity(config.id);
    if (!identity) {
      alert("Confirme seu nome e RA antes de finalizar o simulado.");
      this.state.startedAt = null;
      return this.renderProva(config.id);
    }
    const questoes = window.SimuladosData.getQuestoesPorSimulado(config.id);
    const missingQuestions = questoes
      .filter(q => !this.state.answers[q.id])
      .map(q => q.numero);
    if (missingQuestions.length > 0) {
      alert(`Responda todas as questões antes de enviar. Faltam: ${missingQuestions.map(n => `Q${String(n).padStart(2, "0")}`).join(", ")}`);
      const firstMissing = questoes.findIndex(q => !this.state.answers[q.id]);
      if (firstMissing >= 0) this.state.currentIndex = firstMissing;
      return this.renderProva(config.id);
    }
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
      studentName: identity.studentName,
      studentRA: identity.studentRA,
      studentEmail: identity.studentEmail,
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
          <p class="text-xs text-emerald-300 mt-2 font-mono">${this.esc(identity.studentName)} · RA ${this.esc(identity.studentRA)} · ${this.esc(identity.studentEmail)}</p>
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
        questoes: questoes.map(q => {
          let alts = [];
          if (Array.isArray(q.alternativas)) {
            alts = q.alternativas.map(a => ({ ...a, correta: a.id === q.respostaCorreta }));
          } else if (q.alternativas && typeof q.alternativas === 'object') {
            alts = Object.entries(q.alternativas).map(([letra, texto]) => ({
              id: letra,
              texto: typeof texto === 'string' ? texto : `Alternativa ${letra}`,
              correta: letra === q.respostaCorreta
            }));
          } else {
            alts = ['A', 'B', 'C', 'D', 'E'].map(letra => ({
              id: letra,
              texto: `Alternativa ${letra}`,
              correta: letra === q.respostaCorreta
            }));
          }
          return {
            id: q.id,
            tipo: "multipla_escolha",
            enunciado: q.enunciado || `Questão ${q.numero} do ${config.titulo}. Consulte o caderno oficial para ler o enunciado completo. Assunto: ${q.assunto}`,
            textoApoio: q.textoApoio || `PDF oficial: ${config.pdfUrl || ''}\nComponente: ${q.componente}\nConteúdo do edital: ${q.conteudoEdital || ''}\nDescritor: ${q.descritor || ''}`,
            habilidadeBNCC: q.descritor || q.habilidadeBncc || "",
            peso: 1,
            correta: q.respostaCorreta,
            justificativa: q.resolucaoComentada || `Gabarito oficial: alternativa ${q.respostaCorreta}. Taxa histórica de acerto: ${q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}%`}.`,
            alternativas: alts
          };
        })
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
