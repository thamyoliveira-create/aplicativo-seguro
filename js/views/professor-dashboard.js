/**
 * View: Painel de Controle da Professora
 */

const ProfessorDashboardView = {
  async render() {
    const root = document.getElementById("app-root");
    
    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col text-slate-800">
        <!-- Topo da Professora -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <a href="#" class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <i data-lucide="shield-check" class="w-6 h-6 text-yellow-400"></i>
              </a>
              <div>
                <h1 class="font-extrabold text-base md:text-lg tracking-tight flex items-center gap-2">
                  Painel da Professora
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    SEDUC-SP
                  </span>
                </h1>
                <p class="text-xs text-blue-200">Profª. Maria Helena Silveira • maria.silveira@professor.educacao.sp.gov.br</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <a href="#professor/configuracoes" class="px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-900 text-xs font-semibold flex items-center gap-1.5 border border-blue-400/20 transition-all">
                <i data-lucide="settings" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Configurações & IA</span>
              </a>
              <a href="#professor/nova-atividade" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all">
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i>
                <span>+ Criar com IA</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Conteúdo Principal -->
        <main class="max-w-6xl mx-auto w-full p-4 md:p-8 flex-1">
          <!-- Métricas Resumidas -->
          <div id="metrics-cards" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <i data-lucide="file-text" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900" id="stat-atividades">0</div>
                <div class="text-xs text-slate-500 font-medium">Atividades Ativas</div>
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <i data-lucide="users" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900" id="stat-submissoes">0</div>
                <div class="text-xs text-slate-500 font-medium">Provas Entregues</div>
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <i data-lucide="shield-alert" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900" id="stat-infracoes">0</div>
                <div class="text-xs text-slate-500 font-medium">Trocas de Aba</div>
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <i data-lucide="sparkles" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900">Gemini</div>
                <div class="text-xs text-slate-500 font-medium">IA Pedagógica</div>
              </div>
            </div>
          </div>

          <!-- Seção de Atividades Avaliativas -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <i data-lucide="layers" class="w-5 h-5 text-blue-600"></i>
              Suas Avaliações e Provas Blindadas
            </h2>
            <a href="#professor/nova-atividade" class="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Nova Prova <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>

          <div id="atividades-list" class="space-y-4 mb-10">
            <div class="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
              Carregando avaliações...
            </div>
          </div>

          <!-- Seção de Ocorrências e Últimas Entregas -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-900 flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-emerald-600"></i>
                Últimas Submissões & Registro de Ocorrências
              </h3>
              <span class="text-xs text-slate-500 font-medium">Tempo real</span>
            </div>
            <div id="recent-submissions-table" class="overflow-x-auto">
              <!-- Renderizado dinamicamente -->
            </div>
          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Carregar Dados
    const [atividades, submissoes] = await Promise.all([
      DB.getAtividades(),
      DB.getSubmissoes()
    ]);

    // Atualizar Estatísticas
    document.getElementById("stat-atividades").innerText = atividades.length;
    document.getElementById("stat-submissoes").innerText = submissoes.length;
    
    let totalInfracoes = 0;
    submissoes.forEach(s => {
      totalInfracoes += (s.infracoes?.totalTrocasAba || 0) + (s.infracoes?.saidasTelaCheia || 0);
    });
    document.getElementById("stat-infracoes").innerText = totalInfracoes;

    // Renderizar Lista de Atividades
    const atvContainer = document.getElementById("atividades-list");
    if (atividades.length === 0) {
      atvContainer.innerHTML = `
        <div class="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i data-lucide="plus-circle" class="w-8 h-8"></i>
          </div>
          <h4 class="font-bold text-base text-slate-800">Nenhuma avaliação cadastrada ainda</h4>
          <p class="text-xs text-slate-500 mt-1 mb-4">Crie sua primeira prova com questões geradas por IA em menos de 1 minuto.</p>
          <a href="#professor/nova-atividade" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md">
            <span>Criar Minha Primeira Prova</span>
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      `;
    } else {
      let html = "";
      atividades.forEach(atv => {
        const atvSubmissoes = submissoes.filter(s => s.atividadeId === atv.id);
        const infracoesAtv = atvSubmissoes.reduce((acc, s) => acc + (s.infracoes?.totalTrocasAba || 0), 0);

        html += `
          <div class="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1.5 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                  ${atv.codigo}
                </span>
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-semibold">
                  PIN: ${atv.pin}
                </span>
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  ${atv.disciplina}
                </span>
                <span class="text-xs text-slate-500 font-medium">
                  ${atv.anoTurma}
                </span>
              </div>
              <h3 class="text-base font-bold text-slate-900">${atv.titulo}</h3>
              <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span class="flex items-center gap-1">
                  <i data-lucide="help-circle" class="w-3.5 h-3.5 text-blue-500"></i>
                  ${atv.questoes?.length || 0} questões
                </span>
                <span class="flex items-center gap-1">
                  <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500"></i>
                  ${atv.tempoLimiteMinutos} min
                </span>
                <span class="flex items-center gap-1">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-500"></i>
                  ${atvSubmissoes.length} respostas
                </span>
                ${infracoesAtv > 0 ? `
                  <span class="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                    ${infracoesAtv} ocorrências
                  </span>
                ` : ""}
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex flex-wrap items-center gap-2">
              <button
                onclick="ProfessorDashboardView.copiarLinkAluno('${atv.codigo}')"
                class="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                title="Copiar link de acesso para os alunos"
              >
                <i data-lucide="share-2" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>Código</span>
              </button>

              <a
                href="#aluno/prova/${atv.codigo}"
                target="_blank"
                class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center gap-1.5 border border-blue-200 transition-colors"
                title="Testar avaliação como aluno"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Visualizar como Aluno</span>
              </a>

              <a
                href="#professor/atividade/${atv.id}"
                class="px-4 py-2 rounded-xl bg-[#002b66] hover:bg-[#001f4d] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <i data-lucide="bar-chart-3" class="w-3.5 h-3.5 text-yellow-400"></i>
                <span>Resultados & Gabarito</span>
              </a>

              <button
                onclick="ProfessorDashboardView.excluirAtividade('${atv.id}')"
                class="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Excluir Atividade"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `;
      });
      atvContainer.innerHTML = html;
    }

    // Renderizar Tabela de Submissões Recentes
    const subContainer = document.getElementById("recent-submissions-table");
    if (submissoes.length === 0) {
      subContainer.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Nenhuma submissão recebida até o momento.</p>`;
    } else {
      let subHtml = `
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <th class="py-2.5 px-3">Aluno</th>
              <th class="py-2.5 px-3">RA</th>
              <th class="py-2.5 px-3">Turma</th>
              <th class="py-2.5 px-3">Nota Total</th>
              <th class="py-2.5 px-3">Trocas de Aba</th>
              <th class="py-2.5 px-3">Tempo Fora</th>
              <th class="py-2.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
      `;

      submissoes.slice(0, 10).forEach(sub => {
        const trocas = sub.infracoes?.totalTrocasAba || 0;
        const tempoFora = sub.infracoes?.tempoForaSegundos || 0;
        const nota = sub.correcao?.notaTotal;
        const notaMax = sub.correcao?.notaMaxima || 10.0;

        subHtml += `
          <tr class="hover:bg-slate-50/80 transition-colors">
            <td class="py-3 px-3 font-bold text-slate-900">${sub.alunoNome}</td>
            <td class="py-3 px-3 font-mono text-slate-600">${sub.alunoRA}</td>
            <td class="py-3 px-3 text-slate-600">${sub.turma || "8º Ano B"}</td>
            <td class="py-3 px-3">
              ${nota !== undefined ? `
                <span class="px-2 py-0.5 rounded font-bold ${nota >= 6.0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}">
                  ${nota.toFixed(1)} / ${notaMax.toFixed(1)}
                </span>
              ` : `
                <span class="text-slate-400 italic">Pendente</span>
              `}
            </td>
            <td class="py-3 px-3">
              ${trocas > 0 ? `
                <span class="px-2 py-0.5 rounded-full font-bold text-[11px] bg-amber-100 text-amber-800 border border-amber-300">
                  ⚠️ ${trocas} troca${trocas > 1 ? "s" : ""}
                </span>
              ` : `
                <span class="text-emerald-600 font-semibold flex items-center gap-1">
                  <i data-lucide="check" class="w-3 h-3"></i> 0 trocas
                </span>
              `}
            </td>
            <td class="py-3 px-3 font-mono text-slate-600">
              ${tempoFora > 0 ? `${tempoFora}s` : "-"}
            </td>
            <td class="py-3 px-3 text-right">
              <a href="#professor/atividade/${sub.atividadeId}" class="text-blue-600 hover:text-blue-800 font-bold">
                Revisar Prova →
              </a>
            </td>
          </tr>
        `;
      });

      subHtml += `</tbody></table>`;
      subContainer.innerHTML = subHtml;
    }

    if (window.lucide) window.lucide.createIcons();

    // Funções auxiliares
    ProfessorDashboardView.copiarLinkAluno = (codigo) => {
      const url = `${window.location.origin}/#aluno/prova/${codigo}`;
      navigator.clipboard.writeText(url).then(() => {
        alert(`Link copiado para a área de transferência!

Envie para os alunos:
${url}
Código: ${codigo}`);
      }).catch(() => {
        prompt("Copie o link abaixo para seus alunos:", url);
      });
    };

    ProfessorDashboardView.excluirAtividade = async (id) => {
      if (confirm("Tem certeza que deseja excluir esta atividade avaliativa?")) {
        await DB.excluirAtividade(id);
        ProfessorDashboardView.render();
      }
    };
  }
};

window.ProfessorDashboardView = ProfessorDashboardView;
