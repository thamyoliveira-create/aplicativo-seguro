const HomeView = {
  render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="landing-shell">
        <header class="landing-nav">
          <a class="landing-logo" href="#" aria-label="Atividade Segura — início"><span><i data-lucide="shield-check"></i></span><b>Atividade Segura</b></a>
          <nav aria-label="Navegação principal"><a class="nav-link" href="#como-funciona">Uma cena conhecida</a><a class="nav-cta" href="#acesso">Entrar <i data-lucide="arrow-up-right"></i></a></nav>
        </header>
        <section class="landing-hero" aria-labelledby="landing-title">
          <div class="hero-copy">
            <p class="eyebrow"><span></span>UMA PERGUNTA MEIO INCONVENIENTE</p>
            <h1 id="landing-title">Se a resposta cabe num <em>Ctrl+C,</em><br>a prova mediu o quê?</h1>
            <p class="hero-lead">Você prepara um texto bom, pensa no contexto, confere o gabarito. Na manhã seguinte, metade da turma descobre que copiar é bem mais rápido que interpretar. Não é exatamente o plano de aula.</p>
            <div class="hero-actions"><a class="hero-primary" href="#acesso">Tenho um arquivo e pouco tempo <i data-lucide="arrow-right"></i></a><a class="hero-secondary" href="#como-funciona">Continue, isso parece familiar</a></div>
            <p class="hero-domain"><i data-lucide="badge-check"></i> Para contas institucionais da Educação SP</p>
          </div>
          <div class="hero-visual" aria-label="Exemplo de questão contextualizada">
            <div class="visual-orbit orbit-one" aria-hidden="true"></div><div class="visual-orbit orbit-two" aria-hidden="true"></div>
            <article class="question-preview">
              <div class="preview-top"><span>Função afim</span><span class="preview-number">Questão 04</span></div>
              <p class="preview-label">LEIA A SITUAÇÃO</p>
              <h2>Uma corrida cobra taxa inicial de R$ 6 e R$ 2,40 por quilômetro. O que muda no gráfico quando a taxa inicial aumenta?</h2>
              <div class="preview-source"><i data-lucide="message-square-quote"></i><span>A conta sozinha não basta: o estudante precisa relacionar expressão, gráfico e contexto.</span></div>
              <div class="preview-answer"><span>A</span><div></div></div><div class="preview-answer active"><span>B</span><div></div><i data-lucide="check"></i></div><div class="preview-answer"><span>C</span><div></div></div>
              <div class="preview-footer"><i data-lucide="brain"></i> interpretação antes do chute</div>
            </article>
            <div class="security-note"><i data-lucide="scan-eye"></i><span><b>Não faz milagre</b>mas registra troca de aba</span></div>
          </div>
        </section>
        <section id="como-funciona" class="landing-story" aria-labelledby="story-title">
          <div class="story-time"><span>QUARTA-FEIRA</span><strong>7h18</strong></div>
          <div class="story-copy">
            <p class="eyebrow"><span></span>CENA CONHECIDA</p>
            <h2 id="story-title">O PDF está pronto.<br>A turma chega em doze minutos.</h2>
            <p>A professora envia o arquivo. A IA separa enunciados, alternativas e respostas esperadas. Antes de publicar, ela lê tudo, corrige uma alternativa estranha e transforma duas questões objetivas em dissertativas.</p>
            <p>Depois, gera um PIN. Os alunos entram com o e-mail institucional. A prova recebe marca d’água e as saídas da aba ficam registradas. Ainda é uma sala de aula — só há menos trabalho braçal no caminho.</p>
            <a class="story-link" href="#acesso">Certo, agora quero entrar <i data-lucide="arrow-right"></i></a>
          </div>
          <aside class="story-margin-note"><i data-lucide="pencil-line"></i><p><strong>A IA entrega um rascunho.</strong> Quem conhece a turma, muda o tipo da questão e aperta “publicar” é a professora.</p></aside>
        </section>
        <footer class="landing-footer"><span>Atividade Segura · Educação SP</span><span>Sem “revolucionar a educação”. A ideia é funcionar na aula de amanhã.</span></footer>
      </main>`;
    if (window.lucide) window.lucide.createIcons();
  },

  renderAccess() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="access-choice-shell">
        <a class="access-choice-back" href="#"><i data-lucide="arrow-left"></i> Voltar</a>
        <section class="access-choice-panel" aria-labelledby="access-title">
          <div class="access-choice-heading">
            <a class="landing-logo" href="#"><span><i data-lucide="shield-check"></i></span><b>Atividade Segura</b></a>
            <p class="auth-kicker">ESCOLHA SEU ACESSO</p>
            <h1 id="access-title">De que lado da prova você está?</h1>
            <p>Prometemos não contar se você preferia estar no recreio.</p>
          </div>
          <div class="access-choice-grid">
            <a class="access-choice-card student" href="#aluno"><span class="access-choice-icon"><i data-lucide="graduation-cap"></i></span><small>ESTUDANTE</small><h2>Sou aluno</h2><p>Tenho um código e quero acessar minha atividade.</p><strong>Entrar como aluno <i data-lucide="arrow-right"></i></strong></a>
            <a class="access-choice-card teacher" href="#professor"><span class="access-choice-icon"><i data-lucide="presentation"></i></span><small>DOCENTE</small><h2>Sou professora</h2><p>Quero criar, revisar ou acompanhar uma atividade.</p><strong>Abrir painel docente <i data-lucide="arrow-right"></i></strong></a>
          </div>
          <p class="access-choice-note"><i data-lucide="lock-keyhole"></i> Cada perfil entra somente com seu domínio institucional.</p>
        </section>
      </main>`;
    if (window.lucide) window.lucide.createIcons();
  }
};

window.HomeView = HomeView;
