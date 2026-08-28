/**
 * View: Acesso Restrito do Professor (Login com Senha)
 */

const ProfessorAuthView = {
  async render() {
    const root = document.getElementById("app-root");

    root.innerHTML = `
      <div class="min-h-screen bg-slate-900 flex flex-col justify-between text-white">
        <!-- Topo -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="#" class="flex items-center gap-2 font-bold text-sm text-slate-300 hover:text-white transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Voltar ao Portal do Aluno</span>
            </a>
            <span class="text-xs bg-red-950/80 px-3 py-1 rounded-full border border-red-500/30 text-red-300 font-mono flex items-center gap-1.5">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i>
              Área Restrita aos Docentes
            </span>
          </div>
        </header>

        <!-- Formulário de Login do Professor -->
        <main class="max-w-md mx-auto w-full p-4 my-8">
          <div class="bg-white text-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-[#002b66] text-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <i data-lucide="shield-check" class="w-8 h-8"></i>
              </div>
              <h2 class="text-2xl font-extrabold text-slate-900">Acesso da Professora</h2>
              <p class="text-xs text-slate-500 mt-1">Autenticação com e-mail institucional e senha de segurança</p>
            </div>

            <form id="form-professor-login" class="space-y-4">
              <!-- E-mail do Professor -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>E-mail Institucional *</span>
                  <span class="text-[10px] text-blue-600 font-medium">@professor.educacao.sp.gov.br</span>
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="prof-login-email"
                    required
                    value="maria.silveira@professor.educacao.sp.gov.br"
                    placeholder="nome.sobrenome@professor.educacao.sp.gov.br"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs font-medium transition-all"
                  />
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Senha do Docente -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>Senha de Acesso do Docente *</span>
                  <span class="text-[10px] text-slate-400 font-normal">Padrão inicial: prof2026</span>
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="prof-login-senha"
                    required
                    placeholder="Digite sua senha de professora"
                    class="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs transition-all"
                  />
                  <i data-lucide="key-round" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <div id="login-error-msg" class="hidden p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
                <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 flex-shrink-0"></i>
                <span id="login-error-text">E-mail ou senha incorretos.</span>
              </div>

              <button
                type="submit"
                id="btn-entrar-docente"
                class="w-full py-3.5 px-6 rounded-xl bg-[#002b66] hover:bg-[#001f4d] active:scale-[0.98] text-white font-extrabold text-sm shadow-xl shadow-blue-950/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Acessar Painel da Professora</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </main>

        <!-- Rodapé -->
        <footer class="text-center py-4 text-xs text-slate-500">
          Atividade Segura • Secretaria da Educação do Estado de São Paulo
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const form = document.getElementById("form-professor-login");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById("prof-login-email").value.trim();
      const senha = document.getElementById("prof-login-senha").value.trim();
      const errorDiv = document.getElementById("login-error-msg");
      const errorText = document.getElementById("login-error-text");
      const btn = document.getElementById("btn-entrar-docente");

      errorDiv.classList.add("hidden");
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Validando credenciais...`;

      try {
        const res = await fetch("/api/professor/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha })
        });
        const data = await res.json();

        if (data.success) {
          sessionStorage.setItem("professor_autenticado", "true");
          sessionStorage.setItem("professor_email", email);
          sessionStorage.setItem("professor_token", data.token);
          window.location.hash = "#professor";
        } else {
          errorText.innerText = data.error || "Senha ou e-mail inválido.";
          errorDiv.classList.remove("hidden");
          btn.disabled = false;
          btn.innerHTML = `<span>Acessar Painel da Professora</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
          if (window.lucide) window.lucide.createIcons();
        }
      } catch (err) {
        errorText.innerText = "Erro ao conectar com o servidor: " + err.message;
        errorDiv.classList.remove("hidden");
        btn.disabled = false;
        btn.innerHTML = `<span>Acessar Painel da Professora</span>`;
      }
    };
  }
};

window.ProfessorAuthView = ProfessorAuthView;
