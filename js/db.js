const DB = {
  async api() {
    await window.firebaseReady;
    return window.FirebaseAPI;
  },

  parseJson(value, fallback = {}) {
    try { return JSON.parse(value || ""); } catch (_) { return fallback; }
  },

  toIso(value) {
    return value?.toDate ? value.toDate().toISOString() : (value || null);
  },

  mapActivity(snapshot) {
    if (!snapshot?.exists()) return null;
    const row = snapshot.data();
    const content = this.parseJson(row.contentJson, {});
    return {
      ...content,
      id: snapshot.id,
      codigo: row.accessCode,
      titulo: row.title,
      disciplina: row.subject,
      anoTurma: row.grade,
      instrucoes: row.instructions,
      status: row.status === "published" ? "ativa" : row.status,
      configuracoesSeguranca: row.securitySettings || {},
      teacherId: row.teacherId,
      _createdAt: row.createdAt || null
    };
  },

  studentPayload(atividade) {
    return {
      pin: atividade.pin || "",
      tempoLimiteMinutos: atividade.tempoLimiteMinutos || 45,
      questoes: (atividade.questoes || []).slice(0, 100).map((questao) => ({
        id: String(questao.id || "").slice(0, 100),
        tipo: questao.tipo,
        habilidadeBNCC: String(questao.habilidadeBNCC || "").slice(0, 80),
        enunciado: String(questao.enunciado || "").slice(0, 12000),
        textoApoio: String(questao.textoApoio || "").slice(0, 30000),
        peso: Number(questao.peso || 1),
        alternativas: (questao.alternativas || []).slice(0, 10).map((alternativa) => ({
          id: String(alternativa.id || "").slice(0, 10),
          texto: String(alternativa.texto || "").slice(0, 4000)
        }))
      }))
    };
  },

  mapSubmission(snapshot) {
    if (!snapshot?.exists()) return null;
    const row = snapshot.data();
    return {
      ...this.parseJson(row.contentJson, {}),
      id: snapshot.id,
      atividadeId: row.activityId,
      alunoNome: row.studentName,
      alunoEmail: row.studentEmail,
      respostas: this.parseJson(row.answersJson, {}),
      infracoes: this.parseJson(row.infractionsJson, {}),
      nota: row.score ?? null,
      status: row.status,
      dataEnvio: this.toIso(row.submittedAt),
      dataInicio: this.toIso(row.startedAt)
    };
  },

  async getAtividades() {
    const F = await this.api();
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou.");

    try {
      const q = F.query(
        F.collection(F.db, "activities"),
        F.orderBy("createdAt", "desc")
      );
      const result = await F.getDocs(q);
      return result.docs.map((item) => this.mapActivity(item));
    } catch (err) {
      console.warn("Tentando fallback de atividades:", err);
      const qFallback = F.query(
        F.collection(F.db, "activities"),
        F.where("teacherId", "==", teacher.id)
      );
      const result = await F.getDocs(qFallback);
      return result.docs
        .map((item) => this.mapActivity(item))
        .sort((a, b) => String(b._createdAt || "").localeCompare(String(a._createdAt || "")));
    }
  },

  async getAtividadePorId(id) {
    const F = await this.api();
    const result = await F.getDoc(F.doc(F.db, "activities", id));
    return this.mapActivity(result);
  },

  async getAtividadePorCodigo(codigo) {
    const F = await this.api();
    const normalized = String(codigo || "").trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,32}$/.test(normalized)) return null;

    const result = await F.getDoc(F.doc(F.db, "activityCodes", normalized));
    if (!result.exists() || result.data().status !== "published") return null;

    const row = result.data();
    const payload = this.parseJson(row.studentContentJson, {});
    return {
      ...payload,
      id: row.activityId,
      codigo: row.accessCode,
      titulo: row.title,
      status: "ativa",
      teacherId: row.teacherId
    };
  },

  async salvarAtividade(atividade) {
    const F = await this.api();
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou. Entre novamente.");

    const code = String(atividade.codigo || "").trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,32}$/.test(code)) {
      throw new Error("Use um código de 4 a 32 caracteres, contendo letras, números ou hífen.");
    }

    const isExisting = Boolean(atividade.id && atividade._createdAt);
    const activityRef = isExisting
      ? F.doc(F.db, "activities", atividade.id)
      : F.doc(F.collection(F.db, "activities"));
    const codeRef = F.doc(F.db, "activityCodes", code);
    const activitySnap = isExisting ? await F.getDoc(activityRef) : null;
    const previousCode = activitySnap?.exists() ? activitySnap.data().accessCode : null;

    const status = atividade.status === "ativa" ? "published" : (atividade.status || "draft");
    const createdAt = activitySnap?.exists() ? activitySnap.data().createdAt : F.serverTimestamp();
    const now = F.serverTimestamp();
    const requestedSecurity = atividade.configuracoesSeguranca || {};
    const securitySettings = {
      bloquearCopiarColar: requestedSecurity.bloquearCopiarColar !== false,
      bloquearBotaoDireito: requestedSecurity.bloquearBotaoDireito !== false,
      telaCheiaObrigatoria: requestedSecurity.telaCheiaObrigatoria !== false,
      marcaDaguaRA: requestedSecurity.marcaDaguaRA !== false,
      detectarTrocaAba: requestedSecurity.detectarTrocaAba !== false,
      embaralharQuestoes: requestedSecurity.embaralharQuestoes !== false,
      embaralharAlternativas: requestedSecurity.embaralharAlternativas !== false
    };
    const batch = F.writeBatch(F.db);

    batch.set(activityRef, {
      teacherId: teacher.id,
      title: String(atividade.titulo || "").slice(0, 160),
      subject: String(atividade.disciplina || "").slice(0, 80),
      grade: String(atividade.anoTurma || "").slice(0, 60),
      accessCode: code,
      instructions: String(atividade.instrucoes || "").slice(0, 4000),
      status,
      securitySettings,
      contentJson: JSON.stringify({ ...atividade, id: activityRef.id }),
      createdAt,
      updatedAt: now
    });

    batch.set(codeRef, {
      teacherId: teacher.id,
      activityId: activityRef.id,
      accessCode: code,
      title: String(atividade.titulo || "").slice(0, 160),
      status,
      studentContentJson: JSON.stringify({
        ...this.studentPayload(atividade),
        disciplina: String(atividade.disciplina || "").slice(0, 80),
        anoTurma: String(atividade.anoTurma || "").slice(0, 60),
        instrucoes: String(atividade.instrucoes || "").slice(0, 4000),
        configuracoesSeguranca: securitySettings
      }),
      createdAt: activitySnap?.exists() ? activitySnap.data().createdAt : now,
      updatedAt: now
    });

    if (previousCode && previousCode !== code) {
      batch.delete(F.doc(F.db, "activityCodes", previousCode));
    }

    try {
      await batch.commit();
    } catch (error) {
      if (error?.code === "permission-denied") {
        throw new Error("O Firebase recusou o salvamento. Atualize a página, entre novamente e tente outra vez.");
      }
      throw error;
    }
    return { ...atividade, id: activityRef.id, codigo: code, teacherId: teacher.id };
  },

  async excluirAtividade(id) {
    const F = await this.api();
    const activityRef = F.doc(F.db, "activities", id);
    const snapshot = await F.getDoc(activityRef);
    if (!snapshot.exists()) return true;

    const batch = F.writeBatch(F.db);
    batch.delete(activityRef);
    batch.delete(F.doc(F.db, "activityCodes", snapshot.data().accessCode));
    await batch.commit();
    return true;
  },

  async getSubmissoes(atividadeId = null, incluirEmAndamento = false) {
    const F = await this.api();
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou.");

    try {
      const filters = [];
      if (atividadeId) filters.push(F.where("activityId", "==", atividadeId));
      const q = filters.length > 0
        ? F.query(F.collection(F.db, "submissions"), ...filters)
        : F.query(F.collection(F.db, "submissions"));

      const result = await F.getDocs(q);
      const todas = result.docs
        .map((item) => this.mapSubmission(item))
        .sort((a, b) => String(b.dataEnvio || b.dataInicio || "").localeCompare(String(a.dataEnvio || a.dataInicio || "")));
      return incluirEmAndamento ? todas : todas.filter((s) => s.status !== "in_progress");
    } catch (err) {
      console.warn("Erro ao buscar submissões gerais, usando fallback por professor:", err);
      const filters = [F.where("teacherId", "==", teacher.id)];
      if (atividadeId) filters.push(F.where("activityId", "==", atividadeId));
      const result = await F.getDocs(F.query(F.collection(F.db, "submissions"), ...filters));
      const todas = result.docs
        .map((item) => this.mapSubmission(item))
        .sort((a, b) => String(b.dataEnvio || b.dataInicio || "").localeCompare(String(a.dataEnvio || a.dataInicio || "")));
      return incluirEmAndamento ? todas : todas.filter((s) => s.status !== "in_progress");
    }
  },

  // Cria o registro da prova assim que o aluno começa, para as infrações chegarem ao professor na hora
  async iniciarSubmissao(submissao) {
    const F = await this.api();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) throw new Error("Sua sessão de estudante expirou.");
    let activeStudent = {};
    try { activeStudent = JSON.parse(sessionStorage.getItem("aluno_ativo") || "{}"); } catch (_) {}
    if (!activeStudent.teacherId) throw new Error("A identificação da atividade expirou.");

    const chave = `submissao_doc_${submissao.atividadeId}`;
    let docId = null;
    try { docId = sessionStorage.getItem(chave); } catch (_) {}
    if (docId) return docId;

    const ref = F.doc(F.collection(F.db, "submissions"));
    await F.setDoc(ref, {
      activityId: submissao.atividadeId,
      teacherId: activeStudent.teacherId,
      studentId: student.id,
      studentEmail: student.email,
      studentName: String(submissao.alunoNome || "").slice(0, 120),
      answersJson: "{}",
      infractionsJson: JSON.stringify(submissao.infracoes || {}),
      status: "in_progress",
      contentJson: JSON.stringify({ ...submissao, id: ref.id, status: "em_andamento" }),
      startedAt: F.serverTimestamp(),
      submittedAt: F.serverTimestamp(),
      updatedAt: F.serverTimestamp()
    });
    try { sessionStorage.setItem(chave, ref.id); } catch (_) {}
    return ref.id;
  },

  async atualizarInfracoes(docId, infracoes) {
    const F = await this.api();
    await F.updateDoc(F.doc(F.db, "submissions", docId), {
      infractionsJson: JSON.stringify(infracoes || {}).slice(0, 119000),
      updatedAt: F.serverTimestamp()
    });
  },

  async salvarSubmissao(submissao) {
    if (submissao.docId) {
      const F = await this.api();
      const ref = F.doc(F.db, "submissions", submissao.docId);
      await F.updateDoc(ref, {
        answersJson: JSON.stringify(submissao.respostas || {}),
        infractionsJson: JSON.stringify(submissao.infracoes || {}),
        status: "submitted",
        contentJson: JSON.stringify({ ...submissao, id: submissao.docId }),
        submittedAt: F.serverTimestamp(),
        updatedAt: F.serverTimestamp()
      });
      try { sessionStorage.removeItem(`submissao_doc_${submissao.atividadeId}`); } catch (_) {}
      return this.mapSubmission(await F.getDoc(ref));
    }

    const F = await this.api();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) throw new Error("Sua sessão de estudante expirou.");

    let activeStudent = {};
    try { activeStudent = JSON.parse(sessionStorage.getItem("aluno_ativo") || "{}"); } catch (_) {}
    if (!activeStudent.teacherId) throw new Error("A identificação da atividade expirou. Entre novamente pelo código.");

    const ref = F.doc(F.collection(F.db, "submissions"));
    await F.setDoc(ref, {
      activityId: submissao.atividadeId,
      teacherId: activeStudent.teacherId,
      studentId: student.id,
      studentEmail: student.email,
      studentName: String(submissao.alunoNome || "").slice(0, 120),
      answersJson: JSON.stringify(submissao.respostas || {}),
      infractionsJson: JSON.stringify(submissao.infracoes || {}),
      status: "submitted",
      contentJson: JSON.stringify({ ...submissao, id: ref.id }),
      startedAt: F.Timestamp.fromDate(new Date(submissao.dataInicio || Date.now())),
      submittedAt: F.serverTimestamp(),
      updatedAt: F.serverTimestamp()
    });

    const result = await F.getDoc(ref);
    return this.mapSubmission(result);
  },

  async atualizarCorrecao(submissaoId, correcao) {
    const F = await this.api();
    const ref = F.doc(F.db, "submissions", submissaoId);
    const current = await F.getDoc(ref);
    if (!current.exists()) throw new Error("Entrega não encontrada.");

    const content = this.parseJson(current.data().contentJson, {});
    const score = Number(correcao?.notaTotal ?? correcao?.nota ?? 0);
    await F.updateDoc(ref, {
      score: Math.max(0, Math.min(100, score)),
      status: "graded",
      contentJson: JSON.stringify({ ...content, correcao }),
      updatedAt: F.serverTimestamp()
    });

    return this.mapSubmission(await F.getDoc(ref));
  },

  simuladoProgressId(studentId, simuladoId, mode) {
    return `${studentId}_${String(simuladoId || "treino").replace(/[^a-z0-9_-]/gi, "_")}_${mode}`;
  },

  mapSimuladoProgress(snapshot) {
    if (!snapshot?.exists()) return null;
    const row = snapshot.data();
    return {
      id: snapshot.id,
      ...row,
      answers: this.parseJson(row.answersJson, {}),
      stats: this.parseJson(row.statsJson, {}),
      result: this.parseJson(row.resultJson, {}),
      startedAt: this.toIso(row.startedAt),
      finishedAt: this.toIso(row.finishedAt),
      updatedAt: this.toIso(row.updatedAt)
    };
  },

  async salvarProgressoSimulado({ simuladoId = "treino", mode = "prova", answers = {}, stats = {}, result = null, status = "draft", studentName = "", studentRA = "" } = {}) {
    const F = await this.api();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) throw new Error("Entre como aluno para salvar este progresso na nuvem.");

    const normalizedMode = mode === "treino" ? "treino" : "prova";
    const normalizedSimulado = normalizedMode === "treino" ? "treino" : String(simuladoId || "").slice(0, 40);
    const fallbackName = student.display_name || student.email.split("@")[0];
    const normalizedName = String(studentName || result?.studentName || fallbackName).trim().slice(0, 120);
    const normalizedRA = String(studentRA || result?.studentRA || student.studentRA || "TREINO").trim().slice(0, 40);
    const ref = F.doc(F.db, "simuladoProgress", this.simuladoProgressId(student.id, normalizedSimulado, normalizedMode));
    const current = await F.getDoc(ref);
    const startedAt = current.exists() ? current.data().startedAt : F.serverTimestamp();
    const finished = status === "finished";

    await F.setDoc(ref, {
      studentId: student.id,
      studentEmail: student.email,
      studentName: normalizedName,
      studentRA: normalizedRA,
      simuladoId: normalizedSimulado,
      mode: normalizedMode,
      answersJson: JSON.stringify(answers || {}),
      statsJson: JSON.stringify(stats || {}),
      resultJson: JSON.stringify(result || {}),
      status: finished ? "finished" : "draft",
      startedAt,
      finishedAt: finished ? F.serverTimestamp() : null,
      updatedAt: F.serverTimestamp()
    });

    const saved = await F.getDoc(ref);
    return this.mapSimuladoProgress(saved);
  },

  async obterProgressoSimulado(simuladoId = "treino", mode = "prova") {
    const F = await this.api();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) return null;

    const normalizedMode = mode === "treino" ? "treino" : "prova";
    const normalizedSimulado = normalizedMode === "treino" ? "treino" : String(simuladoId || "").slice(0, 40);
    const ref = F.doc(F.db, "simuladoProgress", this.simuladoProgressId(student.id, normalizedSimulado, normalizedMode));
    const snap = await F.getDoc(ref);
    if (!snap.exists()) return null;

    return this.mapSimuladoProgress(snap);
  },

  async obterTodosProgressosAluno() {
    const F = await this.api();
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) return [];

    try {
      const q = F.query(
        F.collection(F.db, "simuladoProgress"),
        F.where("studentId", "==", student.id)
      );
      const snap = await F.getDocs(q);
      return snap.docs
        .map(doc => this.mapSimuladoProgress(doc))
        .filter(item => item && (item.mode === "prova" || !item.mode));
    } catch (err) {
      console.warn("Erro ao buscar progressos do aluno:", err);
      return [];
    }
  },

  async salvarResultadoSimulado(payload = {}) {
    return this.salvarProgressoSimulado({
      simuladoId: payload.simuladoId,
      mode: "prova",
      answers: payload.answers || payload.respostas || {},
      stats: payload.stats || {},
      result: payload,
      status: "finished",
      studentName: payload.studentName,
      studentRA: payload.studentRA
    });
  },

  async getSimuladosEmAndamento() {
    const F = await this.api();
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou.");
    try {
      const result = await F.getDocs(F.query(
        F.collection(F.db, "simuladoProgress"),
        F.where("status", "==", "draft")
      ));
      return result.docs
        .map((item) => this.mapSimuladoProgress(item))
        .filter((item) => item && (item.mode === "prova" || !item.mode))
        .sort((a, b) => String(b.updatedAt || b.startedAt || "").localeCompare(String(a.updatedAt || a.startedAt || "")));
    } catch (err) {
      console.warn("Erro ao buscar simulados em andamento:", err);
      return [];
    }
  },

  async getResultadosSimulados() {
    const F = await this.api();
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou.");

    try {
      const result = await F.getDocs(F.query(
        F.collection(F.db, "simuladoProgress"),
        F.where("status", "==", "finished")
      ));
      return result.docs
        .map((item) => this.mapSimuladoProgress(item))
        .filter((item) => item && (item.mode === "prova" || !item.mode))
        .sort((a, b) => String(b.finishedAt || b.updatedAt || "").localeCompare(String(a.finishedAt || a.updatedAt || "")));
    } catch (err) {
      console.warn("Erro ao buscar resultados de simulados:", err);
      return [];
    }
  },

  async sincronizarStatsTreino(stats = {}) {
    return this.salvarProgressoSimulado({
      simuladoId: "treino",
      mode: "treino",
      answers: {},
      stats,
      result: {},
      status: "draft"
    });
  },

  salvarRascunhoAluno(atividadeId, respostas, submissaoId, extra = {}) {
    localStorage.setItem(`draft_aluno_${atividadeId}`, JSON.stringify({
      submissaoId,
      respostas,
      ...extra,
      ultimoSalvamento: new Date().toISOString()
    }));
  },

  obterRascunhoAluno(atividadeId) {
    const item = localStorage.getItem(`draft_aluno_${atividadeId}`);
    return item ? JSON.parse(item) : null;
  },

  limparRascunhoAluno(atividadeId) {
    localStorage.removeItem(`draft_aluno_${atividadeId}`);
  },

  async getConfiguracoes() {
    return { config: {}, hasApiKey: false };
  },

  async salvarConfiguracoes() {
    throw new Error("As chaves de IA devem ser configuradas no servidor, nunca no navegador.");
  }
};

window.DB = DB;
