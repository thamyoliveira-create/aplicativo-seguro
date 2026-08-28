const ProfessorLoginView = {
  render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="auth-page">
        <a class="auth-back" href="#" aria-label="Voltar à página inicial">
          <i data-lucide="arrow-left"></i> Início
        </a>

        <section class="auth-story" aria-labelledby="teacher-login-title">
          <div class="auth-brand"><span><i data-lucide="shield-check"></i></span><b>Atividade Segura</b></div>
          <p class="auth-kicker">PAINEL DOCENTE</p>
          <h1 id="teacher-login-title">Planeje com profundidade. Acompanhe com clareza.</h1>
          <p>Um espaço reservado para criar questões contextualizadas, organizar materiais e acompanhar as entregas da turma.</p>
          <div class="auth-proof">
            <i data-lucide="badge-check"></i>
            <span><b>Perfil verificado no banco</b><small>Somente contas @professor.educacao.sp.gov.br recebem permissão docente.</small></span>
          </div>
        </section>

        <section class="auth-card" aria-label="Acesso da professora">
          <div class="auth-card-head">
            <span class="auth-icon"><i data-lucide="user-round-check"></i></span>
            <div><p class="auth-kicker">ACESSO INSTITUCIONAL</p><h2>Entrar no painel</h2></div>
          </div>

          <form id="teacher-login-form">
            <label for="teacher-email">E-mail Microsoft institucional</label>
            <div class="auth-input">
              <i data-lucide="mail"></i>
              <input id="teacher-email" type="email" inputmode="email" autocomplete="email"
                placeholder="nome@professor.educacao.sp.gov.br" required>
            </div>
            <p class="auth-field-note">Enviaremos um link de acesso para sua caixa de entrada institucional.</p>
            <p id="teacher-login-error" class="auth-error" role="alert" aria-live="polite"></p>
            <p id="teacher-login-success" class="auth-success" role="status" aria-live="polite"></p>
            <button class="auth-submit" type="submit">
              <span>Enviar link seguro</span><i data-lucide="arrow-right"></i>
            </button>
          </form>

          <div class="auth-divider"><span>É estudante?</span></div>
          <a class="auth-student-link" href="#aluno">Entrar com e-mail de aluno</a>
          <p class="auth-help"><i data-lucide="info"></i> O link identifica o perfil pelo domínio do e-mail. Alunos não recebem acesso às rotas nem aos dados docentes.</p>
        </section>
      </main>`;

    if (window.lucide) window.lucide.createIcons();

    document.getElementById("teacher-login-form").onsubmit = async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector(".auth-submit");
      const error = document.getElementById("teacher-login-error");
      const success = document.getElementById("teacher-login-success");
      const email = document.getElementById("teacher-email").value;

      button.disabled = true;
      button.querySelector("span").textContent = "Enviando…";
      error.textContent = "";
      success.textContent = "";

      try {
        const sentTo = await TeacherAuth.sendMagicLink(email);
        success.textContent = `Link enviado para ${sentTo}. Abra o e-mail neste mesmo dispositivo para continuar.`;
        button.querySelector("span").textContent = "Link enviado";
      } catch (err) {
        error.textContent = err.message;
        button.disabled = false;
        button.querySelector("span").textContent = "Enviar link seguro";
      }
    };
  }
};

window.ProfessorLoginView = ProfessorLoginView;
