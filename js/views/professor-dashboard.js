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
      <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-600 selection:text-white">
        <header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur px-4 md:px-8 py-3">
          <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div class="min-w-0">
              <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-black">Painel docente</p>
              <h1 class="text-lg md:text-xl font-black text-white truncate">${profNome}</h1>
              <p class="text-[11px] text-slate-500 truncate">${profEscola}${profEmail ? ` · ${profEmail}` : ""}</p>
            </div>

            <div class="flex items-center gap-2">
              <a href="#professor/nova-atividade" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs md:text-sm inline-flex items-center gap-2 transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Nova atividade</span>
              </a>
              <a href="#simulados" class="hidden sm:inline-flex px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold items-center gap-1.5 transition-colors">
                <i data-lucide="book-open-check" class="w-3.5 h-3.5"></i>
                Simulados
              </a>
              <a href="#professor/configuracoes" class="hidden sm:inline-flex p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors" title="Configurações">
                <i data-lucide="settings" class="w-4 h-4"></i>
              </a>
              <button onclick="ProfessorDashboardView.encerrarSessao()" class="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/80 text-slate-400 hover:text-rose-200 border border-slate-800 hover:border-rose-500/30 transition-colors" title="Sair">
                <i data-lucide="log-out" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </header>

        <main class="max-w-6xl mx-auto w-full p-4 md:p-8 flex-1 space-y-6">
          <section class="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Resumo do painel">
            <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div class="text-2xl font-black text-white" id="stat-atividades">0</div>
              <div class="text-[11px] text-slate-500 font-bold uppercase tracking-wide mt-1">Atividades</div>
            </div>
            <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div class="text-2xl font-black text-white" id="stat-submissoes">0</div>
              <div class="text-[11px] text-slate-500 font-bold uppercase tracking-wide mt-1">Entregas</div>
            </div>
            <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div class="text-2xl font-black text-white" id="stat-simulados-finalizados">0</div>
              <div class="text-[11px] text-slate-500 font-bold uppercase tracking-wide mt-1">Simulados</div>
            </div>
            <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div class="text-2xl font-black text-white" id="stat-infracoes">0</div>
              <div class="text-[11px] text-slate-500 font-bold uppercase tracking-wide mt-1">Ocorrências</div>
            </div>
          </section>

          <section class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 class="text-base md:text-lg font-black text-white">Ações rápidas</h2>
                <p class="text-xs text-slate-500 mt-1">Crie atividades, acompanhe simulados e exporte relatórios quando precisar.</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
                <a href="#professor/nova-atividade" class="px-4 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors">
                  <i data-lucide="plus" class="w-4 h-4"></i> Criar atividade
                </a>
                <a href="#simulados" class="px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors">
                  <i data-lucide="book-open-check" class="w-4 h-4"></i> Simulados
                </a>
                <button onclick="ProfessorDashboardView.exportarResultadosSimuladosCSV()" class="px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors">
                  <i data-lucide="file-spreadsheet" class="w-4 h-4"></i> Exportar CSV
                </button>
              </div>
            </div>

            <details class="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <summary class="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-bold text-slate-200">
                <span class="inline-flex items-center gap-2"><i data-lucide="upload-cloud" class="w-4 h-4 text-brand-400"></i> Criar atividade a partir de arquivo</span>
                <span class="text-[11px] text-slate-500 font-medium">Word, PDF, Excel, PPTX, TXT</span>
              </summary>

              <div class="mt-4 space-y-4">
                <fieldset class="grid sm:grid-cols-2 gap-3" aria-label="Como usar o arquivo">
                  <label class="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 p-4 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-950/30">
                    <span class="flex gap-3"><input type="radio" name="dash-file-mode" value="importar" checked class="mt-1 accent-blue-500"><span><strong class="block text-sm text-white">Manter como está</strong><small class="block mt-1 text-slate-500 leading-relaxed">Importa as questões do arquivo sem mudar o tipo.</small></span></span>
                  </label>
                  <label class="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 p-4 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-950/30">
                    <span class="flex gap-3"><input type="radio" name="dash-file-mode" value="gerar" class="mt-1 accent-emerald-500"><span><strong class="block text-sm text-white">Criar uma prova nova</strong><small class="block mt-1 text-slate-500 leading-relaxed">Gera questões a partir do assunto do arquivo.</small></span></span>
                  </label>
                </fieldset>

                <div id="dash-upload-dropzone" class="relative overflow-hidden border border-dashed border-slate-700 hover:border-brand-500 bg-slate-950/70 hover:bg-slate-900 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2">
                  <input type="file" id="dash-file-input" accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.txt,.csv" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" title="Clique ou arraste um arquivo para criar a avaliação" />
                  <i data-lucide="upload-cloud" class="w-8 h-8 text-brand-400 mx-auto pointer-events-none"></i>
                  <p class="text-sm font-bold text-white pointer-events-none">Solte o arquivo aqui ou clique para selecionar</p>
                  <p class="text-xs text-slate-500 pointer-events-none">Formatos aceitos: Word, PDF, Excel, PPTX, TXT ou CSV</p>
                  <button type="button" id="dash-btn-pick-file" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 pointer-events-none">
                    <i data-lucide="folder-open" class="w-4 h-4"></i> Escolher arquivo
                  </button>
                </div>

                <div id="dash-upload-status-box" class="hidden space-y-3 p-5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span id="dash-format-badge" class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-brand-950 text-brand-300 border border-brand-500/30">DOCX</span>
                      <span id="dash-file-name" class="font-bold text-white truncate max-w-[220px] sm:max-w-md">arquivo.docx</span>
                      <span id="dash-file-size" class="text-slate-500 text-[11px] font-mono shrink-0">(0 KB)</span>
                    </div>
                    <span id="dash-status-indicator" class="text-[11px] text-brand-300 font-semibold flex items-center gap-1.5 shrink-0">
                      <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> Lendo...
                    </span>
                  </div>
                  <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden"><div id="dash-progress-bar" class="bg-brand-500 h-2 rounded-full transition-all duration-300" style="width: 15%;"></div></div>
                  <p id="dash-status-detail" class="text-[11px] text-slate-500 font-mono text-center">Extraindo texto...</p>
                </div>
              </div>
            </details>
          </section>

          <section class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h2 class="text-base md:text-lg font-black text-white">Atividades</h2>
                <p class="text-xs text-slate-500 mt-1">Códigos, entregas e acesso aos relatórios.</p>
              </div>
              <a href="#professor/nova-atividade" class="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1">Nova atividade <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
            </div>
            <div id="atividades-list" class="space-y-2">
              <div class="py-10 text-center text-slate-500 text-sm">
                <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                Carregando atividades...
              </div>
            </div>
          </section>

          <section class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <h3 class="text-base font-black text-white">Relatório por sala</h3>
                <p class="text-xs text-slate-500 mt-1">Quem entregou, quem está fazendo e quem ainda não começou. As listas de alunos ficam visíveis só para professores.</p>
              </div>
              <div class="flex flex-wrap gap-2 items-center">
                <label class="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-[11px] text-slate-200 font-bold cursor-pointer">
                  Atualizar listas das salas (CSV)
                  <input id="rel-salas-arquivos" type="file" accept=".csv" multiple class="hidden" onchange="ProfessorDashboardView.carregarListasSalas(this.files)">
                </label>
                <select id="rel-salas-prova" class="bg-dark-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white max-w-[260px]"></select>
                <button onclick="ProfessorDashboardView.gerarRelatorioSalas()" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold">Gerar relatório</button>
              </div>
            </div>
            <p id="rel-salas-info" class="text-[11px] text-slate-400 mt-3"></p>
            <div id="rel-salas-resultado" class="mt-4 space-y-3 text-xs"></div>
          </section>

          <section class="grid lg:grid-cols-2 gap-6">
            <div class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
              <div class="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 class="text-base font-black text-white">Em andamento</h3>
                  <p class="text-xs text-slate-500 mt-1">Provas abertas agora.</p>
                </div>
                <button onclick="ProfessorDashboardView.loadData()" class="text-[11px] text-slate-300 font-bold bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  <span id="stat-em-andamento">0</span> · Atualizar
                </button>
              </div>
              <div id="lista-em-andamento" class="space-y-2 text-xs text-slate-400">Carregando...</div>
            </div>

            <div class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
              <div class="mb-4">
                <h3 class="text-base font-black text-white">Entregas recentes</h3>
                <p class="text-xs text-slate-500 mt-1">Últimas respostas enviadas pelos estudantes.</p>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th class="py-3 pr-3">Estudante</th>
                      <th class="py-3 px-3">Atividade</th>
                      <th class="py-3 px-3">Status</th>
                      <th class="py-3 pl-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody id="submissoes-tbody" class="divide-y divide-slate-800/60">
                    <tr><td colspan="4" class="py-8 text-center text-slate-500">Nenhuma entrega registrada ainda.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section class="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h3 class="text-base font-black text-white">Resultados dos simulados</h3>
                <p class="text-xs text-slate-500 mt-1">Lista compacta dos simulados finalizados.</p>
              </div>
              <button onclick="ProfessorDashboardView.exportarResultadosSimuladosCSV()" class="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i> Exportar CSV
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th class="py-3 px-3">Estudante</th>
                    <th class="py-3 px-3">Simulado</th>
                    <th class="py-3 px-3">Acertos</th>
                    <th class="py-3 px-3">Nota</th>
                    <th class="py-3 px-3">Finalizado</th>
                  </tr>
                </thead>
                <tbody id="simulados-results-tbody" class="divide-y divide-slate-800/60">
                  <tr><td colspan="5" class="py-8 text-center text-slate-500">Nenhum simulado finalizado ainda.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
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

        dashStatusInd.innerHTML = modoArquivo === "gerar"
          ? `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Criando com Gemini...`
          : `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Organizando no navegador...`;
        dashProgressBar.style.width = "60%";
        dashStatusDetail.innerText = modoArquivo === "gerar"
          ? "Criando 4 questões objetivas e 2 dissertativas a partir do assunto..."
          : "Organizando as questões existentes sem mudar o tipo...";

        const resEstrutura = modoArquivo === "importar"
          ? AIService.parseDocumentTextClientSide(extracted.text, file.name)
          : await AIService.estruturarQuestoes({
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
      TeacherAuth.logout();
      setTimeout(() => {
        window.location.hash = "#";
      }, 100);
    }
  },

  // Considera "online" quem deu sinal de vida recentemente (aluno fecha a aba = some da lista)
  LIMITE_ONLINE_PROVA_MS: 3 * 60 * 1000,
  LIMITE_ONLINE_SIMULADO_MS: 20 * 60 * 1000,

  async renderEmAndamento(atividades) {
    this._atividadesAndamento = atividades;
    if (this._pararEscuta) return this.desenharEmAndamento();
    try {
      this._pararEscuta = await DB.ouvirEmAndamento((dados) => {
        this._dadosAndamento = dados;
        this.desenharEmAndamento();
      });
      // Redesenha a cada 30s para tirar da lista quem ficou inativo
      this._relogioAndamento = setInterval(() => this.desenharEmAndamento(), 30000);
    } catch (e) {
      console.warn("Erro ao iniciar escuta ao vivo:", e);
    }
  },

  async salvarSeriesAlunos() {
    const status = document.getElementById("serie-alunos-status");
    const serie = document.getElementById("serie-alunos-select").value;
    const ras = document.getElementById("serie-alunos-ras").value;
    if (!ras.trim()) { status.innerText = "Cole pelo menos um RA."; return; }
    status.innerText = "Salvando...";
    try {
      const r = await DB.salvarSeriesAlunos(serie, ras);
      document.getElementById("serie-alunos-ras").value = r.invalidos.join("\n");
      status.innerText = `${r.salvos} aluno(s) salvos.` + (r.invalidos.length ? ` ${r.invalidos.length} RA(s) inválidos ficaram na caixa para corrigir.` : "");
    } catch (e) {
      status.innerText = "Erro ao salvar: " + (e.message || e);
    }
  },

  async mostrarContagemSeries() {
    const status = document.getElementById("serie-alunos-status");
    if (!status) return;
    try {
      const c = await DB.contarSeriesAlunos();
      const txt = Object.entries(c).map(([k, v]) => `${k}: ${v}`).join(" · ");
      status.innerText = (status.innerText ? status.innerText + "  |  " : "") + "Cadastrados → " + (txt || "nenhum");
    } catch (_) {}
  },

  // ===== Relatório por sala =====
  lerListasSalas() {
    return this._salas || {};
  },

  async carregarSalasDaNuvem() {
    try { this._salas = await DB.lerTurmas(); } catch (e) { console.warn("Erro ao ler salas:", e); this._salas = this._salas || {}; }
    return this._salas;
  },

  async carregarListasSalas(files) {
    const salas = { ...(await this.carregarSalasDaNuvem()) };
    for (const file of files) {
      const sala = file.name.replace(/\.csv$/i, "").trim();
      const texto = (await file.text()).replace(/^﻿/, "");
      const linhas = texto.split(/\r?\n/).filter((l) => l.trim());
      const cab = linhas.shift().split(",").map((c) => c.replace(/"/g, "").trim().toLowerCase());
      const iNome = cab.indexOf("nome"), iEmail = cab.indexOf("email"), iRa = cab.indexOf("ra");
      salas[sala] = linhas.map((l) => {
        const c = (l.match(/("([^"]*)"|[^,]*)(,|$)/g) || []).map((x) => x.replace(/,$/, "").replace(/^"|"$/g, "").trim());
        return { nome: c[iNome] || "", ra: c[iRa] || "", email: String(c[iEmail] || "").toLowerCase() };
      }).filter((a) => a.email || a.ra);
    }
    const info = document.getElementById("rel-salas-info");
    if (info) info.innerText = "Salvando listas para todos os professores...";
    try {
      await DB.salvarTurmas(salas);
      this._salas = salas;
    } catch (e) {
      if (info) info.innerText = "Erro ao salvar as listas: " + (e.message || e);
      return;
    }
    this.prepararRelatorioSalas();
  },

  async prepararRelatorioSalas(recarregar = false) {
    if (recarregar || !this._salas) await this.carregarSalasDaNuvem();
    const sel = document.getElementById("rel-salas-prova");
    const info = document.getElementById("rel-salas-info");
    if (!sel) return;
    const sims = (window.SimuladosData?.getAllConfigs() || []).map((c) => `<option value="sim:${c.id}">${c.titulo || c.id}</option>`);
    const atvs = (this.atividades || []).map((a) => `<option value="atv:${a.id}">Atividade: ${String(a.titulo || a.id).replace(/</g, "")}</option>`);
    const atual = sel.value;
    sel.innerHTML = [...sims, ...atvs].join("");
    if (atual) sel.value = atual;
    const salas = this.lerListasSalas();
    const nomes = Object.keys(salas).sort();
    if (info) info.innerText = nomes.length
      ? `Salas carregadas: ${nomes.map((n) => `${n} (${salas[n].length})`).join(" · ")}`
      : "Nenhuma sala cadastrada. Clique em \"Atualizar listas das salas\" e escolha os arquivos 1A.csv, 1B.csv... da pasta cadastro-alunos.";
  },

  async gerarRelatorioSalas() {
    const out = document.getElementById("rel-salas-resultado");
    const prova = document.getElementById("rel-salas-prova").value;
    const salas = this.lerListasSalas();
    if (!Object.keys(salas).length) { out.innerHTML = `<p class="text-amber-300">Carregue as listas das salas primeiro.</p>`; return; }
    out.innerHTML = `<p class="text-slate-400">Buscando entregas...</p>`;
    const status = {}; // email -> "entregou" | "fazendo"
    try {
      const [tipo, id] = prova.split(/:(.*)/s);
      if (tipo === "sim") {
        const [fin, and] = await Promise.all([DB.getResultadosSimulados(), DB.getSimuladosEmAndamento()]);
        and.filter((p) => p.simuladoId === id).forEach((p) => { status[String(p.studentEmail).toLowerCase()] = "fazendo"; });
        fin.filter((p) => p.simuladoId === id).forEach((p) => { status[String(p.studentEmail).toLowerCase()] = "entregou"; });
      } else {
        const subs = await DB.getSubmissoes(id, true);
        subs.forEach((s) => {
          const e = String(s.alunoEmail).toLowerCase();
          if (s.status === "in_progress") { if (!status[e]) status[e] = "fazendo"; } else status[e] = "entregou";
        });
      }
    } catch (e) {
      out.innerHTML = `<p class="text-rose-400">Erro ao buscar entregas: ${String(e.message || e).replace(/</g, "")}</p>`; return;
    }
    const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    // Simulado de uma série: mostra só as salas daquela série (ex.: 2serie -> 2A, 2B...)
    let nomesSalas = Object.keys(salas).sort();
    const mSerie = prova.match(/^sim:(\d)serie/) || prova.match(/^sim:saresp_2026_(\d)em/);
    if (mSerie) nomesSalas = nomesSalas.filter((n) => n.startsWith(mSerie[1]));
    out.innerHTML = nomesSalas.map((sala) => {
      const alunos = salas[sala];
      const ent = alunos.filter((a) => status[a.email] === "entregou");
      const faz = alunos.filter((a) => status[a.email] === "fazendo");
      const nao = alunos.filter((a) => !status[a.email]);
      const lista = (arr, cor) => arr.length ? arr.map((a) => `<span class="inline-block px-2 py-0.5 m-0.5 rounded-lg ${cor}">${esc(a.nome)}</span>`).join("") : `<span class="text-slate-500">ninguém</span>`;
      return `<details class="rounded-2xl bg-dark-900 border border-slate-800 p-3" ${nao.length ? "" : ""}>
        <summary class="cursor-pointer flex flex-wrap items-center gap-3">
          <span class="font-black text-white text-sm">${esc(sala)}</span>
          <span class="text-emerald-400 font-bold">${ent.length} entregaram</span>
          <span class="text-amber-300 font-bold">${faz.length} fazendo</span>
          <span class="text-rose-400 font-bold">${nao.length} não começaram</span>
          <span class="text-slate-500">de ${alunos.length}</span>
        </summary>
        <div class="mt-3 space-y-2">
          <div><div class="text-rose-400 font-bold mb-1">Não começaram</div>${lista(nao, "bg-rose-950/50 text-rose-200")}</div>
          <div><div class="text-amber-300 font-bold mb-1">Fazendo agora</div>${lista(faz, "bg-amber-950/50 text-amber-200")}</div>
          <div><div class="text-emerald-400 font-bold mb-1">Entregaram</div>${lista(ent, "bg-emerald-950/50 text-emerald-200")}</div>
        </div>
      </details>`;
    }).join("");
  },

  pararEmAndamento() {
    if (this._pararEscuta) this._pararEscuta();
    clearInterval(this._relogioAndamento);
    this._pararEscuta = null;
    this._relogioAndamento = null;
  },

  desenharEmAndamento() {
    const lista = document.getElementById("lista-em-andamento");
    if (!lista) { this.pararEmAndamento(); return; } // saiu do painel
    if (!this._dadosAndamento) return;
    const atividades = this._atividadesAndamento || [];
    const { subs, sims } = this._dadosAndamento;
    const agora = Date.now();
    const recente = (iso, limite) => iso && (agora - new Date(iso).getTime()) <= limite;
    const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const hora = (iso) => iso ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "-";
    const itens = [
      ...subs.filter((s) => recente(s.ultimaAtividade || s.dataInicio, this.LIMITE_ONLINE_PROVA_MS)).map((s) => ({
        nome: s.alunoNome, ra: s.alunoRA, turma: s.turma,
        prova: (atividades.find((a) => a.id === s.atividadeId) || {}).titulo || "Avaliação",
        inicio: s.dataInicio, inf: window.resumoInfracoes(s.infracoes)
      })),
      ...sims.filter((s) => recente(s.updatedAt || s.startedAt, this.LIMITE_ONLINE_SIMULADO_MS)).map((s) => ({
        nome: s.studentName, ra: s.studentRA, turma: "",
        prova: `Simulado ${s.simuladoId || ""}`.trim(),
        inicio: s.startedAt || s.updatedAt, respondidas: Object.keys(s.answers || {}).length,
        inf: { total: 0, texto: "" }
      }))
    ].sort((a, b) => String(b.inicio || "").localeCompare(String(a.inicio || "")));
    const stat = document.getElementById("stat-em-andamento");
    if (stat) stat.innerText = itens.length;
    if (!itens.length) { lista.innerHTML = `<p class="text-emerald-400">Ninguém com prova aberta no momento.</p>`; return; }
    lista.innerHTML = itens.map((i) => `
      <div class="p-3 rounded-2xl bg-dark-900 border ${i.inf.total ? "border-rose-500/30" : "border-slate-800"} flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div class="font-bold text-white text-sm"><span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>${esc(i.nome)}</div>
          <div class="text-slate-400 font-mono text-[10px]">RA: ${esc(i.ra || "-")}${i.turma ? " · " + esc(i.turma) : ""} · ${esc(i.prova)}</div>
        </div>
        <div class="md:text-right">
          <div class="text-[11px] text-slate-300">Começou: ${hora(i.inicio)}${i.respondidas !== undefined ? ` · ${i.respondidas} respondidas` : ""}</div>
          <div class="text-[11px] font-bold ${i.inf.total ? "text-rose-400" : "text-emerald-400"}">${i.inf.total ? esc(i.inf.texto) : "Sem ocorrências"}</div>
        </div>
      </div>`).join("");
  },

  async loadData() {
    try {
      const atividades = await DB.getAtividades();
      const submissoes = await DB.getSubmissoes();
      let resultadosSimulados = [];
      try {
        resultadosSimulados = await DB.getResultadosSimulados();
      } catch (simError) {
        console.warn("Erro ao carregar resultados dos simulados:", simError);
      }
      this.atividades = atividades;
      this.prepararRelatorioSalas(true);
      this.submissoes = submissoes;
      this.mostrarContagemSeries();
      this.renderEmAndamento(atividades).catch((e) => console.warn("Erro ao carregar provas em andamento:", e));
      this.resultadosSimulados = resultadosSimulados;

      // Estatísticas
      const statAtiv = document.getElementById("stat-atividades");
      const statSub = document.getElementById("stat-submissoes");
      const statInf = document.getElementById("stat-infracoes");

      if (statAtiv) statAtiv.innerText = atividades.length;
      if (statSub) statSub.innerText = submissoes.length;
      const statSim = document.getElementById("stat-simulados-finalizados");
      if (statSim) statSim.innerText = resultadosSimulados.length;

      let totalInf = 0;
      submissoes.forEach(s => {
        totalInf += window.resumoInfracoes(s.infracoes).total;
      });
      if (statInf) statInf.innerText = totalInf;

      // Renderizar Cards de Atividades
      const listEl = document.getElementById("atividades-list");
      if (listEl) {
        if (atividades.length === 0) {
          listEl.innerHTML = `
            <div class="py-12 text-center text-slate-500 rounded-2xl border border-slate-800 bg-slate-950/50">
              <i data-lucide="book-open" class="w-10 h-10 text-slate-700 mx-auto mb-3"></i>
              <p class="font-bold text-white text-sm">Nenhuma atividade cadastrada ainda.</p>
              <p class="text-xs text-slate-500 mt-1 mb-4">Crie sua primeira avaliação para começar.</p>
              <a href="#professor/nova-atividade" class="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5">
                <i data-lucide="plus" class="w-4 h-4"></i> Criar atividade
              </a>
            </div>
          `;
        } else {
          listEl.innerHTML = atividades.map(a => {
            const questoesTotal = a.questoes ? a.questoes.length : 0;
            const submissoesCount = submissoes.filter(s => s.atividadeId === a.id).length;

            return `
              <div class="rounded-2xl border border-slate-800 bg-slate-950/55 hover:bg-slate-950/80 p-4 transition-colors">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                      <span class="px-2 py-0.5 rounded-lg bg-slate-900 text-brand-300 font-mono font-bold text-[11px] border border-slate-800">${a.codigo}</span>
                      <span class="text-[11px] text-slate-500">${a.anoTurma || "Turma"} · ${a.disciplina || "Geral"}</span>
                    </div>
                    <h3 class="text-sm md:text-base font-bold text-white truncate">${a.titulo}</h3>
                    <p class="text-[11px] text-slate-500 mt-1">${questoesTotal} questões · ${submissoesCount} entregas</p>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 shrink-0">
                    <button onclick="ProfessorDashboardView.copiarCodigo('${a.codigo}')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold transition-colors text-xs inline-flex items-center gap-1" title="Copiar código">
                      <i data-lucide="copy" class="w-3.5 h-3.5"></i> Código
                    </button>
                    <a href="#professor/atividade/${a.id}/visualizar" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold transition-colors text-xs inline-flex items-center gap-1">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i> Ver
                    </a>
                    <a href="#professor/atividade/${a.id}/editar" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold transition-colors text-xs inline-flex items-center gap-1">
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i> Editar
                    </a>
                    <a href="#professor/atividade/${a.id}" class="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-colors text-xs inline-flex items-center gap-1">
                      Resultados <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                    <button onclick="ProfessorDashboardView.excluirAtividade('${a.id}')" class="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-500 hover:text-rose-300 border border-slate-800 hover:border-rose-500/30 transition-colors" title="Excluir atividade">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join("");
        }
      }

      // Renderizar Resultados dos Simulados Oficiais
      const simTbody = document.getElementById("simulados-results-tbody");
      if (simTbody && resultadosSimulados.length > 0) {
        simTbody.innerHTML = resultadosSimulados.slice(0, 25).map((row) => {
          const result = row.result || {};
          const config = window.SimuladosData?.getConfig?.(row.simuladoId);
          const score = result.score ?? 0;
          const acertos = result.totalAcertos ?? Object.keys(row.answers || {}).length;
          const total = result.totalQuestoes ?? "—";
          const finalizado = row.finishedAt ? new Date(row.finishedAt).toLocaleString("pt-BR") : "—";
          return `
            <tr class="hover:bg-slate-950/70 transition-colors">
              <td class="py-3.5 px-3">
                <div class="font-bold text-white">${row.studentName || "Aluno"}</div>
                <div class="text-[10px] text-slate-500 font-mono">RA ${row.studentRA || "—"}</div>
              </td>
              <td class="py-3.5 px-3 text-slate-300 max-w-[240px] truncate">${config?.titulo || row.simuladoId}</td>
              <td class="py-3.5 px-3 text-slate-300 font-mono">${acertos}/${total}</td>
              <td class="py-3.5 px-3"><span class="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-black">${score}%</span></td>
              <td class="py-3.5 px-3 text-slate-500 font-mono">${finalizado}</td>
            </tr>
          `;
        }).join("");
      }

      // Renderizar Submissões na Tabela
      const tbody = document.getElementById("submissoes-tbody");
      if (tbody && submissoes.length > 0) {
        tbody.innerHTML = submissoes.slice(0, 10).map(s => {
          const ativ = atividades.find(a => a.id === s.atividadeId) || { titulo: "Avaliação" };
          const trocas = window.resumoInfracoes(s.infracoes).total;
          const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
          const nota = s.notaFinal !== undefined ? `${s.notaFinal} / 10` : "Pendente";

          return `
            <tr class="hover:bg-slate-950/70 transition-colors">
              <td class="py-3.5 pr-3">
                <div class="font-bold text-white">${s.alunoNome}</div>
                <div class="text-[10px] text-slate-500 font-mono">${s.alunoRA} · ${mins} min</div>
              </td>
              <td class="py-3.5 px-3 text-slate-300 max-w-[180px] truncate">${ativ.titulo}</td>
              <td class="py-3.5 px-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${trocas === 0 ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-rose-950 text-rose-400 border border-rose-500/30"}">
                  ${s.notaFinal !== undefined ? nota : (trocas === 0 ? "Pendente" : `${trocas} trocas`)}
                </span>
              </td>
              <td class="py-3.5 pl-3 text-right">
                <a href="#professor/atividade/${s.atividadeId}" class="text-brand-400 hover:text-brand-300 font-bold hover:underline">Abrir →</a>
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
  },

  sanitizeCsv(val) {
    if (val === null || val === undefined) return '""';
    let str = String(val);
    if (/^[=+\-@]/.test(str)) {
      str = "'" + str;
    }
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  },

  downloadCsv(csvContent, filename) {
    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  exportarResultadosSimuladosCSV() {
    const list = this.resultadosSimulados || [];
    if (list.length === 0) {
      alert("Nenhum resultado de simulado registrado para exportar.");
      return;
    }

    const headers = [
      "Estudante",
      "RA",
      "E-mail Institucional",
      "Simulado / Caderno",
      "Acertos",
      "Total de Questões",
      "Aproveitamento (%)",
      "Data de Início",
      "Data de Conclusão"
    ];

    const rows = [headers.map(h => this.sanitizeCsv(h)).join(";")];

    list.forEach(row => {
      const result = row.result || {};
      const config = window.SimuladosData?.getConfig?.(row.simuladoId);
      const score = result.score ?? 0;
      const acertos = result.totalAcertos ?? Object.keys(row.answers || {}).length;
      const total = result.totalQuestoes ?? "—";
      const inicio = row.startedAt ? new Date(row.startedAt).toLocaleString("pt-BR") : "—";
      const finalizado = row.finishedAt ? new Date(row.finishedAt).toLocaleString("pt-BR") : "—";

      const csvRow = [
        this.sanitizeCsv(row.studentName || "Aluno"),
        this.sanitizeCsv(row.studentRA || "—"),
        this.sanitizeCsv(row.studentEmail || "—"),
        this.sanitizeCsv(config?.titulo || row.simuladoId || "Simulado Provão Paulista"),
        this.sanitizeCsv(acertos),
        this.sanitizeCsv(total),
        this.sanitizeCsv(`${score}%`),
        this.sanitizeCsv(inicio),
        this.sanitizeCsv(finalizado)
      ];

      rows.push(csvRow.join(";"));
    });

    const csvContent = rows.join("\r\n");
    const dateStamp = new Date().toISOString().split("T")[0];
    const filename = `relatorio_simulados_provao_paulista_${dateStamp}.csv`;
    this.downloadCsv(csvContent, filename);
  }
};

window.ProfessorDashboardView = ProfessorDashboardView;
