/**
 * View: Criador de Atividade com IA Gemini 3.7 Flash
 * Design: SaaS Pro / GovTech Educational Standard
 */

const ProfessorNovaAtividadeView = {
  questoes: [],
  configSeguranca: {
    bloquearCopiarColar: true,
    bloquearBotaoDireito: true,
    telaCheiaObrigatoria: true,
    marcaDaguaRA: true,
    detectarTrocaAba: true,
    embaralharQuestoes: true,
    embaralharAlternativas: true
  },

  async render() {
    const root = document.getElementById("app-root");
    this.questoes = [];

    const randCode = `AVAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const randPin = String(Math.floor(1000 + Math.random() * 9000));

    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white pb-16">
        <!-- Topo -->
        <header class="glass-nav sticky top-0 z-50 py-3.5 px-4 md:px-8">
          <div class="max-w-5xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-xs text-slate-300 hover:text-white transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Voltar ao Painel</span>
            </a>
            <span class="text-[11px] bg-brand-950/80 px-3 py-1 rounded-full border border-brand-500/30 text-brand-300 font-semibold">
              Criador de Avaliação Blindada
            </span>
          </div>
        </header>

        <!-- Formulário de Criação -->
        <main class="max-w-5xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Criar Nova Avaliação</h2>
              <p class="text-xs md:text-sm text-slate-400 mt-1">Defina as informações básicas ou gere questões instantaneamente com a IA Gemini.</p>
            </div>

            <!-- Botões de Ação Topo -->
            <div class="flex items-center gap-3 flex-wrap">
              <button
                id="btn-open-upload-modal"
                class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-glow-blue transition-all transform hover:-translate-y-0.5 border border-white/10"
              >
                <i data-lucide="file-up" class="w-5 h-5 text-cyan-300"></i>
                <span>Importar Questionário (Word/PDF/Excel/PPTX)</span>
              </button>

              <button
                id="btn-open-ai-modal"
                class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-glow-emerald transition-all transform hover:-translate-y-0.5 border border-white/10"
              >
                <i data-lucide="sparkles" class="w-5 h-5 text-yellow-300"></i>
                <span>Gerar por Tema (Gemini)</span>
              </button>
            </div>
          </div>

          <!-- Card de Importação Aberta e Direta de Arquivo -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/40 shadow-2xl space-y-4 relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-950 to-blue-950/20">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-glow-blue border border-white/10 flex-shrink-0">
                  <i data-lucide="file-up" class="w-6 h-6 text-cyan-300"></i>
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>Importar Arquivo Pronto com IA</span>
                    <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">Preenchimento Automático</span>
                  </h3>
                  <p class="text-xs text-slate-400">Solte seu arquivo em Word (.docx), PDF, Excel (.xlsx) ou PowerPoint (.pptx) para preencher as questões automaticamente</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md bg-red-950/70 border border-red-500/30 text-red-300 text-[10px] font-bold font-mono">PDF</span>
                <span class="px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-500/30 text-blue-300 text-[10px] font-bold font-mono">Word .docx</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono">Excel .xlsx</span>
                <span class="px-2 py-0.5 rounded-md bg-orange-950/70 border border-orange-500/30 text-orange-300 text-[10px] font-bold font-mono">PPTX</span>
              </div>
            </div>

            <!-- Área Aberta de Drag & Drop -->
            <div
              id="nova-upload-dropzone"
              class="relative overflow-hidden border-2 border-dashed border-slate-700 hover:border-brand-500 bg-dark-950/60 hover:bg-dark-900/90 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all space-y-3"
            >
              <input
                type="file"
                id="nova-file-input"
                accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.txt,.csv"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                title="Clique ou arraste um arquivo para cá"
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
                id="nova-btn-pick-file"
                class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-blue transition-all inline-flex items-center gap-1.5 mt-1 pointer-events-none"
              >
                <i data-lucide="folder-open" class="w-4 h-4"></i>
                <span>Escolher Arquivo do Computador</span>
              </button>
            </div>

            <!-- Box de Processamento em Tempo Real -->
            <div id="nova-upload-status-box" class="hidden space-y-3 p-5 bg-dark-950 rounded-2xl border border-slate-800 text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span id="nova-format-badge" class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-brand-950 text-brand-300 border border-brand-500/30">DOCX</span>
                  <span id="nova-file-name" class="font-bold text-white truncate max-w-[220px] sm:max-w-md">arquivo.docx</span>
                  <span id="nova-file-size" class="text-slate-400 text-[11px] font-mono">(0 KB)</span>
                </div>
                <span id="nova-status-indicator" class="text-[11px] text-brand-300 font-semibold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                  Lendo documento...
                </span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div id="nova-progress-bar" class="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: 20%;"></div>
              </div>
              <p id="nova-status-detail" class="text-[11px] text-slate-400 font-mono text-center">Extraindo texto no navegador...</p>
            </div>
          </div>

          <!-- Informações Básicas da Atividade -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-5">
            <h3 class="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3.5">
              <i data-lucide="file-edit" class="w-4.5 h-4.5 text-brand-400"></i>
              1. Dados da Avaliação
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
              <div class="md:col-span-2">
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Título da Avaliação *</label>
                <input
                  type="text"
                  id="input-titulo"
                  required
                  placeholder="Ex: Avaliação Bimestral de Geografia: Urbanização e Recursos Hídricos"
                  class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Disciplina *</label>
                <select id="select-disciplina" class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none">
                  <option value="Geografia">Geografia</option>
                  <option value="Língua Portuguesa">Língua Portuguesa</option>
                  <option value="Matemática">Matemática</option>
                  <option value="História">História</option>
                  <option value="Ciências">Ciências</option>
                  <option value="Biologia">Biologia</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Inglês">Inglês</option>
                  <option value="Filosofia / Sociologia">Filosofia / Sociologia</option>
                </select>
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Ano / Turma *</label>
                <input
                  type="text"
                  id="input-turma"
                  value="8º Ano B - Ensino Fundamental"
                  class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Código / PIN da Prova</label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    id="input-codigo"
                    value="${randCode}"
                    class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-mono font-bold text-brand-300 uppercase transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Tempo Limite (Minutos)</label>
                <input
                  type="number"
                  id="input-tempo"
                  value="45"
                  min="5"
                  max="180"
                  class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Configurações do Modo Blindado Anticola -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-4">
            <h3 class="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3.5">
              <i data-lucide="shield-alert" class="w-4.5 h-4.5 text-amber-400"></i>
              2. Travas de Segurança & Anticola (Modo Blindado)
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-copiar" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Bloquear Copiar/Colar/Print</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-fullscreen" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Tela Cheia Obrigatória</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-watermark" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Marca d'Água com RA</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-aba" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Detectar e Cronometrar Troca de Aba</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-shuffle-q" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Embaralhar Ordem das Questões</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 bg-dark-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                <input type="checkbox" id="sec-shuffle-a" checked class="w-4 h-4 text-brand-600 rounded cursor-pointer" />
                <span class="text-slate-300 font-medium">Embaralhar Alternativas</span>
              </label>
            </div>
          </div>

          <!-- Banco de Questões da Avaliação -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <h3 class="font-extrabold text-base text-white flex items-center gap-2">
                <i data-lucide="help-circle" class="w-4.5 h-4.5 text-brand-400"></i>
                <span>3. Questões da Avaliação (<span id="questoes-contador" class="text-brand-400 font-mono">0</span>)</span>
              </h3>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick="ProfessorNovaAtividadeView.adicionarQuestaoManual('multipla_escolha')"
                  class="px-3 py-1.5 bg-dark-900 hover:bg-dark-800 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                  <span>+ Múltipla Escolha</span>
                </button>

                <button
                  type="button"
                  onclick="ProfessorNovaAtividadeView.adicionarQuestaoManual('dissertativa')"
                  class="px-3 py-1.5 bg-dark-900 hover:bg-dark-800 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                  <span>+ Dissertativa</span>
                </button>
              </div>
            </div>

            <!-- Lista Dinâmica de Questões -->
            <div id="questoes-list-container" class="space-y-4 pt-2">
              <div id="empty-questoes-state" class="py-10 text-center text-slate-400 bg-dark-900/50 rounded-2xl border border-dashed border-slate-800">
                <i data-lucide="sparkles" class="w-8 h-8 text-yellow-400 mx-auto mb-2"></i>
                <p class="font-bold text-white text-sm">Nenhuma questão adicionada ainda.</p>
                <p class="text-xs text-slate-400 mt-1 mb-3">Clique no botão acima para gerar com IA em segundos ou adicione manualmente.</p>
              </div>
            </div>
          </div>

          <!-- Barra de Salvamento Final -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <a href="#professor" class="px-6 py-3.5 rounded-2xl border border-slate-700 text-slate-300 hover:bg-dark-900 font-bold text-xs md:text-sm transition-all">
              Cancelar
            </a>
            <button
              type="button"
              id="btn-salvar-atividade"
              class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs md:text-sm shadow-glow-blue transition-all flex items-center gap-2 border border-white/10"
            >
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Publicar Avaliação Blindada</span>
            </button>
          </div>
        </main>

        <!-- Modal do Gerador de Questões IA -->
        <div id="ai-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4">
          <div class="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-brand-500/40 shadow-2xl space-y-5 animate-fade-in">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-glow-emerald border border-white/10">
                  <i data-lucide="sparkles" class="w-5 h-5 text-yellow-300"></i>
                </div>
                <div>
                  <h3 class="font-extrabold text-base sm:text-lg text-white">Gerador Pedagógico com IA</h3>
                  <p class="text-xs text-slate-400">Alinhado à BNCC, Prova Paulista e SARESP • Modelo Gemini 3.7 Flash</p>
                </div>
              </div>
              <button id="btn-close-ai-modal" class="text-slate-400 hover:text-white text-sm p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Tema / Conteúdo Curricular *</label>
                <input
                  type="text"
                  id="ai-input-tema"
                  placeholder="Ex: Globalização, blocos econômicos e impactos no Brasil"
                  value="Urbanização brasileira, desigualdades socioespaciais e recursos hídricos"
                  class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Nº de Questões</label>
                  <select id="ai-input-qtd" class="w-full p-3 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white outline-none">
                    <option value="2">2 questões</option>
                    <option value="3" selected>3 questões</option>
                    <option value="5">5 questões</option>
                    <option value="10">10 questões</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Tipo de Questão</label>
                  <select id="ai-input-tipo" class="w-full p-3 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white outline-none">
                    <option value="mistas" selected>Mistas (Objetivas + Dissertativas)</option>
                    <option value="multipla_escolha">Apenas Múltipla Escolha</option>
                    <option value="dissertativa">Apenas Dissertativas</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Nível de Dificuldade</label>
                  <select id="ai-input-dificuldade" class="w-full p-3 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white outline-none">
                    <option value="facil">Fácil (Diagnóstica)</option>
                    <option value="medio" selected>Médio (Bimestral)</option>
                    <option value="dificil">Desafiador (Olimpíada / Vestibulinho)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" id="btn-cancel-ai" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-dark-900 transition-all">
                Cancelar
              </button>
              <button
                type="button"
                id="btn-execute-ai-generation"
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-emerald transition-all border border-white/10"
              >
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i>
                <span id="ai-btn-text">Gerar Questões com IA</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Modal de Importação de Arquivo (Word/PDF/Excel/PPTX) -->
        <div id="upload-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4">
          <div class="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-blue-500/40 shadow-2xl space-y-5 animate-fade-in">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-glow-blue border border-white/10">
                  <i data-lucide="file-up" class="w-5 h-5 text-cyan-300"></i>
                </div>
                <div>
                  <h3 class="font-extrabold text-base sm:text-lg text-white">Importar Questionário Pronto</h3>
                  <p class="text-xs text-slate-400">Word (.docx), PDF, Excel (.xlsx) ou PowerPoint (.pptx) • Estruturação fiel por IA</p>
                </div>
              </div>
              <button id="btn-close-upload-modal" class="text-slate-400 hover:text-white text-sm p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Área de Upload / Drag & Drop -->
            <div
              id="upload-dropzone"
              class="relative overflow-hidden border-2 border-dashed border-slate-700 hover:border-brand-500 bg-dark-900/60 hover:bg-dark-900 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all space-y-3"
            >
              <input
                type="file"
                id="upload-file-input"
                accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.txt,.csv"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                title="Clique ou arraste o arquivo aqui"
              />
              <div class="w-12 h-12 rounded-2xl bg-brand-950 text-brand-400 border border-brand-500/30 flex items-center justify-center mx-auto shadow-glow-blue pointer-events-none">
                <i data-lucide="upload-cloud" class="w-6 h-6"></i>
              </div>
              <div class="pointer-events-none">
                <p class="text-sm font-bold text-white">Clique para selecionar ou arraste o arquivo aqui</p>
                <p class="text-xs text-slate-400 mt-1">Formatos aceitos: Word (.docx/.doc), PDF, Excel (.xlsx/.xls), PPTX e Texto (.txt/.csv)</p>
              </div>
              <div class="flex items-center justify-center gap-2 flex-wrap pt-1 pointer-events-none">
                <span class="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-[10px] font-bold font-mono">PDF</span>
                <span class="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[10px] font-bold font-mono">Word (.docx/.doc)</span>
                <span class="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono">Excel</span>
                <span class="px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/30 text-orange-300 text-[10px] font-bold font-mono">PPTX</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold font-mono">TXT / CSV</span>
              </div>
            </div>

            <!-- Detalhes do Arquivo & Prévia -->
            <div id="upload-file-info" class="hidden space-y-3 p-4 bg-dark-900 rounded-2xl border border-slate-800 text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span id="upload-format-badge" class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-brand-950 text-brand-300 border border-brand-500/30">DOCX</span>
                  <span id="upload-file-name" class="font-bold text-white truncate max-w-[240px] sm:max-w-md">arquivo.docx</span>
                  <span id="upload-file-size" class="text-slate-400 text-[11px] font-mono">(0 KB)</span>
                </div>
                <button type="button" id="btn-remove-selected-file" class="text-rose-400 hover:text-rose-300 p-1 text-xs" title="Remover arquivo">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>

              <!-- Status de Extração -->
              <div id="upload-progress-box" class="space-y-1.5 pt-1">
                <div class="flex items-center justify-between text-[11px]">
                  <span id="upload-status-text" class="text-brand-300 font-semibold flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                    Extraindo texto do arquivo...
                  </span>
                  <span id="upload-status-pct" class="text-slate-400 font-mono">0%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div id="upload-progress-bar" class="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300" style="width: 0%;"></div>
                </div>
              </div>

              <!-- Prévia do Texto Extraído -->
              <div id="upload-preview-container" class="pt-2 hidden">
                <div class="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1">
                  <span>Texto extraído (<span id="upload-chars-count" class="font-mono text-brand-400">0</span> caracteres):</span>
                  <span class="text-[10px] text-emerald-400 font-medium">Extração 100% no navegador</span>
                </div>
                <textarea
                  id="upload-preview-textarea"
                  rows="4"
                  class="w-full p-3 bg-dark-950 border border-slate-700 rounded-xl text-xs text-slate-300 font-mono leading-relaxed outline-none focus:border-brand-500 resize-y"
                  placeholder="Texto extraído..."
                ></textarea>
              </div>
            </div>

            <!-- Aviso de Fidelidade -->
            <div class="p-3 bg-brand-950/30 rounded-xl border border-brand-500/20 text-[11px] text-slate-300 flex items-start gap-2.5">
              <i data-lucide="info" class="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>Fidelidade Pedagógica:</strong> A IA estruturará exatamente os enunciados, alternativas e gabaritos presentes no documento, sem inventar questões extras.</span>
            </div>

            <!-- Botões de Ação do Modal -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button type="button" id="btn-cancel-upload" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-dark-900 transition-all">
                Cancelar
              </button>
              <button
                type="button"
                id="btn-execute-structuring"
                disabled
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-blue transition-all border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i>
                <span id="struct-btn-text">Estruturar Questões com IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Eventos do Modal IA
    const modal = document.getElementById("ai-modal");
    const openBtn = document.getElementById("btn-open-ai-modal");
    const closeBtn = document.getElementById("btn-close-ai-modal");
    const cancelBtn = document.getElementById("btn-cancel-ai");
    const executeAiBtn = document.getElementById("btn-execute-ai-generation");

    if (openBtn) openBtn.onclick = () => { modal.classList.remove("hidden"); modal.classList.add("flex"); };
    if (closeBtn) closeBtn.onclick = () => { modal.classList.add("hidden"); modal.classList.remove("flex"); };
    if (cancelBtn) cancelBtn.onclick = () => { modal.classList.add("hidden"); modal.classList.remove("flex"); };

    if (executeAiBtn) {
      executeAiBtn.onclick = async () => {
        const tema = document.getElementById("ai-input-tema").value.trim();
        const qtd = parseInt(document.getElementById("ai-input-qtd").value) || 3;
        const tipo = document.getElementById("ai-input-tipo").value;
        const disc = document.getElementById("select-disciplina").value;
        const turma = document.getElementById("input-turma").value;
        const dif = document.getElementById("ai-input-dificuldade").value;

        if (!tema) {
          alert("Por favor, insira o tema curricular da prova.");
          return;
        }

        executeAiBtn.disabled = true;
        document.getElementById("ai-btn-text").innerText = "Gerando questões com IA...";

        try {
          const resAI = await AIService.gerarQuestoes({
            disciplina: disc,
            anoTurma: turma,
            tema: tema,
            quantidade: qtd,
            tipoQuestoes: tipo,
            dificuldade: dif
          });

          const rawNovas = Array.isArray(resAI) ? resAI : (resAI?.resultado?.questoes || []);
          const novas = rawNovas.map((q, idx) => {
            if (!q.id) q.id = `q_gen_${idx + 1}_${Date.now()}`;
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
            return q;
          });

          if (novas && novas.length > 0) {
            novas.forEach(q => ProfessorNovaAtividadeView.questoes.push(q));
            ProfessorNovaAtividadeView.renderQuestoes();
            modal.classList.add("hidden");
            modal.classList.remove("flex");
            alert(`🎉 ${novas.length} questões geradas com sucesso!`);
          } else {
            alert("Não foi possível gerar as questões. Tente novamente.");
          }
        } catch (err) {
          alert("Erro ao gerar com IA: " + err.message);
        } finally {
          executeAiBtn.disabled = false;
          document.getElementById("ai-btn-text").innerText = "Gerar Questões com IA";
        }
      };
    }

    // Setup do Dropzone Aberto no Topo da Página de Nova Atividade
    const novaDropzone = document.getElementById("nova-upload-dropzone");
    const novaFileInput = document.getElementById("nova-file-input");
    const novaStatusBox = document.getElementById("nova-upload-status-box");
    const novaFormatBadge = document.getElementById("nova-format-badge");
    const novaFileName = document.getElementById("nova-file-name");
    const novaFileSize = document.getElementById("nova-file-size");
    const novaStatusInd = document.getElementById("nova-status-indicator");
    const novaProgressBar = document.getElementById("nova-progress-bar");
    const novaStatusDetail = document.getElementById("nova-status-detail");

    if (novaFileInput) {
      novaFileInput.onchange = () => {
        if (novaFileInput.files && novaFileInput.files.length > 0) {
          processNovaAtividadeFile(novaFileInput.files[0]);
        }
      };
    }

    if (novaDropzone) {
      novaDropzone.ondragover = (e) => {
        e.preventDefault();
        novaDropzone.classList.add("border-brand-400", "bg-brand-950/40");
      };
      novaDropzone.ondragleave = () => {
        novaDropzone.classList.remove("border-brand-400", "bg-brand-950/40");
      };
      novaDropzone.ondrop = (e) => {
        e.preventDefault();
        novaDropzone.classList.remove("border-brand-400", "bg-brand-950/40");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          processNovaAtividadeFile(e.dataTransfer.files[0]);
        }
      };
    }

    async function processNovaAtividadeFile(file) {
      if (!window.FileExtractor) {
        alert("Módulo FileExtractor não carregado. Recarregue a página.");
        return;
      }

      const format = window.FileExtractor.detectFormat(file.name);
      if (!format) {
        alert("Formato não suportado. Utilize Word (.docx/.doc), PDF (.pdf), Excel (.xlsx/.xls), PowerPoint (.pptx) ou Texto (.txt/.csv).");
        return;
      }

      novaDropzone.classList.add("hidden");
      novaStatusBox.classList.remove("hidden");

      novaFormatBadge.innerText = format.toUpperCase();
      novaFileName.innerText = file.name;
      novaFileSize.innerText = `(${(file.size / 1024).toFixed(1)} KB)`;
      novaStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> Lendo documento...`;
      novaProgressBar.style.width = "20%";
      novaStatusDetail.innerText = "Extraindo texto...";

      try {
        const extracted = await window.FileExtractor.extract(file, (msg, pct) => {
          novaStatusDetail.innerText = msg;
          novaProgressBar.style.width = `${Math.min(50, Math.round(pct * 0.5))}%`;
        });

        novaStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Estruturando questões com IA...`;
        novaProgressBar.style.width = "60%";
        novaStatusDetail.innerText = "Processando questões e alternativas sem inventar nada...";

        const resEstrutura = await AIService.estruturarQuestoes({
          texto: extracted.text,
          formato: extracted.format,
          nomeArquivo: file.name
        });

        const resultado = resEstrutura.resultado || {};
        const rawQuestoes = resultado.questoes || [];

        if (rawQuestoes.length === 0) {
          throw new Error("Nenhuma questão foi identificada no arquivo.");
        }

        const novasQuestoes = rawQuestoes.map((q, idx) => {
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
          return q;
        });

        // Preenche campos do formulário se vazios
        const tituloInput = document.getElementById("input-titulo");
        if (tituloInput && (!tituloInput.value || tituloInput.value.trim() === "")) {
          tituloInput.value = resultado.tituloSugerido || file.name.replace(/\.[^/.]+$/, "");
        }

        const discSelect = document.getElementById("select-disciplina");
        if (discSelect && resultado.disciplinaSugerida) {
          for (let opt of discSelect.options) {
            if (opt.value.toLowerCase() === resultado.disciplinaSugerida.toLowerCase()) {
              discSelect.value = opt.value;
              break;
            }
          }
        }

        novasQuestoes.forEach(q => ProfessorNovaAtividadeView.questoes.push(q));
        ProfessorNovaAtividadeView.renderQuestoes();

        novaProgressBar.style.width = "100%";
        novaStatusInd.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Concluído!`;
        novaStatusDetail.innerText = `${novasQuestoes.length} questões adicionadas com sucesso!`;

        alert(`🎉 Sucesso! ${novasQuestoes.length} questões extraídas e inseridas na avaliação pronta para salvar!`);

        novaStatusBox.classList.add("hidden");
        novaDropzone.classList.remove("hidden");
        if (novaFileInput) novaFileInput.value = "";
      } catch (err) {
        console.error("Erro na importação direta:", err);
        alert("Erro ao estruturar documento: " + err.message);
        novaStatusBox.classList.add("hidden");
        novaDropzone.classList.remove("hidden");
        if (novaFileInput) novaFileInput.value = "";
      }
    }

    // Eventos do Modal de Upload de Arquivo
    const uploadModal = document.getElementById("upload-modal");
    const openUploadBtn = document.getElementById("btn-open-upload-modal");
    const closeUploadBtn = document.getElementById("btn-close-upload-modal");
    const cancelUploadBtn = document.getElementById("btn-cancel-upload");
    const dropzone = document.getElementById("upload-dropzone");
    const fileInput = document.getElementById("upload-file-input");
    const fileInfoBox = document.getElementById("upload-file-info");
    const removeFileBtn = document.getElementById("btn-remove-selected-file");
    const structBtn = document.getElementById("btn-execute-structuring");
    const previewContainer = document.getElementById("upload-preview-container");
    const previewTextarea = document.getElementById("upload-preview-textarea");
    const statusText = document.getElementById("upload-status-text");
    const statusPct = document.getElementById("upload-status-pct");
    const progressBar = document.getElementById("upload-progress-bar");
    const formatBadge = document.getElementById("upload-format-badge");
    const fileNameEl = document.getElementById("upload-file-name");
    const fileSizeEl = document.getElementById("upload-file-size");
    const charsCountEl = document.getElementById("upload-chars-count");

    let currentExtractedData = null;

    const resetUploadState = () => {
      currentExtractedData = null;
      if (fileInput) fileInput.value = "";
      if (dropzone) dropzone.classList.remove("hidden");
      if (fileInfoBox) fileInfoBox.classList.add("hidden");
      if (previewContainer) previewContainer.classList.add("hidden");
      if (structBtn) {
        structBtn.disabled = true;
        document.getElementById("struct-btn-text").innerText = "Estruturar Questões com IA";
      }
    };

    if (openUploadBtn) {
      openUploadBtn.onclick = () => {
        resetUploadState();
        uploadModal.classList.remove("hidden");
        uploadModal.classList.add("flex");
        if (window.lucide) window.lucide.createIcons();
      };
    }

    if (closeUploadBtn) closeUploadBtn.onclick = () => { uploadModal.classList.add("hidden"); uploadModal.classList.remove("flex"); };
    if (cancelUploadBtn) cancelUploadBtn.onclick = () => { uploadModal.classList.add("hidden"); uploadModal.classList.remove("flex"); };

    if (dropzone && fileInput) {
      dropzone.onclick = () => fileInput.click();

      dropzone.ondragover = (e) => {
        e.preventDefault();
        dropzone.classList.add("border-brand-400", "bg-dark-850");
      };
      dropzone.ondragleave = () => {
        dropzone.classList.remove("border-brand-400", "bg-dark-850");
      };
      dropzone.ondrop = (e) => {
        e.preventDefault();
        dropzone.classList.remove("border-brand-400", "bg-dark-850");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          processSelectedFile(e.dataTransfer.files[0]);
        }
      };

      fileInput.onchange = () => {
        if (fileInput.files && fileInput.files.length > 0) {
          processSelectedFile(fileInput.files[0]);
        }
      };
    }

    if (removeFileBtn) {
      removeFileBtn.onclick = () => resetUploadState();
    }

    async function processSelectedFile(file) {
      if (!window.FileExtractor) {
        alert("Módulo de extração de arquivos não carregado. Recarregue a página.");
        return;
      }

      const format = window.FileExtractor.detectFormat(file.name);
      if (!format) {
        alert("Formato não suportado. Envie um arquivo Word (.docx), PDF (.pdf), Excel (.xlsx/.xls) ou PowerPoint (.pptx).");
        return;
      }

      if (file.size > 30 * 1024 * 1024) {
        alert("O arquivo excede o limite de 30MB.");
        return;
      }

      // Atualizar interface para estado de processamento
      dropzone.classList.add("hidden");
      fileInfoBox.classList.remove("hidden");
      previewContainer.classList.add("hidden");
      structBtn.disabled = true;

      formatBadge.innerText = format.toUpperCase();
      formatBadge.className = `px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
        format === "pdf" ? "bg-red-950 text-red-300 border border-red-500/30" :
        format === "docx" ? "bg-blue-950 text-blue-300 border border-blue-500/30" :
        format === "xlsx" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" :
        "bg-orange-950 text-orange-300 border border-orange-500/30"
      }`;

      fileNameEl.innerText = file.name;
      fileSizeEl.innerText = `(${(file.size / 1024).toFixed(1)} KB)`;
      statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> Extraindo texto do documento no navegador...`;
      statusPct.innerText = "10%";
      progressBar.style.width = "10%";

      try {
        const extracted = await window.FileExtractor.extract(file, (msg, pct) => {
          if (statusText) statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> ${msg}`;
          if (statusPct) statusPct.innerText = `${pct}%`;
          if (progressBar) progressBar.style.width = `${pct}%`;
        });

        currentExtractedData = extracted;

        statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Texto extraído com sucesso no navegador!`;
        statusPct.innerText = "100%";
        progressBar.style.width = "100%";

        previewContainer.classList.remove("hidden");
        previewTextarea.value = extracted.text;
        charsCountEl.innerText = extracted.text.length;

        structBtn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      } catch (err) {
        console.error("Erro na extração:", err);
        alert("Erro ao extrair texto do arquivo: " + err.message);
        resetUploadState();
      }
    }

    if (structBtn) {
      structBtn.onclick = async () => {
        if (!currentExtractedData && (!previewTextarea || !previewTextarea.value.trim())) {
          alert("Nenhum texto disponível para estruturação.");
          return;
        }

        const textoFinal = previewTextarea.value.trim();
        if (textoFinal.length < 15) {
          alert("Texto muito curto para estruturar uma avaliação.");
          return;
        }

        structBtn.disabled = true;
        const btnText = document.getElementById("struct-btn-text");
        btnText.innerText = "Estruturando questões com IA...";

        try {
          const resEstrutura = await AIService.estruturarQuestoes({
            texto: textoFinal,
            formato: currentExtractedData ? currentExtractedData.format : "documento",
            nomeArquivo: currentExtractedData ? currentExtractedData.fileName : ""
          });

          const resultado = resEstrutura.resultado || {};
          const rawQuestoes = resultado.questoes || [];

          if (rawQuestoes.length === 0) {
            throw new Error("A IA não identificou questões no texto fornecido. Verifique o conteúdo do arquivo.");
          }

          const novasQuestoes = rawQuestoes.map((q, idx) => {
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
            return q;
          });

          // Preencher título se sugerido e formulário estiver vazio/padrão
          const tituloInput = document.getElementById("input-titulo");
          if (resultado.tituloSugerido && tituloInput && (!tituloInput.value || tituloInput.value.includes("Ex:"))) {
            tituloInput.value = resultado.tituloSugerido;
          }

          // Preencher disciplina se detectada
          if (resultado.disciplinaSugerida) {
            const discSelect = document.getElementById("select-disciplina");
            for (let i = 0; i < discSelect.options.length; i++) {
              if (discSelect.options[i].value.toLowerCase() === resultado.disciplinaSugerida.toLowerCase()) {
                discSelect.selectedIndex = i;
                break;
              }
            }
          }

          // Adicionar questões à avaliação
          novasQuestoes.forEach(q => ProfessorNovaAtividadeView.questoes.push(q));
          ProfessorNovaAtividadeView.renderQuestoes();

          uploadModal.classList.add("hidden");
          uploadModal.classList.remove("flex");
          resetUploadState();

          alert(`🎉 Sucesso! ${novasQuestoes.length} questões importadas e estruturadas fielmente no formato do sistema!`);
        } catch (err) {
          console.error("Erro na estruturação:", err);
          alert("Erro ao estruturar questões: " + err.message);
        } finally {
          structBtn.disabled = false;
          btnText.innerText = "Estruturar Questões com IA";
        }
      };
    }

    // Salvar Atividade
    const salvarBtn = document.getElementById("btn-salvar-atividade");
    if (salvarBtn) {
      salvarBtn.onclick = async () => {
        const titulo = document.getElementById("input-titulo").value.trim();
        const disciplina = document.getElementById("select-disciplina").value;
        const turma = document.getElementById("input-turma").value.trim();
        const codigo = document.getElementById("input-codigo").value.trim().toUpperCase();
        const tempo = parseInt(document.getElementById("input-tempo").value) || 45;

        if (!titulo) {
          alert("Por favor, preencha o título da avaliação.");
          return;
        }

        if (ProfessorNovaAtividadeView.questoes.length === 0) {
          alert("Adicione pelo menos 1 questão à avaliação antes de salvar.");
          return;
        }

        const novaAtividade = {
          id: `ativ-${codigo.toLowerCase()}-${Date.now()}`,
          codigo: codigo,
          titulo: titulo,
          disciplina: disciplina,
          anoTurma: turma,
          professorNome: sessionStorage.getItem("professor_nome") || localStorage.getItem("professor_nome") || "Professor(a)",
          escola: sessionStorage.getItem("professor_escola") || localStorage.getItem("professor_escola") || "Unidade Escolar",
          professorEmail: sessionStorage.getItem("professor_email") || localStorage.getItem("professor_email") || "",
          dataCriacao: new Date().toISOString(),
          tempoLimiteMinutos: tempo,
          configuracoesSeguranca: {
            bloquearCopiarColar: document.getElementById("sec-copiar").checked,
            telaCheiaObrigatoria: document.getElementById("sec-fullscreen").checked,
            marcaDaguaRA: document.getElementById("sec-watermark").checked,
            detectarTrocaAba: document.getElementById("sec-aba").checked,
            embaralharQuestoes: document.getElementById("sec-shuffle-q").checked,
            embaralharAlternativas: document.getElementById("sec-shuffle-a").checked
          },
          questoes: ProfessorNovaAtividadeView.questoes
        };

        salvarBtn.disabled = true;
        salvarBtn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Salvando avaliação...`;

        try {
          await DB.salvarAtividade(novaAtividade);
          alert(`Avaliação "${titulo}" cadastrada com sucesso! Código para os alunos: ${codigo}`);
          window.location.hash = "#professor";
        } catch (e) {
          alert("Erro ao salvar atividade: " + e.message);
          salvarBtn.disabled = false;
          salvarBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>Publicar Avaliação Blindada</span>`;
          if (window.lucide) window.lucide.createIcons();
        }
      };
    }
  },

  adicionarQuestaoManual(tipo) {
    const id = `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let nova = null;

    if (tipo === "multipla_escolha") {
      nova = {
        id: id,
        tipo: "multipla_escolha",
        enunciado: "Digite o enunciado da questão objetiva aqui...",
        peso: 2.5,
        habilidadeBNCC: "EF08GE05",
        alternativas: [
          { id: "A", texto: "Primeira alternativa" },
          { id: "B", texto: "Segunda alternativa" },
          { id: "C", texto: "Terceira alternativa" },
          { id: "D", texto: "Quarta alternativa" }
        ],
        correta: "A",
        justificativa: "Explicação do gabarito correto."
      };
    } else {
      nova = {
        id: id,
        tipo: "dissertativa",
        enunciado: "Digite o comando da questão dissertativa aqui...",
        peso: 2.5,
        habilidadeBNCC: "EF08GE12",
        respostaEsperada: "Pontos principais que o aluno deve contemplar na resposta.",
        criteriosCorrecao: "Critérios de avaliação para a IA ou professora."
      };
    }

    this.questoes.push(nova);
    this.renderQuestoes();
  },

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  renderQuestoes() {
    const container = document.getElementById("questoes-list-container");
    const countEl = document.getElementById("questoes-contador");
    if (countEl) countEl.innerText = this.questoes.length;

    if (!container) return;

    if (this.questoes.length === 0) {
      container.innerHTML = `
        <div id="empty-questoes-state" class="py-10 text-center text-slate-400 bg-dark-900/50 rounded-2xl border border-dashed border-slate-800">
          <i data-lucide="sparkles" class="w-8 h-8 text-yellow-400 mx-auto mb-2"></i>
          <p class="font-bold text-white text-sm">Nenhuma questão adicionada ainda.</p>
          <p class="text-xs text-slate-400 mt-1 mb-3">Clique no botão acima para gerar com IA em segundos ou adicione manualmente.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = this.questoes.map((q, idx) => {
      const isDissertativa = q.tipo === "dissertativa";
      const escEnunciado = this.escapeHtml(q.enunciado);
      const escGabarito = this.escapeHtml(q.respostaEsperada || "");

      return `
        <div class="glass-card rounded-2xl p-5 border border-slate-800 relative space-y-3.5 text-xs">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-brand-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                ${idx + 1}
              </span>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${isDissertativa ? "bg-purple-950 text-purple-300 border border-purple-500/30" : "bg-brand-950 text-brand-300 border border-brand-500/30"}">
                ${isDissertativa ? "Dissertativa" : "Múltipla Escolha"}
              </span>
              ${q.habilidadeBNCC ? `
                <span class="px-2 py-0.5 rounded-md bg-dark-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                  BNCC: ${this.escapeHtml(q.habilidadeBNCC)}
                </span>
              ` : ""}
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[11px] text-slate-400 font-semibold">Valor:</span>
              <input
                type="number"
                step="0.5"
                value="${q.peso || 2.5}"
                onchange="ProfessorNovaAtividadeView.questoes[${idx}].peso = parseFloat(this.value)"
                class="w-14 p-1 bg-dark-900 border border-slate-700 rounded text-center text-white text-xs font-bold outline-none"
              />
              <button
                type="button"
                onclick="ProfessorNovaAtividadeView.removerQuestao(${idx})"
                class="text-rose-400 hover:text-rose-300 p-1 ml-2 transition-colors"
                title="Excluir questão"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-slate-400 mb-1 text-[10px]">Enunciado da Questão:</label>
            <textarea
              rows="2"
              oninput="ProfessorNovaAtividadeView.questoes[${idx}].enunciado = this.value"
              class="w-full p-3 bg-dark-900 border border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-white leading-relaxed focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            >${escEnunciado}</textarea>
          </div>

          ${!isDissertativa ? `
            <div class="space-y-2 pt-1">
              <label class="block font-bold uppercase tracking-wider text-slate-400 text-[10px]">Alternativas (Selecione a correta):</label>
              ${(q.alternativas || []).map((alt, aIdx) => {
                const altIdUpper = String(alt.id || "").toUpperCase().trim();
                const qCorretaUpper = String(q.correta || "").toUpperCase().trim();
                const isChecked = qCorretaUpper === altIdUpper;
                const escAltTexto = this.escapeHtml(alt.texto);

                return `
                <div class="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="correta-${q.id}"
                    ${isChecked ? "checked" : ""}
                    onchange="ProfessorNovaAtividadeView.questoes[${idx}].correta = '${altIdUpper}'"
                    class="w-4 h-4 text-emerald-600 rounded-full cursor-pointer"
                  />
                  <span class="w-5 font-mono font-bold text-slate-400 text-xs text-center">${altIdUpper})</span>
                  <input
                    type="text"
                    value="${escAltTexto}"
                    oninput="ProfessorNovaAtividadeView.questoes[${idx}].alternativas[${aIdx}].texto = this.value"
                    class="w-full p-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
                `;
              }).join("")}
            </div>
          ` : `
            <div class="pt-1">
              <label class="block font-bold uppercase tracking-wider text-purple-400 text-[10px] mb-1">Gabarito / Expectativa de Resposta:</label>
              <textarea
                rows="2"
                oninput="ProfessorNovaAtividadeView.questoes[${idx}].respostaEsperada = this.value"
                class="w-full p-3 bg-dark-900 border border-purple-500/30 rounded-xl text-xs text-slate-300 outline-none focus:border-purple-500"
                placeholder="Critérios e pontos essenciais para a correção da IA..."
              >${escGabarito}</textarea>
            </div>
          `}
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  },

  removerQuestao(idx) {
    if (confirm("Deseja remover esta questão?")) {
      this.questoes.splice(idx, 1);
      this.renderQuestoes();
    }
  }
};

window.ProfessorNovaAtividadeView = ProfessorNovaAtividadeView;
