const AlunoLoginView = {
  async render(params = {}) {
    const root = document.getElementById("app-root");
    const student = await StudentAuth.session();

    if (!student) {
      root.innerHTML = `
        <main class="student-login-shell">
          <a class="auth-back" href="#"><i data-lucide="arrow-left"></i> Início</a>
          <section class="student-login-card">
            <div class="student-login-mark"><i data-lucide="graduation-cap"></i></div>
            <p class="auth-kicker">ACESSO DO ESTUDANTE</p>
            <h1>Entre com seu e-mail institucional</h1>
            <p>Você receberá um link na sua caixa de entrada Microsoft. Depois, informe o código da atividade e seu RA.</p>
            <form id="student-email-form">
              <label for="student-email">E-mail institucional</label>
              <div class="auth-input">
                <i data-lucide="mail"></i>
                <input id="student-email" type="email" autocomplete="email"
                  placeholder="nome@aluno.educacao.sp.gov.br" required>
              </div>
              <p id="student-login-error" class="auth-error" role="alert" aria-live="polite"></p>
              <p id="student-login-success" class="auth-success" role="status" aria-live="polite"></p>
              <button class="auth-submit student-submit" type="submit">
                <span>Enviar link seguro</span><i data-lucide="arrow-right"></i>
              </button>
            </form>
            <div class="auth-divider"><span>É professora?</span></div>
            <a class="auth-student-link" href="#professor">Acessar o painel docente</a>
          </section>
        </main>`;

      if (window.lucide) window.lucide.createIcons();

      document.getElementById("student-email-form").onsubmit = async (event) => {
        event.preventDefault();
        const button = event.currentTarget.querySelector(".auth-submit");
        const error = document.getElementById("student-login-error");
        const success = document.getElementById("student-login-success");
        button.disabled = true;
        button.querySelector("span").textContent = "Enviando…";
        error.textContent = "";
        success.textContent = "";

        try {
          const sentTo = await StudentAuth.sendMagicLink(document.getElementById("student-email").value);
          success.textContent = `Link enviado para ${sentTo}. Abra o e-mail neste mesmo dispositivo.`;
          button.querySelector("span").textContent = "Link enviado";
        } catch (err) {
          error.textContent = err.message;
          button.disabled = false;
          button.querySelector("span").textContent = "Enviar link seguro";
        }
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
          <p>Informe o código recebido da professora. O RA será usado na marca d'água da avaliação.</p>

          <form id="student-activity-form">
            <label for="activity-code">Código da atividade</label>
            <div class="auth-input"><i data-lucide="key-round"></i>
              <input id="activity-code" type="text" value="${defaultCode}" autocomplete="off" placeholder="Ex.: GEO-8B-2026" required>
            </div>
            <label for="student-name">Nome completo</label>
            <div class="auth-input"><i data-lucide="user"></i>
              <input id="student-name" type="text" autocomplete="name" placeholder="Seu nome completo" required>
            </div>
            <label for="student-ra">RA</label>
            <div class="auth-input"><i data-lucide="id-card"></i>
              <input id="student-ra" type="text" autocomplete="off" placeholder="000.000.000-0/SP" required>
            </div>

            <div class="exam-notice">
              <i data-lucide="shield-alert"></i>
              <p><b>Durante a atividade</b>Saídas da tela e perda de foco podem ser registradas. Copiar, selecionar e imprimir são dificultados pelo navegador.</p>
            </div>

            <label class="consent-row">
              <input id="student-consent" type="checkbox" required>
              <span>Li as orientações e estou pronto(a) para iniciar.</span>
            </label>
            <p id="activity-login-error" class="auth-error" role="alert" aria-live="polite"></p>
            <button class="auth-submit student-submit" type="submit">
              <span>Entrar na atividade</span><i data-lucide="shield-check"></i>
            </button>
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
          atividadeId: atividade.id
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
