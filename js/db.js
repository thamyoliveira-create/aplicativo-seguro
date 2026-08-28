/**
 * Módulo de Banco de Dados e Sincronização - Atividade Segura
 */

const DB = {
  // ATIVIDADES
  async getAtividades() {
    try {
      const res = await fetch("/api/atividades");
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("cache_atividades", JSON.stringify(data.atividades));
        return data.atividades;
      }
      throw new Error(data.error || "Erro ao listar");
    } catch (e) {
      console.warn("Usando cache offline de atividades:", e);
      const cached = localStorage.getItem("cache_atividades");
      return cached ? JSON.parse(cached) : [];
    }
  },

  async getAtividadePorId(id) {
    try {
      const res = await fetch(`/api/atividades/${id}`);
      const data = await res.json();
      if (data.success) return data.atividade;
      throw new Error(data.error || "Não encontrada");
    } catch (e) {
      const atividades = await this.getAtividades();
      return atividades.find(a => a.id === id) || null;
    }
  },

  async getAtividadePorCodigo(codigo) {
    try {
      const res = await fetch(`/api/atividades/codigo/${encodeURIComponent(codigo)}`);
      const data = await res.json();
      if (data.success) return data.atividade;
      throw new Error(data.error || "Atividade não encontrada");
    } catch (e) {
      // Fallback offline
      const atividades = await this.getAtividades();
      const codeUpper = codigo.toUpperCase().trim();
      return atividades.find(a => (a.codigo && a.codigo.toUpperCase() === codeUpper) || a.pin === codeUpper) || null;
    }
  },

  async salvarAtividade(atividade) {
    const res = await fetch("/api/atividades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(atividade)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Erro ao salvar atividade");
    return data.atividade;
  },

  async excluirAtividade(id) {
    const res = await fetch(`/api/atividades/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    return data.success;
  },

  // SUBMISSÕES & ALUNOS
  async getSubmissoes(atividadeId = null) {
    try {
      const url = atividadeId ? `/api/submissoes?atividadeId=${encodeURIComponent(atividadeId)}` : "/api/submissoes";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) return data.submissoes;
      return [];
    } catch (e) {
      console.warn("Erro ao carregar submissões:", e);
      return [];
    }
  },

  async salvarSubmissao(submissao) {
    const res = await fetch("/api/submissoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissao)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Erro ao enviar submissão");
    return data.submissao;
  },

  async atualizarCorrecao(submissaoId, correcao) {
    const res = await fetch(`/api/submissoes/${submissaoId}/corrigir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correcao })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Erro ao atualizar nota");
    return data.submissao;
  },

  // DRAFT LOCAL (Salvamento em tempo real da prova do aluno)
  salvarRascunhoAluno(atividadeId, respostas, submissaoId) {
    const key = `draft_aluno_${atividadeId}`;
    localStorage.setItem(key, JSON.stringify({
      submissaoId,
      respostas,
      ultimoSalvamento: new Date().toISOString()
    }));
  },

  obterRascunhoAluno(atividadeId) {
    const key = `draft_aluno_${atividadeId}`;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  limparRascunhoAluno(atividadeId) {
    localStorage.removeItem(`draft_aluno_${atividadeId}`);
  },

  // CONFIGURAÇÕES
  async getConfiguracoes() {
    try {
      const res = await fetch("/api/configuracoes");
      const data = await res.json();
      if (data.success) return data;
      return { config: {}, hasApiKey: false };
    } catch (e) {
      return { config: {}, hasApiKey: false };
    }
  },

  async salvarConfiguracoes(config) {
    const res = await fetch("/api/configuracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    return await res.json();
  }
};

window.DB = DB;
