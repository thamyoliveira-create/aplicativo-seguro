const ProfessorLoginView = {
  render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="auth-page">
        <a class="auth-back" href="#" aria-label="Voltar à página inicial"><i data-lucide="arrow-left"></i> Voltar</a>
        <section class="auth-story" aria-labelledby="teacher-login-title">
          <div class="auth-brand"><span><i data-lucide="shield-check"></i></span><b>Atividade Segura</b></div>
          <p class="auth-kicker">ESPAÇO DA PROFESSORA</p>
          <h1 id="teacher-login-title">Seu trabalho pedagógico, em um espaço só seu.</h1>
          <p>Crie atividades com IA, acompanhe entregas e consulte relatórios de integridade. O painel docente exige uma sessão autenticada.</p>
          <div class="auth-proof"><i data-lucide="lock-keyhole"></i><span><b>Área reservada</b><small>Estudantes não conseguem acessar rotas ou dados do painel.</small></span></div>
        </section>
        <section class="auth-card" aria-label="Formulário de acesso da professora">
          <div class="auth-card-head">
            <span class="auth-icon"><i data-lucide="user-round-check"></i></span>
            <div><p class="auth-kicker">BEM-VINDA</p><h2>Entrar no painel</h2></div>
          </div>
          <form id="teacher-login-form">
            <label for="teacher-email">E-mail institucional</label>
            <div class="auth-input"><i data-lucide="mail"></i><input id="teacher-email" type="email" autocomplete="username" placeholder="nome@professor.educacao.sp.gov.br" required></div>
            <label for="teacher-code">Código de acesso</label>
            <div class="auth-input"><i data-lucide="key-round"></i><input id="teacher-code" type="password" autocomplete="current-password" placeholder="Digite seu código" required><button type="button" id="toggle-code" aria-label="Mostrar código"><i data-lucide="eye"></i></button></div>
            <p id="teacher-login-error" class="auth-error" role="alert" aria-live="polite"></p>
            <button class="auth-submit" type="submit"><span>Entrar com segurança</span><i data-lucide="arrow-right"></i></button>
          </form>
          <p class="auth-help"><i data-lucide="circle-help"></i> O código é definido na configuração segura do servidor.</p>
          <div class="auth-divider"><span>É estudante?</span></div>
          <a class="auth-student-link" href="#aluno">Acessar atividade com código</a>
        </section>
      </main>`;
    if (window.lucide) window.lucide.createIcons();
    const code = document.getElementById("teacher-code");
    document.getElementById("toggle-code").onclick = () => {
      code.type = code.type === "password" ? "text" : "password";
    };
    document.getElementById("teacher-login-form").onsubmit = async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector(".auth-submit");
      const error = document.getElementById("teacher-login-error");
      button.disabled = true; button.querySelector("span").textContent = "Verificando…"; error.textContent = "";
      try {
        await TeacherAuth.login(document.getElementById("teacher-email").value.trim(), code.value);
        window.location.hash = "#professor";
      } catch (err) {
        error.textContent = err.message;
        button.disabled = false; button.querySelector("span").textContent = "Entrar com segurança";
      }
    };
  }
};
window.ProfessorLoginView = ProfessorLoginView;
