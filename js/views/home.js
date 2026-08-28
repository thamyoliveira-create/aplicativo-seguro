/**
 * View: Home / Landing Page
 */

const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <div class="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-slate-100 to-blue-50 text-slate-800">
        <!-- Barra Superior Institucional -->
        <header class="bg-[#002b66] text-white py-3 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <i data-lucide="shield-check" class="w-6 h-6 text-yellow-400"></i>
              </div>
              <div>
                <h1 class="font-extrabold text-lg tracking-tight flex items-center gap-2">
                  Atividade Segura
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-700/80 text-blue-100 border border-blue-400/30">
                    Edição SP
                  </span>
                </h1>
                <p class="text-xs text-blue-200">Plataforma de Avaliação Anticola & IA Pedagógica</p>
              </div>
            </div>
            <div class="flex items-center gap-4 text-xs font-medium">
              <span class="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemini 3.7 Flash Integrado
              </span>
              <a href="#professor/configuracoes" class="hover:text-blue-200 flex items-center gap-1 text-slate-300">
                <i data-lucide="settings" class="w-4 h-4"></i>
                <span class="hidden sm:inline">Configurações</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <main class="max-w-6xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold mb-4 border border-blue-200">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-blue-600"></i>
              Ambiente de Prova Blindado & Criação Inteligente
            </div>
            <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Avaliações escolares protegidas contra cola e potencializadas por IA
            </h2>
            <p class="text-base md:text-lg text-slate-600 mt-4 leading-relaxed">
              Gere questões contextualizadas alinhadas à <strong>BNCC</strong> e <strong>Prova Paulista</strong>. Quando os alunos acessam, a tela trava com bloqueio de cópia, marca d'água com RA e registro em tempo real de trocas de abas.
            </p>
          </div>

          <!-- Cards de Acesso Principal (Aluno vs Professora) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            <!-- Card Aluno -->
            <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <i data-lucide="graduation-cap" class="w-7 h-7"></i>
              </div>
              <span class="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Área do Estudante
              </span>
              <h3 class="text-2xl font-bold text-slate-900 mt-3 mb-2">Sou Aluno(a)</h3>
              <p class="text-slate-600 text-sm mb-6 leading-relaxed">
                Digite o código fornecido pela sua professora, seu RA estadual e e-mail institucional para iniciar sua atividade em modo seguro.
              </p>
              <div class="space-y-3">
                <a href="#aluno" class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-sm">
                  <span>Acessar Avaliação com Código</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
                <a href="#aluno/prova/GEO-8B-2026" class="w-full py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center justify-center gap-2 text-xs transition-colors">
                  <i data-lucide="play-circle" class="w-3.5 h-3.5 text-blue-600"></i>
                  <span>Testar Simulação Rápida (GEO-8B-2026)</span>
                </a>
              </div>
            </div>

            <!-- Card Professora -->
            <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div class="w-14 h-14 rounded-2xl bg-[#002b66] text-yellow-400 flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20">
                <i data-lucide="sparkles" class="w-7 h-7"></i>
              </div>
              <span class="text-xs uppercase font-bold tracking-wider text-[#002b66] bg-blue-50 px-2.5 py-1 rounded-md">
                Painel Pedagógico
              </span>
              <h3 class="text-2xl font-bold text-slate-900 mt-3 mb-2">Sou Professor(a)</h3>
              <p class="text-slate-600 text-sm mb-6 leading-relaxed">
                Crie atividades dissertativas e de múltipla escolha com IA, configure as travas de segurança e visualize relatórios de infrações.
              </p>
              <div class="space-y-3">
                <a href="#professor" class="w-full py-3.5 px-6 rounded-xl bg-[#002b66] hover:bg-[#001f4d] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/25 transition-all text-sm">
                  <span>Acessar Painel da Professora</span>
                  <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                </a>
                <a href="#professor/nova-atividade" class="w-full py-2 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium flex items-center justify-center gap-2 text-xs border border-emerald-200 transition-colors">
                  <i data-lucide="plus-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                  <span>Criar Nova Atividade com IA Gemini</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Grade de Recursos de Segurança & Pedagógicos -->
          <div class="mt-16 pt-12 border-t border-slate-200/80">
            <h4 class="text-center font-bold text-slate-500 uppercase text-xs tracking-widest mb-8">
              Mecanismos Ativos de Integridade e Inteligência
            </h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div class="bg-white/70 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-3">
                  <i data-lucide="copy-slash" class="w-4 h-4"></i>
                </div>
                <h5 class="font-bold text-sm text-slate-800">Bloqueio Total</h5>
                <p class="text-xs text-slate-500 mt-1">Impede Ctrl+C, Ctrl+V, seleção, arrastar e impressão em PDF.</p>
              </div>

              <div class="bg-white/70 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </div>
                <h5 class="font-bold text-sm text-slate-800">Troca de Abas</h5>
                <p class="text-xs text-slate-500 mt-1">Registra data, hora e segundos de cada saída da página.</p>
              </div>

              <div class="bg-white/70 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <i data-lucide="shield-alert" class="w-4 h-4"></i>
                </div>
                <h5 class="font-bold text-sm text-slate-800">Marca d'Água RA</h5>
                <p class="text-xs text-slate-500 mt-1">Carimbo visual contínuo anti-foto externa de celular.</p>
              </div>

              <div class="bg-white/70 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <i data-lucide="bot" class="w-4 h-4"></i>
                </div>
                <h5 class="font-bold text-sm text-slate-800">Correção IA</h5>
                <p class="text-xs text-slate-500 mt-1">Análise instantânea de dissertativas com base na rubrica.</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Rodapé -->
        <footer class="bg-slate-900 text-slate-400 py-6 px-4 text-center text-xs border-t border-slate-800">
          <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>Atividade Segura © 2026 — Desenvolvido para Professores e Alunos da Rede Pública Estadual SP</p>
            <div class="flex items-center gap-4">
              <span class="text-slate-500">Validação: @aluno.educacao.sp.gov.br</span>
            </div>
          </div>
        </footer>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};

window.HomeView = HomeView;
