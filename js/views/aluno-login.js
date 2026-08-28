/**
 * View: Acesso e Identificação do Aluno
 */

const AlunoLoginView = {
  async render(params = {}) {
    const defaultCode = params.codigo || "";
    const root = document.getElementById("app-root");

    root.innerHTML = `
      <div class="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
        <!-- Topo -->
        <header class="bg-[#002b66] text-white py-3 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="#" class="flex items-center gap-2 font-bold text-base hover:text-blue-200">
              <i data-lucide="arrow-left" class="w-5 h-5"></i>
              <span>Voltar ao Início</span>
            </a>
            <span class="text-xs bg-blue-900/60 px-3 py-1 rounded-full border border-blue-400/30 text-blue-200 font-mono">
              Acesso do Estudante
            </span>
          </div>
        </header>

        <!-- Formulário de Entrada -->
        <main class="max-w-md mx-auto w-full p-4 my-8">
          <div class="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
            <div class="text-center mb-6">
              <div class="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i data-lucide="lock" class="w-7 h-7"></i>
              </div>
              <h2 class="text-2xl font-bold text-slate-900">Entrada na Avaliação</h2>
              <p class="text-xs text-slate-500 mt-1">Preencha seus dados para acessar o ambiente blindado</p>
            </div>

            <form id="form-aluno-login" class="space-y-4">
              <!-- Código da Prova / PIN -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Código da Atividade ou PIN *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="input-codigo-prova"
                    required
                    value="${defaultCode}"
                    placeholder="Ex: GEO-8B-2026 ou 8421"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm font-semibold uppercase tracking-wider transition-all"
                  />
                  <i data-lucide="key" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Nome Completo -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Seu Nome Completo *
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="input-nome-aluno"
                    required
                    placeholder="Ex: Gabriel Santos de Oliveira"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all"
                  />
                  <i data-lucide="user" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- RA (Registro do Aluno) -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>RA (Registro do Aluno) *</span>
                  <span class="text-[10px] text-slate-400 font-normal">Ex: 108.452.981-3/SP</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="input-ra-aluno"
                    required
                    placeholder="000.000.000-0/SP"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm font-mono transition-all"
                  />
                  <i data-lucide="id-card" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- E-mail Institucional -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                  <span>E-mail Institucional *</span>
                  <span class="text-[10px] text-blue-600 font-medium">@aluno.educacao.sp.gov.br</span>
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="input-email-aluno"
                    required
                    placeholder="nome.sobrenome@aluno.educacao.sp.gov.br"
                    class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all"
                  />
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <!-- Termos e Regras de Segurança -->
              <div class="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5 mt-2">
                <div class="font-bold flex items-center gap-1.5 text-amber-800">
                  <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i>
                  Regras do Modo Blindado:
                </div>
                <ul class="list-disc list-inside space-y-0.5 text-[11px] text-amber-800/90 pl-1">
                  <li>A tela cheia é obrigatória durante toda a avaliação.</li>
                  <li>Trocas de abas ou perda de foco são cronometradas e registradas.</li>
                  <li>Copiar, colar e capturas de tela estão desativados.</li>
                  <li>Uma marca d'água com seu RA cobrirá toda a prova.</li>
                </ul>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <input type="checkbox" id="check-concordo" required class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300 cursor-pointer" />
                <label for="check-concordo" class="text-xs text-slate-600 cursor-pointer select-none">
                  Estou ciente das regras de segurança e pronto(a) para iniciar.
                </label>
              </div>

              <button
                type="submit"
                id="btn-entrar-prova"
                class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Entrar em Modo Blindado</span>
                <i data-lucide="shield" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </main>

        <!-- Rodapé -->
        <footer class="text-center py-4 text-xs text-slate-500">
          Atividade Segura • Secretaria da Educação do Estado de São Paulo
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Evento de Envio do Formulário
    const form = document.getElementById("form-aluno-login");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const codigo = document.getElementById("input-codigo-prova").value.trim();
      const nome = document.getElementById("input-nome-aluno").value.trim();
      const ra = document.getElementById("input-ra-aluno").value.trim();
      const email = document.getElementById("input-email-aluno").value.trim();

      const btn = document.getElementById("btn-entrar-prova");
      btn.disabled = true;
      btn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Verificando atividade...`;

      try {
        const atividade = await DB.getAtividadePorCodigo(codigo);
        if (!atividade) {
          alert(`Código de atividade "${codigo}" não encontrado. Verifique com seu professor.`);
          btn.disabled = false;
          btn.innerHTML = `<span>Entrar em Modo Blindado</span> <i data-lucide="shield" class="w-4 h-4"></i>`;
          if (window.lucide) window.lucide.createIcons();
          return;
        }

        // Salvar dados do aluno na sessão
        sessionStorage.setItem("aluno_ativo", JSON.stringify({
          nome,
          ra,
          email,
          codigoAtividade: atividade.codigo,
          atividadeId: atividade.id
        }));

        // Redirecionar para a tela da prova blindada
        window.location.hash = `#aluno/prova/${atividade.codigo}`;
      } catch (err) {
        alert("Erro ao validar atividade: " + err.message);
        btn.disabled = false;
        btn.innerHTML = `<span>Entrar em Modo Blindado</span>`;
      }
    };
  }
};

window.AlunoLoginView = AlunoLoginView;
