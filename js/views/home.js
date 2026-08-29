const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="min-h-screen bg-[#071412] text-white overflow-hidden relative flex flex-col">
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div class="absolute -bottom-48 -right-24 w-[30rem] h-[30rem] rounded-full bg-blue-500/10 blur-3xl"></div>
          <div class="absolute inset-0 opacity-[0.035] bg-grid-pattern"></div>
        </div>

        <header class="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
          <a href="#" class="inline-flex items-center gap-3" aria-label="Atividade Segura — início">
            <span class="w-10 h-10 rounded-2xl bg-emerald-500 text-[#071412] flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </span>
            <span class="font-extrabold tracking-tight">Atividade Segura</span>
          </a>
          <span class="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold">Avaliação digital</span>
        </header>

        <section class="relative z-10 flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16 flex flex-col items-center justify-center text-center">
          <p class="text-emerald-400 text-xs font-bold uppercase tracking-[0.22em] mb-5">Portal de acesso</p>
          <h1 class="max-w-3xl text-4xl sm:text-6xl font-black tracking-[-0.045em] leading-[1.05]">
            Avaliações com foco, contexto e segurança.
          </h1>
          <p class="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed mt-5 mb-10">
            Escolha seu perfil para entrar com o e-mail institucional.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl" aria-label="Escolha o tipo de acesso">
            <a href="#aluno" class="group text-left rounded-3xl border border-white/10 bg-white/[0.045] hover:bg-white/[0.075] hover:border-blue-400/40 p-6 sm:p-7 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <span class="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-300 border border-blue-400/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                <i data-lucide="graduation-cap" class="w-6 h-6"></i>
              </span>
              <span class="block text-xs uppercase tracking-[0.16em] text-blue-300 font-bold mb-2">Estudante</span>
              <span class="block text-2xl font-extrabold tracking-tight">Sou aluno</span>
              <span class="mt-3 text-sm text-slate-400 flex items-center justify-between gap-3">
                Acessar uma atividade
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-slate-500 group-hover:text-blue-300 transition-colors"></i>
              </span>
            </a>

            <a href="#professor" class="group text-left rounded-3xl border border-white/10 bg-white/[0.045] hover:bg-white/[0.075] hover:border-emerald-400/40 p-6 sm:p-7 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <span class="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                <i data-lucide="presentation" class="w-6 h-6"></i>
              </span>
              <span class="block text-xs uppercase tracking-[0.16em] text-emerald-300 font-bold mb-2">Docente</span>
              <span class="block text-2xl font-extrabold tracking-tight">Sou professor</span>
              <span class="mt-3 text-sm text-slate-400 flex items-center justify-between gap-3">
                Criar e acompanhar atividades
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-slate-500 group-hover:text-emerald-300 transition-colors"></i>
              </span>
            </a>
          </div>

          <div class="mt-9 inline-flex items-center gap-2 text-xs text-slate-500">
            <i data-lucide="lock-keyhole" class="w-3.5 h-3.5"></i>
            <span>Acesso separado por perfil institucional</span>
          </div>
        </section>

        <footer class="relative z-10 px-5 py-6 text-center text-[11px] text-slate-600">
          Atividade Segura · Secretaria da Educação do Estado de São Paulo
        </footer>
      </main>`;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.HomeView = HomeView;
