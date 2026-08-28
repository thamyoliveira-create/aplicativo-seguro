const PortalAuth = {
  domains: {
    teacher: "@professor.educacao.sp.gov.br",
    student: "@aluno.educacao.sp.gov.br"
  },

  normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  },

  validateEmail(email, role) {
    const normalized = this.normalizeEmail(email);
    const domain = this.domains[role];
    if (!normalized.endsWith(domain) || normalized === domain) {
      const label = role === "teacher" ? "professor" : "aluno";
      throw new Error(`Use seu e-mail institucional @${label}.educacao.sp.gov.br.`);
    }
    return normalized;
  },

  async identity() {
    const { data: { user }, error: userError } = await window.supabaseClient.auth.getUser();
    if (userError || !user) return null;

    const { data: profile, error: profileError } = await window.supabaseClient
      .from("profiles")
      .select("id,email,role,display_name")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) return null;
    return { ...profile, userId: user.id };
  },

  async sendMagicLink(email, role, destinationHash) {
    const normalized = this.validateEmail(email, role);
    const redirectTo = `${window.location.origin}${window.location.pathname}${destinationHash}`;

    const { error } = await window.supabaseClient.auth.signInWithOtp({
      email: normalized,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true }
    });

    if (error) {
      if (/database error|saving new user/i.test(error.message)) {
        throw new Error("Esse endereço não pertence ao perfil escolhido.");
      }
      throw new Error(error.message || "Não foi possível enviar o link de acesso.");
    }
    return normalized;
  },

  async logout(destination = "") {
    await window.supabaseClient.auth.signOut();
    window.location.hash = destination;
  }
};

const TeacherAuth = {
  user: null,

  async session() {
    const identity = await PortalAuth.identity();
    this.user = identity?.role === "teacher" ? identity : null;
    return this.user;
  },

  async requireProfessor() {
    const user = this.user || await this.session();
    if (!user) {
      ProfessorLoginView.render();
      return false;
    }
    return true;
  },

  sendMagicLink(email) {
    return PortalAuth.sendMagicLink(email, "teacher", "#professor");
  },

  logout() {
    this.user = null;
    return PortalAuth.logout("");
  }
};

const StudentAuth = {
  user: null,

  async session() {
    const identity = await PortalAuth.identity();
    this.user = identity?.role === "student" ? identity : null;
    return this.user;
  },

  sendMagicLink(email) {
    return PortalAuth.sendMagicLink(email, "student", "#aluno");
  },

  logout() {
    this.user = null;
    sessionStorage.removeItem("aluno_ativo");
    return PortalAuth.logout("#aluno");
  }
};

window.PortalAuth = PortalAuth;
window.TeacherAuth = TeacherAuth;
window.StudentAuth = StudentAuth;
