/**
 * View: Detalhes da Atividade, Resultados, Infrações e Correção com IA
 * Design: SaaS Pro / GovTech Educational Standard
 */

const ProfessorAtividadeDetalhesView = {
  atividade: null,
  submissoes: [],
  activeTab: "submissoes",

  async render(params = {}) {
    const root = document.getElementById("app-root");
    const atvId = params.id;
    this.activeTab = params.preview ? "gabarito" : "submissoes";

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
      this.submissoes = await DB.getSubmissoes(atvId);
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

    const totalInf = subs.reduce((acc, s) => acc + (s.infracoes?.totalTrocasAba || 0), 0);

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

              <!-- Botão Copiar Link -->
              <button
                onclick="ProfessorAtividadeDetalhesView.copiarCodigo('${atv.codigo}')"
                class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shadow-glow-blue transition-all border border-white/10"
              >
                <i data-lucide="copy" class="w-4 h-4"></i>
                <span>Copiar PIN para Alunos</span>
              </button>
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
          <div class="flex items-center gap-2 border-b border-slate-800 pb-1 text-xs font-bold">
            <button
              id="tab-btn-submissoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('submissoes')"
              class="px-4.5 py-2.5 rounded-xl border border-brand-500/40 text-white flex items-center gap-2 transition-all bg-brand-950/60 shadow-glow-blue"
            >
              <i data-lucide="users" class="w-4 h-4 text-brand-400"></i>
              <span>Respostas dos Alunos (${totalSubs})</span>
            </button>

            <button
              id="tab-btn-gabarito"
              onclick="ProfessorAtividadeDetalhesView.switchTab('gabarito')"
              class="px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all"
            >
              <i data-lucide="check-square" class="w-4 h-4"></i>
              <span>Gabarito Pedagógico</span>
            </button>

            <button
              id="tab-btn-infracoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('infracoes')"
              class="px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all"
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

    ["submissoes", "gabarito", "infracoes"].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) {
        if (t === tab) {
          btn.className = "px-4.5 py-2.5 rounded-xl border border-brand-500/40 text-white flex items-center gap-2 transition-all bg-brand-950/60 shadow-glow-blue";
        } else {
          btn.className = "px-4.5 py-2.5 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-all";
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
    } else if (this.activeTab === "gabarito") {
      this.renderTabGabarito(container);
    } else if (this.activeTab === "infracoes") {
      this.renderTabInfracoes(container);
    }

    if (window.lucide) window.lucide.createIcons();
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
              const trocas = s.infracoes?.totalTrocasAba || 0;
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
    container.innerHTML = `
      <div class="space-y-4 text-xs">
        ${(atv.questoes || []).map((q, idx) => {
          const isDiss = q.tipo === "dissertativa";
          return `
            <div class="p-4.5 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-sm">Questão ${idx + 1} (${isDiss ? "Dissertativa" : "Múltipla Escolha"})</span>
                <span class="text-[11px] text-slate-400">Valor: ${q.peso || 2.5} pts</span>
              </div>
              <p class="text-slate-300 leading-relaxed font-medium">${q.enunciado}</p>
              ${!isDiss ? `
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

  renderTabInfracoes(container) {
    const subs = this.submissoes;
    const withInf = subs.filter(s => (s.infracoes?.totalTrocasAba || 0) > 0);

    if (withInf.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-emerald-400">
          <i data-lucide="shield-check" class="w-12 h-12 mx-auto mb-2 text-emerald-400"></i>
          <p class="font-bold text-base text-white">Nenhuma infração registrada!</p>
          <p class="text-xs text-slate-400 mt-1">Todos os estudantes permaneceram no ambiente de prova com foco contínuo.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3 text-xs">
        ${withInf.map(s => `
          <div class="p-4 rounded-2xl bg-dark-900 border border-rose-500/30 flex items-center justify-between">
            <div>
              <div class="font-bold text-white text-sm">${s.alunoNome}</div>
              <div class="text-slate-400 font-mono text-[10px]">RA: ${s.alunoRA}</div>
            </div>
            <div class="text-right">
              <span class="px-3 py-1 rounded-full bg-rose-950 text-rose-400 font-bold border border-rose-500/30 text-xs">
                ${s.infracoes.totalTrocasAba} trocas de aba
              </span>
              <div class="text-slate-500 text-[10px] mt-1">Tempo total fora: ${s.infracoes.tempoForaSegundos || 0}s</div>
            </div>
          </div>
        `).join("")}
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
            <div class="text-sm font-bold ${(s.infracoes?.totalTrocasAba || 0) > 0 ? "text-amber-400" : "text-emerald-400"}">
              ${s.infracoes?.totalTrocasAba || 0} trocas de aba
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
  }
};

window.ProfessorAtividadeDetalhesView = ProfessorAtividadeDetalhesView;
