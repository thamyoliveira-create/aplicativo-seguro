const AlunoLoginView = {
  mode: "login",

  async render(params = {}) {
    const root = document.getElementById("app-root");
    const student = await StudentAuth.session();

    if (!student) {
      const registering = this.mode === "register";
      root.innerHTML = `
        <main class="student-login-shell">
          <a class="auth-back" href="#"><i data-lucide="arrow-left"></i> Início</a>
          <section class="student-login-card">
            <div class="student-login-mark"><i data-lucide="graduation-cap"></i></div>
            <p class="auth-kicker">ACESSO DO ESTUDANTE</p>
            <h1>${registering ? "Criar conta" : "Entrar na plataforma"}</h1>
            <p>Use somente seu e-mail institucional. No primeiro acesso, será necessário confirmar a mensagem recebida antes de abrir uma atividade.</p>

            <div class="auth-mode-tabs" role="tablist" aria-label="Escolher tipo de acesso">
              <button type="button" data-student-mode="login" class="${!registering ? "active" : ""}">Entrar</button>
              <button type="button" data-student-mode="register" class="${registering ? "active" : ""}">Primeiro acesso</button>
            </div>

            <form id="student-auth-form">
              ${registering ? `
                <label for="student-account-name">Nome completo</label>
                <div class="auth-input"><i data-lucide="user"></i><input id="student-account-name" type="text" autocomplete="name" maxlength="100" required></div>
              ` : ""}
              <label for="student-ra-input">RA (Registro do Aluno)</label>
              <div class="auth-input"><i data-lucide="id-card"></i><input id="student-ra-input" type="text" autocomplete="off" placeholder="Ex.: 12345678901" required></div>
              <p class="auth-field-note">Seu e-mail será montado automaticamente: <strong id="student-email-preview">@aluno.educacao.sp.gov.br</strong></p>
              <label for="student-password">Senha (você cria neste primeiro acesso)</label>
              <div class="auth-input"><i data-lucide="lock-keyhole"></i><input id="student-password" type="password" autocomplete="${registering ? "new-password" : "current-password"}" minlength="8" placeholder="Mínimo de 8 caracteres" required><button class="password-toggle" type="button" aria-label="Mostrar senha"><i data-lucide="eye"></i></button></div>
              <p id="student-login-error" class="auth-error" role="alert" aria-live="polite"></p>
              <p id="student-login-success" class="auth-success" role="status" aria-live="polite"></p>
              <button class="auth-submit student-submit" type="submit"><span>${registering ? "Criar conta de estudante" : "Entrar"}</span><i data-lucide="arrow-right"></i></button>
              ${!registering ? `<button id="student-reset" class="auth-text-button" type="button">Esqueci minha senha</button>` : ""}
            </form>

            <div class="auth-divider"><span>É professora?</span></div>
            <a class="auth-student-link" href="#professor">Acessar o painel docente</a>
          </section>
        </main>`;

      if (window.lucide) window.lucide.createIcons();
      document.querySelectorAll("[data-student-mode]").forEach((button) => {
        button.onclick = () => { this.mode = button.dataset.studentMode; this.render(params); };
      });

      const password = document.getElementById("student-password");
      const raInput = document.getElementById("student-ra-input");
      const emailPreview = document.getElementById("student-email-preview");

      // Atualiza preview do email em tempo real
      raInput.addEventListener("input", () => {
        const ra = raInput.value.replace(/\D/g, "");
        emailPreview.textContent = ra ? `0000${ra}sp@aluno.educacao.sp.gov.br` : "@aluno.educacao.sp.gov.br";
      });

      document.querySelector(".password-toggle").onclick = () => {
        password.type = password.type === "password" ? "text" : "password";
      };

      document.getElementById("student-auth-form").onsubmit = async (event) => {
        event.preventDefault();
        const button = event.currentTarget.querySelector(".auth-submit");
        const error = document.getElementById("student-login-error");
        const success = document.getElementById("student-login-success");
        const ra = raInput.value.replace(/\D/g, "");
        const email = `0000${ra}sp@aluno.educacao.sp.gov.br`;
        button.disabled = true;
        button.querySelector("span").textContent = registering ? "Criando…" : "Verificando…";
        error.textContent = "";
        success.textContent = "";

        try {
          if (registering) {
            const sentTo = await StudentAuth.register(email, password.value, document.getElementById("student-account-name").value);
            success.textContent = `Conta criada. Confirme a mensagem enviada para ${sentTo} antes de entrar.`;
            button.querySelector("span").textContent = "Verificação enviada";
          } else {
            await StudentAuth.login(email, password.value);
            await this.render(params);
          }
        } catch (err) {
          error.textContent = err.message;
          button.disabled = false;
          button.querySelector("span").textContent = registering ? "Criar conta de estudante" : "Entrar";
        }
      };

      const reset = document.getElementById("student-reset");
      if (reset) reset.onclick = async () => {
        const error = document.getElementById("student-login-error");
        const success = document.getElementById("student-login-success");
        try {
          const ra = raInput.value.replace(/\D/g, "");
          const sentTo = await StudentAuth.resetPassword(`0000${ra}sp@aluno.educacao.sp.gov.br`);
          success.textContent = `Enviamos as instruções de recuperação para ${sentTo}.`;
          error.textContent = "";
        } catch (err) { error.textContent = err.message; success.textContent = ""; }
      };
      return;
    }

    const defaultCode = params.codigo || "";
    root.innerHTML = `
      <main class="student-login-shell student-identified">
        <a class="auth-back" href="#"><i data-lucide="arrow-left"></i> Início</a>
        <section class="student-login-card">
          <div class="student-session">
            <span><i data-lucide="badge-check"></i></span>
            <div><small>Conta verificada</small><b>${student.email}</b></div>
            <button id="student-logout" type="button" title="Sair"><i data-lucide="log-out"></i></button>
          </div>
          <p class="auth-kicker">ENTRAR NA ATIVIDADE</p>
          <h1>Pronto para começar?</h1>
          <p>Informe o código recebido da professora. Seu RA será usado na marca d'água da avaliação.</p>

          <form id="student-activity-form">
            <label for="activity-code">Código da atividade</label>
            <div class="auth-input"><i data-lucide="key-round"></i><input id="activity-code" type="text" value="${defaultCode}" autocomplete="off" placeholder="Ex.: GEO-8B-2026" required></div>
            <label for="student-name">Nome completo</label>
            <div class="auth-input"><i data-lucide="user"></i><input id="student-name" type="text" value="${student.display_name || ""}" autocomplete="name" maxlength="120" required></div>
            <label for="student-ra">RA</label>
            <div class="auth-input"><i data-lucide="id-card"></i><input id="student-ra" type="text" autocomplete="off" placeholder="000.000.000-0/SP" required></div>
            <div class="exam-notice"><i data-lucide="shield-alert"></i><p><b>Durante a atividade</b>Saídas da tela e perda de foco podem ser registradas. Copiar, selecionar e imprimir são dificultados pelo navegador.</p></div>
            <label class="consent-row"><input id="student-consent" type="checkbox" required><span>Li as orientações e estou pronto(a) para iniciar.</span></label>
            <p id="activity-login-error" class="auth-error" role="alert" aria-live="polite"></p>
            <button class="auth-submit student-submit" type="submit"><span>Entrar na atividade</span><i data-lucide="shield-check"></i></button>
          </form>
        </section>
      </main>`;

    if (window.lucide) window.lucide.createIcons();
    document.getElementById("student-logout").onclick = () => StudentAuth.logout();
    document.getElementById("student-activity-form").onsubmit = async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector(".auth-submit");
      const error = document.getElementById("activity-login-error");
      const codigo = document.getElementById("activity-code").value.trim();
      const nome = document.getElementById("student-name").value.trim();
      const ra = document.getElementById("student-ra").value.trim();
      button.disabled = true;
      button.querySelector("span").textContent = "Verificando…";
      error.textContent = "";

      try {
        const atividade = await DB.getAtividadePorCodigo(codigo);
        if (!atividade) throw new Error("Código não encontrado ou atividade ainda não publicada.");
        sessionStorage.setItem("aluno_ativo", JSON.stringify({
          nome,
          ra,
          email: student.email,
          codigoAtividade: atividade.codigo,
          atividadeId: atividade.id,
          teacherId: atividade.teacherId
        }));
        window.location.hash = `#aluno/prova/${atividade.codigo}`;
      } catch (err) {
        error.textContent = err.message;
        button.disabled = false;
        button.querySelector("span").textContent = "Entrar na atividade";
      }
    };
  }
};

window.AlunoLoginView = AlunoLoginView;
