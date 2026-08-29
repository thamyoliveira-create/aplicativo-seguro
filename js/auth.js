const PortalAuth = {
  domains: {
    teacher: "@professor.educacao.sp.gov.br",
    student: "@aluno.educacao.sp.gov.br"
  },

  async api() {
    await window.firebaseReady;
    return window.FirebaseAPI;
  },

  normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  },

  roleFromEmail(email) {
    const normalized = this.normalizeEmail(email);
    if (normalized.endsWith(this.domains.teacher)) return "teacher";
    if (normalized.endsWith(this.domains.student)) return "student";
    return null;
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

  friendlyError(error) {
    const messages = {
      "auth/email-already-in-use": "Este e-mail já possui uma conta. Use a opção Entrar.",
      "auth/invalid-credential": "E-mail ou senha incorretos.",
      "auth/invalid-email": "O endereço de e-mail não é válido.",
      "auth/weak-password": "Use uma senha com pelo menos 8 caracteres.",
      "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
      "auth/network-request-failed": "Falha de conexão. Verifique sua internet e tente novamente.",
      "auth/user-disabled": "Esta conta foi desativada.",
      "auth/operation-not-allowed": "O login por e-mail e senha ainda não está habilitado."
    };
    return new Error(messages[error?.code] || error?.message || "Não foi possível concluir o acesso.");
  },

  async ensureProfile(user, role, displayName = "") {
    const F = await this.api();
    const profileRef = F.doc(F.db, "users_private", user.uid);
    const existing = await F.getDoc(profileRef);
    const name = String(displayName || user.displayName || user.email.split("@")[0]).trim().slice(0, 100);

    if (!existing.exists()) {
      await F.setDoc(profileRef, {
        email: this.normalizeEmail(user.email),
        displayName: name,
        role,
        createdAt: F.serverTimestamp(),
        updatedAt: F.serverTimestamp()
      });
    }

    return existing.exists() ? existing.data() : { email: user.email, displayName: name, role };
  },

  async identity() {
    const F = await this.api();
    const user = F.auth.currentUser;
    if (!user) return null;

    await user.reload();
    if (!user.emailVerified) return null;

    const role = this.roleFromEmail(user.email);
    if (!role) return null;

    const profile = await this.ensureProfile(user, role);
    return {
      id: user.uid,
      userId: user.uid,
      email: this.normalizeEmail(user.email),
      display_name: profile.displayName || user.displayName || "",
      role,
      emailVerified: true
    };
  },

  async register({ email, password, displayName, role }) {
    const F = await this.api();
    const normalized = this.validateEmail(email, role);
    if (String(password || "").length < 8) throw new Error("Use uma senha com pelo menos 8 caracteres.");
    if (!String(displayName || "").trim()) throw new Error("Informe seu nome completo.");

    try {
      const credential = await F.createUserWithEmailAndPassword(F.auth, normalized, password);
      await F.updateProfile(credential.user, { displayName: String(displayName).trim().slice(0, 100) });
      await F.sendEmailVerification(credential.user, {
        url: `${window.location.origin}${window.location.pathname}#${role === "teacher" ? "professor" : "aluno"}`
      });
      await F.signOut(F.auth);
      return normalized;
    } catch (error) {
      throw this.friendlyError(error);
    }
  },

  async login({ email, password, role }) {
    const F = await this.api();
    const normalized = this.validateEmail(email, role);

    try {
      const credential = await F.signInWithEmailAndPassword(F.auth, normalized, password);
      await credential.user.reload();

      if (!credential.user.emailVerified) {
        await F.sendEmailVerification(credential.user, {
          url: `${window.location.origin}${window.location.pathname}#${role === "teacher" ? "professor" : "aluno"}`
        });
        await F.signOut(F.auth);
        throw new Error("Confirme seu e-mail antes de entrar. Enviamos uma nova mensagem de verificação.");
      }

      if (this.roleFromEmail(credential.user.email) !== role) {
        await F.signOut(F.auth);
        throw new Error("Esta conta não pertence ao perfil selecionado.");
      }

      return await this.identity();
    } catch (error) {
      if (error?.message?.startsWith("Confirme") || error?.message?.startsWith("Esta conta")) throw error;
      throw this.friendlyError(error);
    }
  },

  async resetPassword(email, role) {
    const F = await this.api();
    const normalized = this.validateEmail(email, role);
    try {
      await F.sendPasswordResetEmail(F.auth, normalized);
      return normalized;
    } catch (error) {
      throw this.friendlyError(error);
    }
  },

  async logout(destination = "") {
    const F = await this.api();
    await F.signOut(F.auth);
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
  login(email, password) {
    return PortalAuth.login({ email, password, role: "teacher" }).then((user) => (this.user = user));
  },
  register(email, password, displayName) {
    return PortalAuth.register({ email, password, displayName, role: "teacher" });
  },
  resetPassword(email) {
    return PortalAuth.resetPassword(email, "teacher");
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
  login(email, password) {
    return PortalAuth.login({ email, password, role: "student" }).then((user) => (this.user = user));
  },
  register(email, password, displayName) {
    return PortalAuth.register({ email, password, displayName, role: "student" });
  },
  resetPassword(email) {
    return PortalAuth.resetPassword(email, "student");
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
