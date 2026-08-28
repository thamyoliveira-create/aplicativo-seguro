/**
 * View: Detalhes da Atividade, Resultados, Infrações e Correção com IA
 */

const ProfessorAtividadeDetalhesView = {
  atividade: null,
  submissoes: [],
  activeTab: "submissoes",

  async render(params = {}) {
    const root = document.getElementById("app-root");
    const atvId = params.id;

    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex items-center justify-center">
        <div class="text-center text-slate-500">
          <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-xs font-semibold">Carregando resultados da avaliação...</p>
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
        <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
            <h2 class="text-xl font-bold text-red-600 mb-2">Atividade Não Encontrada</h2>
            <p class="text-slate-600 text-sm mb-4">A avaliação solicitada não existe ou foi removida.</p>
            <a href="#professor" class="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold">Voltar ao Painel</a>
          </div>
        </div>
      `;
      return;
    }

    this.renderMainLayout();
  },

  renderMainLayout() {
    const root = document.getElementById("app-root");
    const atv = this.atividade;
    const subs = this.submissoes;

    // Calcular estatísticas da atividade
    const totalSubs = subs.length;
    const mediaNotas = totalSubs > 0
      ? (subs.reduce((acc, s) => acc + (s.correcao?.notaTotal || 0), 0) / totalSubs).toFixed(1)
      : "0.0";

    const totalInf = subs.reduce((acc, s) => acc + (s.infracoes?.totalTrocasAba || 0), 0);

    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col text-slate-800 pb-16">
        <!-- Topo -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-sm hover:text-blue-200 transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Painel da Professora</span>
            </a>
            <div class="flex items-center gap-2">
              <a
                href="#aluno/prova/${atv.codigo}"
                target="_blank"
                class="px-3 py-1.5 rounded-lg bg-blue-900/80 hover:bg-blue-900 text-xs font-semibold flex items-center gap-1.5 border border-blue-400/30 text-blue-100"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Testar como Aluno</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Banner de Compartilhamento e Informações -->
        <main class="max-w-6xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-mono font-extrabold">
                    CÓDIGO: ${atv.codigo}
                  </span>
                  <span class="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-mono font-bold">
                    PIN: ${atv.pin}
                  </span>
                  <span class="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    ${atv.disciplina}
                  </span>
                  <span class="text-xs text-slate-500 font-semibold">
                    ${atv.anoTurma}
                  </span>
                </div>
                <h1 class="text-2xl font-extrabold text-slate-900 pt-1">${atv.titulo}</h1>
                <p class="text-xs text-slate-500">
                  Tempo limite: ${atv.tempoLimiteMinutos} min • ${atv.questoes?.length || 0} questões • Criado em ${new Date(atv.dataCriacao).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <!-- Botão Copiar Link -->
              <button
                onclick="ProfessorDashboardView.copiarLinkAluno('${atv.codigo}')"
                class="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                <i data-lucide="copy" class="w-4 h-4"></i>
                <span>Copiar Link para Sala de Aula</span>
              </button>
            </div>

            <!-- Mini Dashboard da Prova -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div class="text-xs text-slate-500 font-medium">Entregas</div>
                <div class="text-xl font-extrabold text-slate-900 mt-0.5">${totalSubs}</div>
              </div>
              <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div class="text-xs text-slate-500 font-medium">Média da Turma</div>
                <div class="text-xl font-extrabold text-emerald-600 mt-0.5">${mediaNotas} / 10.0</div>
              </div>
              <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div class="text-xs text-slate-500 font-medium">Ocorrências / Abas</div>
                <div class="text-xl font-extrabold ${totalInf > 0 ? "text-amber-600" : "text-slate-900"} mt-0.5">${totalInf}</div>
              </div>
              <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div class="text-xs text-slate-500 font-medium">Status da Prova</div>
                <div class="text-xs font-bold text-emerald-700 mt-1.5 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Prova Ativa
                </div>
              </div>
            </div>
          </div>

          <!-- Abas de Navegação -->
          <div class="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold">
            <button
              id="tab-btn-submissoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('submissoes')"
              class="px-4 py-2.5 rounded-xl border-b-2 border-blue-600 text-blue-700 flex items-center gap-2 transition-all bg-white shadow-sm"
            >
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>Respostas dos Alunos (${totalSubs})</span>
            </button>

            <button
              id="tab-btn-gabarito"
              onclick="ProfessorAtividadeDetalhesView.switchTab('gabarito')"
              class="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-all"
            >
              <i data-lucide="check-square" class="w-4 h-4"></i>
              <span>Gabarito & Critérios Pedagógicos</span>
            </button>

            <button
              id="tab-btn-infracoes"
              onclick="ProfessorAtividadeDetalhesView.switchTab('infracoes')"
              class="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-all"
            >
              <i data-lucide="shield-alert" class="w-4 h-4 text-red-500"></i>
              <span>Log de Infrações & Abas (${totalInf})</span>
            </button>
          </div>

          <!-- Conteúdo da Aba Ativa -->
          <div id="tab-content" class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <!-- Renderizado dinamicamente -->
          </div>
        </main>
      </div>

      <!-- Modal de Correção e Detalhes da Prova do Aluno -->
      <div id="modal-correcao-aluno" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div id="modal-correcao-content" class="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-8 border border-slate-200 max-h-[90vh] overflow-y-auto animate-fade-in">
          <!-- Renderizado dinamicamente -->
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.renderTabContent();
  },

  switchTab(tab) {
    this.activeTab = tab;
    ["submissoes", "gabarito", "infracoes"].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) {
        if (t === tab) {
          btn.className = "px-4 py-2.5 rounded-xl border-b-2 border-blue-600 text-blue-700 flex items-center gap-2 transition-all bg-white shadow-sm font-bold";
        } else {
          btn.className = "px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-all font-semibold";
        }
      }
    });
    this.renderTabContent();
  },

  renderTabContent() {
    const container = document.getElementById("tab-content");
    if (!container) return;

    if (this.activeTab === "submissoes") {
      this.renderSubmissoesTab(container);
    } else if (this.activeTab === "gabarito") {
      this.renderGabaritoTab(container);
    } else if (this.activeTab === "infracoes") {
      this.renderInfracoesTab(container);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  renderSubmissoesTab(container) {
    const subs = this.submissoes;
    if (subs.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-slate-400 text-xs">
          <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-2 text-slate-500">
            <i data-lucide="clock" class="w-6 h-6"></i>
          </div>
          <p class="font-bold text-slate-600">Nenhum aluno enviou a avaliação ainda.</p>
          <p class="mt-1">Compartilhe o código <strong>${this.atividade.codigo}</strong> com a turma.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <th class="py-3 px-3">Estudante</th>
              <th class="py-3 px-3">RA</th>
              <th class="py-3 px-3">Nota Total</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3">Trocas de Aba</th>
              <th class="py-3 px-3">Tempo Gasto</th>
              <th class="py-3 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
    `;

    subs.forEach(s => {
      const trocas = s.infracoes?.totalTrocasAba || 0;
      const nota = s.correcao?.notaTotal;
      const notaMax = s.correcao?.notaMaxima || 10.0;
      const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
      const secs = (s.tempoGastoSegundos || 0) % 60;

      html += `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-3 px-3">
            <div class="font-bold text-slate-900">${s.alunoNome}</div>
            <div class="text-[10px] text-slate-400">${s.alunoEmail || ""}</div>
          </td>
          <td class="py-3 px-3 font-mono text-slate-600">${s.alunoRA}</td>
          <td class="py-3 px-3">
            <span class="px-2.5 py-1 rounded-lg font-extrabold text-xs ${nota >= 6.0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}">
              ${nota !== undefined ? `${nota.toFixed(1)} / ${notaMax.toFixed(1)}` : "Pendente"}
            </span>
          </td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${s.status === "corrigida" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}">
              ${s.status === "corrigida" ? "Corrigida" : "Aguardando Revisão"}
            </span>
          </td>
          <td class="py-3 px-3">
            ${trocas > 0 ? `
              <span class="px-2 py-0.5 rounded-full font-bold text-[11px] bg-red-100 text-red-800 border border-red-300 animate-pulse">
                ⚠️ ${trocas} troca${trocas > 1 ? "s" : ""} (${s.infracoes?.tempoForaSegundos || 0}s fora)
              </span>
            ` : `
              <span class="text-emerald-600 font-semibold">0 trocas</span>
            `}
          </td>
          <td class="py-3 px-3 font-mono text-slate-600">${mins}m ${secs}s</td>
          <td class="py-3 px-3 text-right">
            <button
              onclick="ProfessorAtividadeDetalhesView.abrirModalCorrecao('${s.id}')"
              class="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 ml-auto"
            >
              <i data-lucide="file-check" class="w-3.5 h-3.5"></i>
              <span>Avaliar Prova</span>
            </button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
  },

  renderGabaritoTab(container) {
    let html = `<div class="space-y-6">`;
    (this.atividade.questoes || []).forEach((q, idx) => {
      const isDiss = q.tipo === "dissertativa";
      html += `
        <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#002b66] text-white text-xs font-bold flex items-center justify-center">
                ${idx + 1}
              </span>
              <span class="font-bold text-xs uppercase text-slate-800">
                ${isDiss ? "Questão Dissertativa" : "Múltipla Escolha"}
              </span>
              <span class="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                ${q.habilidadeBNCC || "Geral"}
              </span>
            </div>
            <span class="text-xs font-bold text-slate-500">Valor: ${q.peso || 2.5} pts</span>
          </div>

          <div class="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
            ${q.enunciado.replace(/\n/g, "<br>")}
          </div>

          ${!isDiss ? `
            <div class="space-y-1.5 pt-1">
              ${(q.alternativas || []).map(alt => `
                <div class="p-2 rounded-xl text-xs flex items-start gap-2 ${alt.correta ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300" : "bg-white text-slate-600 border border-slate-200"}">
                  <span class="w-4 h-4 rounded-full ${alt.correta ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"} flex items-center justify-center text-[10px] uppercase font-bold flex-shrink-0">
                    ${alt.id}
                  </span>
                  <div class="flex-1">
                    <div>${alt.texto}</div>
                    ${alt.justificativa ? `<div class="text-[10px] text-slate-500 font-normal mt-0.5 italic">Justificativa: ${alt.justificativa}</div>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          ` : `
            <div class="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-2">
              <div class="font-bold text-purple-900">Resposta Modelo Esperada:</div>
              <div class="text-purple-950">${q.respostaEsperada || "Critérios livres."}</div>
              ${q.criteriosCorrecao ? `
                <div class="pt-2 border-t border-purple-200/60">
                  <div class="font-bold text-purple-900 mb-1">Critérios de Correção (Rubrica):</div>
                  <ul class="list-disc list-inside space-y-0.5 text-purple-900/90 text-[11px]">
                    ${q.criteriosCorrecao.map(c => `<li>${c}</li>`).join("")}
                  </ul>
                </div>
              ` : ""}
            </div>
          `}
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  },

  renderInfracoesTab(container) {
    let allEvents = [];
    this.submissoes.forEach(s => {
      (s.infracoes?.historico || []).forEach(h => {
        allEvents.push({
          ...h,
          alunoNome: s.alunoNome,
          alunoRA: s.alunoRA
        });
      });
    });

    if (allEvents.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 text-slate-400 text-xs">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
          <p class="font-bold text-slate-700">Nenhuma infração registrada!</p>
          <p class="mt-1">Todos os alunos realizaram a prova integralmente em tela cheia e sem trocar de aba.</p>
        </div>
      `;
      return;
    }

    // Ordenar eventos por timestamp decrescente
    allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let html = `
      <div class="space-y-3">
        <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Histórico Detalhado de Infrações Interceptadas:
        </div>
    `;

    allEvents.forEach(ev => {
      html += `
        <div class="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3 text-xs">
          <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
            ⚠️
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-900">${ev.alunoNome} (${ev.alunoRA})</span>
              <span class="text-[10px] text-slate-400 font-mono">${new Date(ev.timestamp).toLocaleTimeString("pt-BR")}</span>
            </div>
            <p class="text-slate-700 mt-0.5">${ev.detalhe}</p>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  abrirModalCorrecao(submissaoId) {
    const sub = this.submissoes.find(s => s.id === submissaoId);
    if (!sub) return;

    const modal = document.getElementById("modal-correcao-aluno");
    const content = document.getElementById("modal-correcao-content");
    const atv = this.atividade;

    let questoesHtml = "";
    (atv.questoes || []).forEach((q, idx) => {
      const respAluno = sub.respostas[q.id];
      const isDiss = q.tipo === "dissertativa";

      questoesHtml += `
        <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5 text-xs">
          <div class="flex items-center justify-between font-bold border-b border-slate-200 pb-1.5">
            <span class="text-slate-900">Questão ${idx + 1} (${isDiss ? "Dissertativa" : "Múltipla Escolha"})</span>
            <span class="text-slate-500">Peso: ${q.peso} pts</span>
          </div>

          <div class="font-medium text-slate-800">${q.enunciado}</div>

          ${!isDiss ? `
            <div class="p-2.5 rounded-xl border ${respAluno === q.alternativas.find(a => a.correta)?.id ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-red-300 bg-red-50 text-red-900"} font-semibold">
              Resposta do Aluno: <strong>Alternativa ${respAluno ? respAluno.toUpperCase() : "Em Branco"}</strong>
              ${respAluno === q.alternativas.find(a => a.correta)?.id ? " ✅ (Acertou)" : ` ❌ (Gabarito: ${q.alternativas.find(a => a.correta)?.id.toUpperCase()})`}
            </div>
          ` : `
            <div class="space-y-2">
              <div class="p-3 bg-white border border-slate-300 rounded-xl leading-relaxed text-slate-900">
                <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Texto do Aluno:</span>
                ${respAluno ? respAluno.replace(/\n/g, "<br>") : "<span class="text-slate-400 italic">Não respondeu.</span>"}
              </div>

              <!-- Botão Corrigir com IA Gemini -->
              <div class="flex items-center justify-between pt-1">
                <button
                  type="button"
                  id="btn-corrigir-ia-${q.id}"
                  onclick="ProfessorAtividadeDetalhesView.executarCorrecaoIA('${sub.id}', '${q.id}')"
                  class="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 text-yellow-300"></i>
                  <span>Avaliar com IA Gemini 3.7 Flash</span>
                </button>
              </div>

              <div id="ia-feedback-box-${q.id}" class="hidden p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs space-y-1.5 animate-fade-in">
                <!-- Preenchido pela IA -->
              </div>
            </div>
          `}
        </div>
      `;
    });

    content.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 class="font-extrabold text-lg text-slate-900">${sub.alunoNome}</h3>
          <p class="text-xs text-slate-500 font-mono">RA: ${sub.alunoRA} • ${sub.alunoEmail || ""}</p>
        </div>
        <button onclick="document.getElementById('modal-correcao-aluno').classList.add('hidden')" class="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Resumo de Ocorrências do Aluno -->
      ${sub.infracoes?.totalTrocasAba > 0 ? `
        <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 mb-4 flex items-center gap-2">
          <span class="text-base">⚠️</span>
          <div>
            <strong>Atenção:</strong> Este estudante trocou de aba <strong>${sub.infracoes.totalTrocasAba} vezes</strong> (${sub.infracoes.tempoForaSegundos}s fora da prova).
          </div>
        </div>
      ` : ""}

      <!-- Formulário de Atribuição de Nota -->
      <div class="space-y-4 mb-6">
        ${questoesHtml}
      </div>

      <!-- Nota Final e Salvar -->
      <div class="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Nota Final Atribuída (0 a 10)</label>
          <input
            type="number"
            id="input-nota-final"
            step="0.1"
            min="0"
            max="10"
            value="${sub.correcao?.notaTotal !== undefined ? sub.correcao.notaTotal : 10.0}"
            class="p-2.5 bg-white border border-slate-300 rounded-xl font-extrabold text-sm w-32"
          />
        </div>

        <button
          onclick="ProfessorAtividadeDetalhesView.salvarNotaFinal('${sub.id}')"
          class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          Salvar e Aprovar Correção
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  },

  async executarCorrecaoIA(submissaoId, questaoId) {
    const sub = this.submissoes.find(s => s.id === submissaoId);
    const q = this.atividade.questoes.find(item => item.id === questaoId);
    if (!sub || !q) return;

    const respAluno = sub.respostas[questaoId] || "";
    const btn = document.getElementById(`btn-corrigir-ia-${questaoId}`);
    const box = document.getElementById(`ia-feedback-box-${questaoId}`);

    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Analisando com IA...`;

    try {
      const res = await AIService.corrigirDissertativa({
        enunciado: q.enunciado,
        respostaAluno: respAluno,
        respostaEsperada: q.respostaEsperada,
        criteriosCorrecao: q.criteriosCorrecao || [],
        pesoMaximo: q.peso || 5.0
      });

      box.classList.remove("hidden");
      box.innerHTML = `
        <div class="flex items-center justify-between border-b border-purple-200/60 pb-1.5">
          <span class="font-bold text-purple-900 flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-purple-600"></i>
            Sugestão da IA Gemini:
          </span>
          <span class="font-extrabold text-purple-900 bg-purple-200 px-2 py-0.5 rounded">
            Nota: ${res.notaSugerida} / ${res.notaMaxima}
          </span>
        </div>
        <p class="text-purple-950 leading-relaxed text-[11px]">${res.feedbackPedagogico}</p>
        <button
          type="button"
          onclick="document.getElementById('input-nota-final').value = ${res.notaSugerida + (sub.correcao?.notaObjetivas || 0)}; alert('Nota da IA aplicada ao campo final!');"
          class="mt-2 text-[10px] font-bold text-purple-800 bg-purple-200/70 hover:bg-purple-200 px-2.5 py-1 rounded transition-colors"
        >
          Aplicar esta nota na prova
        </button>
      `;

      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      alert("Erro na correção da IA: " + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5 text-yellow-300"></i> <span>Reavaliar com IA</span>`;
      if (window.lucide) window.lucide.createIcons();
    }
  },

  async salvarNotaFinal(submissaoId) {
    const sub = this.submissoes.find(s => s.id === submissaoId);
    const nota = parseFloat(document.getElementById("input-nota-final").value) || 0.0;

    const novaCorrecao = {
      ...sub.correcao,
      notaTotal: nota,
      statusCorrecao: "aprovada"
    };

    try {
      await DB.atualizarCorrecao(submissaoId, novaCorrecao);
      alert("Nota salva com sucesso!");
      document.getElementById("modal-correcao-aluno").classList.add("hidden");
      this.render({ id: this.atividade.id });
    } catch (err) {
      alert("Erro ao salvar nota: " + err.message);
    }
  }
};

window.ProfessorAtividadeDetalhesView = ProfessorAtividadeDetalhesView;
