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
          <section class="glass-card rounded-3xl p-8 max-w-xl text-center">
            <h1 class="text-2xl font-black text-white">Dados dos simulados não carregados</h1>
            <p class="text-slate-300 mt-3">Recarregue a página para tentar novamente.</p>
            <a href="#" class="inline-flex mt-6 px-5 py-3 rounded-2xl bg-brand-600 text-white font-bold">Voltar ao início</a>
          </section>
        </main>`;
      return;
    }

    const parts = window.location.hash.replace(/^#\/?/, "").split("/");
    if (parts[1] === "prova" && parts[2]) return this.renderProva(parts[2]);
    if (parts[1] === "treino") return this.renderTreino();
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
      <main class="min-h-screen hero-mesh text-slate-100 selection:bg-brand-600 selection:text-white">
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

        <section class="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div class="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-center">
            <div>
              <p class="eyebrow"><span></span>PROVÃO PAULISTA 2026</p>
              <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mt-4">Simulados oficiais<br><em class="text-brand-300 not-italic">com gabarito e análise.</em></h1>
              <p class="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">Treine com cadernos completos da 1ª e 2ª série do Ensino Médio, organizados por disciplina, descritor, conteúdo do edital e taxa histórica de acerto.</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                ${this.statCard(stats.total, "questões", "book-open-check")}
                ${this.statCard("4", "cadernos", "files")}
                ${this.statCard("2", "séries EM", "graduation-cap")}
                ${this.statCard("A-E", "gabarito", "badge-check")}
              </div>
            </div>
            <div class="glass-card rounded-[2rem] border border-white/10 p-5 md:p-6 shadow-card-hover">
              <div class="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p class="text-[11px] font-black tracking-[0.2em] text-brand-300 uppercase">Escolha um caderno</p>
                  <h2 class="text-2xl font-black text-white mt-1">Modo simulado</h2>
                </div>
                <i data-lucide="timer" class="w-8 h-8 text-brand-300"></i>
              </div>
              <div class="grid gap-3">
                ${configs.map(config => this.simuladoCard(config)).join("")}
              </div>
            </div>
          </div>

          <section class="mt-10 glass-card rounded-[2rem] border border-white/10 p-5 md:p-6">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
              <div>
                <p class="text-[11px] font-black tracking-[0.2em] text-emerald-300 uppercase">Treino por filtro</p>
                <h2 class="text-2xl font-black text-white mt-1">Banco de questões catalogado</h2>
                <p class="text-sm text-slate-400 mt-1">${questoes.length} questão(ões) encontradas.</p>
              </div>
              <a href="#simulados/treino" class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold shadow-glow-emerald">
                <i data-lucide="play-circle" class="w-4 h-4"></i> Treinar com esses filtros
              </a>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
              <label class="space-y-1"><span class="text-[11px] uppercase font-bold text-slate-400">Série</span><select id="sim-filter-serie" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm"><option value="1serie">1ª Série</option><option value="2serie">2ª Série</option></select></label>
              <label class="space-y-1"><span class="text-[11px] uppercase font-bold text-slate-400">Dia</span><select id="sim-filter-dia" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm"><option value="1">Dia 1</option><option value="2">Dia 2</option></select></label>
              <label class="space-y-1"><span class="text-[11px] uppercase font-bold text-slate-400">Componente</span><select id="sim-filter-componente" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm"><option value="todos">Todos</option>${componentes.map(c => `<option value="${this.esc(c)}">${this.esc(c)}</option>`).join("")}</select></label>
              <label class="space-y-1"><span class="text-[11px] uppercase font-bold text-slate-400">Dificuldade</span><select id="sim-filter-dificuldade" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm"><option value="todas">Todas</option><option>Fácil</option><option>Média</option><option>Desafio</option><option>Referência</option></select></label>
              <label class="space-y-1"><span class="text-[11px] uppercase font-bold text-slate-400">Buscar</span><input id="sim-filter-busca" class="w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm" placeholder="assunto, descritor..." value="${this.esc(this.state.busca)}"></label>
            </div>

            <div class="grid lg:grid-cols-2 gap-3 max-h-[34rem] overflow-auto pr-1">
              ${questoes.slice(0, 80).map(q => this.questionPreview(q)).join("")}
            </div>
            ${questoes.length > 80 ? `<p class="text-xs text-slate-400 mt-4">Mostrando 80 primeiras questões. Refine os filtros para ver um conjunto menor.</p>` : ""}
          </section>

          <section class="mt-10 grid md:grid-cols-5 gap-4">
            ${configs.map(config => this.downloadCard(config)).join("")}
            <article class="glass-card rounded-3xl border border-amber-500/20 p-5 flex flex-col gap-4">
              <div class="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center"><i data-lucide="key-round"></i></div>
              <div><h3 class="font-black text-white">Gabarito oficial</h3><p class="text-xs text-slate-400 mt-1">PDF consolidado com as respostas dos 4 cadernos.</p></div>
              <a href="assets/simulados/Gabarito_Simulado_Provao_2026.pdf" target="_blank" class="mt-auto px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/25 text-xs font-bold text-center">Abrir gabarito</a>
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
    return `<article class="rounded-2xl border border-slate-700 bg-dark-950/65 p-4 hover:border-brand-500/50 transition-all">
      <div class="flex items-start justify-between gap-3">
        <div><h3 class="font-black text-white">${this.esc(config.serie)} · Dia ${config.dia}</h3><p class="text-xs text-slate-400 mt-1 leading-relaxed">${this.esc(config.descricao)}</p></div>
        <span class="px-2 py-1 rounded-lg bg-brand-500/10 text-brand-200 text-[11px] font-black border border-brand-500/20">${config.totalQuestoes}Q</span>
      </div>
      <div class="flex flex-wrap gap-2 mt-4">
        <a href="#simulados/prova/${config.id}" class="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold">Iniciar completo</a>
        <a href="${config.pdfUrl}" target="_blank" class="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10">Abrir PDF</a>
        <button type="button" data-import-simulado="${config.id}" class="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-500/20">Importar</button>
      </div>
    </article>`;
  },

  downloadCard(config) {
    return `<article class="glass-card rounded-3xl border border-white/10 p-5 flex flex-col gap-4">
      <div class="w-11 h-11 rounded-2xl bg-brand-500/15 text-brand-300 flex items-center justify-center"><i data-lucide="file-text"></i></div>
      <div><h3 class="font-black text-white">${this.esc(config.serie)} · Dia ${config.dia}</h3><p class="text-xs text-slate-400 mt-1">${config.totalQuestoes} questões · ${config.componentes.length} componentes.</p></div>
      <a href="${config.pdfUrl}" target="_blank" class="mt-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold text-center">Abrir / baixar PDF</a>
    </article>`;
  },

  questionPreview(q) {
    const taxa = q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}% acerto`;
    return `<article class="rounded-2xl border border-slate-800 bg-dark-950/65 p-4">
      <div class="flex items-start justify-between gap-3"><div><p class="text-[11px] font-black tracking-wider text-brand-300 uppercase">Q${String(q.numero).padStart(2, "0")} · ${this.esc(q.componente)}</p><h3 class="font-black text-white mt-1 leading-snug">${this.esc(q.assunto)}</h3></div><span class="px-2 py-1 rounded-lg border text-[11px] font-bold ${this.dificuldadeClass(q.dificuldade)}">${q.dificuldade}</span></div>
      <p class="text-xs text-slate-400 mt-3 leading-relaxed"><b>Edital:</b> ${this.esc(q.conteudoEdital)}</p>
      <p class="text-xs text-slate-500 mt-2"><b>Descritor:</b> ${this.esc(q.descritor)}</p>
      <div class="flex flex-wrap items-center gap-2 mt-4 text-[11px]"><span class="px-2 py-1 rounded-lg bg-slate-800 text-slate-300">${taxa}</span><span class="px-2 py-1 rounded-lg bg-slate-800 text-slate-300">Gabarito ${q.respostaCorreta}</span><a href="${q.pdfUrl}" target="_blank" class="px-2 py-1 rounded-lg bg-brand-500/10 text-brand-200 border border-brand-500/20">Ver no PDF</a></div>
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
      this.renderCatalogo();
    };
    ["sim-filter-serie", "sim-filter-dia", "sim-filter-componente", "sim-filter-dificuldade"].forEach(id => document.getElementById(id)?.addEventListener("change", update));
    document.getElementById("sim-filter-busca")?.addEventListener("input", () => {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(update, 250);
    });
    document.querySelectorAll("[data-import-simulado]").forEach(btn => btn.onclick = () => this.importarSimulado(btn.dataset.importSimulado));
  },

  renderTreino() {
    const questoes = this.getFilteredQuestions();
    const q = questoes[this.state.currentIndex] || questoes[0];
    const root = document.getElementById("app-root");
    if (!q) return this.renderCatalogo();
    root.innerHTML = `
      <main class="min-h-screen hero-mesh text-slate-100 p-4 md:p-8">
        <section class="max-w-5xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6"><a href="#simulados" class="text-sm text-slate-300 hover:text-white inline-flex items-center gap-2"><i data-lucide="arrow-left"></i> Voltar aos filtros</a><div class="flex items-center gap-2">${this.cloudBadge()}<span class="text-xs font-bold text-slate-400">Questão ${this.state.currentIndex + 1} de ${questoes.length}</span></div></div>
          <article class="glass-card rounded-[2rem] border border-white/10 p-5 md:p-8">
            <div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-[11px] font-black tracking-[0.2em] text-emerald-300 uppercase">Treino imediato</p><h1 class="text-3xl font-black text-white mt-2">Q${String(q.numero).padStart(2, "0")} · ${this.esc(q.componente)}</h1></div><span class="px-3 py-1 rounded-full border text-xs font-bold ${this.dificuldadeClass(q.dificuldade)}">${q.dificuldade}</span></div>
            <div class="mt-6 rounded-3xl border border-slate-800 bg-dark-950/70 p-5">
              <h2 class="text-xl font-black text-white">${this.esc(q.assunto)}</h2>
              <p class="text-slate-300 text-sm leading-relaxed mt-3"><b>Conteúdo do edital:</b> ${this.esc(q.conteudoEdital)}</p>
              <p class="text-slate-400 text-sm leading-relaxed mt-2"><b>Descritor:</b> ${this.esc(q.descritor)}</p>
              <p class="text-slate-500 text-xs mt-4">Consulte o enunciado completo e possíveis imagens no PDF oficial do caderno.</p>
              <a href="${q.pdfUrl}" target="_blank" class="inline-flex mt-4 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"><i data-lucide="external-link" class="w-4 h-4 mr-2"></i>Abrir caderno oficial</a>
            </div>
            <div class="grid sm:grid-cols-5 gap-3 mt-6">
              ${["A", "B", "C", "D", "E"].map(opt => `<button type="button" data-treino-answer="${opt}" class="rounded-2xl border border-slate-700 bg-dark-950/70 hover:border-brand-400 px-4 py-4 font-black text-lg text-white">${opt}</button>`).join("")}
            </div>
            <div id="treino-feedback" class="mt-5"></div>
            <div class="flex justify-between gap-3 mt-6"><button id="treino-prev" class="px-4 py-2 rounded-xl bg-white/5 text-slate-200 border border-white/10 text-sm font-bold">Anterior</button><button id="treino-next" class="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-bold">Próxima</button></div>
          </article>
        </section>
      </main>`;

    document.querySelectorAll("[data-treino-answer]").forEach(btn => btn.onclick = () => this.answerTreino(q, btn.dataset.treinoAnswer));
    document.getElementById("treino-prev").onclick = () => { this.state.currentIndex = Math.max(0, this.state.currentIndex - 1); this.renderTreino(); };
    document.getElementById("treino-next").onclick = () => { this.state.currentIndex = Math.min(questoes.length - 1, this.state.currentIndex + 1); this.renderTreino(); };
    if (window.lucide) window.lucide.createIcons();
  },

  answerTreino(q, option) {
    const correct = option === q.respostaCorreta;
    const stats = this.savePracticeStat(q, correct, option);
    const box = document.getElementById("treino-feedback");
    box.innerHTML = `<div class="rounded-2xl border ${correct ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-rose-500/30 bg-rose-500/10 text-rose-100"} p-4"><b>${correct ? "Acertou!" : "Quase."}</b> Gabarito oficial: alternativa <b>${q.respostaCorreta}</b>.<p class="text-xs mt-2 opacity-80">Taxa histórica: ${q.taxaAcerto == null ? "sem dado" : `${q.taxaAcerto}%`}. Origem: ${this.esc(q.origem)}</p></div>`;
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

  renderProva(simuladoId) {
    const config = window.SimuladosData.getConfig(simuladoId);
    if (!config) return this.renderCatalogo();
    this.state.simuladoId = simuladoId;
    const questoes = window.SimuladosData.getQuestoesPorSimulado(simuladoId);
    if (!this.state.startedAt || this.currentSimuladoId !== simuladoId) this.startSession(config);
    const q = questoes[this.state.currentIndex] || questoes[0];
    const answered = Object.keys(this.state.answers).length;

    document.getElementById("app-root").innerHTML = `
      <main class="min-h-screen bg-slate-950 text-slate-100">
        <header class="glass-nav sticky top-0 z-50 px-4 py-3">
          <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div><a href="#simulados" class="text-xs text-slate-400 hover:text-white">← Sair</a><h1 class="font-black text-white text-sm md:text-base">${this.esc(config.titulo)}</h1></div>
            <div class="flex items-center gap-3">${this.cloudBadge()}<span id="sim-timer" class="px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 font-mono font-black text-brand-200">${this.formatTime(this.state.remainingSeconds)}</span><span class="text-xs text-slate-400">${answered}/${questoes.length}</span><button id="finish-simulado" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black">Finalizar</button></div>
          </div>
        </header>
        <section class="max-w-7xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_19rem] gap-5">
          <article class="glass-card rounded-3xl border border-white/10 overflow-hidden">
            <div class="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3"><div><p class="text-[11px] font-black text-brand-300 tracking-widest uppercase">Questão ${q.numero} · ${this.esc(q.componente)}</p><h2 class="text-xl font-black text-white mt-1">${this.esc(q.assunto)}</h2></div><a href="${config.pdfUrl}" target="_blank" class="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold">Abrir PDF</a></div>
            <div class="grid xl:grid-cols-[1fr_.85fr] gap-0">
              <div class="p-5 space-y-4">
                <div class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4"><p class="text-sm text-slate-300"><b>Use o PDF oficial para ler o enunciado completo.</b> Esta tela funciona como cartão-resposta digital e painel de análise pedagógica.</p><p class="text-xs text-slate-500 mt-3"><b>Edital:</b> ${this.esc(q.conteudoEdital)}</p><p class="text-xs text-slate-500 mt-2"><b>Descritor:</b> ${this.esc(q.descritor)}</p></div>
                <div class="grid sm:grid-cols-5 gap-3">${["A", "B", "C", "D", "E"].map(opt => `<button type="button" data-answer="${opt}" class="rounded-2xl border ${this.state.answers[q.id] === opt ? "border-brand-400 bg-brand-600 text-white" : "border-slate-700 bg-dark-950/70 text-slate-200 hover:border-brand-400"} px-4 py-5 font-black text-xl">${opt}</button>`).join("")}</div>
                <div class="flex justify-between gap-3"><button id="sim-prev" class="px-4 py-2 rounded-xl bg-white/5 text-slate-200 border border-white/10 text-sm font-bold">Anterior</button><button id="sim-next" class="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-bold">Próxima</button></div>
              </div>
              <div class="bg-dark-950/80 border-t xl:border-t-0 xl:border-l border-slate-800 min-h-[35rem]"><iframe src="${config.pdfUrl}#page=1" class="w-full h-[35rem]" title="PDF oficial do simulado"></iframe></div>
            </div>
          </article>
          <aside class="glass-card rounded-3xl border border-white/10 p-4 h-fit sticky top-24"><p class="text-[11px] uppercase tracking-wider font-black text-slate-400 mb-3">Cartão-resposta</p><div class="grid grid-cols-6 gap-2">${questoes.map((item, idx) => `<button type="button" data-jump="${idx}" class="h-9 rounded-xl text-xs font-black border ${idx === this.state.currentIndex ? "bg-brand-600 border-brand-400 text-white" : this.state.answers[item.id] ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200" : "bg-dark-950 border-slate-700 text-slate-400"}">${item.numero}</button>`).join("")}</div><label class="mt-5 flex items-start gap-3 rounded-2xl border border-slate-800 bg-dark-950/70 p-3 text-xs text-slate-300"><input id="secure-toggle" type="checkbox" ${this.state.secureMode ? "checked" : ""} class="mt-1 accent-blue-500"><span><b class="text-white block">Modo seguro</b>Bloqueia cópia, botão direito e registra troca de aba.</span></label></aside>
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
    document.querySelectorAll("[data-jump]").forEach(btn => btn.onclick = () => { this.state.currentIndex = Number(btn.dataset.jump); this.renderProva(config.id); });
    document.getElementById("sim-prev").onclick = () => { this.state.currentIndex = Math.max(0, this.state.currentIndex - 1); this.renderProva(config.id); };
    document.getElementById("sim-next").onclick = () => { this.state.currentIndex = Math.min(questoes.length - 1, this.state.currentIndex + 1); this.renderProva(config.id); };
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
    document.getElementById("app-root").innerHTML = `<main class="min-h-screen hero-mesh text-slate-100 p-4 md:p-8"><section class="max-w-4xl mx-auto glass-card rounded-[2rem] border border-white/10 p-6 md:p-8"><div class="flex flex-wrap items-center justify-between gap-3"><p class="text-[11px] font-black tracking-[0.2em] text-emerald-300 uppercase">Resultado do simulado</p>${this.cloudBadge()}</div><h1 class="text-4xl font-black text-white mt-3">${percent}% de aproveitamento</h1><p class="text-slate-300 mt-2">Você acertou <b>${acertos}</b> de <b>${questoes.length}</b> questões.</p><p id="cloud-result-note" class="text-xs text-slate-400 mt-3">Salvando resultado...</p><div class="grid md:grid-cols-2 gap-3 mt-6">${Object.entries(porComponente).map(([comp, row]) => `<div class="rounded-2xl border border-slate-800 bg-dark-950/70 p-4"><b class="text-white">${this.esc(comp)}</b><p class="text-sm text-slate-400 mt-1">${row.acertos}/${row.total} acertos · ${Math.round((row.acertos / row.total) * 100)}%</p></div>`).join("")}</div><div class="flex flex-wrap gap-3 mt-8"><a href="#simulados" class="px-5 py-3 rounded-2xl bg-brand-600 text-white font-bold">Voltar aos simulados</a><button id="review-simulado" class="px-5 py-3 rounded-2xl bg-white/5 text-slate-200 border border-white/10 font-bold">Refazer</button></div></section></main>`;
    this.setCloudStatus("syncing", "Salvando resultado na nuvem...");
    DB.salvarResultadoSimulado(resultado)
      .then(() => { this.setCloudStatus("synced", "Resultado salvo na nuvem."); const note = document.getElementById("cloud-result-note"); if (note) note.textContent = "Resultado salvo na nuvem."; })
      .catch((err) => { this.setCloudStatus("local", err.message || "Resultado salvo neste dispositivo."); const note = document.getElementById("cloud-result-note"); if (note) note.textContent = err.message || "Resultado salvo neste dispositivo."; });
    document.getElementById("review-simulado").onclick = () => { localStorage.removeItem(`simulado_answers_${config.id}`); this.state.startedAt = null; window.location.hash = `#simulados/prova/${config.id}`; this.renderProva(config.id); };
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
