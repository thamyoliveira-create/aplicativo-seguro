/**
 * View: Acesso Restrito do Professor (Login Seguro)
 * Design: GovTech / SaaS Pro
 */

const ProfessorAuthView = {
  async render() {
    const root = document.getElementById("app-root");

    const savedNome = localStorage.getItem("professor_nome") || "";
    const savedEscola = localStorage.getItem("professor_escola") || "";
    const savedEmail = localStorage.getItem("professor_email") || "";

    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-white flex flex-col justify-between hero-mesh bg-grid-pattern selection:bg-brand-600 selection:text-white">
        <!-- Topo -->
        <header class="glass-nav py-4 px-6">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="#" class="flex items-center gap-2 font-bold text-xs text-slate-400 hover:text-white transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Voltar ao Portal do Aluno</span>
            </a>
            <span class="text-[11px] bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/30 text-rose-300 font-mono font-semibold flex items-center gap-1.5">
              <i data-lucide="lock" class="w-3 h-3"></i>
              Área Restrita aos Docentes
            </span>
          </div>
        </header>

        <!-- Formulário de Login do Professor -->
        <main class="max-w-md mx-auto w-full p-4 my-8">
          <div class="glass-card p-8 sm:p-9 rounded-3xl shadow-2xl border border-slate-700/60 relative overflow-hidden">
            <div class="text-center mb-7">
              <div class="w-14 h-14 bg-gradient-to-br from-brand-600 to-indigo-700 text-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-blue border border-white/10">
                <i data-lucide="shield-check" class="w-7 h-7"></i>
              </div>
              <h2 class="text-2xl font-black text-white tracking-tight">Painel Docente</h2>
              <p class="text-xs text-slate-400 mt-1.5">Identifique-se para acessar suas turmas e avaliações</p>
            </div>

            <form id="form-professor-login" class="space-y-4 text-xs">
              <!-- E-mail do Professor -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between text-[11px]">
                  <span>Seu E-mail Institucional ou Pessoal *</span>
                  <span id="email-status-badge" class="text-[10px] text-emerald-400 font-mono"></span>
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="prof-login-email"
                    required
                    value="${savedEmail}"
                    placeholder="exemplo: seu.nome@educacao.sp.gov.br"
                    class="w-full pl-10 pr-4 py-3.5 bg-dark-900/90 border border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-xs font-semibold text-white transition-all outline-none"
                  />
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Nome do Professor -->
              <div id="box-prof-nome">
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">
                  Seu Nome Completo *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="prof-login-nome"
                    required
                    value="${savedNome}"
                    placeholder="Ex: Profª. Thamy Oliveira ou Prof. Carlos Silva"
                    class="w-full pl-10 pr-4 py-3.5 bg-dark-900/90 border border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-xs font-semibold text-white transition-all outline-none"
                  />
                  <i data-lucide="user" class="w-4 h-4 text-brand-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Escola onde leciona -->
              <div id="box-prof-escola">
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">
                  Escola onde Leciona *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="prof-login-escola"
                    required
                    value="${savedEscola}"
                    placeholder="Ex: EE Professora Nair de Almeida / Colégio São Paulo"
                    class="w-full pl-10 pr-4 py-3.5 bg-dark-900/90 border border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-xs font-semibold text-white transition-all outline-none"
                  />
                  <i data-lucide="school" class="w-4 h-4 text-brand-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Senha do Docente (Individual) -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between text-[11px]">
                  <span id="senha-label">Sua Senha Pessoal *</span>
                  <span id="senha-helper" class="text-[10px] text-brand-400">Crie ou digite sua senha</span>
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="prof-login-senha"
                    required
                    placeholder="Crie ou digite sua senha pessoal"
                    class="w-full pl-10 pr-10 py-3.5 bg-dark-900/90 border border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-xs font-medium text-white transition-all outline-none"
                  />
                  <i data-lucide="key-round" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                  <button
                    type="button"
                    id="btn-toggle-pwd"
                    class="absolute right-3 top-3 text-slate-400 hover:text-white text-xs p-0.5"
                  >
                    <i data-lucide="eye" class="w-4 h-4" id="pwd-icon"></i>
                  </button>
                </div>
                <p class="text-[10px] text-slate-400 mt-1">Cada professor define sua própria senha. No primeiro acesso, a senha informada aqui será a sua chave de entrada.</p>
              </div>

              <div id="login-error-msg" class="hidden p-3.5 bg-rose-950/80 border border-rose-500/40 rounded-xl text-rose-200 text-xs flex items-center gap-2.5 animate-fade-in">
                <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400 flex-shrink-0"></i>
                <span id="login-error-text">Senha incorreta.</span>
              </div>

              <button
                type="submit"
                id="btn-entrar-docente"
                class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-extrabold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2 mt-2 border border-white/10"
              >
                <span id="btn-entrar-label">Entrar no Painel Docente</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </main>

        <!-- Rodapé -->
        <footer class="text-center py-6 text-xs text-slate-500 border-t border-slate-800/80">
          Atividade Segura • Plataforma de Avaliação Digital Anticola & IA
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Toggle de senha
    const toggleBtn = document.getElementById("btn-toggle-pwd");
    const pwdInput = document.getElementById("prof-login-senha");
    const pwdIcon = document.getElementById("pwd-icon");
    if (toggleBtn && pwdInput) {
      toggleBtn.onclick = () => {
        if (pwdInput.type === "password") {
          pwdInput.type = "text";
          pwdIcon.setAttribute("data-lucide", "eye-off");
        } else {
          pwdInput.type = "password";
          pwdIcon.setAttribute("data-lucide", "eye");
        }
        if (window.lucide) window.lucide.createIcons();
      };
    }

    // Detecção dinâmica de e-mail cadastrado
    const emailInput = document.getElementById("prof-login-email");
    const emailBadge = document.getElementById("email-status-badge");
    const senhaLabel = document.getElementById("senha-label");
    const senhaHelper = document.getElementById("senha-helper");
    const btnLabel = document.getElementById("btn-entrar-label");

    async function checkEmail(emailVal) {
      if (!emailVal || !emailVal.includes("@")) return;
      try {
        const res = await fetch("/api/professor/verificar-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailVal })
        });
        const data = await res.json();
        if (data.success && data.cadastrado) {
          emailBadge.innerText = "✓ Professor cadastrado";
          emailBadge.className = "text-[10px] text-emerald-400 font-mono";
          senhaLabel.innerText = "Sua Senha Cadastrada *";
          senhaHelper.innerText = "Digite a senha que você criou";
          btnLabel.innerText = "Entrar no Painel";
          if (data.nome && !document.getElementById("prof-login-nome").value) {
            document.getElementById("prof-login-nome").value = data.nome;
          }
          if (data.escola && !document.getElementById("prof-login-escola").value) {
            document.getElementById("prof-login-escola").value = data.escola;
          }
        } else {
          emailBadge.innerText = "★ Primeiro Acesso";
          emailBadge.className = "text-[10px] text-brand-300 font-mono";
          senhaLabel.innerText = "Crie sua Senha Pessoal *";
          senhaHelper.innerText = "Esta será a sua senha exclusiva";
          btnLabel.innerText = "Cadastrar & Acessar Painel";
        }
      } catch (err) {
        console.warn("Erro ao checar e-mail:", err);
      }
    }

    if (emailInput) {
      if (emailInput.value.trim()) {
        checkEmail(emailInput.value.trim());
      }
      emailInput.addEventListener("blur", () => checkEmail(emailInput.value.trim()));
    }

    const form = document.getElementById("form-professor-login");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById("prof-login-email").value.trim();
      const nome = document.getElementById("prof-login-nome").value.trim();
      const escola = document.getElementById("prof-login-escola").value.trim();
      const senha = document.getElementById("prof-login-senha").value.trim();
      const errorDiv = document.getElementById("login-error-msg");
      const errorText = document.getElementById("login-error-text");
      const btn = document.getElementById("btn-entrar-docente");

      errorDiv.classList.add("hidden");

      if (!email) {
        errorText.innerText = "Por favor, informe seu e-mail.";
        errorDiv.classList.remove("hidden");
        return;
      }

      if (!nome) {
        errorText.innerText = "Por favor, informe seu nome completo.";
        errorDiv.classList.remove("hidden");
        return;
      }

      if (!escola) {
        errorText.innerText = "Por favor, informe a escola onde leciona.";
        errorDiv.classList.remove("hidden");
        return;
      }

      if (!senha || senha.length < 3) {
        errorText.innerText = "A senha deve ter pelo menos 3 caracteres.";
        errorDiv.classList.remove("hidden");
        return;
      }

      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Conectando...`;

      try {
        const res = await fetch("/api/professor/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, escola, email, senha })
        });
        const data = await res.json();

        if (data.success) {
          const nomeFinal = data.professorNome || nome;
          const escolaFinal = data.escola || escola;
          const emailFinal = data.email || email;

          sessionStorage.setItem("professor_autenticado", "true");
          sessionStorage.setItem("professor_nome", nomeFinal);
          sessionStorage.setItem("professor_escola", escolaFinal);
          sessionStorage.setItem("professor_email", emailFinal);
          sessionStorage.setItem("professor_token", data.token);

          localStorage.setItem("professor_nome", nomeFinal);
          localStorage.setItem("professor_escola", escolaFinal);
          localStorage.setItem("professor_email", emailFinal);

          window.location.hash = "#professor";
        } else {
          errorText.innerText = data.error || "Senha incorreta para este e-mail.";
          errorDiv.classList.remove("hidden");
          btn.disabled = false;
          btn.innerHTML = `<span id="btn-entrar-label">Entrar no Painel Docente</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
          if (window.lucide) window.lucide.createIcons();
        }
      } catch (err) {
        errorText.innerText = "Erro ao conectar com o servidor: " + err.message;
        errorDiv.classList.remove("hidden");
        btn.disabled = false;
        btn.innerHTML = `<span>Entrar no Painel Docente</span>`;
      }
    };
  }
};

window.ProfessorAuthView = ProfessorAuthView;
