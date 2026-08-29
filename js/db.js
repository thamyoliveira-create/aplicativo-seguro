/**
 * Módulo de Banco de Dados e Sincronização - Atividade Segura
 */

const DB = {
  // ATIVIDADES
  async getAtividades() {
    try {
      const res = await fetch("/api/atividades");
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success && Array.isArray(data.atividades)) {
          localStorage.setItem("cache_atividades", JSON.stringify(data.atividades));
          return data.atividades;
        }
      }
    } catch (e) {
      console.warn("Usando cache local de atividades:", e);
    }
    const cached = localStorage.getItem("cache_atividades");
    return cached ? JSON.parse(cached) : [];
  },

  async getAtividadePorId(id) {
    try {
      const res = await fetch(`/api/atividades/${id}`);
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success) return data.atividade;
      }
    } catch (e) {}
    const atividades = await this.getAtividades();
    return atividades.find(a => a.id === id) || null;
  },

  async getAtividadePorCodigo(codigo) {
    try {
      const res = await fetch(`/api/atividades/codigo/${encodeURIComponent(codigo)}`);
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success) return data.atividade;
      }
    } catch (e) {}
    const atividades = await this.getAtividades();
    const codeUpper = (codigo || "").toUpperCase().trim();
    return atividades.find(a => (a.codigo && a.codigo.toUpperCase() === codeUpper) || a.pin === codeUpper) || null;
  },

  async salvarAtividade(atividade) {
    try {
      const res = await fetch("/api/atividades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atividade)
      });
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success && data.atividade) {
          this._updateLocalCache(data.atividade);
          return data.atividade;
        }
      }
    } catch (e) {
      console.warn("Salvando em cache local:", e);
    }
    this._updateLocalCache(atividade);
    return atividade;
  },

  _updateLocalCache(atividade) {
    const cached = JSON.parse(localStorage.getItem("cache_atividades") || "[]");
    const idx = cached.findIndex(a => a.id === atividade.id || a.codigo === atividade.codigo);
    if (idx >= 0) cached[idx] = atividade;
    else cached.unshift(atividade);
    localStorage.setItem("cache_atividades", JSON.stringify(cached));
  },

  async excluirAtividade(id) {
    try {
      const res = await fetch(`/api/atividades/${id}`, {
        method: "DELETE"
      });
      const text = await res.text();
    } catch (e) {}
    const cached = JSON.parse(localStorage.getItem("cache_atividades") || "[]");
    const filtered = cached.filter(a => a.id !== id);
    localStorage.setItem("cache_atividades", JSON.stringify(filtered));
    return true;
  },

  // SUBMISSÕES & ALUNOS
  async getSubmissoes(atividadeId = null) {
    try {
      const url = atividadeId ? `/api/submissoes?atividadeId=${encodeURIComponent(atividadeId)}` : "/api/submissoes";
      const res = await fetch(url);
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success) return data.submissoes;
      }
    } catch (e) {}
    const cached = JSON.parse(localStorage.getItem("cache_submissoes") || "[]");
    if (atividadeId) return cached.filter(s => s.atividadeId === atividadeId);
    return cached;
  },

  async salvarSubmissao(submissao) {
    try {
      const res = await fetch("/api/submissoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissao)
      });
      const text = await res.text();
      if (text.trim().startsWith("{")) {
        const data = JSON.parse(text);
        if (data.success) {
          this._updateLocalSubmissao(data.submissao);
          return data.submissao;
        }
      }
    } catch (e) {}
    this._updateLocalSubmissao(submissao);
    return submissao;
  },

  _updateLocalSubmissao(submissao) {
    const cached = JSON.parse(localStorage.getItem("cache_submissoes") || "[]");
    cached.unshift(submissao);
    localStorage.setItem("cache_submissoes", JSON.stringify(cached));
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
