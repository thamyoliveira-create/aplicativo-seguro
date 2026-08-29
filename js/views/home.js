/**
 * View: Landing Page Moderna e Portal do Estudante
 * Design System: Silicon Valley / GovTech SP Educational Standard
 */

const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
        
        <!-- 1. Barra de Navegação Superior Fixa -->
        <header class="sticky top-0 z-50 glass-nav transition-all">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <a href="#" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform border border-white/10">
                <i data-lucide="shield-check" class="w-5 h-5 text-yellow-400"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-base tracking-tight text-white">Atividade Segura</span>
                  <span class="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    SEDUC-SP
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 font-medium">Plataforma Digital de Avaliação</p>
              </div>
            </a>

            <!-- Links de Navegação (Desktop) -->
            <nav class="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
              <a href="#como-funciona" class="hover:text-brand-400 transition-colors">Como Funciona</a>
              <a href="#orientacoes" class="hover:text-brand-400 transition-colors">Orientações</a>
              <a href="#dicas" class="hover:text-brand-400 transition-colors">Dicas</a>
              <a href="#faq" class="hover:text-brand-400 transition-colors">Dúvidas Frequentes</a>
            </nav>

            <!-- Botão CTA Topo -->
            <div class="flex items-center gap-3">
              <a
                href="#secao-login"
                class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white text-xs font-bold shadow-glow-blue transition-all flex items-center gap-1.5 border border-brand-400/20"
              >
                <span>Acessar Prova</span>
                <i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </header>

        <!-- 2. HERO SECTION COM BACKGROUND MESH & GRID -->
        <section class="relative overflow-hidden hero-mesh bg-grid-pattern pt-16 pb-24 px-4 sm:px-6 border-b border-slate-800/80">
          <div class="max-w-4xl mx-auto text-center relative z-10">
            <!-- Badge Superior -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/80 text-brand-300 border border-brand-500/30 text-xs font-semibold mb-6 shadow-inner animate-fade-in">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ambiente Oficial de Avaliação • Rede Estadual de São Paulo</span>
            </div>

            <!-- Título Principal com Gradiente -->
            <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight md:leading-[1.12] mb-6">
              Sua avaliação escolar em um ambiente <span class="bg-gradient-to-r from-brand-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">seguro, focado e justo</span>.
            </h1>

            <!-- Subtítulo Explicativo -->
            <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              Realize suas atividades bimestrais e simulados preparatórios com total tranquilidade. Suas respostas são salvas automaticamente a cada clique.
            </p>

            <!-- Botões de Ação -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <a
                href="#secao-login"
                class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 border border-white/10"
              >
                <span>Fazer Login & Responder Prova</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>

              <a
                href="#orientacoes"
                class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-dark-800/80 hover:bg-dark-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <i data-lucide="book-open" class="w-4 h-4 text-brand-400"></i>
                <span>Ver Orientações de Prova</span>
              </a>
            </div>

            <!-- 3 Badges em Destaque -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div class="glass-card p-4.5 rounded-2xl flex items-center gap-3.5 feature-card">
                <div class="w-11 h-11 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="cloud-check" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Salvamento Contínuo</h4>
                  <p class="text-[11px] text-slate-400 mt-0.5">Nada se perde se a internet cair</p>
                </div>
              </div>

              <div class="glass-card p-4.5 rounded-2xl flex items-center gap-3.5 feature-card">
                <div class="w-11 h-11 rounded-xl bg-brand-950/70 text-brand-400 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="smartphone" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Celular ou Computador</h4>
                  <p class="text-[11px] text-slate-400 mt-0.5">100% otimizado e responsivo</p>
                </div>
              </div>

              <div class="glass-card p-4.5 rounded-2xl flex items-center gap-3.5 feature-card">
                <div class="w-11 h-11 rounded-xl bg-purple-950/70 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="shield" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Ambiente Igualitário</h4>
                  <p class="text-[11px] text-slate-400 mt-0.5">Mesmas regras para toda a sala</p>
                </div>
              </div>
            </div>
          </section>

        <!-- 3. SEÇÃO: COMO FUNCIONA O ACESSO (3 PASSOS) -->
        <section id="como-funciona" class="py-18 px-4 sm:px-6 max-w-5xl mx-auto w-full border-b border-slate-800/80 my-4">
          <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-950/80 px-3 py-1 rounded-full border border-brand-800/50">
              Passo a Passo
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-3.5">
              Como acessar e realizar a sua avaliação
            </h2>
            <p class="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Basta ter em mãos o seu e-mail institucional e o código informado pela professora em sala de aula.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Passo 1 -->
            <div class="glass-card p-6.5 rounded-3xl relative overflow-hidden feature-card">
              <div class="w-11 h-11 rounded-2xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-brand-600/30">
                1
              </div>
              <h3 class="text-base font-bold text-white mb-2">Identificação Institucional</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Digite seu e-mail terminado em <code class="text-brand-300 font-mono bg-brand-950/60 px-1 py-0.5 rounded">@aluno.educacao.sp.gov.br</code>, seu nome completo e seu RA oficial de SP.
              </p>
            </div>
            <div class="trust-item"><b>02</b><span><strong>IA com direção pedagógica</strong>Você define série, habilidade BNCC, tema e nível de dificuldade.</span></div>
            <div class="trust-item"><b>03</b><span><strong>Perfis separados</strong>Aluno não vê painel, gabarito ou dados da professora.</span></div>
          </section>

            <!-- Passo 2 -->
            <div class="glass-card p-6.5 rounded-3xl relative overflow-hidden feature-card">
              <div class="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-indigo-600/30">
                2
              </div>
              <h3 class="text-base font-bold text-white mb-2">Código da Atividade</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Insira o código alfanumérico (ex: <span class="font-mono text-indigo-300 font-bold bg-indigo-950/60 px-1 py-0.5 rounded">GEO-8B-2026</span>) ou PIN da prova passado pela professora.
              </p>
            </div>

            <!-- Passo 3 -->
            <div class="glass-card p-6.5 rounded-3xl relative overflow-hidden feature-card">
              <div class="w-11 h-11 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-emerald-600/30">
                3
              </div>
              <h3 class="text-base font-bold text-white mb-2">Modo Prova Focado</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                A prova abre em tela cheia protegida. Você responde com calma, acompanha o tempo restante e envia com 1 clique ao finalizar.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. SEÇÃO: GUIA OFICIAL DE ORIENTAÇÕES DE PROVA -->
        <section id="orientacoes" class="py-18 px-4 sm:px-6 max-w-5xl mx-auto w-full border-b border-slate-800/80 my-4">
          <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
              Diretrizes Oficiais
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-3.5">
              Orientações para o Modo de Avaliação
            </h2>
            <p class="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Conheça as regras e o funcionamento do sistema para realizar sua prova com total confiança e sem surpresas.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <!-- Card 1: Tela Cheia -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-brand-900/40 text-brand-400 flex items-center justify-center mb-3.5 border border-brand-500/20">
                <i data-lucide="maximize" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Tela Cheia Obrigatória</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                A avaliação exige foco em tela cheia. Se sair sem querer, uma janela permite retornar imediatamente de onde parou.
              </p>
            </div>

            <!-- Card 2: Troca de Abas -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-amber-900/40 text-amber-400 flex items-center justify-center mb-3.5 border border-amber-500/20">
                <i data-lucide="eye" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Mantenha-se na Aba</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Não saia da aba nem minimize a janela. O sistema registra eventuais trocas de página e o tempo decorrido no relatório docente.
              </p>
            </div>

            <!-- Card 3: Salvamento Automático -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center mb-3.5 border border-emerald-500/20">
                <i data-lucide="save" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Salvamento Automático</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Cada alternativa marcada e texto digitado fica salvo instantaneamente no navegador e no banco de dados da professora.
              </p>
            </div>

            <!-- Card 4: Marca d'água -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-400 flex items-center justify-center mb-3.5 border border-purple-500/20">
                <i data-lucide="fingerprint" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Marca com seu RA</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Uma marca d'água sutil com seu Nome e RA cobre a tela continuamente para certificar a autenticidade da sua sessão.
              </p>
            </div>

            <!-- Card 5: Bloqueio de Cópia -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-rose-900/40 text-rose-400 flex items-center justify-center mb-3.5 border border-rose-500/20">
                <i data-lucide="copy-slash" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Bloqueio de Cópia & Print</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Atalhos como Ctrl+C, Ctrl+V, botão direito e impressão em PDF ficam desativados para assegurar a integridade da prova.
              </p>
            </div>

            <!-- Card 6: Tempo e Entrega -->
            <div class="glass-card p-5.5 rounded-2xl feature-card">
              <div class="w-10 h-10 rounded-xl bg-teal-900/40 text-teal-400 flex items-center justify-center mb-3.5 border border-teal-500/20">
                <i data-lucide="clock" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Cronômetro em Tempo Real</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Veja os minutos restantes no topo. Ao terminar todas as questões, revise e clique em "Finalizar Avaliação".
              </p>
            </div>
          </div>
        </section>

        <!-- 5. SEÇÃO: DICAS PARA MANDAR BEM NA PROVA -->
        <section id="dicas" class="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div class="bg-gradient-to-br from-brand-950/70 via-dark-900 to-indigo-950/70 border border-brand-800/50 rounded-3xl p-7 sm:p-9 shadow-xl">
            <h3 class="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2.5 mb-5">
              <i data-lucide="lightbulb" class="w-5 h-5 text-yellow-400"></i>
              Checklist Rápido antes de Iniciar:
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4.5 text-xs text-slate-300">
              <div class="flex items-start gap-3 bg-dark-950/50 p-3.5 rounded-2xl border border-slate-800/60">
                <span class="text-emerald-400 font-extrabold text-sm">✓</span>
                <span><strong>Bateria Carregada:</strong> Verifique se o celular ou computador tem carga suficiente.</span>
              </div>
              <div class="flex items-start gap-3 bg-dark-950/50 p-3.5 rounded-2xl border border-slate-800/60">
                <span class="text-emerald-400 font-extrabold text-sm">✓</span>
                <span><strong>Conexão Estável:</strong> Conecte-se ao Wi-Fi escolar ou dados móveis seguros.</span>
              </div>
              <div class="flex items-start gap-3 bg-dark-950/50 p-3.5 rounded-2xl border border-slate-800/60">
                <span class="text-emerald-400 font-extrabold text-sm">✓</span>
                <span><strong>Leitura Atenta:</strong> Leia os textos de apoio e comandos com bastante calma.</span>
              </div>
              <div class="flex items-start gap-3 bg-dark-950/50 p-3.5 rounded-2xl border border-slate-800/60">
                <span class="text-emerald-400 font-extrabold text-sm">✓</span>
                <span><strong>Fundamente suas Respostas:</strong> Nas dissertativas, explique seus argumentos com clareza.</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. SEÇÃO DO FORMULÁRIO DE LOGIN DO ESTUDANTE -->
        <section id="secao-login" class="py-18 px-4 sm:px-6 max-w-lg mx-auto w-full">
          <div class="bg-white text-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-200/90 relative overflow-hidden">
            <div class="text-center mb-7">
              <div class="w-15 h-15 bg-brand-100 text-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-brand-500/10">
                <i data-lucide="graduation-cap" class="w-8 h-8"></i>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Acesso à Avaliação</h2>
              <p class="text-xs text-slate-500 mt-1.5 font-medium">Preencha seus dados institucionais para iniciar a prova</p>
            </div>

            <form id="form-aluno-home" class="space-y-4 text-xs">
              <!-- E-mail Institucional -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between text-[11px]">
                  <span>E-mail Institucional *</span>
                  <span class="text-[10px] text-brand-600 font-semibold lowercase font-mono">@aluno.educacao.sp.gov.br</span>
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="home-aluno-email"
                    required
                    placeholder="nome.sobrenome@aluno.educacao.sp.gov.br"
                    class="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 focus:bg-white text-xs font-medium transition-all outline-none"
                  />
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Nome Completo -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Seu Nome Completo *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-nome"
                    required
                    placeholder="Ex: Gabriel Santos de Oliveira"
                    class="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 focus:bg-white text-xs font-medium transition-all outline-none"
                  />
                  <i data-lucide="user" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- RA (Registro do Aluno) -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between text-[11px]">
                  <span>RA (Registro do Aluno) *</span>
                  <span class="text-[10px] text-slate-400 font-mono font-normal">Ex: 108.452.981-3/SP</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-ra"
                    required
                    placeholder="000.000.000-0/SP"
                    class="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 focus:bg-white text-xs font-mono font-semibold transition-all outline-none"
                  />
                  <i data-lucide="id-card" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Código da Atividade ou PIN -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between text-[11px]">
                  <span>Código da Prova ou PIN *</span>
                  <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Informado pela Professora</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-codigo"
                    required
                    value="GEO-8B-2026"
                    placeholder="Ex: GEO-8B-2026 ou 8421"
                    class="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 focus:bg-white text-xs font-mono font-bold uppercase tracking-wider transition-all outline-none"
                  />
                  <i data-lucide="key" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Checkbox de Ciência -->
              <div class="flex items-center gap-2.5 pt-2">
                <input type="checkbox" id="home-aluno-concordo" required class="w-4 h-4 text-brand-600 rounded cursor-pointer border-slate-300 focus:ring-brand-500" />
                <label for="home-aluno-concordo" class="text-[11px] text-slate-600 cursor-pointer select-none leading-tight font-medium">
                  Li as orientações de segurança e estou pronto(a) para responder.
                </label>
              </div>

              <button
                type="submit"
                id="btn-iniciar-prova-aluno"
                class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-extrabold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2 mt-2 border border-white/10"
              >
                <span>Acessar e Responder Avaliação</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </section>

        <!-- 7. SEÇÃO: PERGUNTAS FREQUENTES (FAQ) -->
        <section id="faq" class="py-18 px-4 sm:px-6 max-w-3xl mx-auto w-full border-t border-slate-800/80 my-4">
          <div class="text-center mb-12">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-950/80 px-3 py-1 rounded-full border border-brand-800/50">
              FAQ
            </span>
            <h3 class="text-xl sm:text-2xl font-extrabold text-white mt-3.5">Dúvidas Frequentes dos Estudantes</h3>
            <p class="text-xs text-slate-400 mt-1.5">Respostas rápidas para as principais dúvidas sobre a plataforma</p>
          </div>

          <div class="space-y-3.5 text-xs" id="faq-accordion">
            <!-- FAQ 1 -->
            <details class="glass-card rounded-2xl p-4.5 group cursor-pointer transition-all border border-slate-800/80">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none select-none">
                <span>E se a minha conexão com a internet oscilar ou cair?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-3 leading-relaxed pl-1">
                Fique tranquilo(a)! O sistema salva cada resposta automaticamente no seu navegador. Assim que a conexão for restabelecida, tudo é sincronizado sem que você perca nada do que já fez.
              </p>
            </details>

            <!-- FAQ 2 -->
            <details class="glass-card rounded-2xl p-4.5 group cursor-pointer transition-all border border-slate-800/80">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none select-none">
                <span>Posso responder à prova pelo celular?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-3 leading-relaxed pl-1">
                Sim! O Atividade Segura funciona perfeitamente em smartphones, tablets, notebooks e computadores de mesa, adaptando o tamanho dos textos e botões automaticamente.
              </p>
            </details>

            <!-- FAQ 3 -->
            <details class="glass-card rounded-2xl p-4.5 group cursor-pointer transition-all border border-slate-800/80">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none select-none">
                <span>O que acontece se eu sair da tela cheia sem querer?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-3 leading-relaxed pl-1">
                A prova é pausada e uma janela com o botão "Retornar em Tela Cheia" aparece na sua tela. Basta clicar nele para continuar respondendo exatamente de onde parou.
              </p>
            </details>

            <!-- FAQ 4 -->
            <details class="glass-card rounded-2xl p-4.5 group cursor-pointer transition-all border border-slate-800/80">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none select-none">
                <span>Onde consigo o código da minha prova?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-3 leading-relaxed pl-1">
                A sua professora informa o código (por exemplo: <code class="text-brand-300 font-mono font-bold">GEO-8B-2026</code>) ou o PIN numérico na lousa da sala de aula ou no mural do Google Classroom.
              </p>
            </details>
          </div>
        </section>

        <!-- 8. RODAPÉ INSTITUCIONAL & ACESSO DOCENTE PROTEGIDO -->
        <footer class="bg-dark-950 text-slate-500 py-8 px-4 border-t border-slate-800/90 text-xs mt-auto">
          <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-bold text-slate-300 text-sm">Atividade Segura © 2026</p>
              <p class="text-[11px] text-slate-500 mt-0.5">Desenvolvido para Escolas e Estudantes da Rede Pública Estadual SP</p>
            </div>
            
            <div class="flex items-center gap-4">
              <span class="text-[11px] text-slate-500 font-mono hidden sm:inline">@aluno.educacao.sp.gov.br</span>
              <a
                href="#docente"
                class="text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors font-semibold"
                title="Área exclusiva dos professores (requer senha)"
              >
                <i data-lucide="lock" class="w-3.5 h-3.5 text-brand-400"></i>
                <span>Acesso Docente</span>
              </a>
            </div>
          </section>
        </main>

        <footer class="landing-footer">
          <span>Atividade Segura · projeto independente para apoio pedagógico — não é um sistema oficial da SEDUC-SP</span>
          <span>Perfis aceitos: @professor e @aluno.educacao.sp.gov.br</span>
        </footer>
      </div>`;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.HomeView = HomeView;
