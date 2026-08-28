/**
 * Persistência Supabase com isolamento por perfil (RLS).
 * O conteúdo completo fica visível apenas à professora. Estudantes recebem
 * uma cópia sanitizada, sem gabaritos, respostas-modelo ou justificativas.
 */
const DB = {
  mapActivity(row) {
    if (!row) return null;
    const base = row.content || {};
    return {
      ...base,
      id: row.id || base.id,
      codigo: row.access_code || base.codigo,
      titulo: row.title || base.titulo,
      disciplina: row.subject || base.disciplina,
      anoTurma: row.grade || base.anoTurma,
      instrucoes: row.instructions || base.instrucoes,
      status: row.status === "published" ? "ativa" : (row.status || base.status),
      configuracoesSeguranca: row.security_settings || base.configuracoesSeguranca || {}
    };
  },

  studentPayload(atividade) {
    return {
      pin: atividade.pin || "",
      tempoLimiteMinutos: atividade.tempoLimiteMinutos || 45,
      questoes: (atividade.questoes || []).map((questao) => ({
        id: questao.id,
        tipo: questao.tipo,
        habilidadeBNCC: questao.habilidadeBNCC || "",
        enunciado: questao.enunciado,
        textoApoio: questao.textoApoio || "",
        peso: questao.peso || 1,
        alternativas: (questao.alternativas || []).map((alternativa) => ({
          id: alternativa.id,
          texto: alternativa.texto
        }))
      }))
    };
  },

  mapSubmission(row) {
    if (!row) return null;
    return {
      ...(row.content || {}),
      id: row.id,
      atividadeId: row.activity_id,
      alunoNome: row.student_name,
      alunoEmail: row.student_email,
      respostas: row.answers || {},
      infracoes: row.infractions || {},
      nota: row.score,
      status: row.status,
      dataEnvio: row.submitted_at,
      dataInicio: row.started_at
    };
  },

  async getAtividades() {
    const { data, error } = await window.supabaseClient
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Não foi possível carregar suas atividades.");
    return (data || []).map((row) => this.mapActivity(row));
  },

  async getAtividadePorId(id) {
    const { data, error } = await window.supabaseClient
      .from("activities")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error("Não foi possível carregar a atividade.");
    return this.mapActivity(data);
  },

  async getAtividadePorCodigo(codigo) {
    const { data, error } = await window.supabaseClient
      .rpc("get_published_activity_by_code", { p_code: String(codigo || "").trim() });

    if (error) throw new Error("Não foi possível validar esse código.");
    return data || null;
  },

  async salvarAtividade(atividade) {
    const teacher = TeacherAuth.user || await TeacherAuth.session();
    if (!teacher) throw new Error("Sua sessão docente expirou. Entre novamente.");

    const row = {
      teacher_id: teacher.id,
      title: atividade.titulo,
      subject: atividade.disciplina || "",
      grade: atividade.anoTurma || "",
      access_code: String(atividade.codigo || "").trim().toUpperCase(),
      instructions: atividade.instrucoes || "",
      status: atividade.status === "ativa" ? "published" : (atividade.status || "draft"),
      security_settings: atividade.configuracoesSeguranca || {},
      content: atividade,
      student_content: this.studentPayload(atividade),
      updated_at: new Date().toISOString()
    };

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(atividade.id || "");
    let query = window.supabaseClient.from("activities");
    query = isUuid
      ? query.update(row).eq("id", atividade.id).select("*").single()
      : query.insert(row).select("*").single();

    const { data, error } = await query;
    if (error) {
      if (error.code === "23505") throw new Error("Esse código de atividade já está em uso.");
      throw new Error("Não foi possível salvar a atividade.");
    }
    return this.mapActivity(data);
  },

  async excluirAtividade(id) {
    const { error } = await window.supabaseClient.from("activities").delete().eq("id", id);
    if (error) throw new Error("Não foi possível excluir a atividade.");
    return true;
  },

  async getSubmissoes(atividadeId = null) {
    let query = window.supabaseClient
      .from("submissions")
      .select("*")
      .order("submitted_at", { ascending: false, nullsFirst: false });

    if (atividadeId) query = query.eq("activity_id", atividadeId);
    const { data, error } = await query;
    if (error) throw new Error("Não foi possível carregar as entregas.");
    return (data || []).map((row) => this.mapSubmission(row));
  },

  async salvarSubmissao(submissao) {
    const student = StudentAuth.user || await StudentAuth.session();
    if (!student) throw new Error("Sua sessão de estudante expirou.");

    const row = {
      activity_id: submissao.atividadeId,
      student_id: student.id,
      student_email: student.email,
      student_name: submissao.alunoNome,
      answers: submissao.respostas || {},
      infractions: submissao.infracoes || {},
      status: submissao.status || "submitted",
      started_at: submissao.dataInicio || new Date().toISOString(),
      submitted_at: submissao.dataEnvio || new Date().toISOString(),
      content: submissao
    };

    const { data, error } = await window.supabaseClient
      .from("submissions")
      .insert(row)
      .select("*")
      .single();

    if (error) throw new Error("Não foi possível registrar a entrega.");
    return this.mapSubmission(data);
  },

  async atualizarCorrecao(submissaoId, correcao) {
    const { data: current, error: readError } = await window.supabaseClient
      .from("submissions")
      .select("content")
      .eq("id", submissaoId)
      .single();
    if (readError) throw new Error("Não foi possível abrir a entrega.");

    const score = Number(correcao?.notaTotal ?? correcao?.nota ?? 0);
    const { data, error } = await window.supabaseClient
      .from("submissions")
      .update({
        score,
        status: "graded",
        content: { ...(current.content || {}), correcao }
      })
      .eq("id", submissaoId)
      .select("*")
      .single();

    if (error) throw new Error("Não foi possível atualizar a correção.");
    return this.mapSubmission(data);
  },

  salvarRascunhoAluno(atividadeId, respostas, submissaoId) {
    localStorage.setItem(`draft_aluno_${atividadeId}`, JSON.stringify({
      submissaoId,
      respostas,
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
