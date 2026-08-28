/**
 * View: Configurações do Professor e Chave de API Gemini
 */

const ProfessorConfiguracoesView = {
  async render() {
    const root = document.getElementById("app-root");

    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col text-slate-800 pb-16">
        <!-- Topo -->
        <header class="bg-[#002b66] text-white py-3.5 px-6 shadow-md border-b-4 border-[#dc2626]">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-sm hover:text-blue-200 transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Painel da Professora</span>
            </a>
            <span class="text-xs bg-blue-900/80 px-3 py-1 rounded-full border border-blue-400/30 text-blue-200">
              Configurações & IA
            </span>
          </div>
        </header>

        <!-- Conteúdo -->
        <main class="max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">Configurações & Integração com IA</h2>
            <p class="text-xs md:text-sm text-slate-500 mt-0.5">Gerencie sua chave do Google Gemini 3.7 Flash e dados institucionais.</p>
          </div>

          <!-- Card da API Gemini -->
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <i data-lucide="sparkles" class="w-6 h-6"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-slate-900">Chave da API Google Gemini 3.7 Flash</h3>
                <p class="text-xs text-slate-500">Utilizada para geração de questões pedagógicas e correção inteligente de dissertativas.</p>
              </div>
            </div>

            <form id="form-config-gemini" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold uppercase text-slate-700 mb-1 flex items-center justify-between">
                  <span>Sua Chave de API Gemini (Google AI Studio)</span>
                  <span id="gemini-key-status" class="text-slate-400 font-normal">Verificando...</span>
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="input-gemini-key"
                    placeholder="AIzaSy..."
                    class="w-full pl-10 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                  />
                  <i data-lucide="key-round" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                  <button
                    type="button"
                    id="btn-toggle-key-visibility"
                    class="absolute right-3 top-3 text-[11px] font-bold text-slate-500 hover:text-slate-800"
                  >
                    Mostrar
                  </button>
                </div>
                <p class="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  A chave é salva de forma segura e local no servidor e nunca é exposta aos alunos. Caso não possua, você pode obter gratuitamente em <a href="https://aistudio.google.com" target="_blank" class="text-purple-600 font-bold underline">aistudio.google.com</a>.
                </p>
              </div>

              <div class="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  id="btn-salvar-config"
                  class="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <i data-lucide="save" class="w-4 h-4"></i>
                  <span>Salvar Chave Gemini</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Card de Informações da Escola -->
          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <i data-lucide="school" class="w-4 h-4 text-blue-600"></i>
              Dados Institucionais da Escola
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-bold uppercase text-slate-600 mb-1">Nome da Professora</label>
                <input type="text" id="cfg-prof-nome" value="Profª. Maria Helena Silveira" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block font-bold uppercase text-slate-600 mb-1">E-mail Institucional</label>
                <input type="email" id="cfg-prof-email" value="maria.silveira@professor.educacao.sp.gov.br" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block font-bold uppercase text-slate-600 mb-1">Unidade Escolar</label>
                <input type="text" id="cfg-escola" value="EE Prof. José de Alencar - DER SP" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block font-bold uppercase text-slate-600 mb-1">Rede de Ensino</label>
                <input type="text" id="cfg-rede" value="Secretaria da Educação do Estado de São Paulo" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>
            </div>

            <div class="pt-2">
              <button
                type="button"
                onclick="alert('Dados institucionais atualizados com sucesso!');"
                class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-all"
              >
                Salvar Dados Escolares
              </button>
            </div>
          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Carregar configurações atuais
    const configData = await DB.getConfiguracoes();
    const statusEl = document.getElementById("gemini-key-status");
    const keyInput = document.getElementById("input-gemini-key");

    if (configData.hasApiKey) {
      statusEl.innerHTML = `<span class="text-emerald-600 font-bold">🟢 Chave Ativa (${configData.maskedKey || "Configurada"})</span>`;
      keyInput.placeholder = "Chave configurada (digite para alterar)";
    } else {
      statusEl.innerHTML = `<span class="text-amber-600 font-bold">⚠️ Modo Demonstração Ativo</span>`;
    }

    // Toggle de visibilidade da senha
    const toggleBtn = document.getElementById("btn-toggle-key-visibility");
    toggleBtn.onclick = () => {
      if (keyInput.type === "password") {
        keyInput.type = "text";
        toggleBtn.innerText = "Ocultar";
      } else {
        keyInput.type = "password";
        toggleBtn.innerText = "Mostrar";
      }
    };

    // Salvar Chave
    const form = document.getElementById("form-config-gemini");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const newKey = keyInput.value.trim();
      if (!newKey) {
        alert("Por favor, digite a sua chave de API Gemini.");
        return;
      }

      const btn = document.getElementById("btn-salvar-config");
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Salvando...`;

      try {
        await DB.salvarConfiguracoes({ geminiApiKey: newKey });
        alert("Chave do Google Gemini salva com sucesso! Agora você pode gerar e corrigir questões em tempo real.");
        ProfessorConfiguracoesView.render();
      } catch (err) {
        alert("Erro ao salvar chave: " + err.message);
        btn.disabled = false;
        btn.innerHTML = `<span>Salvar Chave Gemini</span>`;
      }
    };
  }
};

window.ProfessorConfiguracoesView = ProfessorConfiguracoesView;
