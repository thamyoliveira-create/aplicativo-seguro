/**
 * View: Portal de Acesso do Estudante (Página Inicial)
 */

const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between bg-slate-900 text-slate-800">
        <!-- Barra Superior Institucional -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <i data-lucide="shield-check" class="w-6 h-6 text-yellow-400"></i>
              </div>
              <div>
                <h1 class="font-extrabold text-base md:text-lg tracking-tight flex items-center gap-2">
                  Atividade Segura
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-700 text-blue-100 border border-blue-400/30">
                    SEDUC-SP
                  </span>
                </h1>
                <p class="text-xs text-blue-200">Ambiente Oficial de Avaliação do Estudante</p>
              </div>
            </div>
            <div class="text-xs font-mono text-blue-200 hidden sm:block bg-blue-950/60 px-3 py-1 rounded-full border border-blue-400/20">
              @aluno.educacao.sp.gov.br
            </div>
          </div>
        </header>

        <!-- Formulário de Entrada Direta na Prova do Aluno -->
        <main class="max-w-lg mx-auto w-full p-4 my-6">
          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i data-lucide="graduation-cap" class="w-9 h-9"></i>
              </div>
              <h2 class="text-2xl font-extrabold text-slate-900">Entrada do Estudante</h2>
              <p class="text-xs text-slate-500 mt-1">Informe seus dados institucionais para iniciar sua atividade</p>
            </div>

            <form id="form-aluno-home" class="space-y-4 text-xs">
              <!-- E-mail Institucional do Aluno -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>Seu E-mail Institucional *</span>
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

              <!-- Código da Atividade fornecido pelo Professor -->
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

              <!-- Termos do Modo Blindado -->
              <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-amber-900 space-y-1.5 mt-2">
                <div class="font-bold flex items-center gap-1.5 text-amber-800 text-[11px]">
                  <i data-lucide="shield-alert" class="w-4 h-4 text-amber-600"></i>
                  Ambiente de Prova Protegido:
                </div>
                <ul class="list-disc list-inside space-y-0.5 text-[10px] text-amber-800/90 pl-1">
                  <li>Ao entrar, a prova será exibida em <strong>tela cheia obrigatória</strong>.</li>
                  <li>Trocas de abas e saídas da página são cronometradas e registradas.</li>
                  <li>Copiar, colar, captura de tela e atalhos de impressão estão bloqueados.</li>
                  <li>Uma marca d'água com seu RA cobrirá todo o conteúdo.</li>
                </ul>
              </div>

              <div class="flex items-center gap-2 pt-1">
                <input type="checkbox" id="home-aluno-concordo" required class="w-4 h-4 text-blue-600 rounded cursor-pointer" />
                <label for="home-aluno-concordo" class="text-[11px] text-slate-600 cursor-pointer select-none">
                  Estou ciente das regras de segurança e pronto(a) para responder.
                </label>
              </div>

              <button
                type="submit"
                id="btn-iniciar-prova-aluno"
                class="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Acessar e Responder Atividade</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </main>

        <!-- Rodapé Discreto com Acesso Docente Protegido por Senha -->
        <footer class="text-slate-500 py-4 px-4 text-center text-xs border-t border-slate-800">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <p class="text-[11px]">Atividade Segura © 2026 • Secretaria da Educação do Estado de São Paulo</p>
            <a href="#docente" class="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors">
              <i data-lucide="lock" class="w-3 h-3"></i>
              <span>Acesso Docente</span>
            </a>
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
          btn.innerHTML = `<span>Acessar e Responder Atividade</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
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
        btn.innerHTML = `<span>Acessar e Responder Atividade</span>`;
      }
    };
  }
};

window.HomeView = HomeView;
