const ProfessorLoginView = {
  mode: "login",

  render() {
    const root = document.getElementById("app-root");
    const registering = this.mode === "register";
    root.innerHTML = `
      <main class="auth-page">
        <a class="auth-back" href="#" aria-label="Voltar à página inicial"><i data-lucide="arrow-left"></i> Início</a>

        <section class="auth-story" aria-labelledby="teacher-login-title">
          <div class="auth-brand"><span><i data-lucide="shield-check"></i></span><b>Atividade Segura</b></div>
          <p class="auth-kicker">PAINEL DOCENTE</p>
          <h1 id="teacher-login-title">Planeje com profundidade. Acompanhe com clareza.</h1>
          <p>O domínio institucional e a confirmação do e-mail definem o acesso docente. Contas de alunos não recebem permissão para consultar atividades, gabaritos ou entregas da professora.</p>
          <div class="auth-proof"><i data-lucide="database-zap"></i><span><b>Firebase Authentication + Firestore</b><small>As regras do banco conferem identidade e domínio em cada leitura ou alteração.</small></span></div>
        </section>

        <section class="auth-card" aria-label="Acesso da professora">
          <div class="auth-card-head">
            <span class="auth-icon"><i data-lucide="user-round-check"></i></span>
            <div><p class="auth-kicker">ACESSO INSTITUCIONAL</p><h2>${registering ? "Criar conta" : "Entrar no painel"}</h2></div>
          </div>

          <div class="auth-mode-tabs" role="tablist" aria-label="Escolher tipo de acesso">
            <button type="button" data-mode="login" class="${!registering ? "active" : ""}">Entrar</button>
            <button type="button" data-mode="register" class="${registering ? "active" : ""}">Primeiro acesso</button>
          </div>

          <form id="teacher-login-form">
            ${registering ? `
              <label for="teacher-name">Nome completo</label>
              <div class="auth-input"><i data-lucide="user"></i><input id="teacher-name" type="text" autocomplete="name" maxlength="100" required></div>
            ` : ""}
            <label for="teacher-email">E-mail institucional</label>
            <div class="auth-input"><i data-lucide="mail"></i><input id="teacher-email" type="email" autocomplete="email" placeholder="nome@professor.educacao.sp.gov.br" required></div>
            <label for="teacher-password">Senha</label>
            <div class="auth-input"><i data-lucide="lock-keyhole"></i><input id="teacher-password" type="password" autocomplete="${registering ? "new-password" : "current-password"}" minlength="8" placeholder="Mínimo de 8 caracteres" required><button class="password-toggle" type="button" aria-label="Mostrar senha"><i data-lucide="eye"></i></button></div>
            <p id="teacher-login-error" class="auth-error" role="alert" aria-live="polite"></p>
            <p id="teacher-login-success" class="auth-success" role="status" aria-live="polite"></p>
            <button class="auth-submit" type="submit"><span>${registering ? "Criar conta docente" : "Entrar com segurança"}</span><i data-lucide="arrow-right"></i></button>
            ${!registering ? `<button id="teacher-reset" class="auth-text-button" type="button">Esqueci minha senha</button>` : ""}
          </form>

          <div class="auth-divider"><span>É estudante?</span></div>
          <a class="auth-student-link" href="#aluno">Acessar área do estudante</a>
        </section>
      </main>`;

    if (window.lucide) window.lucide.createIcons();

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.onclick = () => {
        this.mode = button.dataset.mode;
        this.render();
      };
    });

    const password = document.getElementById("teacher-password");
    document.querySelector(".password-toggle").onclick = () => {
      password.type = password.type === "password" ? "text" : "password";
    };

    document.getElementById("teacher-login-form").onsubmit = async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector(".auth-submit");
      const error = document.getElementById("teacher-login-error");
      const success = document.getElementById("teacher-login-success");
      const email = document.getElementById("teacher-email").value;
      button.disabled = true;
      button.querySelector("span").textContent = registering ? "Criando…" : "Verificando…";
      error.textContent = "";
      success.textContent = "";

      try {
        if (registering) {
          const sentTo = await TeacherAuth.register(email, password.value, document.getElementById("teacher-name").value);
          success.textContent = `Conta criada. Confirme a mensagem enviada para ${sentTo} antes de entrar.`;
          button.querySelector("span").textContent = "Verificação enviada";
        } else {
          await TeacherAuth.login(email, password.value);
          window.location.hash = "#professor";
        }
      } catch (err) {
        error.textContent = err.message;
        button.disabled = false;
        button.querySelector("span").textContent = registering ? "Criar conta docente" : "Entrar com segurança";
      }
    };

    const reset = document.getElementById("teacher-reset");
    if (reset) reset.onclick = async () => {
      const error = document.getElementById("teacher-login-error");
      const success = document.getElementById("teacher-login-success");
      try {
        const sentTo = await TeacherAuth.resetPassword(document.getElementById("teacher-email").value);
        success.textContent = `Enviamos as instruções de recuperação para ${sentTo}.`;
        error.textContent = "";
      } catch (err) { error.textContent = err.message; success.textContent = ""; }
    };
  }
};

window.ProfessorLoginView = ProfessorLoginView;
