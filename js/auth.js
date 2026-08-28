const TeacherAuth = {
  user: null,
  async session() {
    try {
      const response = await fetch("/api/auth/professor/session", { credentials: "same-origin" });
      const data = await response.json();
      this.user = response.ok && data.authenticated ? data.user : null;
      return this.user;
    } catch (_) {
      this.user = null;
      return null;
    }
  },
  async requireProfessor() {
    const user = this.user || await this.session();
    if (!user) {
      ProfessorLoginView.render();
      return false;
    }
    return true;
  },
  async login(email, accessCode) {
    const response = await fetch("/api/auth/professor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email, accessCode })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
    this.user = data.user;
    return data.user;
  },
  async logout() {
    await fetch("/api/auth/professor/logout", { method: "POST", credentials: "same-origin" });
    this.user = null;
    window.location.hash = "";
  }
};
window.TeacherAuth = TeacherAuth;
