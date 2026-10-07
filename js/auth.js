const PortalAuth = {
  domains: {
    teacher: ["@professor.educacao.sp.gov.br", "@prof.educacao.sp.gov.br"],
    student: ["@aluno.educacao.sp.gov.br"]
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
    if (this.domains.teacher.some((domain) => normalized.endsWith(domain))) return "teacher";
    if (this.domains.student.some((domain) => normalized.endsWith(domain))) return "student";
    return null;
  },

  canBypassEmailVerification(email, role) {
    return ["teacher", "student"].includes(role) && this.roleFromEmail(email) === role;
  },

  /**
   * Converte RA e Dígito informados pelo aluno no e-mail institucional oficial
   * Padrão SEDUC-SP: 0000<ra><dig>sp@aluno.educacao.sp.gov.br
   */
  raToEmail(ra, dig = "", uf = "sp") {
    const rawRa = String(ra || "").trim();
    if (!rawRa) throw new Error("Informe o RA do aluno.");

    // Se o aluno digitou/colou o e-mail completo, utiliza diretamente
    if (rawRa.includes("@")) {
      return this.normalizeEmail(rawRa);
    }

    let cleanRa = "";
    let cleanDig = String(dig || "").trim().toLowerCase();
    let cleanUf = String(uf || "sp").trim().toLowerCase();

    // Trata se o aluno digitou RA com separador no mesmo campo (ex: 000112790615-X ou 112790615-5/SP)
    const separatedMatch = rawRa.match(/^0*(\d{5,12})[-_/\s]+([0-9a-zA-Z])(?:[-_/\s]*([a-zA-Z]{2}))?$/i);
    if (separatedMatch) {
      cleanRa = separatedMatch[1];
      cleanDig = separatedMatch[2].toLowerCase();
      cleanUf = (separatedMatch[3] || cleanUf || "sp").toLowerCase();
    } else {
      cleanRa = rawRa.replace(/\D/g, "").replace(/^0+/, "");
      if (!cleanDig) {
        throw new Error("Informe o dígito do RA (ex: 5 ou X).");
      }
    }

    if (!cleanRa) throw new Error("Número de RA inválido.");
    if (!cleanDig) throw new Error("Informe o dígito do RA.");

    return `0000${cleanRa}${cleanDig}${cleanUf}@aluno.educacao.sp.gov.br`;
  },

  /**
   * Formata o RA para exibição padronizada na prova e marca d'água (ex: 112790615-X/SP)
   */
  formatRA(ra, dig = "", uf = "SP") {
    const rawRa = String(ra || "").trim();
    if (rawRa.includes("@")) {
      const extracted = this.extractRAFromEmail(rawRa);
      return extracted ? `${extracted.replace(".", "-")}/SP` : rawRa;
    }

    const separatedMatch = rawRa.match(/^0*(\d{5,12})[-_/\s]+([0-9a-zA-Z])(?:[-_/\s]*([a-zA-Z]{2}))?$/i);
    if (separatedMatch) {
      return `${separatedMatch[1]}-${separatedMatch[2].toUpperCase()}/${(separatedMatch[3] || uf).toUpperCase()}`;
    }

    const cleanRa = rawRa.replace(/\D/g, "").replace(/^0+/, "");
    const cleanDig = String(dig || "").trim().toUpperCase();
    return cleanDig ? `${cleanRa}-${cleanDig}/${uf.toUpperCase()}` : cleanRa;
  },

  /**
   * Tenta extrair o RA do e-mail institucional do aluno
   */
  extractRAFromEmail(email) {
    const normalized = this.normalizeEmail(email);
    if (!this.domains.student.some((domain) => normalized.endsWith(domain))) return null;

    const localPart = normalized.split("@")[0];
    const plusParts = localPart.split("+");

    if (plusParts.length === 4 && plusParts[0] === "0000" && /^\d+$/.test(plusParts[1]) && /^\d$/.test(plusParts[2])) {
      return `${plusParts[1]}.${plusParts[2]}`;
    }

    const compact = localPart.match(/^0000(\d{5,12})([0-9a-zA-Z])sp$/i);
    if (compact) return `${compact[1]}.${compact[2].toUpperCase()}`;

    return null;
  },

  validateEmail(email, role) {
    const normalized = this.normalizeEmail(email);
    const domains = this.domains[role] || [];

    if (!domains.some((domain) => normalized.endsWith(domain) && normalized !== domain)) {
      const expected = role === "teacher" ? "@professor.educacao.sp.gov.br ou @prof.educacao.sp.gov.br" : "@aluno.educacao.sp.gov.br";
      throw new Error(`Use seu e-mail institucional ${expected}.`);
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

    // Extrair RA se for aluno
    const studentRA = role === "student" ? this.extractRAFromEmail(user.email) : null;

    if (!existing.exists()) {
      await F.setDoc(profileRef, {
        email: this.normalizeEmail(user.email),
        displayName: name,
        role,
        studentRA: studentRA,
        createdAt: F.serverTimestamp(),
        updatedAt: F.serverTimestamp()
      });
    }

    return existing.exists() ? existing.data() : {
      email: user.email,
      displayName: name,
      role,
      studentRA: studentRA
    };
  },

  async identity() {
    const F = await this.api();
    const user = F.auth.currentUser;
    if (!user) return null;

    await user.reload();

    const role = this.roleFromEmail(user.email);
    if (!role) return null;

    const profile = await this.ensureProfile(user, role);
    return {
      id: user.uid,
      userId: user.uid,
      email: this.normalizeEmail(user.email),
      display_name: profile.displayName || user.displayName || "",
      role,
      studentRA: profile.studentRA || null,
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
      await this.ensureProfile(credential.user, role, displayName);
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

      if (this.roleFromEmail(credential.user.email) !== role) {
        await F.signOut(F.auth);
        throw new Error("Esta conta não pertence ao perfil selecionado.");
      }

      return await this.identity();
    } catch (error) {
      if (error?.message?.startsWith("Esta conta")) throw error;
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
  loginWithRA(ra, dig, password) {
    const email = PortalAuth.raToEmail(ra, dig);
    return this.login(email, password);
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
