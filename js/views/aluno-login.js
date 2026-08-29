/**
 * View: Acesso e Identificação do Aluno (Fallback / Redirecionamento)
 * Design: SaaS Pro / GovTech Educational Standard
 */

const AlunoLoginView = {
  mode: "login",

  async render(params = {}) {
    // Redireciona para a Home com rolagem para o formulário de login
    window.location.hash = "#secao-login";
    if (window.HomeView) {
      await window.HomeView.render();
      const el = document.getElementById("secao-login");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

window.AlunoLoginView = AlunoLoginView;
