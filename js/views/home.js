const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        
        <!-- 1. Barra de Navegação Superior Fixa -->
        <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <a href="#" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <i data-lucide="shield-check" class="w-6 h-6 text-yellow-400"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-base tracking-tight text-white">Atividade Segura</span>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    SEDUC-SP
                  </span>
                </div>
                <p class="text-[11px] text-slate-400">Portal Oficial do Estudante</p>
              </div>
            </a>

            <!-- Links de Navegação (Desktop) -->
            <nav class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <a href="#como-funciona" class="hover:text-blue-400 transition-colors">Como Funciona</a>
              <a href="#orientacoes" class="hover:text-blue-400 transition-colors">Orientações</a>
              <a href="#dicas" class="hover:text-blue-400 transition-colors">Dicas</a>
              <a href="#faq" class="hover:text-blue-400 transition-colors">Perguntas Frequentes</a>
            </nav>

            <!-- Botão CTA Topo -->
            <div class="flex items-center gap-3">
              <a
                href="#secao-login"
                class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <span>Acessar Avaliação</span>
                <i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </header>

        <!-- 2. HERO SECTION MODERNO -->
        <section class="relative overflow-hidden hero-gradient pt-12 pb-20 px-4 sm:px-6 border-b border-slate-800/60">
          <div class="max-w-4xl mx-auto text-center relative z-10">
            <!-- Badge de Introdução -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-xs font-medium mb-6 animate-fade-in shadow-inner">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ambiente Digital de Prova • Rede Estadual de São Paulo</span>
            </div>

            <!-- Título Principal -->
            <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-[1.15] mb-6">
              Sua avaliação escolar em um ambiente <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">seguro, focado e justo</span>.
            </h1>

            <!-- Subtítulo Explicativo -->
            <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
              Realize suas atividades bimestrais e simulados preparatórios com total tranquilidade. Suas respostas são salvas automaticamente a cada clique.
            </p>

            <!-- Botões de Ação Rápida -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#secao-login"
                class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Fazer Login & Responder Prova</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>

              <a
                href="#orientacoes"
                class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <i data-lucide="book-open" class="w-4 h-4 text-blue-400"></i>
                <span>Ver Orientações de Prova</span>
              </a>
            </div>

            <!-- 3 Badges de Confiança -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div class="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="save" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Salvamento Contínuo</h4>
                  <p class="text-[11px] text-slate-400">Nada se perde se a conexão cair</p>
                </div>
              </div>

              <div class="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="smartphone" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Celular ou Computador</h4>
                  <p class="text-[11px] text-slate-400">100% responsivo e intuitivo</p>
                </div>
              </div>

              <div class="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="shield" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white">Ambiente Justo</h4>
                  <p class="text-[11px] text-slate-400">Mesmas regras para toda a sala</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. SEÇÃO: COMO FUNCIONA O ACESSO (3 PASSOS) -->
        <section id="como-funciona" class="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full border-b border-slate-800/60">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/50">
              Passo a Passo
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Como acessar e realizar a sua avaliação
            </h2>
            <p class="text-slate-400 text-xs sm:text-sm mt-2">
              Basta ter em mãos o seu e-mail institucional e o código informado pela professora em sala.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Passo 1 -->
            <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative overflow-hidden card-hover-glow transition-all">
              <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-blue-600/30">
                1
              </div>
              <h3 class="text-base font-bold text-white mb-2">Identificação Institucional</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Digite seu e-mail terminado em <code class="text-blue-300 font-mono">@aluno.educacao.sp.gov.br</code>, seu nome completo e seu RA oficial.
              </p>
            </div>

            <!-- Passo 2 -->
            <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative overflow-hidden card-hover-glow transition-all">
              <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-indigo-600/30">
                2
              </div>
              <h3 class="text-base font-bold text-white mb-2">Código da Atividade</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Insira o código alfanumérico (ex: <span class="font-mono text-indigo-300 font-bold">GEO-8B-2026</span>) ou PIN da prova passado pela professora.
              </p>
            </div>

            <!-- Passo 3 -->
            <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative overflow-hidden card-hover-glow transition-all">
              <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-emerald-600/30">
                3
              </div>
              <h3 class="text-base font-bold text-white mb-2">Modo Prova Focado</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                A prova abre em tela cheia. Você responde uma questão por vez, acompanha o tempo e envia definitivamente quando concluir.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. SEÇÃO: GUIA OFICIAL DE ORIENTAÇÕES DE SEGURANÇA & BOAS PRÁTICAS -->
        <section id="orientacoes" class="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full border-b border-slate-800/60">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
              Diretrizes de Prova
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Orientações para o Modo de Avaliação
            </h2>
            <p class="text-slate-400 text-xs sm:text-sm mt-2">
              Conheça as regras e o funcionamento do sistema para realizar sua prova sem surpresas.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <!-- Card 1: Tela Cheia -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-blue-900/40 text-blue-400 flex items-center justify-center mb-3">
                <i data-lucide="maximize" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Tela Cheia Obrigatória</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                A avaliação requer tela cheia. Se sair sem querer, um aviso aparecerá na tela permitindo retornar imediatamente.
              </p>
            </div>

            <!-- Card 2: Troca de Abas -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-amber-900/40 text-amber-400 flex items-center justify-center mb-3">
                <i data-lucide="eye" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Mantenha-se na Aba</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Não saia da aba nem minimize o navegador. O sistema cronometra e registra eventuais saídas da página no relatório da professora.
              </p>
            </div>

            <!-- Card 3: Salvamento Automático -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center mb-3">
                <i data-lucide="cloud-check" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Salvamento Automático</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Cada alternativa marcada e texto dissertativo é salvo instantaneamente no seu navegador e no servidor da professora.
              </p>
            </div>

            <!-- Card 4: Marca d'água -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-purple-900/40 text-purple-400 flex items-center justify-center mb-3">
                <i data-lucide="fingerprint" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Marca com seu RA</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Uma identificação discreta com seu nome e RA cobrirá a tela para certificar a autenticidade da sua sessão.
              </p>
            </div>

            <!-- Card 5: Bloqueio de Cópia -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-red-900/40 text-red-400 flex items-center justify-center mb-3">
                <i data-lucide="copy-slash" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Bloqueio de Cópia e Print</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Atalhos como Ctrl+C, Ctrl+V, botão direito e impressão em PDF ficam desativados durante a avaliação.
              </p>
            </div>

            <!-- Card 6: Tempo e Entrega -->
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div class="w-9 h-9 rounded-xl bg-teal-900/40 text-teal-400 flex items-center justify-center mb-3">
                <i data-lucide="clock" class="w-5 h-5"></i>
              </div>
              <h4 class="font-bold text-sm text-white mb-1.5">Cronômetro em Tempo Real</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Acompanhe o tempo restante no topo. Ao finalizar todas as questões, revise e clique em "Finalizar Avaliação".
              </p>
            </div>
          </div>
        </section>

        <!-- 5. SEÇÃO: DICAS PARA MANDAR BEM NA PROVA -->
        <section id="dicas" class="py-14 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div class="bg-gradient-to-br from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
            <h3 class="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2.5 mb-4">
              <i data-lucide="lightbulb" class="w-5 h-5 text-yellow-400"></i>
              Checklist Rápido antes de Começar:
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="flex items-start gap-2.5">
                <span class="text-emerald-400 text-sm font-bold">✓</span>
                <span><strong>Bateria Carregada:</strong> Certifique-se de que o aparelho tenha carga suficiente.</span>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="text-emerald-400 text-sm font-bold">✓</span>
                <span><strong>Conexão Estável:</strong> Conecte-se ao Wi-Fi da escola ou dados móveis seguros.</span>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="text-emerald-400 text-sm font-bold">✓</span>
                <span><strong>Leitura Atenta:</strong> Leia os textos de apoio e enunciados com calma.</span>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="text-emerald-400 text-sm font-bold">✓</span>
                <span><strong>Fundamente suas Respostas:</strong> Nas dissertativas, explique seus argumentos com clareza.</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. SEÇÃO DO FORMULÁRIO DE LOGIN DO ESTUDANTE -->
        <section id="secao-login" class="py-16 px-4 sm:px-6 max-w-lg mx-auto w-full">
          <div class="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div class="text-center mb-6">
              <div class="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i data-lucide="graduation-cap" class="w-8 h-8"></i>
              </div>
              <h2 class="text-2xl font-extrabold text-slate-900">Acesso à Avaliação</h2>
              <p class="text-xs text-slate-500 mt-1">Preencha seus dados institucionais para iniciar a prova</p>
            </div>

            <form id="form-aluno-home" class="space-y-4 text-xs">
              <!-- E-mail Institucional -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>E-mail Institucional *</span>
                  <span class="text-[10px] text-blue-600 font-medium lowercase">@aluno.educacao.sp.gov.br</span>
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="home-aluno-email"
                    required
                    placeholder="nome.sobrenome@aluno.educacao.sp.gov.br"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs font-medium transition-all"
                  />
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Nome Completo -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Seu Nome Completo *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-nome"
                    required
                    placeholder="Ex: Gabriel Santos de Oliveira"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs font-medium transition-all"
                  />
                  <i data-lucide="user" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- RA (Registro do Aluno) -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>RA (Registro do Aluno) *</span>
                  <span class="text-[10px] text-slate-400 font-normal">Ex: 108.452.981-3/SP</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-ra"
                    required
                    placeholder="000.000.000-0/SP"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs font-mono transition-all"
                  />
                  <i data-lucide="id-card" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Código da Atividade ou PIN -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>Código da Prova ou PIN *</span>
                  <span class="text-[10px] text-emerald-700 font-bold">Fornecido pela Professora</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="home-aluno-codigo"
                    required
                    value="GEO-8B-2026"
                    placeholder="Ex: GEO-8B-2026 ou 8421"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
                  />
                  <i data-lucide="key" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Checkbox de Ciência -->
              <div class="flex items-center gap-2 pt-2">
                <input type="checkbox" id="home-aluno-concordo" required class="w-4 h-4 text-blue-600 rounded cursor-pointer" />
                <label for="home-aluno-concordo" class="text-[11px] text-slate-600 cursor-pointer select-none">
                  Li as orientações de segurança e estou pronto(a) para responder.
                </label>
              </div>

              <button
                type="submit"
                id="btn-iniciar-prova-aluno"
                class="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Acessar e Responder Avaliação</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </section>

        <!-- 7. SEÇÃO: PERGUNTAS FREQUENTES (FAQ) -->
        <section id="faq" class="py-16 px-4 sm:px-6 max-w-3xl mx-auto w-full border-t border-slate-800/60">
          <div class="text-center mb-10">
            <h3 class="text-xl sm:text-2xl font-extrabold text-white">Dúvidas Frequentes dos Estudantes</h3>
            <p class="text-xs text-slate-400 mt-1">Respostas rápidas para as principais dúvidas sobre a plataforma</p>
          </div>

          <div class="space-y-3 text-xs" id="faq-accordion">
            <!-- FAQ 1 -->
            <details class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 group cursor-pointer">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none">
                <span>E se a minha conexão com a internet oscilar ou cair?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-2.5 leading-relaxed pl-1">
                Fique tranquilo(a)! O sistema salva cada resposta automaticamente no seu navegador. Assim que a conexão for restabelecida, tudo é sincronizado sem que você perca nada do que já fez.
              </p>
            </details>

            <!-- FAQ 2 -->
            <details class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 group cursor-pointer">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none">
                <span>Posso responder à prova pelo celular?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-2.5 leading-relaxed pl-1">
                Sim! O Atividade Segura funciona perfeitamente em smartphones, tablets, notebooks e computadores de mesa, adaptando o tamanho dos textos e botões automaticamente.
              </p>
            </details>

            <!-- FAQ 3 -->
            <details class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 group cursor-pointer">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none">
                <span>O que acontece se eu sair da tela cheia sem querer?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-2.5 leading-relaxed pl-1">
                A prova é pausada e uma janela com o botão "Retornar em Tela Cheia" aparece na sua tela. Basta clicar nele para continuar respondendo exatamente de onde parou.
              </p>
            </details>

            <!-- FAQ 4 -->
            <details class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 group cursor-pointer">
              <summary class="font-bold text-slate-200 flex items-center justify-between list-none">
                <span>Onde consigo o código da minha prova?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p class="text-slate-400 mt-2.5 leading-relaxed pl-1">
                A sua professora informa o código (por exemplo: <code class="text-blue-300 font-mono">GEO-8B-2026</code>) ou o PIN numérico na lousa da sala de aula ou no mural do Google Classroom.
              </p>
            </details>
          </div>
        </section>

        <!-- 8. RODAPÉ INSTITUCIONAL & ACESSO DOCENTE PROTEGIDO -->
        <footer class="bg-slate-950 text-slate-500 py-6 px-4 border-t border-slate-800/80 text-xs">
          <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-medium text-slate-400">Atividade Segura © 2026</p>
              <p class="text-[11px] text-slate-500">Desenvolvido para Escolas e Estudantes da Rede Pública Estadual SP</p>
            </div>
            
            <div class="flex items-center gap-4">
              <span class="text-[11px] text-slate-600">Autenticação: @aluno.educacao.sp.gov.br</span>
              <a
                href="#docente"
                class="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                title="Área exclusiva dos professores (requer senha)"
              >
                <i data-lucide="lock" class="w-3 h-3"></i>
                <span>Acesso Docente</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Evento de Envio do Login do Aluno
    const form = document.getElementById("form-aluno-home");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById("home-aluno-email").value.trim().toLowerCase();
      const nome = document.getElementById("home-aluno-nome").value.trim();
      const ra = document.getElementById("home-aluno-ra").value.trim();
      const codigo = document.getElementById("home-aluno-codigo").value.trim().toUpperCase();

      // Se for um professor digitando seu e-mail de professor, redireciona para a autenticação do docente
      if (email.endsWith("@professor.educacao.sp.gov.br") || email.startsWith("prof")) {
        window.location.hash = "#docente";
        return;
      }

      const btn = document.getElementById("btn-iniciar-prova-aluno");
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Carregando atividade...`;

      try {
        const atividade = await DB.getAtividadePorCodigo(codigo);
        if (!atividade) {
          alert(`Código de atividade "${codigo}" não encontrado. Verifique com sua professora.`);
          btn.disabled = false;
          btn.innerHTML = `<span>Acessar e Responder Avaliação</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
          if (window.lucide) window.lucide.createIcons();
          return;
        }

        // Salvar sessão do estudante
        sessionStorage.setItem("aluno_ativo", JSON.stringify({
          nome,
          ra,
          email,
          codigoAtividade: atividade.codigo,
          atividadeId: atividade.id
        }));

        // Redireciona imediatamente para a prova blindada
        window.location.hash = `#aluno/prova/${atividade.codigo}`;
      } catch (err) {
        alert("Erro ao validar atividade: " + err.message);
        btn.disabled = false;
        btn.innerHTML = `<span>Acessar e Responder Avaliação</span>`;
      }
    };
  }
};

window.HomeView = HomeView;
