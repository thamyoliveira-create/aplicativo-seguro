/**
 * App Router & Main Controller - Atividade Segura
 * Proteção de rotas do docente e separação estrita do ambiente do aluno
 */

const App = {
  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/");

    // Se estiver saindo de uma prova do aluno, desativa travas de segurança
    if (!hash.startsWith("aluno/prova") && window.securityEngine) {
      window.securityEngine.destroy();
    }

    // 1. Rota de Autenticação do Docente
    if (hash === "docente" || hash === "professor/login") {
      ProfessorAuthView.render();
      window.scrollTo(0, 0);
      return;
    }

    // 2. Proteção das Rotas do Professor
    if (parts[0] === "professor") {
      const isAuth = sessionStorage.getItem("professor_autenticado") === "true";
      if (!isAuth) {
        // Redireciona para o login com senha do docente
        ProfessorAuthView.render();
        window.scrollTo(0, 0);
        return;
      }

      if (parts[1] === "nova-atividade") {
        ProfessorNovaAtividadeView.render();
      } else if (parts[1] === "atividade" && parts[2]) {
        ProfessorAtividadeDetalhesView.render({ id: parts[2] });
      } else if (parts[1] === "configuracoes") {
        ProfessorConfiguracoesView.render();
      } else {
        ProfessorDashboardView.render();
      }
      window.scrollTo(0, 0);
      return;
    }

    // 3. Rotas do Aluno
    if (parts[0] === "aluno") {
      if (parts[1] === "prova" && parts[2]) {
        AlunoProvaView.render({ codigo: parts[2] });
      } else {
        HomeView.render();
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Padrão: Portal de Entrada do Aluno
    HomeView.render();
    window.scrollTo(0, 0);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
