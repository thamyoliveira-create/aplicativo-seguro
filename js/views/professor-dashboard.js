/**
 * View: Painel de Controle da Professora (Dashboard)
 * Design: SaaS Pro / GovTech Educational Standard
 */

const ProfessorDashboardView = {
  async render() {
    const root = document.getElementById("app-root");

    const profNome = sessionStorage.getItem("professor_nome") || localStorage.getItem("professor_nome") || "Professor(a)";
    const profEscola = sessionStorage.getItem("professor_escola") || localStorage.getItem("professor_escola") || "Unidade Escolar";
    const profEmail = sessionStorage.getItem("professor_email") || localStorage.getItem("professor_email") || "";
    
    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
        
        <!-- Topo da Professora -->
        <header class="glass-nav sticky top-0 z-50 py-3.5 px-4 md:px-8">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center border border-white/10 shadow-glow-blue">
                <i data-lucide="shield-check" class="w-5 h-5 text-yellow-400"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="font-black text-base md:text-lg text-white tracking-tight">${profNome}</h1>
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Docente
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <i data-lucide="school" class="w-3.5 h-3.5 text-brand-400"></i>
                  <span>${profEscola}</span>
                  ${profEmail ? `<span class="text-slate-600">•</span><span>${profEmail}</span>` : ""}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <a href="#professor/configuracoes" class="px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all">
                <i data-lucide="settings" class="w-3.5 h-3.5 text-slate-400"></i>
                <span class="hidden sm:inline">Configurações & IA</span>
              </a>
              <a href="#professor/nova-atividade" class="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-glow-blue transition-all border border-white/10">
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i>
                <span>+ Criar com IA</span>
              </a>
              <button
                onclick="ProfessorDashboardView.encerrarSessao()"
                class="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white border border-rose-500/30 transition-colors"
                title="Sair do Painel"
              >
                <i data-lucide="log-out" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </header>

        <!-- Conteúdo Principal -->
        <main class="max-w-6xl mx-auto w-full p-4 md:p-8 flex-1">
          <!-- Métricas Resumidas -->
          <div id="metrics-cards" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4 feature-card">
              <div class="w-12 h-12 rounded-xl bg-brand-950/80 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold flex-shrink-0">
                <i data-lucide="file-text" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-black text-white" id="stat-atividades">0</div>
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Atividades Ativas</div>
              </div>
            </div>

            <div class="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4 feature-card">
              <div class="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold flex-shrink-0">
                <i data-lucide="users" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-black text-white" id="stat-submissoes">0</div>
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Provas Entregues</div>
              </div>
            </div>

            <div class="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4 feature-card">
              <div class="w-12 h-12 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold flex-shrink-0">
                <i data-lucide="shield-alert" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-black text-white" id="stat-infracoes">0</div>
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Trocas de Aba</div>
              </div>
            </div>

            <div class="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4 feature-card">
              <div class="w-12 h-12 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold flex-shrink-0">
                <i data-lucide="sparkles" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-black text-white">Gemini 3.7</div>
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">IA Pedagógica</div>
              </div>
            </div>
          </div>

          <!-- Caixa de Upload Direto para Criar Atividade -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/40 shadow-2xl mb-8 space-y-4 relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-950 to-blue-950/20">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-glow-blue border border-white/10 flex-shrink-0">
                  <i data-lucide="file-up" class="w-6 h-6 text-cyan-300"></i>
                </div>
                <div>
                  <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>Criar Atividade Direto de um Arquivo</span>
                    <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">IA Gemini 3.7</span>
                  </h2>
                  <p class="text-xs text-slate-400">Arraste seu Word (.docx), PDF, Excel (.xlsx) ou PowerPoint (.pptx) para transformar direto em avaliação pronta</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md bg-red-950/70 border border-red-500/30 text-red-300 text-[10px] font-bold font-mono">PDF</span>
                <span class="px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-500/30 text-blue-300 text-[10px] font-bold font-mono">Word .docx</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono">Excel .xlsx</span>
                <span class="px-2 py-0.5 rounded-md bg-orange-950/70 border border-orange-500/30 text-orange-300 text-[10px] font-bold font-mono">PPTX</span>
              </div>
            </div>

            <fieldset class="mb-4 grid sm:grid-cols-2 gap-3" aria-label="Como usar o arquivo">
              <label class="cursor-pointer rounded-2xl border border-slate-700 bg-dark-950/70 p-4 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-950/40">
                <span class="flex gap-3"><input type="radio" name="dash-file-mode" value="importar" checked class="mt-1 accent-blue-500"><span><strong class="block text-sm text-white">Manter como está</strong><small class="block mt-1 text-slate-400 leading-relaxed">Importa as questões do arquivo sem mudar o tipo. Subitens “a, b, c” continuam sendo partes da mesma questão.</small></span></span>
              </label>
              <label class="cursor-pointer rounded-2xl border border-slate-700 bg-dark-950/70 p-4 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-950/30">
                <span class="flex gap-3"><input type="radio" name="dash-file-mode" value="gerar" class="mt-1 accent-emerald-500"><span><strong class="block text-sm text-white">Criar uma prova nova</strong><small class="block mt-1 text-slate-400 leading-relaxed">Usa o assunto como base e gera 4 questões objetivas + 2 dissertativas contextualizadas.</small></span></span>
              </label>
            </fieldset>

            <!-- Área Aberta de Drag & Drop -->
            <div
              id="dash-upload-dropzone"
              class="relative overflow-hidden border-2 border-dashed border-slate-700 hover:border-brand-500 bg-dark-950/60 hover:bg-dark-900/90 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all space-y-3"
            >
              <input
                type="file"
                id="dash-file-input"
                accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.txt,.csv"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                title="Clique ou arraste um arquivo para criar a avaliação"
              />
              <div class="w-12 h-12 rounded-2xl bg-brand-950 text-brand-400 border border-brand-500/30 flex items-center justify-center mx-auto shadow-glow-blue pointer-events-none">
                <i data-lucide="upload-cloud" class="w-6 h-6"></i>
              </div>
              <div class="pointer-events-none">
                <p class="text-sm font-bold text-white">Solte o arquivo aqui ou clique para selecionar</p>
                <p class="text-xs text-slate-400 mt-1">Word (.docx/.doc), PDF, Excel (.xlsx), PPTX ou Texto (.txt/.csv)</p>
              </div>
              <button
                type="button"
                id="dash-btn-pick-file"
                class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-blue transition-all inline-flex items-center gap-1.5 mt-1 pointer-events-none"
              >
                <i data-lucide="folder-open" class="w-4 h-4"></i>
                <span>Escolher Arquivo do Computador</span>
              </button>
            </div>

            <!-- Box de Processamento em Tempo Real -->
            <div id="dash-upload-status-box" class="hidden space-y-3 p-5 bg-dark-950 rounded-2xl border border-slate-800 text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span id="dash-format-badge" class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-brand-950 text-brand-300 border border-brand-500/30">DOCX</span>
                  <span id="dash-file-name" class="font-bold text-white truncate max-w-[220px] sm:max-w-md">arquivo.docx</span>
                  <span id="dash-file-size" class="text-slate-400 text-[11px] font-mono">(0 KB)</span>
                </div>
                <span id="dash-status-indicator" class="text-[11px] text-brand-300 font-semibold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                  Lendo documento...
                </span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div id="dash-progress-bar" class="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: 15%;"></div>
              </div>
              <p id="dash-status-detail" class="text-[11px] text-slate-400 font-mono text-center">Extraindo texto das páginas/slides no navegador...</p>
            </div>
          </div>

          <!-- Seção de Atividades Avaliativas -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-lg md:text-xl font-extrabold text-white flex items-center gap-2">
                <i data-lucide="layers" class="w-5 h-5 text-brand-400"></i>
                Suas Avaliações e Provas Blindadas
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Gerencie questões, códigos de acesso e relatórios de alunos</p>
            </div>
            <a href="#professor/nova-atividade" class="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
              <span>Nova Prova Manual</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>

          <!-- Lista de Atividades -->
          <div id="atividades-list" class="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-10">
            <div class="col-span-full py-12 text-center text-slate-500 text-sm">
              <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Carregando avaliações...
            </div>
          </div>

          <!-- Submissões Recentes e Ocorrências -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-base font-extrabold text-white flex items-center gap-2">
                  <i data-lucide="history" class="w-5 h-5 text-emerald-400"></i>
                  Entregas Recentes dos Estudantes
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Acompanhamento ao vivo de respostas e incidentes de aba</p>
              </div>
              <span class="text-[11px] text-slate-400 font-mono bg-dark-900 px-3 py-1 rounded-full border border-slate-800">
                Sincronização em Tempo Real
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th class="py-3 px-3">Estudante & RA</th>
                    <th class="py-3 px-3">Atividade</th>
                    <th class="py-3 px-3">Tempo Gasto</th>
                    <th class="py-3 px-3">Segurança / Abas</th>
                    <th class="py-3 px-3">Nota / Status</th>
                    <th class="py-3 px-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody id="submissoes-tbody" class="divide-y divide-slate-800/60">
                  <tr>
                    <td colspan="6" class="py-8 text-center text-slate-500">Nenhuma submissão registrada ainda.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Setup do Dropzone Direto no Dashboard
    const dashDropzone = document.getElementById("dash-upload-dropzone");
    const dashFileInput = document.getElementById("dash-file-input");
    const dashPickBtn = document.getElementById("dash-btn-pick-file");
    const dashStatusBox = document.getElementById("dash-upload-status-box");
    const dashFormatBadge = document.getElementById("dash-format-badge");
    const dashFileName = document.getElementById("dash-file-name");
    const dashFileSize = document.getElementById("dash-file-size");
    const dashStatusInd = document.getElementById("dash-status-indicator");
    const dashProgressBar = document.getElementById("dash-progress-bar");
    const dashStatusDetail = document.getElementById("dash-status-detail");

    if (dashFileInput) {
      dashFileInput.onchange = () => {
        if (dashFileInput.files && dashFileInput.files.length > 0) {
          processDashboardFile(dashFileInput.files[0]);
        }
      };
    }

    if (dashDropzone) {
      dashDropzone.ondragover = (e) => {
        e.preventDefault();
        dashDropzone.classList.add("border-brand-400", "bg-brand-950/40");
      };
      dashDropzone.ondragleave = () => {
        dashDropzone.classList.remove("border-brand-400", "bg-brand-950/40");
      };
      dashDropzone.ondrop = (e) => {
        e.preventDefault();
        dashDropzone.classList.remove("border-brand-400", "bg-brand-950/40");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          processDashboardFile(e.dataTransfer.files[0]);
        }
      };
    }

    async function processDashboardFile(file) {
      if (!window.FileExtractor) {
        alert("Módulo FileExtractor não encontrado. Recarregue a página.");
        return;
      }

      const format = window.FileExtractor.detectFormat(file.name);
      if (!format) {
        alert("Formato não suportado. Utilize Word (.docx/.doc), PDF (.pdf), Excel (.xlsx/.xls), PowerPoint (.pptx) ou Texto (.txt/.csv).");
        return;
      }

      dashDropzone.classList.add("hidden");
      dashStatusBox.classList.remove("hidden");

      dashFormatBadge.innerText = format.toUpperCase();
      dashFileName.innerText = file.name;
      dashFileSize.innerText = `(${(file.size / 1024).toFixed(1)} KB)`;
      dashStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> Lendo documento...`;
      dashProgressBar.style.width = "20%";
      dashStatusDetail.innerText = "Extraindo texto das páginas/slides...";

      try {
        const modoArquivo = document.querySelector('input[name="dash-file-mode"]:checked')?.value || "importar";
        const extracted = await window.FileExtractor.extract(file, (msg, pct) => {
          dashStatusDetail.innerText = msg;
          dashProgressBar.style.width = `${Math.min(50, Math.round(pct * 0.5))}%`;
        });

        dashStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Estruturando com Gemini...`;
        dashProgressBar.style.width = "60%";
        dashStatusDetail.innerText = modoArquivo === "gerar"
          ? "Criando 4 questões objetivas e 2 dissertativas a partir do assunto..."
          : "Organizando as questões existentes sem mudar o tipo...";

        const resEstrutura = await AIService.estruturarQuestoes({
          texto: extracted.text,
          formato: extracted.format,
          nomeArquivo: file.name,
          modo: modoArquivo,
          qtdMultiplaEscolha: 4,
          qtdDissertativa: 2
        });

        const resultado = resEstrutura.resultado || {};
        const questoes = resultado.questoes || [];

        if (questoes.length === 0) {
          throw new Error("Não foram identificadas questões no documento enviado.");
        }

        // Normalização das questões
        questoes.forEach((q, idx) => {
          if (!q.id) q.id = `q_imp_${idx + 1}_${Date.now()}`;
          if (q.tipo === "multipla_escolha") {
            const alts = q.alternativas || [];
            alts.forEach(a => {
              if (a.id) a.id = String(a.id).toUpperCase().trim();
            });
            if (!q.correta && alts.length > 0) {
              const cor = alts.find(a => a.correta);
              q.correta = cor ? cor.id : alts[0].id;
            } else {
              q.correta = String(q.correta || "A").toUpperCase().trim();
            }
            alts.forEach(a => {
              a.correta = (a.id === q.correta);
            });
          }
        });

        dashProgressBar.style.width = "90%";
        dashStatusDetail.innerText = "Salvando nova avaliação no banco de dados...";

        const codigo = `AVAL-${Math.floor(1000 + Math.random() * 9000)}`;
        const titulo = resultado.tituloSugerido || file.name.replace(/\.[^/.]+$/, "");
        const novaAtividade = {
          id: `ativ-${codigo.toLowerCase()}-${Date.now()}`,
          codigo: codigo,
          titulo: titulo,
          disciplina: resultado.disciplinaSugerida || "Geral",
          anoTurma: resultado.anoTurmaSugerido || "8º Ano Fundamental",
          professorNome: sessionStorage.getItem("professor_nome") || localStorage.getItem("professor_nome") || "Professor(a)",
          escola: sessionStorage.getItem("professor_escola") || localStorage.getItem("professor_escola") || "Unidade Escolar",
          professorEmail: sessionStorage.getItem("professor_email") || localStorage.getItem("professor_email") || "",
          dataCriacao: new Date().toISOString(),
          tempoLimiteMinutos: 45,
          configuracoesSeguranca: {
            bloquearCopiarColar: true,
            telaCheiaObrigatoria: true,
            marcaDaguaRA: true,
            detectarTrocaAba: true,
            embaralharQuestoes: true,
            embaralharAlternativas: true
          },
          questoes: questoes
        };

        await DB.salvarAtividade(novaAtividade);

        dashProgressBar.style.width = "100%";
        dashStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Concluído!`;
        dashStatusDetail.innerText = `Avaliação criada com ${questoes.length} questões prontas!`;

        alert(`🎉 Sucesso! A avaliação "${titulo}" foi criada diretamente a partir do arquivo com ${questoes.length} questões!\n\nCódigo da Prova: ${codigo}`);

        dashStatusBox.classList.add("hidden");
        dashDropzone.classList.remove("hidden");
        if (dashFileInput) dashFileInput.value = "";

        try {
          await ProfessorDashboardView.loadData();
        } catch (refreshError) {
          console.warn("A atividade foi criada, mas a atualização do painel falhou:", refreshError);
        }
      } catch (err) {
        console.error("Erro no processamento do arquivo no dashboard:", err);
        alert("Não foi possível gerar a avaliação a partir deste arquivo: " + err.message);
        dashStatusBox.classList.add("hidden");
        dashDropzone.classList.remove("hidden");
      }
    }

    // Carregar Dados
    await ProfessorDashboardView.loadData();
  },

  encerrarSessao() {
    if (confirm("Deseja encerrar sua sessão docente?")) {
      sessionStorage.removeItem("professor_autenticado");
      sessionStorage.removeItem("professor_nome");
      sessionStorage.removeItem("professor_escola");
      sessionStorage.removeItem("professor_email");
      sessionStorage.removeItem("professor_token");
      window.location.hash = "#professor/login";
    }
  },

  async loadData() {
    try {
      const atividades = await DB.getAtividades();
      const submissoes = await DB.getSubmissoes();
      this.atividades = atividades;
      this.submissoes = submissoes;

      // Estatísticas
      const statAtiv = document.getElementById("stat-atividades");
      const statSub = document.getElementById("stat-submissoes");
      const statInf = document.getElementById("stat-infracoes");

      if (statAtiv) statAtiv.innerText = atividades.length;
      if (statSub) statSub.innerText = submissoes.length;

      let totalInf = 0;
      submissoes.forEach(s => {
        if (s.infracoes?.totalTrocasAba) totalInf += s.infracoes.totalTrocasAba;
      });
      if (statInf) statInf.innerText = totalInf;

      // Renderizar Cards de Atividades
      const listEl = document.getElementById("atividades-list");
      if (listEl) {
        if (atividades.length === 0) {
          listEl.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400 glass-card rounded-3xl border border-slate-800">
              <i data-lucide="book-open" class="w-12 h-12 text-slate-600 mx-auto mb-3"></i>
              <p class="font-bold text-white text-base">Nenhuma atividade cadastrada ainda.</p>
              <p class="text-xs text-slate-400 mt-1 mb-4">Crie sua primeira prova blindada com auxílio da IA Gemini.</p>
              <a href="#professor/nova-atividade" class="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-glow-blue">
                <i data-lucide="sparkles" class="w-4 h-4"></i> Criar Prova com IA
              </a>
            </div>
          `;
        } else {
          listEl.innerHTML = atividades.map(a => {
            const questoesTotal = a.questoes ? a.questoes.length : 0;
            const submissoesCount = submissoes.filter(s => s.atividadeId === a.id).length;

            return `
              <div class="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between feature-card">
                <div>
                  <div class="flex items-start justify-between gap-2 mb-3">
                    <span class="px-2.5 py-1 rounded-xl bg-brand-950 text-brand-300 font-mono font-bold text-xs border border-brand-500/30">
                      ${a.codigo}
                    </span>
                    <span class="text-[11px] text-slate-400 font-semibold bg-dark-900 px-2.5 py-1 rounded-xl border border-slate-800">
                      ${a.anoTurma} • ${a.disciplina}
                    </span>
                  </div>

                  <h3 class="text-base font-bold text-white mb-2 leading-snug">${a.titulo}</h3>
                  <p class="text-xs text-slate-400 line-clamp-2 mb-4">${a.descricao || "Avaliação com questões objetivas e dissertativas alinhadas à BNCC."}</p>
                </div>

                <div class="border-t border-slate-800/80 pt-4 space-y-3 text-xs">
                  <div class="flex items-center gap-3 text-slate-400 font-medium">
                    <span class="flex items-center gap-1">
                      <i data-lucide="help-circle" class="w-3.5 h-3.5 text-brand-400"></i>
                      ${questoesTotal} questões
                    </span>
                    <span class="flex items-center gap-1">
                      <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i>
                      ${submissoesCount} entregas
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      onclick="ProfessorDashboardView.copiarCodigo('${a.codigo}')"
                      class="px-3 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-700 font-bold transition-all text-xs flex items-center gap-1"
                      title="Copiar código para passar aos alunos"
                    >
                      <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      <span>Copiar PIN</span>
                    </button>

                    <a
                      href="#professor/atividade/${a.id}/visualizar"
                      class="px-3.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 font-bold transition-all text-xs flex items-center gap-1"
                    >
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                      <span>Visualizar</span>
                    </a>

                    <a
                      href="#professor/atividade/${a.id}/editar"
                      class="px-3.5 py-1.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-500/30 font-bold transition-all text-xs flex items-center gap-1"
                    >
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                      <span>Editar</span>
                    </a>

                    <a
                      href="#professor/atividade/${a.id}"
                      class="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-all text-xs flex items-center gap-1 shadow-glow-blue"
                    >
                      <span>Resultados</span>
                      <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>

                    <button
                      onclick="ProfessorDashboardView.excluirAtividade('${a.id}')"
                      class="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/30 font-bold transition-all text-xs flex items-center gap-1"
                      title="Excluir atividade"
                    >
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join("");
        }
      }

      // Renderizar Submissões na Tabela
      const tbody = document.getElementById("submissoes-tbody");
      if (tbody && submissoes.length > 0) {
        tbody.innerHTML = submissoes.slice(0, 10).map(s => {
          const ativ = atividades.find(a => a.id === s.atividadeId) || { titulo: "Avaliação" };
          const trocas = s.infracoes?.totalTrocasAba || 0;
          const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
          const nota = s.notaFinal !== undefined ? `${s.notaFinal} / 10` : "Pendente";

          return `
            <tr class="hover:bg-dark-900/60 transition-colors">
              <td class="py-3.5 px-3">
                <div class="font-bold text-white">${s.alunoNome}</div>
                <div class="text-[10px] text-slate-400 font-mono">${s.alunoRA}</div>
              </td>
              <td class="py-3.5 px-3 text-slate-300 max-w-[180px] truncate">${ativ.titulo}</td>
              <td class="py-3.5 px-3 text-slate-400 font-mono">${mins} min</td>
              <td class="py-3.5 px-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${trocas === 0 ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-rose-950 text-rose-400 border border-rose-500/30"}">
                  ${trocas === 0 ? "Nenhuma troca" : `${trocas} trocas de aba`}
                </span>
              </td>
              <td class="py-3.5 px-3 font-bold ${s.notaFinal !== undefined ? "text-emerald-400" : "text-amber-400"}">
                ${nota}
              </td>
              <td class="py-3.5 px-3 text-right">
                <a href="#professor/atividade/${s.atividadeId}" class="text-brand-400 hover:text-brand-300 font-bold hover:underline">
                  Corrigir com IA →
                </a>
              </td>
            </tr>
          `;
        }).join("");
      }

      if (window.lucide) window.lucide.createIcons();
    } catch (e) {
      console.warn("Erro ao carregar dados do dashboard:", e);
    }
  },

  copiarCodigo(codigo) {
    navigator.clipboard.writeText(codigo);
    alert(`Código da prova "${codigo}" copiado para a área de transferência! Compartilhe com seus alunos na lousa ou Classroom.`);
  },

  async excluirAtividade(id) {
    const atividade = (this.atividades || []).find((item) => item.id === id);
    const titulo = atividade?.titulo || "esta atividade";
    if (!window.confirm(`Excluir permanentemente “${titulo}”?\n\nO código de acesso deixará de funcionar. Esta ação não pode ser desfeita.`)) return;

    try {
      await DB.excluirAtividade(id);
      this.atividades = (this.atividades || []).filter((item) => item.id !== id);
      try {
        await this.loadData();
      } catch (refreshError) {
        console.warn("A atividade foi excluída, mas a lista não foi atualizada:", refreshError);
      }
      alert("Atividade excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
      alert(`Não foi possível excluir a atividade: ${error.message}`);
    }
  }
};

window.ProfessorDashboardView = ProfessorDashboardView;
