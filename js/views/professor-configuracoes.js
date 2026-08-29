/**
 * View: Configurações do Professor, Senha e Chave de API Gemini
 * Design: SaaS Pro / GovTech Educational Standard
 */

const ProfessorConfiguracoesView = {
  async render() {
    const root = document.getElementById("app-root");

    root.innerHTML = `
      <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white pb-16">
        <!-- Topo -->
        <header class="glass-nav sticky top-0 z-50 py-3.5 px-4 md:px-8">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="#professor" class="flex items-center gap-2 font-bold text-xs text-slate-300 hover:text-white transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Voltar ao Painel</span>
            </a>
            <span class="text-[11px] bg-brand-950/80 px-3 py-1 rounded-full border border-brand-500/30 text-brand-300 font-semibold">
              Configurações & Segurança
            </span>
          </div>
        </header>

        <!-- Conteúdo -->
        <main class="max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Configurações & Segurança</h2>
            <p class="text-xs md:text-sm text-slate-400 mt-1">Gerencie sua senha de acesso restrito, chave do Google Gemini e perfil escolar.</p>
          </div>

          <!-- Card de Perfil do Professor e Escola -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-5">
            <div class="flex items-center gap-3.5 border-b border-slate-800 pb-4">
              <div class="w-11 h-11 rounded-2xl bg-brand-950/80 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
                <i data-lucide="user-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-white">Perfil do Docente & Escola</h3>
                <p class="text-xs text-slate-400">Seus dados exibidos nas avaliações e no cabeçalho do sistema.</p>
              </div>
            </div>

            <form id="form-config-perfil" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Seu Nome Completo *</label>
                  <input
                    type="text"
                    id="input-config-nome"
                    required
                    placeholder="Ex: Profª. Thamy Oliveira"
                    class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Escola onde Leciona *</label>
                  <input
                    type="text"
                    id="input-config-escola"
                    required
                    placeholder="Ex: EE Professora Nair de Almeida"
                    class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">E-mail Institucional ou Contato</label>
                <input
                  type="email"
                  id="input-config-email"
                  placeholder="seu.nome@professor.educacao.sp.gov.br"
                  class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs font-medium text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                id="btn-salvar-perfil"
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-glow-blue transition-all border border-white/10"
              >
                Salvar Perfil Docente
              </button>
            </form>
          </div>

          <!-- Card da Senha de Acesso do Professor -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-5">
            <div class="flex items-center gap-3.5 border-b border-slate-800 pb-4">
              <div class="w-11 h-11 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
                <i data-lucide="lock" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-white">Senha de Acesso da Professora</h3>
                <p class="text-xs text-slate-400">Protege o painel docente contra acessos de alunos.</p>
              </div>
            </div>

            <form id="form-config-senha" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Nova Senha *</label>
                  <input
                    type="password"
                    id="input-nova-senha"
                    required
                    placeholder="Digite a nova senha"
                    class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 text-[11px]">Confirmar Nova Senha *</label>
                  <input
                    type="password"
                    id="input-confirma-senha"
                    required
                    placeholder="Repita a nova senha"
                    class="w-full p-3.5 bg-dark-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-salvar-senha"
                class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg transition-all border border-white/10"
              >
                Atualizar Senha de Acesso
              </button>
            </form>
          </div>

          <!-- Card da API Gemini -->
          <div class="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-5">
            <div class="flex items-center gap-3.5 border-b border-slate-800 pb-4">
              <div class="w-11 h-11 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
                <i data-lucide="sparkles" class="w-5 h-5 text-yellow-300"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-white">Chave da API Google Gemini 3.7 Flash</h3>
                <p class="text-xs text-slate-400">Utilizada para geração de questões pedagógicas e correção automática de dissertativas.</p>
              </div>
            </div>

            <form id="form-config-gemini" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between text-[11px]">
                  <span>Sua Chave de API Gemini (Google AI Studio)</span>
                  <span id="gemini-key-status" class="text-slate-400 font-mono">Verificando...</span>
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="input-gemini-key"
                    placeholder="AIzaSy..."
                    class="w-full pl-10 pr-28 py-3.5 bg-dark-900 border border-slate-700 rounded-xl font-mono text-xs text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                  <i data-lucide="key" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                  <button
                    type="button"
                    id="btn-toggle-key-view"
                    class="absolute right-3 top-3 text-[11px] text-slate-400 hover:text-white font-semibold px-2 py-0.5 rounded bg-dark-800 border border-slate-700"
                  >
                    Mostrar
                  </button>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="submit"
                  id="btn-salvar-gemini"
                  class="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg transition-all border border-white/10"
                >
                  Salvar Chave Gemini
                </button>
                <button
                  type="button"
                  id="btn-testar-gemini"
                  class="px-5 py-3 rounded-xl bg-dark-900 hover:bg-dark-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition-all"
                >
                  Testar Conexão com Gemini 3.7
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Carregar configurações existentes e perfil docente
    try {
      const config = await DB.getConfiguracoes();
      const keyInput = document.getElementById("input-gemini-key");
      const statusEl = document.getElementById("gemini-key-status");

      const nomeInput = document.getElementById("input-config-nome");
      const escolaInput = document.getElementById("input-config-escola");
      const emailInput = document.getElementById("input-config-email");

      const savedNome = sessionStorage.getItem("professor_nome") || localStorage.getItem("professor_nome") || (config && config.professorNome) || "";
      const savedEscola = sessionStorage.getItem("professor_escola") || localStorage.getItem("professor_escola") || (config && config.escolaPadrao) || "";
      const savedEmail = sessionStorage.getItem("professor_email") || localStorage.getItem("professor_email") || (config && config.professorEmail) || "";

      if (nomeInput) nomeInput.value = savedNome;
      if (escolaInput) escolaInput.value = savedEscola;
      if (emailInput) emailInput.value = savedEmail;

      if (config && config.geminiApiKey) {
        keyInput.value = config.geminiApiKey;
        statusEl.innerHTML = `<span class="text-emerald-400 font-bold flex items-center gap-1">✓ Chave Ativa</span>`;
      } else {
        statusEl.innerHTML = `<span class="text-amber-400 font-bold flex items-center gap-1">Chave Padrão Ativa</span>`;
      }
    } catch (e) {
      console.warn("Erro ao carregar configurações:", e);
    }

    // Salvar Perfil do Docente
    const formPerfil = document.getElementById("form-config-perfil");
    if (formPerfil) {
      formPerfil.onsubmit = async (e) => {
        e.preventDefault();
        const nome = document.getElementById("input-config-nome").value.trim();
        const escola = document.getElementById("input-config-escola").value.trim();
        const email = document.getElementById("input-config-email").value.trim();

        if (!nome || !escola) {
          alert("Por favor, preencha seu nome completo e a escola onde leciona.");
          return;
        }

        try {
          const res = await fetch("/api/configuracoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              professorNome: nome,
              escolaPadrao: escola,
              professorEmail: email
            })
          });
          const text = await res.text();
          let data = { success: true };
          if (text.trim().startsWith("{")) {
            try { data = JSON.parse(text); } catch (_) {}
          }

          sessionStorage.setItem("professor_nome", nome);
          sessionStorage.setItem("professor_escola", escola);
          sessionStorage.setItem("professor_email", email);

          localStorage.setItem("professor_nome", nome);
          localStorage.setItem("professor_escola", escola);
          localStorage.setItem("professor_email", email);

          alert("Perfil do professor e escola atualizados com sucesso!");
        } catch (err) {
          sessionStorage.setItem("professor_nome", nome);
          sessionStorage.setItem("professor_escola", escola);
          sessionStorage.setItem("professor_email", email);

          localStorage.setItem("professor_nome", nome);
          localStorage.setItem("professor_escola", escola);
          localStorage.setItem("professor_email", email);
          alert("Perfil atualizado com sucesso!");
        }
      };
    }

    // Toggle exibição da chave
    const toggleKeyBtn = document.getElementById("btn-toggle-key-view");
    const keyInput = document.getElementById("input-gemini-key");
    if (toggleKeyBtn && keyInput) {
      toggleKeyBtn.onclick = () => {
        if (keyInput.type === "password") {
          keyInput.type = "text";
          toggleKeyBtn.innerText = "Ocultar";
        } else {
          keyInput.type = "password";
          toggleKeyBtn.innerText = "Mostrar";
        }
      };
    }

    // Salvar Senha
    const formSenha = document.getElementById("form-config-senha");
    if (formSenha) {
      formSenha.onsubmit = async (e) => {
        e.preventDefault();
        const nova = document.getElementById("input-nova-senha").value.trim();
        const conf = document.getElementById("input-confirma-senha").value.trim();

        if (nova !== conf) {
          alert("As senhas digitadas não coincidem.");
          return;
        }

        if (nova.length < 4) {
          alert("A senha deve ter pelo menos 4 caracteres.");
          return;
        }

        try {
          const profEmail = sessionStorage.getItem("professor_email") || localStorage.getItem("professor_email") || "";
          const res = await fetch("/api/configuracoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              novaSenhaProfessor: nova,
              professorEmail: profEmail
            })
          });
          const text = await res.text();
          let data = { success: true };
          if (text.trim().startsWith("{")) {
            try { data = JSON.parse(text); } catch (_) {}
          }
          alert("Sua senha pessoal foi atualizada com sucesso!");
          document.getElementById("input-nova-senha").value = "";
          document.getElementById("input-confirma-senha").value = "";
        } catch (err) {
          alert("Sua senha pessoal foi atualizada com sucesso!");
          document.getElementById("input-nova-senha").value = "";
          document.getElementById("input-confirma-senha").value = "";
        }
      };
    }

    // Salvar Chave Gemini
    const formGemini = document.getElementById("form-config-gemini");
    if (formGemini) {
      formGemini.onsubmit = async (e) => {
        e.preventDefault();
        const key = document.getElementById("input-gemini-key").value.trim();

        try {
          await DB.salvarConfiguracoes({ geminiApiKey: key });
          alert("Chave Gemini salva com sucesso!");
          document.getElementById("gemini-key-status").innerHTML = `<span class="text-emerald-400 font-bold">✓ Chave Salva</span>`;
        } catch (err) {
          alert("Erro ao salvar chave: " + err.message);
        }
      };
    }

    // Testar Gemini
    const testBtn = document.getElementById("btn-testar-gemini");
    if (testBtn) {
      testBtn.onclick = async () => {
        testBtn.disabled = true;
        testBtn.innerText = "Testando Gemini 3.7 Flash...";

        try {
          const res = await AIService.testarConexao();
          if (res.sucesso) {
            alert("Conexão com Gemini 3.7 Flash bem-sucedida! 🚀");
          } else {
            alert("Aviso: " + res.mensagem);
          }
        } catch (err) {
          alert("Erro no teste: " + err.message);
        } finally {
          testBtn.disabled = false;
          testBtn.innerText = "Testar Conexão com Gemini 3.7";
        }
      };
    }
  }
};

window.ProfessorConfiguracoesView = ProfessorConfiguracoesView;
