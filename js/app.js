/**
 * App Router & Main Controller - Atividade Segura
 */

const App = {
  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/");

    // Se estiver saindo de uma prova, desativa travas de segurança
    if (!hash.startsWith("aluno/prova") && window.securityEngine) {
      window.securityEngine.destroy();
    }

    if (!hash || hash === "") {
      HomeView.render();
    } else if (parts[0] === "aluno") {
      if (parts[1] === "prova" && parts[2]) {
        AlunoProvaView.render({ codigo: parts[2] });
      } else {
        AlunoLoginView.render();
      }
    } else if (parts[0] === "professor") {
      if (parts[1] === "nova-atividade") {
        ProfessorNovaAtividadeView.render();
      } else if (parts[1] === "atividade" && parts[2]) {
        ProfessorAtividadeDetalhesView.render({ id: parts[2] });
      } else if (parts[1] === "configuracoes") {
        ProfessorConfiguracoesView.render();
      } else {
        ProfessorDashboardView.render();
      }
    } else {
      HomeView.render();
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
