const HomeView = {
  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <div class="landing-shell">
        <header class="landing-nav">
          <a href="#" class="landing-logo" aria-label="Atividade Segura — início">
            <span><i data-lucide="shield-check"></i></span>
            <b>Atividade Segura</b>
          </a>
          <nav aria-label="Acessos principais">
            <a href="#aluno" class="nav-link">Sou estudante</a>
            <a href="#professor" class="nav-cta">Área docente <i data-lucide="arrow-up-right"></i></a>
          </nav>
        </header>

        <main>
          <section class="landing-hero">
            <div class="hero-copy">
              <div class="eyebrow"><span></span> Avaliação com contexto e integridade</div>
              <h1>Questões que pedem <em>leitura</em>, não repetição.</h1>
              <p class="hero-lead">Transforme materiais de aula em atividades dissertativas e objetivas com apoio de IA — pensadas para interpretação, argumentação e aplicação do conhecimento.</p>
              <div class="hero-actions">
                <a href="#professor" class="hero-primary">Criar como professora <i data-lucide="arrow-right"></i></a>
                <a href="#aluno" class="hero-secondary">Tenho um código de atividade</a>
              </div>
              <p class="hero-domain"><i data-lucide="building-2"></i> Acesso por e-mail institucional da Educação SP</p>
            </div>

            <div class="hero-visual" aria-label="Exemplo de atividade contextualizada">
              <div class="visual-orbit orbit-one"></div>
              <div class="visual-orbit orbit-two"></div>
              <article class="question-preview">
                <div class="preview-top">
                  <span>Geografia · 8º ano</span>
                  <span class="preview-number">03 / 08</span>
                </div>
                <p class="preview-label">SITUAÇÃO-PROBLEMA</p>
                <h2>Após uma sequência de chuvas intensas, dois bairros da mesma cidade tiveram impactos muito diferentes.</h2>
                <div class="preview-source">
                  <i data-lucide="map"></i>
                  <p>Compare o uso do solo, a infraestrutura e a ocupação das encostas antes de escolher a explicação mais consistente.</p>
                </div>
                <div class="preview-answer"><span>A</span><div></div></div>
                <div class="preview-answer active"><span>B</span><div></div><i data-lucide="check"></i></div>
                <div class="preview-answer"><span>C</span><div></div></div>
                <div class="preview-footer"><i data-lucide="brain"></i> interpretação + relação de evidências</div>
              </article>
              <div class="security-note"><i data-lucide="scan-eye"></i><span><b>Modo de aplicação</b>registra saídas e reduz cópia</span></div>
            </div>
          </section>

          <section class="trust-strip" aria-label="Recursos principais">
            <div><b>01</b><span><strong>Material próprio</strong>Use textos e documentos da aula como base.</span></div>
            <div><b>02</b><span><strong>IA com direção pedagógica</strong>Defina série, habilidade, tema e dificuldade.</span></div>
            <div><b>03</b><span><strong>Perfis separados</strong>Aluno não acessa painel, gabarito ou dados docentes.</span></div>
          </section>

          <section class="landing-details">
            <div>
              <p class="eyebrow"><span></span> DO PLANEJAMENTO À DEVOLUTIVA</p>
              <h2>Uma experiência simples para a professora. Uma atividade que exige presença do aluno.</h2>
            </div>
            <div class="detail-grid">
              <article><i data-lucide="file-up"></i><h3>Envie seu material</h3><p>Textos, resumos e referências orientam a criação das questões.</p></article>
              <article><i data-lucide="sparkles"></i><h3>Contextualize com IA</h3><p>Gere itens no estilo SARESP e Prova Paulista, com distratores plausíveis.</p></article>
              <article><i data-lucide="shield-alert"></i><h3>Aplique com registro</h3><p>Reduza copiar e colar, use marca d'água e registre perda de foco.</p></article>
              <article><i data-lucide="line-chart"></i><h3>Acompanhe evidências</h3><p>Veja entregas e ocorrências sem misturar os espaços de aluno e professora.</p></article>
            </div>
          </section>
        </main>

        <footer class="landing-footer">
          <span>Atividade Segura · projeto independente para apoio pedagógico</span>
          <span>Perfis aceitos: @professor e @aluno.educacao.sp.gov.br</span>
        </footer>
      </div>`;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.HomeView = HomeView;
