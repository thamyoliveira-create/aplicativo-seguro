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
          <p>O domínio institucional define o acesso docente. Contas de alunos não recebem permissão para consultar atividades, gabaritos ou entregas da professora.</p>
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

          <div id="teacher-feedback-container"></div>

          <form id="teacher-login-form">
            ${registering ? `
              <label for="teacher-name">Nome completo</label>
              <div class="auth-input"><i data-lucide="user"></i><input id="teacher-name" type="text" autocomplete="name" maxlength="100" placeholder="Seu nome completo" required></div>
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

    const feedbackContainer = document.getElementById("teacher-feedback-container");

    const showRegistrationSuccess = (email) => {
      feedbackContainer.innerHTML = `
        <div class="auth-feedback-panel success">
          <div class="auth-feedback-header">
            <i data-lucide="badge-check"></i>
            <span>Conta docente criada!</span>
          </div>
          <p>O acesso para <strong>${email}</strong> já está liberado. Não é necessário confirmar por e-mail.</p>
          <div class="auth-feedback-tips">
            <span><i data-lucide="check-circle-2"></i>Agora volte para a aba <b>Entrar</b> e acesse com o e-mail e senha cadastrados.</span>
          </div>
          <button type="button" class="resend-btn" id="teacher-go-login">
            <i data-lucide="arrow-right"></i> Ir para a aba Entrar
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();

      const goLoginBtn = document.getElementById("teacher-go-login");
      if (goLoginBtn) {
        goLoginBtn.onclick = () => {
          this.mode = "login";
          this.render();
          const emailField = document.getElementById("teacher-email");
          if (emailField) emailField.value = email;
        };
      }
    };

    document.getElementById("teacher-login-form").onsubmit = async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector(".auth-submit");
      const error = document.getElementById("teacher-login-error");
      const success = document.getElementById("teacher-login-success");
      const email = document.getElementById("teacher-email").value.trim();
      const pwd = password.value;
      button.disabled = true;
      button.querySelector("span").textContent = registering ? "Criando…" : "Verificando…";
      error.textContent = "";
      success.textContent = "";
      feedbackContainer.innerHTML = "";

      try {
        if (registering) {
          const createdEmail = await TeacherAuth.register(email, pwd, document.getElementById("teacher-name").value);
          showRegistrationSuccess(createdEmail);
          button.querySelector("span").textContent = "Conta criada";
          button.disabled = false;
        } else {
          await TeacherAuth.login(email, pwd);
          window.location.hash = "#professor";
          await App.handleRoute();
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
      const email = document.getElementById("teacher-email").value.trim();
      feedbackContainer.innerHTML = "";
      try {
        if (!email) {
          throw new Error("Digite seu e-mail institucional no campo acima para recuperar a senha.");
        }
        const sentTo = await TeacherAuth.resetPassword(email);
        feedbackContainer.innerHTML = `
          <div class="auth-feedback-panel success">
            <div class="auth-feedback-header">
              <i data-lucide="key-round"></i>
              <span>Instruções de recuperação enviadas!</span>
            </div>
            <p>Enviamos o link de redefinição de senha para <strong>${sentTo}</strong>.</p>
            <div class="auth-feedback-tips">
              <span><i data-lucide="alert-triangle"></i>Verifique sua <b>Caixa de Entrada</b> e a pasta de <b>Spam / Lixo Eletrônico</b>.</span>
            </div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        error.textContent = "";
      } catch (err) {
        error.textContent = err.message;
        success.textContent = "";
      }
    };
  }
};

window.ProfessorLoginView = ProfessorLoginView;
