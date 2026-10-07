const AlunoLoginView = {
  mode: "login",
  useEmailField: false,

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
            <p>${registering ? "Informe seu nome e RA institucional para criar o acesso." : "Informe seu RA e Dígito cadastrados pela professora."}</p>

            <div class="auth-mode-tabs" role="tablist" aria-label="Escolher tipo de acesso">
              <button type="button" data-student-mode="login" class="${!registering ? "active" : ""}">Entrar com RA</button>
              <button type="button" data-student-mode="register" class="${registering ? "active" : ""}">Primeiro acesso</button>
            </div>

            <form id="student-auth-form">
              ${registering ? `
                <label for="student-account-name">Nome completo</label>
                <div class="auth-input"><i data-lucide="user"></i><input id="student-account-name" type="text" autocomplete="name" maxlength="100" placeholder="Seu nome completo" required></div>
              ` : ""}

              ${(!this.useEmailField && !registering) ? `
                <label>RA do Estudante</label>
                <div class="ra-input-row">
                  <div class="ra-main">
                    <div class="auth-input">
                      <i data-lucide="id-card"></i>
                      <input id="student-ra-num" type="text" autocomplete="username" inputmode="numeric" placeholder="Número do RA (ex: 112790615)" required>
                    </div>
                  </div>
                  <div class="ra-dig">
                    <div class="auth-input">
                      <input id="student-ra-dig" type="text" maxlength="1" placeholder="Díg." autocomplete="off" required>
                    </div>
                  </div>
                  <div class="ra-uf">SP</div>
                </div>
                <p class="auth-field-note">Digite os números do seu RA e o dígito (ex: <strong>5</strong> ou <strong>X</strong>).</p>
              ` : `
                <label for="student-email-input">E-mail institucional do aluno</label>
                <div class="auth-input"><i data-lucide="mail"></i><input id="student-email-input" type="email" autocomplete="email" placeholder="0000...sp@aluno.educacao.sp.gov.br" required></div>
                <p class="auth-field-note">Aceitamos somente contas com final <strong>@aluno.educacao.sp.gov.br</strong>.</p>
              `}

              <label for="student-password">Senha</label>
              <div class="auth-input"><i data-lucide="lock-keyhole"></i><input id="student-password" type="password" autocomplete="${registering ? "new-password" : "current-password"}" minlength="6" placeholder="Sua senha de acesso" required><button class="password-toggle" type="button" aria-label="Mostrar senha"><i data-lucide="eye"></i></button></div>
              <p id="student-login-error" class="auth-error" role="alert" aria-live="polite"></p>
              <p id="student-login-success" class="auth-success" role="status" aria-live="polite"></p>
              <button class="auth-submit student-submit" type="submit"><span>${registering ? "Criar conta de estudante" : "Entrar"}</span><i data-lucide="arrow-right"></i></button>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
                ${!registering ? `
                  <button id="student-toggle-email" class="auth-text-button" type="button" style="font-size:11px; text-align:left;">
                    ${this.useEmailField ? "← Entrar com RA e Dígito" : "Entrar com e-mail completo"}
                  </button>
                  <button id="student-reset" class="auth-text-button" type="button" style="font-size:11px;">Esqueci minha senha</button>
                ` : ""}
              </div>
            </form>

            <div class="auth-divider"><span>Também disponível</span></div>
            <a class="auth-student-link" href="#simulados">Treinar no Simulado Provão Paulista 2026</a>
            <a class="auth-student-link" href="#professor">Acessar o painel docente</a>
          </section>
        </main>`;

      if (window.lucide) window.lucide.createIcons();
      document.querySelectorAll("[data-student-mode]").forEach((button) => {
        button.onclick = () => {
          this.mode = button.dataset.studentMode;
          this.render(params);
        };
      });

      const toggleEmailBtn = document.getElementById("student-toggle-email");
      if (toggleEmailBtn) {
        toggleEmailBtn.onclick = () => {
          this.useEmailField = !this.useEmailField;
          this.render(params);
        };
      }

      const raNumInput = document.getElementById("student-ra-num");
      const raDigInput = document.getElementById("student-ra-dig");
      if (raDigInput) {
        raDigInput.oninput = () => {
          raDigInput.value = raDigInput.value.toUpperCase();
        };
      }
      if (raNumInput && raDigInput) {
        raNumInput.oninput = () => {
          const val = raNumInput.value.trim();
          // Se colou RA completo com traço (ex: 000112790615-X)
          if (val.includes("-")) {
            const parts = val.split("-");
            raNumInput.value = parts[0].replace(/\D/g, "");
            raDigInput.value = (parts[1] || "").substring(0, 1).toUpperCase();
          }
        };
      }

      const password = document.getElementById("student-password");
      const emailInput = document.getElementById("student-email-input");

      document.querySelector(".password-toggle").onclick = () => {
        password.type = password.type === "password" ? "text" : "password";
      };

      document.getElementById("student-auth-form").onsubmit = async (event) => {
        event.preventDefault();
        const button = event.currentTarget.querySelector(".auth-submit");
        const error = document.getElementById("student-login-error");
        const success = document.getElementById("student-login-success");
        button.disabled = true;
        button.querySelector("span").textContent = registering ? "Criando…" : "Verificando…";
        error.textContent = "";
        success.textContent = "";

        try {
          let email = "";
          let raFormatted = "";

          if (registering || this.useEmailField) {
            email = emailInput ? emailInput.value.trim().toLowerCase() : "";
            raFormatted = PortalAuth.extractRAFromEmail(email) ? `${PortalAuth.extractRAFromEmail(email)}/SP` : "";
          } else {
            const raNum = raNumInput ? raNumInput.value.trim() : "";
            const raDig = raDigInput ? raDigInput.value.trim() : "";
            email = PortalAuth.raToEmail(raNum, raDig);
            raFormatted = PortalAuth.formatRA(raNum, raDig);
          }

          if (raFormatted) {
            sessionStorage.setItem("aluno_ra_login", raFormatted);
          }

          if (registering) {
            const createdEmail = await StudentAuth.register(email, password.value, document.getElementById("student-account-name").value);
            success.textContent = `Conta criada para ${createdEmail}. Você já pode entrar com seu RA e senha.`;
            button.querySelector("span").textContent = "Conta criada";
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
          let email = "";
          if (this.useEmailField || registering) {
            email = emailInput ? emailInput.value.trim().toLowerCase() : "";
          } else {
            const raNum = raNumInput ? raNumInput.value.trim() : "";
            const raDig = raDigInput ? raDigInput.value.trim() : "";
            email = PortalAuth.raToEmail(raNum, raDig);
          }
          const sentTo = await StudentAuth.resetPassword(email);
          success.textContent = `Enviamos as instruções de recuperação para ${sentTo}.`;
          error.textContent = "";
        } catch (err) { error.textContent = err.message; success.textContent = ""; }
      };
      return;
    }

    if (params.redirect && String(params.redirect).startsWith("simulados/prova/")) {
      window.location.hash = `#${params.redirect}`;
      return;
    }

    const defaultCode = params.codigo || "";
    const savedRA = sessionStorage.getItem("aluno_ra_login") || (student.studentRA ? `${student.studentRA}/SP` : "");

    root.innerHTML = `
      <main class="student-login-shell student-identified">
        <a class="auth-back" href="#"><i data-lucide="arrow-left"></i> Início</a>
        <section class="student-login-card">
          <div class="student-session">
            <span><i data-lucide="badge-check"></i></span>
            <div><small>Conta verificada</small><b>${student.display_name || student.email}</b></div>
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
            <div class="auth-input"><i data-lucide="id-card"></i><input id="student-ra" type="text" value="${savedRA}" autocomplete="off" placeholder="000.000.000-0/SP" required></div>
            <div class="exam-notice"><i data-lucide="shield-alert"></i><p><b>Durante a atividade</b>Saídas da tela e perda de foco podem ser registradas. Copiar, selecionar e imprimir são dificultados pelo navegador.</p></div>
            <a href="#simulados" class="auth-student-link">Ou treinar agora no Simulado Provão Paulista 2026</a>
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
        if (codigo.toUpperCase() === "PROVAO") {
          window.location.hash = "#simulados";
          return;
        }

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
