/**
 * View: Criador de Atividade com IA Gemini 3.7 Flash
 */

const ProfessorNovaAtividadeView = {
  questoes: [],
  configSeguranca: {
    bloquearCopiarColar: true,
    bloquearBotaoDireito: true,
    telaCheiaObrigatoria: true,
    marcaDaguaRA: true,
    detectarTrocaAba: true,
    embaralharQuestoes: true,
    embaralharAlternativas: true
  },

  async render() {
    const root = document.getElementById("app-root");
    this.questoes = [];

    // Gerar código aleatório
    const randCode = `AVAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const randPin = String(Math.floor(1000 + Math.random() * 9000));

    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col text-slate-800 pb-16">
        <!-- Topo -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-5xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-sm hover:text-blue-200 transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Voltar ao Painel</span>
            </a>
            <span class="text-xs bg-blue-900/80 px-3 py-1 rounded-full border border-blue-400/30 text-blue-200">
              Nova Avaliação com IA
            </span>
          </div>
        </header>

        <!-- Formulário de Criação -->
        <main class="max-w-5xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">Criar Nova Avaliação</h2>
              <p class="text-xs md:text-sm text-slate-500 mt-0.5">Defina as informações básicas ou gere questões instantaneamente com IA.</p>
            </div>

            <!-- Botão de Destaque Gerador IA -->
            <button
              id="btn-open-ai-modal"
              class="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform hover:scale-[1.02]"
            >
              <i data-lucide="sparkles" class="w-5 h-5 text-yellow-300"></i>
              <span>Gerar Questões com IA (Gemini)</span>
            </button>
          </div>

          <!-- Informações Básicas da Atividade -->
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <i data-lucide="file-edit" class="w-4 h-4 text-blue-600"></i>
              1. Dados da Avaliação
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Título da Avaliação *</label>
                <input
                  type="text"
                  id="input-titulo"
                  required
                  placeholder="Ex: Avaliação Bimestral de História: Era Vargas e Cidadania"
                  class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Disciplina *</label>
                <select id="select-disciplina" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all">
                  <option value="Geografia">Geografia</option>
                  <option value="Língua Portuguesa">Língua Portuguesa</option>
                  <option value="Matemática">Matemática</option>
                  <option value="História">História</option>
                  <option value="Ciências">Ciências</option>
                  <option value="Biologia">Biologia</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Inglês">Inglês</option>
                  <option value="Filosofia / Sociologia">Filosofia / Sociologia</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Ano / Turma *</label>
                <input
                  type="text"
                  id="input-turma"
                  value="8º Ano B - Ensino Fundamental"
                  class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Código de Acesso do Aluno</label>
                <input
                  type="text"
                  id="input-codigo"
                  value="${randCode}"
                  class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold uppercase focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Tempo Limite (Minutos)</label>
                <input
                  type="number"
                  id="input-tempo"
                  value="45"
                  min="5"
                  max="180"
                  class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Instruções para os Alunos</label>
              <textarea
                id="input-instrucoes"
                rows="2"
                placeholder="Ex: Leia atentamente os textos de apoio. As respostas dissertativas devem ser fundamentadas..."
                class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              >Leia com atenção cada questão e os textos de apoio. Durante a prova, a tela permanecerá em modo seguro blindado.</textarea>
            </div>
          </div>

          <!-- Configurações de Segurança Anticola -->
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-base text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
              <span class="flex items-center gap-2">
                <i data-lucide="shield" class="w-4 h-4 text-red-600"></i>
                2. Travas de Segurança ("Modo Blindado")
              </span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ativo
              </span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-copiar" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Bloquear Copiar/Colar & Teclas</span>
              </label>

              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-telacheia" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Tela Cheia Obrigatória</span>
              </label>

              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-marcadagua" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Marca d'Água Dinâmica com RA</span>
              </label>

              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-trocaaba" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Registrar Trocas de Aba & Tempo Fora</span>
              </label>

              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-embaralhar-q" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Embaralhar Ordem das Questões</span>
              </label>

              <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" id="cfg-embaralhar-alt" checked class="w-4 h-4 text-blue-600 rounded" />
                <span>Embaralhar Alternativas (A-E)</span>
              </label>
            </div>
          </div>

          <!-- Construtor de Questões -->
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-900 flex items-center gap-2">
                <i data-lucide="list-checks" class="w-4 h-4 text-emerald-600"></i>
                3. Questões da Avaliação (<span id="count-questoes">0</span>)
              </h3>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick="ProfessorNovaAtividadeView.adicionarQuestao(multipla_escolha)"
                  class="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors"
                >
                  + Múltipla Escolha
                </button>
                <button
                  type="button"
                  onclick="ProfessorNovaAtividadeView.adicionarQuestao(dissertativa)"
                  class="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors"
                >
                  + Dissertativa
                </button>
              </div>
            </div>

            <!-- Lista de Questões -->
            <div id="questoes-editor-list" class="space-y-6">
              <!-- Renderizado dinamicamente -->
            </div>
          </div>

          <!-- Botão Salvar Prova -->
          <div class="flex items-center justify-end gap-3 pt-4">
            <a href="#professor" class="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100">
              Cancelar
            </a>
            <button
              id="btn-salvar-atividade"
              class="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all"
            >
              <i data-lucide="check" class="w-5 h-5"></i>
              <span>Publicar e Salvar Avaliação</span>
            </button>
          </div>
        </main>
      </div>

      <!-- Modal de Geração com IA Gemini -->
      <div id="modal-ia-gerador" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 border border-slate-200 max-h-[90vh] overflow-y-auto animate-fade-in">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <i data-lucide="sparkles" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-lg text-slate-900">Gerador Pedagógico com IA</h3>
                <p class="text-xs text-slate-500">Google Gemini 3.7 Flash • BNCC & Prova Paulista</p>
              </div>
            </div>
            <button id="btn-fechar-modal-ia" class="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-slate-700 mb-1">Tema / Conteúdo Curricular *</label>
              <input
                type="text"
                id="ia-tema"
                placeholder="Ex: Revolução Industrial, Impactos Socioambientais e Urbanização"
                class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold uppercase text-slate-700 mb-1">Estilo da Avaliação</label>
                <select id="ia-estilo" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold">
                  <option value="Prova Paulista">Prova Paulista (SEDUC-SP)</option>
                  <option value="SARESP">SARESP</option>
                  <option value="ENEM">ENEM</option>
                  <option value="BNCC Geral">BNCC Padrão</option>
                </select>
              </div>

              <div>
                <label class="block font-bold uppercase text-slate-700 mb-1">Qtd. Múltipla Escolha</label>
                <input type="number" id="ia-qtd-multipla" value="2" min="1" max="10" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold" />
              </div>

              <div>
                <label class="block font-bold uppercase text-slate-700 mb-1">Qtd. Dissertativas</label>
                <input type="number" id="ia-qtd-dissertativa" value="1" min="0" max="5" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold" />
              </div>
            </div>

            <div>
              <label class="block font-bold uppercase text-slate-700 mb-1">Código de Habilidade BNCC (Opcional)</label>
              <input
                type="text"
                id="ia-bncc"
                placeholder="Ex: EF08GE01 ou EM13CHS102"
                class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label class="block font-bold uppercase text-slate-700 mb-1">Texto de Apoio / Material da Professora (Opcional)</label>
              <textarea
                id="ia-texto-base"
                rows="3"
                placeholder="Cole aqui um texto, artigo, resumo de aula ou dados para a IA criar questões baseadas exatamente nele..."
                class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed"
              ></textarea>
            </div>

            <div class="pt-3">
              <button
                id="btn-executar-geracao-ia"
                class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i>
                <span>Gerar Questões com IA Agora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // 1. Modal IA Handlers
    const modalIA = document.getElementById("modal-ia-gerador");
    document.getElementById("btn-open-ai-modal").onclick = () => modalIA.classList.remove("hidden");
    document.getElementById("btn-fechar-modal-ia").onclick = () => modalIA.classList.add("hidden");

    document.getElementById("btn-executar-geracao-ia").onclick = async () => {
      const tema = document.getElementById("ia-tema").value.trim();
      const disciplina = document.getElementById("select-disciplina").value;
      const anoTurma = document.getElementById("input-turma").value;
      const estilo = document.getElementById("ia-estilo").value;
      const qtdMultipla = parseInt(document.getElementById("ia-qtd-multipla").value) || 2;
      const qtdDissertativa = parseInt(document.getElementById("ia-qtd-dissertativa").value) || 1;
      const habilidadeBNCC = document.getElementById("ia-bncc").value.trim();
      const textoBase = document.getElementById("ia-texto-base").value.trim();

      if (!tema) {
        alert("Por favor, preencha o tema da avaliação para a IA.");
        return;
      }

      const btn = document.getElementById("btn-executar-geracao-ia");
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Criando questões com Gemini 3.7 Flash...`;

      try {
        const res = await AIService.gerarQuestoes({
          disciplina,
          anoTurma,
          tema,
          estilo,
          qtdMultiplaEscolha: qtdMultipla,
          qtdDissertativa: qtdDissertativa,
          habilidadeBNCC,
          textoBase
        });

        if (res.resultado) {
          if (res.resultado.tituloSugerido && !document.getElementById("input-titulo").value) {
            document.getElementById("input-titulo").value = res.resultado.tituloSugerido;
          }
          if (res.resultado.instrucoes) {
            document.getElementById("input-instrucoes").value = res.resultado.instrucoes;
          }

          // Adicionar questões geradas
          this.questoes.push(...(res.resultado.questoes || []));
          this.renderQuestoesList();
          modalIA.classList.add("hidden");

          alert(`Sucesso! ${res.resultado.questoes.length} questões pedagógicas geradas e inseridas.`);
        }
      } catch (err) {
        alert("Erro na geração por IA: " + err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i> <span>Gerar Questões com IA Agora</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    };

    // 2. Salvar Atividade
    document.getElementById("btn-salvar-atividade").onclick = async () => {
      const titulo = document.getElementById("input-titulo").value.trim();
      const disciplina = document.getElementById("select-disciplina").value;
      const turma = document.getElementById("input-turma").value.trim();
      const codigo = document.getElementById("input-codigo").value.trim().toUpperCase();
      const tempo = parseInt(document.getElementById("input-tempo").value) || 45;
      const instrucoes = document.getElementById("input-instrucoes").value.trim();

      if (!titulo) {
        alert("Por favor, preencha o título da avaliação.");
        return;
      }
      if (this.questoes.length === 0) {
        alert("Adicione pelo menos 1 questão à avaliação.");
        return;
      }

      const novaAtividade = {
        id: `act-${codigo.toLowerCase()}`,
        codigo: codigo,
        pin: String(Math.floor(1000 + Math.random() * 9000)),
        titulo: titulo,
        disciplina: disciplina,
        anoTurma: turma,
        professorNome: "Profª. Maria Helena Silveira",
        professorEmail: "maria.silveira@professor.educacao.sp.gov.br",
        status: "ativa",
        tempoLimiteMinutos: tempo,
        instrucoes: instrucoes,
        configuracoesSeguranca: {
          bloquearCopiarColar: document.getElementById("cfg-copiar").checked,
          bloquearBotaoDireito: true,
          telaCheiaObrigatoria: document.getElementById("cfg-telacheia").checked,
          marcaDaguaRA: document.getElementById("cfg-marcadagua").checked,
          detectarTrocaAba: document.getElementById("cfg-trocaaba").checked,
          embaralharQuestoes: document.getElementById("cfg-embaralhar-q").checked,
          embaralharAlternativas: document.getElementById("cfg-embaralhar-alt").checked
        },
        questoes: this.questoes
      };

      try {
        const atividadeSalva = await DB.salvarAtividade(novaAtividade);
        alert("Avaliação criada e publicada com sucesso!");
        window.location.hash = `#professor/atividade/${atividadeSalva.id}`;
      } catch (err) {
        alert("Erro ao salvar avaliação: " + err.message);
      }
    };

    // Render inicial das questões
    this.renderQuestoesList();
  },

  adicionarQuestao(tipo = "multipla_escolha") {
    const newId = `q_manual_${Date.now()}`;
    if (tipo === "multipla_escolha") {
      this.questoes.push({
        id: newId,
        tipo: "multipla_escolha",
        habilidadeBNCC: "EF08GE01",
        enunciado: "Digite aqui o enunciado da questão...",
        textoApoio: "",
        peso: 2.5,
        alternativas: [
          { id: "a", texto: "Alternativa correta", correta: true, justificativa: "Justificativa da alternativa A" },
          { id: "b", texto: "Alternativa incorreta (Distrator)", correta: false, justificativa: "Incorreta" },
          { id: "c", texto: "Alternativa incorreta (Distrator)", correta: false, justificativa: "Incorreta" },
          { id: "d", texto: "Alternativa incorreta (Distrator)", correta: false, justificativa: "Incorreta" }
        ]
      });
    } else {
      this.questoes.push({
        id: newId,
        tipo: "dissertativa",
        habilidadeBNCC: "EF08GE04",
        enunciado: "Elabore um texto explicando...",
        textoApoio: "",
        peso: 5.0,
        criteriosCorrecao: ["Definição precisa do conceito", "Dois exemplos fundamentados"],
        respostaEsperada: "Resposta modelo esperada para orientar a correção por IA."
      });
    }
    this.renderQuestoesList();
  },

  removerQuestao(index) {
    this.questoes.splice(index, 1);
    this.renderQuestoesList();
  },

  renderQuestoesList() {
    const list = document.getElementById("questoes-editor-list");
    const count = document.getElementById("count-questoes");
    if (!list) return;

    count.innerText = this.questoes.length;

    if (this.questoes.length === 0) {
      list.innerHTML = `
        <div class="p-8 border border-dashed border-slate-300 rounded-2xl text-center text-slate-400 text-xs">
          Nenhuma questão adicionada ainda. Clique em "Gerar Questões com IA" ou nos botões acima.
        </div>
      `;
      return;
    }

    let html = "";
    this.questoes.forEach((q, idx) => {
      const isDiss = q.tipo === "dissertativa";
      html += `
        <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                ${idx + 1}
              </span>
              <span class="text-xs font-bold uppercase text-slate-700">
                ${isDiss ? "Questão Dissertativa" : "Múltipla Escolha"}
              </span>
              <span class="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                BNCC: ${q.habilidadeBNCC || "Geral"}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-slate-500">Peso: ${q.peso || 2.5} pts</span>
              <button
                type="button"
                onclick="ProfessorNovaAtividadeView.removerQuestao(${idx})"
                class="text-slate-400 hover:text-red-600 p-1 transition-colors"
                title="Excluir questão"
              >
                <i data-lucide="trash" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Enunciado -->
          <div>
            <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Enunciado</label>
            <textarea
              rows="2"
              onchange="ProfessorNovaAtividadeView.questoes[${idx}].enunciado = this.value"
              class="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs leading-relaxed"
            >${q.enunciado}</textarea>
          </div>

          <!-- Texto de Apoio se houver -->
          ${q.textoApoio ? `
            <div>
              <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Texto de Apoio</label>
              <textarea
                rows="2"
                onchange="ProfessorNovaAtividadeView.questoes[${idx}].textoApoio = this.value"
                class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-600"
              >${q.textoApoio}</textarea>
            </div>
          ` : ""}

          <!-- Alternativas ou Gabarito Dissertativo -->
          ${!isDiss ? `
            <div class="space-y-1.5 pt-1">
              <label class="block text-[11px] font-bold text-slate-600 uppercase">Alternativas & Gabarito</label>
              ${(q.alternativas || []).map((alt, aIdx) => `
                <div class="flex items-center gap-2 p-2 bg-white rounded-xl border ${alt.correta ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200"}">
                  <span class="w-5 h-5 rounded-full ${alt.correta ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"} flex items-center justify-center text-[10px] font-bold uppercase">
                    ${alt.id}
                  </span>
                  <input
                    type="text"
                    value="${alt.texto}"
                    onchange="ProfessorNovaAtividadeView.questoes[${idx}].alternativas[${aIdx}].texto = this.value"
                    class="flex-1 p-1.5 text-xs bg-transparent border-none focus:ring-0"
                  />
                  ${alt.correta ? `
                    <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Gabarito</span>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          ` : `
            <div class="space-y-2 pt-1">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Resposta Modelo Esperada (Para IA avaliar)</label>
                <textarea
                  rows="2"
                  onchange="ProfessorNovaAtividadeView.questoes[${idx}].respostaEsperada = this.value"
                  class="w-full p-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-purple-950"
                >${q.respostaEsperada || ""}</textarea>
              </div>
            </div>
          `}
        </div>
      `;
    });

    list.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }
};

window.ProfessorNovaAtividadeView = ProfessorNovaAtividadeView;
