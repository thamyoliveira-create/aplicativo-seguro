/**
 * View: Detalhes da Atividade, Resultados, Infrações e Correção com IA
 * Design: SaaS Pro / GovTech Educational Standard
 */

const ProfessorAtividadeDetalhesView = {
  atividade: null,
  submissoes: [],
  activeTab: "submissoes",
  editMode: false,

  escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  },

  async render(params = {}) {
    const root = document.getElementById("app-root");
    const atvId = params.id;
    this.activeTab = params.preview ? "gabarito" : "submissoes";
    this.editMode = Boolean(params.edit);

    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 flex items-center justify-center text-white hero-mesh">
        <div class="text-center space-y-3">
          <div class="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-xs font-semibold text-slate-300">Carregando resultados da avaliação...</p>
        </div>
      </div>
    `;

    try {
      this.atividade = await DB.getAtividadePorId(atvId);
      const todas = await DB.getSubmissoes(atvId, true);
      this.emAndamento = todas.filter((s) => s.status === "in_progress");
      this.submissoes = todas.filter((s) => s.status !== "in_progress");
    } catch (e) {
      console.warn("Erro ao carregar dados:", e);
    }

    if (!this.atividade) {
      root.innerHTML = `
        <div class="min-h-screen bg-dark-950 flex items-center justify-center p-4 text-slate-100">
          <div class="glass-card p-8 rounded-3xl max-w-md w-full text-center border border-slate-700">
            <div class="w-12 h-12 bg-rose-950 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-rose-500/30">
              <i data-lucide="alert-triangle" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-white mb-2">Atividade Não Encontrada</h2>
            <p class="text-slate-400 text-xs mb-4">A avaliação solicitada não existe ou foi removida.</p>
            <a href="#professor" class="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-blue">
              Voltar ao Painel
            </a>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    this.renderMainLayout();
  },

  renderMainLayout() {
    const root = document.getElementById("app-root");
    const atv = this.atividade;
    const subs = this.submissoes;

    const totalSubs = subs.length;
    const mediaNotas = totalSubs > 0
      ? (subs.reduce((acc, s) => acc + (s.correcao?.notaTotal || 0), 0) / totalSubs).toFixed(1)
      : "0.0";

    const totalInf = [...subs, ...(this.emAndamento || [])].reduce((acc, s) => acc + window.resumoInfracoes(s.infracoes).total, 0);

    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white pb-16">
        <!-- Topo -->
        <header class="glass-nav sticky top-0 z-50 py-3.5 px-4 md:px-8">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-xs text-slate-300 hover:text-white transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Painel da Professora</span>
            </a>
            <div class="flex items-center gap-2">
              <a
                href="#aluno/prova/${atv.codigo}"
                target="_blank"
                class="px-3.5 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-850 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5 text-brand-400"></i>
                <span>Testar como Aluno</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Banner de Compartilhamento e Informações -->
        <main class="max-w-6xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-5">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1.5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2.5 py-1 rounded-xl bg-brand-950 text-brand-300 text-xs font-mono font-extrabold border border-brand-500/30">
                    CÓDIGO: ${atv.codigo}
                  </span>
                  <span class="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    ${atv.disciplina}
                  </span>
                  <span class="text-xs text-slate-400 font-semibold bg-dark-900 px-2.5 py-1 rounded-xl border border-slate-800">
                    ${atv.anoTurma}
                  </span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-black text-white pt-1 tracking-tight">${atv.titulo}</h1>
                <p class="text-xs text-slate-400">
                  Tempo limite: ${atv.tempoLimiteMinutos} min • ${atv.questoes?.length || 0} questões • Criado em ${new Date(atv.dataCriacao).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onclick="ProfessorAtividadeDetalhesView.gerarAtaImpressao()"
                  class="px-5 py-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 text-slate-200 hover:text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
                  title="Gerar visão limpa para impressão ou salvar em PDF"
                >
                  <i data-lucide="printer" class="w-4 h-4 text-cyan-400"></i>
                  <span>Ata / PDF</span>
                </button>

                <button
                  onclick="ProfessorAtividadeDetalhesView.copiarCodigo('${atv.codigo}')"
                  class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shadow-glow-blue transition-all border border-white/10"
                >
                  <i data-lucide="copy" class="w-4 h-4"></i>
                  <span>Copiar PIN para Alunos</span>
                </button>
              </div>
            </div>

            <!-- Mini Dashboard da Prova -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800">
              <div class="bg-dark-900/80 p-4 rounded-2xl border border-slate-800">
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Entregas</div>
                <div class="text-xl sm:text-2xl font-black text-white mt-0.5">${totalSubs}</div>
              </div>
              <div class="bg-dark-900/80 p-4 rounded-2xl border border-slate-800">
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Média da Turma</div>
                <div class="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">${mediaNotas} / 10.0</div>
              </div>
              <div class="bg-dark-900/80 p-4 rounded-2xl border border-slate-800">
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Trocas de Aba</div>
                <div class="text-xl sm:text-2xl font-black ${totalInf > 0 ? "text-amber-400" : "text-white"} mt-0.5">${totalInf}</div>
              </div>
              <div class="bg-dark-900/80 p-4 rounded-2xl border border-slate-800">
                <div class="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Status</div>
                <div class="text-xs font-bold text-emerald-400 mt-1.5 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Prova Ativa
                </div>
              </div>
            </div>
          </div>

          <!-- Abas de Navegação -->
          <div class="flex items-center gap-2 border-b border-slate-800 pb-1 text-xs font-bold overflow-x-auto">
            <button
              id="tab-btn-submissoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('submissoes')"
              class="px-4.5 py-2.5 rounded-xl border border-brand-500/40 text-white flex items-center gap-2 transition-all bg-brand-950/60 shadow-glow-blue whitespace-nowrap"
            >
              <i data-lucide="users" class="w-4 h-4 text-brand-400"></i>
              <span>Respostas dos Alunos (${totalSubs})</span>
            </button>

            <button
              id="tab-btn-diagnostico"
              onclick="ProfessorAtividadeDetalhesView.switchTab('diagnostico')"
              class="px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <i data-lucide="bar-chart-2" class="w-4 h-4 text-cyan-400"></i>
              <span>Diagnóstico por Questão</span>
            </button>

            <button
              id="tab-btn-gabarito"
              onclick="ProfessorAtividadeDetalhesView.switchTab('gabarito')"
              class="px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <i data-lucide="check-square" class="w-4 h-4"></i>
              <span>Gabarito Pedagógico</span>
            </button>

            <button
              id="tab-btn-infracoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('infracoes')"
              class="px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <i data-lucide="shield-alert" class="w-4 h-4 text-rose-400"></i>
              <span>Log de Abas & Ocorrências (${totalInf})</span>
            </button>
          </div>

          <!-- Conteúdo da Aba Ativa -->
          <div id="tab-content" class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800">
            <!-- Renderizado dinamicamente -->
          </div>
        </main>

        <!-- Modal de Correção e Detalhes da Prova do Aluno -->
        <div id="modal-correcao-aluno" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4">
          <div id="modal-correcao-content" class="glass-card rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-8 border border-slate-700 max-h-[90vh] overflow-y-auto animate-fade-in">
            <!-- Renderizado dinamicamente -->
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.switchTab(this.activeTab);
  },

  switchTab(tab) {
    this.activeTab = tab;

    ["submissoes", "diagnostico", "gabarito", "infracoes"].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) {
        if (t === tab) {
          btn.className = "px-4.5 py-2.5 rounded-xl border border-brand-500/40 text-white flex items-center gap-2 transition-all bg-brand-950/60 shadow-glow-blue whitespace-nowrap";
        } else {
          btn.className = "px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all whitespace-nowrap";
        }
      }
    });

    this.renderActiveTab();
  },

  renderActiveTab() {
    const container = document.getElementById("tab-content");
    if (!container) return;

    if (this.activeTab === "submissoes") {
      this.renderTabSubmissoes(container);
    } else if (this.activeTab === "diagnostico") {
      this.renderTabDiagnostico(container);
    } else if (this.activeTab === "gabarito") {
      this.renderTabGabarito(container);
    } else if (this.activeTab === "infracoes") {
      this.renderTabInfracoes(container);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  renderTabDiagnostico(container) {
    const atv = this.atividade || {};
    const subs = this.submissoes || [];
    const questoes = atv.questoes || [];

    if (subs.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <i data-lucide="bar-chart-3" class="w-12 h-12 text-slate-600 mx-auto mb-3"></i>
          <p class="font-bold text-white text-base">Nenhum dado pedagógico disponível ainda.</p>
          <p class="text-xs text-slate-400 mt-1">O diagnóstico por questão será calculado automaticamente assim que os alunos enviarem as respostas.</p>
        </div>
      `;
      return;
    }

    // Cálculos estatísticos
    const totalSubs = subs.length;
    const mediaNotasNum = subs.reduce((acc, s) => acc + (Number(s.correcao?.notaTotal ?? s.notaFinal ?? 0)), 0) / totalSubs;
    const mediaNotas = mediaNotasNum.toFixed(1);

    let nivelProficiencia = { rotulo: "Abaixo do Básico", cor: "text-rose-400", bg: "bg-rose-950/60", border: "border-rose-500/30", icon: "alert-octagon" };
    if (mediaNotasNum >= 8.5) {
      nivelProficiencia = { rotulo: "Avançado", cor: "text-emerald-300", bg: "bg-emerald-950/60", border: "border-emerald-500/30", icon: "award" };
    } else if (mediaNotasNum >= 7.0) {
      nivelProficiencia = { rotulo: "Adequado", cor: "text-blue-300", bg: "bg-blue-950/60", border: "border-blue-500/30", icon: "check-circle-2" };
    } else if (mediaNotasNum >= 5.0) {
      nivelProficiencia = { rotulo: "Básico", cor: "text-amber-300", bg: "bg-amber-950/60", border: "border-amber-500/30", icon: "alert-triangle" };
    }

    const analiseQuestoes = questoes.map((q, idx) => {
      const isDiss = q.tipo === "dissertativa";
      let acertos = 0;
      let somaNotas = 0;
      const distratores = {};

      if (!isDiss) {
        (q.alternativas || []).forEach(a => {
          distratores[String(a.id).toUpperCase()] = 0;
        });
      }

      subs.forEach(s => {
        const resp = s.respostas ? String(s.respostas[q.id] || "").trim().toUpperCase() : "";
        if (!isDiss) {
          if (resp === String(q.correta || "A").trim().toUpperCase()) {
            acertos++;
          }
          if (resp && distratores[resp] !== undefined) {
            distratores[resp]++;
          } else if (resp) {
            distratores[resp] = (distratores[resp] || 0) + 1;
          }
        } else {
          const itemNota = Number(s.correcao?.detalhes?.[q.id]?.nota ?? (s.correcao ? 0 : (q.peso || 1)));
          somaNotas += itemNota;
          if (itemNota >= (q.peso || 1) * 0.6) acertos++;
        }
      });

      const taxaAcertoPct = Math.round((acertos / totalSubs) * 100);
      const taxaErroPct = 100 - taxaAcertoPct;

      return {
        idx,
        questao: q,
        isDiss,
        acertos,
        taxaAcertoPct,
        taxaErroPct,
        distratores,
        mediaPontos: isDiss ? (somaNotas / totalSubs).toFixed(1) : null
      };
    });

    const sortedByAcerto = [...analiseQuestoes].sort((a, b) => b.taxaAcertoPct - a.taxaAcertoPct);
    const topAcerto = sortedByAcerto[0];
    const topErro = sortedByAcerto[sortedByAcerto.length - 1];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Cabeçalho do Diagnóstico -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 class="text-lg font-black text-white flex items-center gap-2">
              <i data-lucide="bar-chart-2" class="w-5 h-5 text-cyan-400"></i>
              Diagnóstico Pedagógico da Turma
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">Taxa de acerto por item, análise de distratores e pontos para intervenção pedagógica</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1.5 rounded-xl ${nivelProficiencia.bg} ${nivelProficiencia.cor} ${nivelProficiencia.border} border text-xs font-bold flex items-center gap-1.5">
              <i data-lucide="${nivelProficiencia.icon}" class="w-4 h-4"></i>
              <span>Nível da Turma: ${nivelProficiencia.rotulo} (${mediaNotas}/10)</span>
            </span>
          </div>
        </div>

        <!-- Indicadores Rápidos -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div class="bg-dark-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Aproveitamento Médio</span>
            <div class="text-2xl font-black text-white">${mediaNotas} <span class="text-xs font-normal text-slate-400">/ 10.0</span></div>
            <p class="text-[11px] text-slate-400">Baseado em ${totalSubs} avaliação(ões) entregue(s)</p>
          </div>

          <div class="bg-dark-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
            <span class="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Maior Domínio</span>
            <div class="text-xl font-black text-emerald-300">Questão ${topAcerto ? topAcerto.idx + 1 : "—"} (${topAcerto ? topAcerto.taxaAcertoPct : 0}% de acerto)</div>
            <p class="text-[11px] text-slate-400 line-clamp-1">${topAcerto?.questao?.enunciado || "Conteúdo assimilado pela maioria"}</p>
          </div>

          <div class="bg-dark-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-1">
            <span class="text-[11px] text-rose-400 font-bold uppercase tracking-wider">Ponto de Intervenção</span>
            <div class="text-xl font-black text-rose-300">Questão ${topErro ? topErro.idx + 1 : "—"} (${topErro ? topErro.taxaErroPct : 0}% de erro)</div>
            <p class="text-[11px] text-slate-400 line-clamp-1">${topErro?.questao?.enunciado || "Requer retomada pedagógica"}</p>
          </div>
        </div>

        <!-- Lista Questão a Questão com Barras e Distratores -->
        <div class="space-y-4">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="list-checks" class="w-4 h-4 text-brand-400"></i>
            Desempenho Detalhado por Item da Prova
          </h3>

          ${analiseQuestoes.map(item => {
            const q = item.questao;
            const barColor = item.taxaAcertoPct >= 70 ? "from-emerald-500 to-teal-400" : (item.taxaAcertoPct >= 50 ? "from-amber-500 to-yellow-400" : "from-rose-500 to-red-400");
            const badgeColor = item.taxaAcertoPct >= 70 ? "bg-emerald-950 text-emerald-300 border-emerald-500/30" : (item.taxaAcertoPct >= 50 ? "bg-amber-950 text-amber-300 border-amber-500/30" : "bg-rose-950 text-rose-300 border-rose-500/30");

            return `
              <div class="p-5 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-3.5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="px-2.5 py-1 rounded-xl bg-dark-950 text-white font-bold text-xs border border-slate-700">
                      Questão ${item.idx + 1}
                    </span>
                    <span class="text-[11px] font-semibold text-slate-400 uppercase">
                      ${item.isDiss ? "Dissertativa" : "Múltipla Escolha"}
                    </span>
                    ${q.habilidadeBNCC ? `
                      <span class="px-2 py-0.5 rounded-md bg-brand-950 text-brand-300 border border-brand-500/30 text-[10px] font-mono">
                        ${q.habilidadeBNCC}
                      </span>
                    ` : ""}
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1 rounded-full border text-xs font-black ${badgeColor}">
                      ${item.taxaAcertoPct}% de acerto (${item.acertos}/${totalSubs} alunos)
                    </span>
                  </div>
                </div>

                <!-- Barra de Taxa de Acerto -->
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div class="bg-gradient-to-r ${barColor} h-2 rounded-full transition-all duration-500" style="width: ${item.taxaAcertoPct}%;"></div>
                </div>

                <!-- Enunciado -->
                <p class="text-xs text-slate-300 font-medium leading-relaxed">${q.enunciado}</p>

                <!-- Mapa de Distratores (Múltipla Escolha) -->
                ${!item.isDiss && Array.isArray(q.alternativas) ? `
                  <div class="pt-2 border-t border-slate-800/80 space-y-2">
                    <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Distribuição das Respostas da Turma:</span>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      ${q.alternativas.map(alt => {
                        const altId = String(alt.id).toUpperCase();
                        const isGabarito = altId === String(q.correta || "A").toUpperCase();
                        const count = item.distratores[altId] || 0;
                        const pct = totalSubs > 0 ? Math.round((count / totalSubs) * 100) : 0;
                        const borderStyle = isGabarito ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-200" : (count > 0 ? "border-slate-700 bg-dark-950/60 text-slate-300" : "border-slate-800/50 bg-dark-950/30 text-slate-500");

                        return `
                          <div class="p-2.5 rounded-xl border ${borderStyle} text-xs flex items-center justify-between">
                            <div class="truncate mr-2">
                              <strong class="font-bold">${altId})</strong>
                              <span class="text-[11px] truncate">${isGabarito ? "✓ Gabarito" : ""}</span>
                            </div>
                            <div class="text-right font-mono font-bold text-[11px] whitespace-nowrap">
                              ${count} (${pct}%)
                            </div>
                          </div>
                        `;
                      }).join("")}
                    </div>
                  </div>
                ` : ""}

                ${item.isDiss ? `
                  <div class="pt-2 border-t border-slate-800/80 text-xs text-purple-300 flex items-center justify-between">
                    <span><strong>Média obtida:</strong> ${item.mediaPontos} / ${q.peso || 1} pts</span>
                    <span><strong>Critério:</strong> ${q.respostaEsperada ? "Definido" : "Critério Geral"}</span>
                  </div>
                ` : ""}

                ${item.taxaAcertoPct < 50 ? `
                  <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/25 text-rose-300 text-[11px] flex items-start gap-2">
                    <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5"></i>
                    <div>
                      <strong>Sugestão Pedagógica:</strong> Mais da metade da turma errou este item. Recomendada intervenção e retomada do descritor/conteúdo com atividades de reforço.
                    </div>
                  </div>
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  },

  renderTabSubmissoes(container) {
    const subs = this.submissoes;
    if (subs.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <i data-lucide="clock" class="w-10 h-10 text-slate-600 mx-auto mb-3"></i>
          <p class="font-bold text-white text-base">Nenhum aluno enviou a avaliação ainda.</p>
          <p class="text-xs text-slate-400 mt-1">Compartilhe o código <strong>${this.atividade.codigo}</strong> com os estudantes.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 class="font-bold text-white text-sm">Respostas Recebidas (${subs.length})</h3>
          <p class="text-[11px] text-slate-400">Listagem de notas, tempo de permanência e ocorrências</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            onclick="ProfessorAtividadeDetalhesView.exportarPlanilhaCSV()"
            class="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            title="Baixar notas e respostas em formato CSV (compatível com Excel e SED)"
          >
            <i data-lucide="file-spreadsheet" class="w-4 h-4 text-emerald-400"></i>
            <span>Exportar Planilha (.csv)</span>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th class="py-3 px-3">Estudante & RA</th>
              <th class="py-3 px-3">Data de Envio</th>
              <th class="py-3 px-3">Tempo de Prova</th>
              <th class="py-3 px-3">Trocas de Aba</th>
              <th class="py-3 px-3">Nota Final</th>
              <th class="py-3 px-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            ${subs.map((s, idx) => {
              const trocas = window.resumoInfracoes(s.infracoes).total;
              const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
              const nota = s.correcao?.notaTotal !== undefined ? `${s.correcao.notaTotal} / 10` : "Não corrigida";

              return `
                <tr class="hover:bg-dark-900/60 transition-colors">
                  <td class="py-3.5 px-3">
                    <div class="font-bold text-white">${s.alunoNome}</div>
                    <div class="text-[10px] text-slate-400 font-mono">${s.alunoRA}</div>
                  </td>
                  <td class="py-3.5 px-3 text-slate-400">${new Date(s.dataEnvio).toLocaleTimeString("pt-BR")}</td>
                  <td class="py-3.5 px-3 text-slate-400 font-mono">${mins} min</td>
                  <td class="py-3.5 px-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${trocas === 0 ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-rose-950 text-rose-400 border border-rose-500/30"}">
                      ${trocas === 0 ? "0 trocas" : `${trocas} trocas`}
                    </span>
                  </td>
                  <td class="py-3.5 px-3 font-bold ${s.correcao ? "text-emerald-400" : "text-amber-400"}">
                    ${nota}
                  </td>
                  <td class="py-3.5 px-3 text-right">
                    <button
                      onclick="ProfessorAtividadeDetalhesView.abrirCorrecaoModal(${idx})"
                      class="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-blue transition-all"
                    >
                      ${s.correcao ? "Ver Correção" : "Corrigir com IA ✨"}
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  renderTabGabarito(container) {
    const atv = this.atividade;
    if (this.editMode) {
      container.innerHTML = `
        <form id="activity-editor" class="space-y-5" onsubmit="return false">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div><h2 class="text-lg font-black text-white">Editar atividade</h2><p class="text-xs text-slate-400 mt-1">Troque o tipo da questão e revise o conteúdo antes de salvar.</p></div>
            <div class="flex gap-2"><button type="button" onclick="ProfessorAtividadeDetalhesView.cancelarEdicao()" class="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-bold">Cancelar</button><button type="button" id="save-activity-edit" onclick="ProfessorAtividadeDetalhesView.salvarEdicao()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"><span>Salvar alterações</span></button></div>
          </div>
          <div class="grid sm:grid-cols-3 gap-3">
            <label class="text-xs font-bold text-slate-300 sm:col-span-3">Título<input id="edit-title" value="${this.escape(atv.titulo)}" maxlength="160" class="mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"></label>
            <label class="text-xs font-bold text-slate-300">Disciplina<input id="edit-subject" value="${this.escape(atv.disciplina)}" maxlength="80" class="mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"></label>
            <label class="text-xs font-bold text-slate-300">Turma/Ano<input id="edit-grade" value="${this.escape(atv.anoTurma)}" maxlength="60" class="mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"></label>
            <label class="text-xs font-bold text-slate-300">Tempo (minutos)<input id="edit-time" type="number" min="5" max="300" value="${Number(atv.tempoLimiteMinutos || 45)}" class="mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"></label>
          </div>
          <div class="space-y-4">
            ${(atv.questoes || []).map((q, idx) => this.renderQuestionEditor(q, idx)).join("")}
          </div>
          <div class="flex justify-end"><button type="button" onclick="ProfessorAtividadeDetalhesView.salvarEdicao()" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Salvar alterações</button></div>
        </form>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="flex items-center justify-between gap-3 pb-2"><div><h2 class="text-lg font-black text-white">Visualização da atividade</h2><p class="text-slate-400 mt-1">Confira o que será apresentado e o gabarito pedagógico.</p></div><a href="#professor/atividade/${atv.id}/editar" class="px-4 py-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-2"><i data-lucide="pencil" class="w-4 h-4"></i> Editar</a></div>
        ${(atv.questoes || []).map((q, idx) => {
          const isDiss = q.tipo === "dissertativa";
          return `
            <div class="p-4.5 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-sm">Questão ${idx + 1} (${isDiss ? "Dissertativa" : "Múltipla Escolha"})</span>
                <span class="text-[11px] text-slate-400">Valor: ${q.peso || 2.5} pts</span>
              </div>
              ${q.textoApoio ? `<div class="p-3 rounded-xl bg-dark-950 border-l-2 border-brand-500 text-slate-400 leading-relaxed">${q.textoApoio}</div>` : ""}
              <p class="text-slate-300 leading-relaxed font-medium">${q.enunciado}</p>
              ${!isDiss ? `
                <div class="grid gap-2">${(q.alternativas || []).map((alt) => `<div class="p-2.5 rounded-xl border ${String(alt.id) === String(q.correta) ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-200" : "border-slate-800 text-slate-400"}"><strong>${alt.id})</strong> ${alt.texto}</div>`).join("")}</div>
                <div class="mt-2 bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-300 font-bold">
                  Gabarito: Alternativa ${q.correta}) ${q.justificativa || ""}
                </div>
              ` : `
                <div class="mt-2 bg-purple-950/60 border border-purple-500/30 p-2.5 rounded-xl text-purple-300 font-medium">
                  <strong>Expectativa Pedagógica:</strong> ${q.respostaEsperada || "Sem critérios"}
                </div>
              `}
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  renderQuestionEditor(q, idx) {
    const isDiss = q.tipo === "dissertativa";
    if (!isDiss && (!Array.isArray(q.alternativas) || q.alternativas.length < 2)) {
      q.alternativas = ["A", "B", "C", "D"].map((id) => ({ id, texto: "", correta: id === "A" }));
      q.correta = q.correta || "A";
    }
    return `
      <fieldset class="question-editor p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-slate-800" data-question-index="${idx}">
        <div class="grid sm:grid-cols-[1fr_220px_100px] gap-3 items-end mb-4">
          <legend class="text-sm font-black text-white">Questão ${idx + 1}</legend>
          <label class="text-[11px] font-bold text-slate-300">Tipo<select class="edit-question-type mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white" onchange="ProfessorAtividadeDetalhesView.alterarTipoQuestao(${idx}, this.value)"><option value="multipla_escolha" ${!isDiss ? "selected" : ""}>Múltipla escolha</option><option value="dissertativa" ${isDiss ? "selected" : ""}>Dissertativa</option></select></label>
          <label class="text-[11px] font-bold text-slate-300">Peso<input class="edit-question-weight mt-1.5 w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white" type="number" min="0.1" max="100" step="0.1" value="${Number(q.peso || 1)}"></label>
        </div>
        <label class="block text-[11px] font-bold text-slate-300">Texto de apoio<textarea class="edit-question-support mt-1.5 w-full min-h-20 bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white">${this.escape(q.textoApoio)}</textarea></label>
        <label class="block mt-3 text-[11px] font-bold text-slate-300">Enunciado<textarea class="edit-question-prompt mt-1.5 w-full min-h-24 bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white" required>${this.escape(q.enunciado)}</textarea></label>
        ${isDiss ? `<label class="block mt-3 text-[11px] font-bold text-purple-300">Resposta esperada<textarea class="edit-question-expected mt-1.5 w-full min-h-24 bg-purple-950/30 border border-purple-500/30 rounded-xl px-3 py-2.5 text-white">${this.escape(q.respostaEsperada)}</textarea></label>` : `
          <div class="mt-3 space-y-2"><p class="text-[11px] font-bold text-emerald-300">Alternativas — marque a correta</p>${(q.alternativas || []).map((alt, altIdx) => `<label class="grid grid-cols-[24px_1fr] gap-2 items-center"><input type="radio" name="correct-${idx}" value="${this.escape(alt.id || String.fromCharCode(65 + altIdx))}" ${String(q.correta || (q.alternativas.find((item) => item.correta)?.id)) === String(alt.id) ? "checked" : ""}><input class="edit-alternative w-full bg-dark-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white" data-alt-id="${this.escape(alt.id || String.fromCharCode(65 + altIdx))}" value="${this.escape(alt.texto)}" placeholder="Alternativa ${alt.id || String.fromCharCode(65 + altIdx)}"></label>`).join("")}</div>`}
      </fieldset>`;
  },

  capturarEdicao() {
    const title = document.getElementById("edit-title");
    if (title) {
      this.atividade.titulo = title.value.trim();
      this.atividade.disciplina = document.getElementById("edit-subject").value.trim();
      this.atividade.anoTurma = document.getElementById("edit-grade").value.trim();
      this.atividade.tempoLimiteMinutos = Number(document.getElementById("edit-time").value || 45);
    }
    document.querySelectorAll("[data-question-index]").forEach((field) => {
      const idx = Number(field.dataset.questionIndex);
      const q = this.atividade.questoes[idx];
      q.peso = Number(field.querySelector(".edit-question-weight").value || 1);
      q.textoApoio = field.querySelector(".edit-question-support").value.trim();
      q.enunciado = field.querySelector(".edit-question-prompt").value.trim();
      const expected = field.querySelector(".edit-question-expected");
      if (expected) q.respostaEsperada = expected.value.trim();
      const alternativeInputs = Array.from(field.querySelectorAll(".edit-alternative"));
      if (alternativeInputs.length) {
        q.alternativas = alternativeInputs.map((input) => ({ id: input.dataset.altId, texto: input.value.trim(), correta: false }));
        q.correta = field.querySelector(`input[name="correct-${idx}"]:checked`)?.value || q.alternativas[0]?.id || "A";
        q.alternativas.forEach((alt) => { alt.correta = alt.id === q.correta; });
      }
      q.tipo = field.querySelector(".edit-question-type").value;
    });
  },

  alterarTipoQuestao(idx, tipo) {
    this.capturarEdicao();
    const q = this.atividade.questoes[idx];
    q.tipo = tipo;
    if (tipo === "multipla_escolha" && (!Array.isArray(q.alternativas) || q.alternativas.length < 2)) {
      q.alternativas = ["A", "B", "C", "D"].map((id) => ({ id, texto: "", correta: id === "A" }));
      q.correta = "A";
    }
    this.renderTabGabarito(document.getElementById("tab-content"));
  },

  async salvarEdicao() {
    this.capturarEdicao();
    const invalidQuestion = this.atividade.questoes.some((q) => !q.enunciado || (q.tipo === "multipla_escolha" && (q.alternativas || []).filter((alt) => alt.texto).length < 2));
    if (!this.atividade.titulo || invalidQuestion) {
      alert("Preencha o título, todos os enunciados e pelo menos duas alternativas nas questões objetivas.");
      return;
    }
    const button = document.getElementById("save-activity-edit");
    if (button) { button.disabled = true; button.querySelector("span").textContent = "Salvando…"; }
    try {
      await DB.salvarAtividade(this.atividade);
      this.editMode = false;
      this.activeTab = "gabarito";
      alert("Alterações salvas com sucesso.");
      this.renderMainLayout();
    } catch (error) {
      if (button) { button.disabled = false; button.querySelector("span").textContent = "Salvar alterações"; }
      alert(`Não foi possível salvar: ${error.message}`);
    }
  },

  async cancelarEdicao() {
    if (!confirm("Descartar as alterações feitas nesta tela?")) return;
    this.atividade = await DB.getAtividadePorId(this.atividade.id);
    this.editMode = false;
    this.renderMainLayout();
  },

  renderTabInfracoes(container) {
    const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const todos = [
      ...(this.emAndamento || []).map((s) => ({ ...s, _andamento: true })),
      ...this.submissoes
    ];
    const withInf = todos.filter((s) => window.resumoInfracoes(s.infracoes).total > 0);

    if (withInf.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-emerald-400">
          <i data-lucide="shield-check" class="w-12 h-12 mx-auto mb-2 text-emerald-400"></i>
          <p class="font-bold text-base text-white">Nenhuma infração registrada!</p>
          <p class="text-xs text-slate-400 mt-1">Nenhum estudante tentou copiar, colar, usar o botão direito ou sair da prova.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3 text-xs">
        ${withInf.map((s) => {
          const r = window.resumoInfracoes(s.infracoes);
          return `
          <div class="p-4 rounded-2xl bg-dark-900 border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div class="font-bold text-white text-sm">${esc(s.alunoNome)} ${s._andamento ? '<span class="ml-1 px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] border border-amber-500/30">fazendo a prova agora</span>' : ""}</div>
              <div class="text-slate-400 font-mono text-[10px]">RA: ${esc(s.alunoRA || "-")}</div>
            </div>
            <div class="md:text-right">
              <div class="flex flex-wrap md:justify-end gap-1">
                ${r.itens.map((i) => `<span class="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 font-bold border border-rose-500/30 text-[11px]">${i.n} ${i.rotulo}</span>`).join("")}
              </div>
              ${s.infracoes?.tempoForaSegundos ? `<div class="text-slate-500 text-[10px] mt-1">Tempo total fora da prova: ${s.infracoes.tempoForaSegundos}s</div>` : ""}
            </div>
          </div>`;
        }).join("")}
      </div>
    `;
  },

  async abrirCorrecaoModal(idx) {
    const s = this.submissoes[idx];
    const atv = this.atividade;
    const modal = document.getElementById("modal-correcao-aluno");
    const content = document.getElementById("modal-correcao-content");

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    content.innerHTML = `
      <div class="text-center py-12">
        <div class="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-xs font-semibold text-slate-300">Processando correção com IA Gemini...</p>
      </div>
    `;

    let correcao = s.correcao;
    if (!correcao) {
      try {
        correcao = await AIService.corrigirProvaCompleta(atv, s.respostas);
        s.correcao = correcao;
        s.notaFinal = correcao.notaTotal;
        await DB.salvarSubmissao(s);
      } catch (err) {
        console.warn("Erro ao corrigir com IA:", err);
      }
    }

    content.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h3 class="font-black text-lg text-white">${s.alunoNome}</h3>
          <p class="text-xs text-slate-400 font-mono">RA: ${s.alunoRA} • ${atv.titulo}</p>
        </div>
        <button onclick="document.getElementById('modal-correcao-aluno').classList.add('hidden'); document.getElementById('modal-correcao-aluno').classList.remove('flex');" class="text-slate-400 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="space-y-4 text-xs">
        <div class="bg-brand-950/60 border border-brand-500/30 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div class="text-slate-400 text-[11px] uppercase font-bold">Nota Final Calculada</div>
            <div class="text-2xl font-black text-emerald-400">${correcao ? correcao.notaTotal : "--"} / 10.0</div>
          </div>
          <div class="text-right">
            <div class="text-slate-400 text-[11px] uppercase font-bold">Ocorrências de Segurança</div>
            <div class="text-sm font-bold ${window.resumoInfracoes(s.infracoes).total > 0 ? "text-amber-400" : "text-emerald-400"}">
              ${window.resumoInfracoes(s.infracoes).texto || "Nenhuma ocorrência"}
            </div>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          ${(atv.questoes || []).map((q, qIdx) => {
            const resp = s.respostas ? s.respostas[q.id] : "";
            const isDiss = q.tipo === "dissertativa";
            const itemCorrecao = correcao?.detalhes?.[q.id] || {};

            return `
              <div class="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white">Questão ${qIdx + 1}: ${q.enunciado}</span>
                  <span class="font-bold text-emerald-400">${itemCorrecao.nota || (resp === q.correta ? q.peso : 0)} pts</span>
                </div>
                <div class="text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
                  <strong>Resposta do Estudante:</strong> ${resp || "Não respondeu"}
                </div>
                ${itemCorrecao.feedback ? `
                  <div class="text-slate-400 text-[11px] bg-brand-950/40 p-2.5 rounded-xl border border-brand-500/20">
                    <strong class="text-brand-300">Parecer da IA:</strong> ${itemCorrecao.feedback}
                  </div>
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  copiarCodigo(codigo) {
    navigator.clipboard.writeText(codigo);
    alert(`Código "${codigo}" copiado! Passe aos alunos para que acessem a prova.`);
  },

  sanitizeCsv(val) {
    if (val === null || val === undefined) return '""';
    let str = String(val);
    if (/^[=+\-@]/.test(str)) {
      str = "'" + str;
    }
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  },

  downloadCsv(csvContent, filename) {
    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  exportarPlanilhaCSV() {
    const subs = this.submissoes || [];
    const atv = this.atividade || {};
    if (subs.length === 0) {
      alert("Nenhuma submissão registrada para exportar.");
      return;
    }

    const questoes = atv.questoes || [];
    const headers = [
      "Estudante",
      "RA",
      "E-mail Institucional",
      "Data de Envio",
      "Horário de Envio",
      "Tempo de Prova (min)",
      "Trocas de Aba",
      "Tempo Fora da Aba (seg)",
      "Nota Final (0 a 10)",
      "Status da Correção"
    ];

    questoes.forEach((q, idx) => {
      const label = q.tipo === "dissertativa" ? "Dissertativa" : "Objetiva";
      headers.push(`Questão ${idx + 1} (${label})`);
    });

    const rows = [headers.map(h => this.sanitizeCsv(h)).join(";")];

    subs.forEach(s => {
      const trocas = s.infracoes?.totalTrocasAba || 0;
      const tempoFora = s.infracoes?.tempoForaSegundos || 0;
      const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
      const nota = s.correcao?.notaTotal !== undefined ? s.correcao.notaTotal : (s.notaFinal !== undefined ? s.notaFinal : "Não corrigida");
      const statusCorrecao = s.correcao ? "Corrigida com IA" : "Pendente";
      const dataEnvioObj = s.dataEnvio ? new Date(s.dataEnvio) : null;
      const dataStr = dataEnvioObj ? dataEnvioObj.toLocaleDateString("pt-BR") : "—";
      const horaStr = dataEnvioObj ? dataEnvioObj.toLocaleTimeString("pt-BR") : "—";

      const row = [
        this.sanitizeCsv(s.alunoNome || "Aluno"),
        this.sanitizeCsv(s.alunoRA || "—"),
        this.sanitizeCsv(s.alunoEmail || "—"),
        this.sanitizeCsv(dataStr),
        this.sanitizeCsv(horaStr),
        this.sanitizeCsv(mins),
        this.sanitizeCsv(trocas),
        this.sanitizeCsv(tempoFora),
        this.sanitizeCsv(nota),
        this.sanitizeCsv(statusCorrecao)
      ];

      questoes.forEach(q => {
        const resp = s.respostas ? s.respostas[q.id] : "";
        row.push(this.sanitizeCsv(resp || "Sem resposta"));
      });

      rows.push(row.join(";"));
    });

    const csvContent = rows.join("\r\n");
    const safeTitle = (atv.titulo || "avaliacao").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const dateStamp = new Date().toISOString().split("T")[0];
    const filename = `relatorio_${atv.codigo || "prova"}_${safeTitle}_${dateStamp}.csv`;
    this.downloadCsv(csvContent, filename);
  },

  gerarAtaImpressao() {
    const atv = this.atividade || {};
    const subs = this.submissoes || [];
    const totalSubs = subs.length;
    const mediaNotasNum = totalSubs > 0
      ? subs.reduce((acc, s) => acc + (Number(s.correcao?.notaTotal ?? s.notaFinal ?? 0)), 0) / totalSubs
      : 0;
    const mediaNotas = mediaNotasNum.toFixed(1);
    const totalInf = subs.reduce((acc, s) => acc + (s.infracoes?.totalTrocasAba || 0), 0);
    const profNome = sessionStorage.getItem("professor_nome") || localStorage.getItem("professor_nome") || atv.professorNome || "Professor(a)";
    const escola = sessionStorage.getItem("professor_escola") || localStorage.getItem("professor_escola") || atv.escola || "Unidade Escolar";
    const hoje = new Date().toLocaleDateString("pt-BR");

    const linhas = subs.map((s, idx) => {
      const nota = s.correcao?.notaTotal !== undefined ? s.correcao.notaTotal : (s.notaFinal !== undefined ? s.notaFinal : "Pendente");
      const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
      const trocas = s.infracoes?.totalTrocasAba || 0;
      const dataEnvio = s.dataEnvio ? new Date(s.dataEnvio).toLocaleString("pt-BR") : "—";
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${this.escape(s.alunoNome || "Aluno")}</td>
          <td>${this.escape(s.alunoRA || "—")}</td>
          <td>${this.escape(String(nota))}</td>
          <td>${mins} min</td>
          <td>${trocas}</td>
          <td>${this.escape(dataEnvio)}</td>
        </tr>
      `;
    }).join("");

    const ataHtml = `
      <!doctype html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Ata de Avaliação - ${this.escape(atv.titulo || "Atividade Segura")}</title>
        <style>
          @page { size: A4; margin: 18mm 14mm; }
          * { box-sizing: border-box; }
          body { font-family: Arial, Helvetica, sans-serif; color: #111827; margin: 0; background: #ffffff; }
          .sheet { max-width: 960px; margin: 0 auto; padding: 24px; }
          header { border-bottom: 3px solid #1d4ed8; padding-bottom: 14px; margin-bottom: 18px; display: flex; justify-content: space-between; gap: 20px; }
          .brand { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #1d4ed8; font-weight: 800; }
          h1 { font-size: 22px; margin: 5px 0 4px; color: #0f172a; }
          .meta { font-size: 12px; color: #475569; line-height: 1.5; }
          .stamp { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px 14px; text-align: right; font-size: 11px; min-width: 170px; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 18px 0; }
          .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px; background: #f8fafc; }
          .label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 800; letter-spacing: 0.08em; }
          .value { font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11px; }
          th { background: #e2e8f0; color: #0f172a; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; }
          th, td { border: 1px solid #cbd5e1; padding: 7px 8px; vertical-align: top; }
          tbody tr:nth-child(even) { background: #f8fafc; }
          .observacoes { margin-top: 18px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; min-height: 76px; }
          .assinaturas { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 42px; font-size: 12px; }
          .linha { border-top: 1px solid #334155; padding-top: 8px; text-align: center; }
          .print-actions { position: sticky; top: 0; background: #0f172a; color: white; padding: 12px 18px; display: flex; justify-content: center; gap: 10px; }
          .print-actions button { border: 0; border-radius: 10px; padding: 10px 14px; font-weight: 800; cursor: pointer; }
          .primary { background: #2563eb; color: white; }
          .secondary { background: #334155; color: white; }
          @media print {
            .print-actions { display: none; }
            .sheet { padding: 0; max-width: none; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="print-actions">
          <button class="primary" onclick="window.print()">Imprimir / Salvar em PDF</button>
          <button class="secondary" onclick="window.close()">Fechar</button>
        </div>
        <main class="sheet">
          <header>
            <div>
              <div class="brand">Atividade Segura • Relatório Oficial</div>
              <h1>Ata de Avaliação</h1>
              <div class="meta">
                <strong>Escola:</strong> ${this.escape(escola)}<br>
                <strong>Professor(a):</strong> ${this.escape(profNome)}<br>
                <strong>Atividade:</strong> ${this.escape(atv.titulo || "Avaliação")}<br>
                <strong>Turma/Ano:</strong> ${this.escape(atv.anoTurma || "—")} • <strong>Disciplina:</strong> ${this.escape(atv.disciplina || "—")}
              </div>
            </div>
            <div class="stamp">
              <strong>Código:</strong> ${this.escape(atv.codigo || "—")}<br>
              <strong>Data:</strong> ${hoje}<br>
              <strong>Questões:</strong> ${(atv.questoes || []).length}<br>
              <strong>Tempo limite:</strong> ${atv.tempoLimiteMinutos || 45} min
            </div>
          </header>

          <section class="stats">
            <div class="card"><div class="label">Entregas</div><div class="value">${totalSubs}</div></div>
            <div class="card"><div class="label">Média Geral</div><div class="value">${mediaNotas}</div></div>
            <div class="card"><div class="label">Trocas de Aba</div><div class="value">${totalInf}</div></div>
            <div class="card"><div class="label">Status</div><div class="value">Registrado</div></div>
          </section>

          <section>
            <h2 style="font-size:15px;margin:0 0 8px;color:#0f172a;">Relação de Estudantes e Resultados</h2>
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Estudante</th>
                  <th>RA</th>
                  <th>Nota</th>
                  <th>Tempo</th>
                  <th>Abas</th>
                  <th>Envio</th>
                </tr>
              </thead>
              <tbody>
                ${linhas || `<tr><td colspan="7" style="text-align:center;color:#64748b;">Nenhuma entrega registrada até o momento.</td></tr>`}
              </tbody>
            </table>
          </section>

          <section class="observacoes">
            <strong>Observações pedagógicas:</strong><br>
            ________________________________________________________________________________________________<br><br>
            ________________________________________________________________________________________________
          </section>

          <section class="assinaturas">
            <div class="linha">Assinatura do(a) Professor(a)</div>
            <div class="linha">Coordenação / Gestão Escolar</div>
          </section>
        </main>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (!win) {
      alert("O navegador bloqueou a janela de impressão. Permita pop-ups para gerar a ata.");
      return;
    }
    win.document.open();
    win.document.write(ataHtml);
    win.document.close();
    win.focus();
  }
};

window.ProfessorAtividadeDetalhesView = ProfessorAtividadeDetalhesView;
