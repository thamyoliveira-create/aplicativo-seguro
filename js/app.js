const App = {
  async init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    await window.firebaseReady;
    window.FirebaseAPI.onAuthStateChanged(window.FirebaseAPI.auth, () => {
      setTimeout(() => this.handleRoute(), 0);
    });
    this.handleRoute();
  },

  async handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/");

    if (!hash.startsWith("aluno/prova") && window.securityEngine) {
      window.securityEngine.destroy();
    }

    if (!hash) {
      await HomeView.render();
    } else if (parts[0] === "aluno") {
      if (parts[1] === "prova" && parts[2]) {
        const student = await StudentAuth.session();
        let localIdentity = null;
        try {
          localIdentity = JSON.parse(sessionStorage.getItem("aluno_ativo") || "null");
        } catch (_) {}

        if (!student || !localIdentity || localIdentity.email !== student.email) {
          sessionStorage.removeItem("aluno_ativo");
          await AlunoLoginView.render({ codigo: parts[2] });
        } else {
          await AlunoProvaView.render({ codigo: parts[2] });
        }
      } else {
        await AlunoLoginView.render();
      }
    } else if (parts[0] === "professor") {
      const authorized = await TeacherAuth.requireProfessor();
      if (!authorized) {
        window.scrollTo(0, 0);
        return;
      }

      if (parts[1] === "nova-atividade") {
        await ProfessorNovaAtividadeView.render();
      } else if (parts[1] === "atividade" && parts[2]) {
        await ProfessorAtividadeDetalhesView.render({ id: parts[2] });
      } else if (parts[1] === "configuracoes") {
        await ProfessorConfiguracoesView.render();
      } else {
        await ProfessorDashboardView.render();
      }
    } else {
      await HomeView.render();
    }

    window.scrollTo(0, 0);
  }
};

window.addEventListener("DOMContentLoaded", () => App.init());
