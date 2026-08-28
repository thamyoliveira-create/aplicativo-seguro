/**
 * Módulo de Segurança Blindado - Atividade Segura
 * Proteções contra cópia, cola, troca de aba, saída de tela cheia e marca d'água dinâmica.
 */

class SecurityEngine {
  constructor() {
    this.active = false;
    this.studentData = null;
    this.activityData = null;
    this.submissaoId = null;
    this.onInfractionCallback = null;
    this.infractions = {
      totalTrocasAba: 0,
      tempoForaSegundos: 0,
      saidasTelaCheia: 0,
      tentativasCopiarColar: 0,
      tentativasPrint: 0,
      historico: []
    };
    this.blurStartTime = null;
    this.watermarkEl = null;
    this.isPaused = false;
    this.handlers = {};
  }

  init(studentData, activityData, submissaoId, onInfractionCallback) {
    this.studentData = studentData;
    this.activityData = activityData;
    this.submissaoId = submissaoId;
    this.onInfractionCallback = onInfractionCallback;
    this.active = true;

    const config = (activityData && activityData.configuracoesSeguranca) || {
      bloquearCopiarColar: true,
      bloquearBotaoDireito: true,
      telaCheiaObrigatoria: true,
      marcaDaguaRA: true,
      detectarTrocaAba: true
    };

    document.body.classList.add("secure-locked-mode");

    // 1. Bloqueio de Teclado
    if (config.bloquearCopiarColar) {
      this.handlers.keydown = (e) => this.handleKeyDown(e);
      window.addEventListener("keydown", this.handlers.keydown, true);

      this.handlers.copy = (e) => this.preventAction(e, "tentativa_copiar", "Tentativa de copiar texto bloqueada.");
      this.handlers.cut = (e) => this.preventAction(e, "tentativa_copiar", "Tentativa de recortar texto bloqueada.");
      this.handlers.paste = (e) => this.preventAction(e, "tentativa_colar", "Tentativa de colar texto bloqueada.");
      
      document.addEventListener("copy", this.handlers.copy, true);
      document.addEventListener("cut", this.handlers.cut, true);
      document.addEventListener("paste", this.handlers.paste, true);
    }

    // 2. Bloqueio de Botão Direito
    if (config.bloquearBotaoDireito) {
      this.handlers.contextmenu = (e) => {
        e.preventDefault();
        this.showToast("Menu de contexto (botão direito) desativado nesta avaliação.", "warning");
        return false;
      };
      document.addEventListener("contextmenu", this.handlers.contextmenu, true);
    }

    // 3. Bloqueio de Seleção e Arraste
    this.handlers.dragstart = (e) => e.preventDefault();
    document.addEventListener("dragstart", this.handlers.dragstart, true);

    // 4. Detecção de Troca de Abas / Minimização
    if (config.detectarTrocaAba) {
      this.handlers.visibilitychange = () => this.handleVisibilityChange();
      this.handlers.blur = () => this.handleWindowBlur();
      this.handlers.focus = () => this.handleWindowFocus();

      document.addEventListener("visibilitychange", this.handlers.visibilitychange);
      window.addEventListener("blur", this.handlers.blur);
      window.addEventListener("focus", this.handlers.focus);
    }

    // 5. Monitoramento de Tela Cheia
    if (config.telaCheiaObrigatoria) {
      this.handlers.fullscreenchange = () => this.handleFullscreenChange();
      document.addEventListener("fullscreenchange", this.handlers.fullscreenchange);
      document.addEventListener("webkitfullscreenchange", this.handlers.fullscreenchange);
    }

    // 6. Marca d'Água Dinâmica com RA
    if (config.marcaDaguaRA) {
      this.createWatermark();
    }
  }

  handleKeyDown(e) {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

    // F12 ou Ctrl+Shift+I / Cmd+Option+I (DevTools)
    if (e.keyCode === 123 || (ctrlOrCmd && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c"))) {
      e.preventDefault();
      this.registerInfraction("ferramenta_desenvolvedor", "Tentativa de abrir ferramentas de inspeção.");
      this.showToast("Ação não permitida durante a avaliação.", "error");
      return false;
    }

    // Ctrl/Cmd + C, V, X, U, P, S
    if (ctrlOrCmd) {
      const key = e.key.toLowerCase();
      if (["c", "v", "x", "u", "p", "s"].includes(key)) {
        // Permitir digitação normal em textarea mas sem atalhos de colar se configurado
        if (key === "p") {
          e.preventDefault();
          this.registerInfraction("tentativa_print", "Tentativa de impressão (Ctrl+P) interceptada.");
          this.showToast("Impressão desativada durante a avaliação.", "error");
          return false;
        }
        if (["c", "v", "x"].includes(key)) {
          // Bloquear se o foco não for um campo de texto permitido ou bloquear cópia do enunciado
          if (key === "c" || key === "x") {
            e.preventDefault();
            this.registerInfraction("tentativa_copiar", `Tentativa de atalho Ctrl+${key.toUpperCase()} interceptada.`);
            this.showToast("Cópia de texto bloqueada nesta avaliação.", "warning");
            return false;
          }
        }
      }
    }
  }

  preventAction(e, tipo, mensagem) {
    e.preventDefault();
    this.registerInfraction(tipo, mensagem);
    this.showToast(mensagem, "warning");
    return false;
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.blurStartTime = Date.now();
    } else {
      if (this.blurStartTime) {
        const durationSec = Math.max(1, Math.round((Date.now() - this.blurStartTime) / 1000));
        this.blurStartTime = null;
        this.registerInfraction("troca_aba", `Aluno saiu da aba ou minimizou a página por ${durationSec} segundos.`, durationSec);
        this.showInfractionAlert(`Atenção: Foi registrada uma saída da aba de prova (${durationSec}s fora). Sua professora foi notificada.`);
      }
    }
  }

  handleWindowBlur() {
    if (!this.blurStartTime) {
      this.blurStartTime = Date.now();
    }
  }

  handleWindowFocus() {
    if (this.blurStartTime) {
      const durationSec = Math.max(1, Math.round((Date.now() - this.blurStartTime) / 1000));
      this.blurStartTime = null;
      this.registerInfraction("troca_aba", `Aluno perdeu o foco da janela por ${durationSec} segundos.`, durationSec);
    }
  }

  handleFullscreenChange() {
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
    if (!isFullscreen && this.active && !this.isPaused) {
      this.registerInfraction("saida_tela_cheia", "Aluno saiu do modo de tela cheia obrigatório.");
      this.showFullscreenLockModal();
    }
  }

  async requestFullscreen() {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        await docEl.mozRequestFullScreen();
      }
      const modal = document.getElementById("fullscreen-required-modal");
      if (modal) modal.classList.add("hidden");
      this.isPaused = false;
    } catch (err) {
      console.warn("Fullscreen request error:", err);
    }
  }

  showFullscreenLockModal() {
    this.isPaused = true;
    let modal = document.getElementById("fullscreen-required-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "fullscreen-required-modal";
      modal.className = "fixed inset-0 z-[100000] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4";
      modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center border-2 border-red-500 animate-bounce-short">
          <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ⚠️
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-2">Tela Cheia Obrigatória</h2>
          <p class="text-slate-600 mb-6 text-sm">
            Para garantir a integridade da avaliação, esta prova deve ser realizada exclusivamente em tela cheia. Esta saída foi registrada no seu relatório.
          </p>
          <button id="btn-return-fullscreen" class="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2">
            <span>Retornar à Prova em Tela Cheia</span>
          </button>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById("btn-return-fullscreen").onclick = () => this.requestFullscreen();
    } else {
      modal.classList.remove("hidden");
    }
  }

  createWatermark() {
    if (this.watermarkEl) {
      this.watermarkEl.remove();
    }

    const name = (this.studentData && this.studentData.nome) || "ALUNO";
    const ra = (this.studentData && this.studentData.ra) || "RA: 000.000.000-0/SP";
    const sessionTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    this.watermarkEl = document.createElement("div");
    this.watermarkEl.className = "watermark-overlay";

    let itemsHtml = "";
    for (let i = 0; i < 12; i++) {
      itemsHtml += `
        <div class="watermark-item select-none">
          <span class="text-slate-900 font-extrabold uppercase text-xs">${name}</span>
          <span class="text-slate-700 font-mono text-[11px]">${ra}</span>
          <span class="text-slate-500 text-[10px]">Sessão: ${sessionTime}</span>
        </div>
      `;
    }
    this.watermarkEl.innerHTML = itemsHtml;
    document.body.appendChild(this.watermarkEl);
  }

  registerInfraction(tipo, detalhe, tempoForaSec = 0) {
    if (!this.active) return;

    if (tipo === "troca_aba") {
      this.infractions.totalTrocasAba += 1;
      this.infractions.tempoForaSegundos += tempoForaSec;
    } else if (tipo === "saida_tela_cheia") {
      this.infractions.saidasTelaCheia += 1;
    } else if (tipo.startsWith("tentativa_copiar") || tipo.startsWith("tentativa_colar")) {
      this.infractions.tentativasCopiarColar += 1;
    } else if (tipo === "tentativa_print") {
      this.infractions.tentativasPrint += 1;
    }

    const infractionItem = {
      tipo,
      timestamp: new Date().toISOString(),
      detalhe,
      tempoForaSegundos: tempoForaSec
    };
    this.infractions.historico.push(infractionItem);

    if (this.onInfractionCallback) {
      this.onInfractionCallback(this.infractions, infractionItem);
    }

    // Sincronizar com a API se houver submissaoId
    if (this.submissaoId) {
      fetch(`/api/submissoes/${this.submissaoId}/infracao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          detalhe,
          tempoForaSegundos: tempoForaSec,
          alunoNome: this.studentData?.nome,
          alunoEmail: this.studentData?.email,
          alunoRA: this.studentData?.ra,
          turma: this.activityData?.anoTurma,
          atividadeId: this.activityData?.id
        })
      }).catch(err => console.warn("Erro sincronizando infração:", err));
    }
  }

  showInfractionAlert(mensagem) {
    const toast = document.createElement("div");
    toast.className = "fixed top-5 right-5 z-[999999] bg-red-600 text-white px-5 py-4 rounded-xl shadow-2xl border border-red-400 flex items-start gap-3 max-w-sm animate-slide-in";
    toast.innerHTML = `
      <span class="text-xl">⚠️</span>
      <div>
        <h4 class="font-bold text-sm">Registro de Ocorrência</h4>
        <p class="text-xs text-red-100 mt-1">${mensagem}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-500");
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  showToast(mensagem, tipo = "info") {
    const bg = tipo === "error" ? "bg-red-600" : tipo === "warning" ? "bg-amber-600" : "bg-blue-600";
    const toast = document.createElement("div");
    toast.className = `fixed bottom-5 right-5 z-[999999] ${bg} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-fade-in`;
    toast.innerHTML = `<span>${tipo === "error" ? "🚫" : tipo === "warning" ? "⚠️" : "ℹ️"}</span> <span>${mensagem}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  destroy() {
    this.active = false;
    document.body.classList.remove("secure-locked-mode");

    if (this.watermarkEl) {
      this.watermarkEl.remove();
      this.watermarkEl = null;
    }

    const modal = document.getElementById("fullscreen-required-modal");
    if (modal) modal.remove();

    if (this.handlers.keydown) window.removeEventListener("keydown", this.handlers.keydown, true);
    if (this.handlers.copy) document.removeEventListener("copy", this.handlers.copy, true);
    if (this.handlers.cut) document.removeEventListener("cut", this.handlers.cut, true);
    if (this.handlers.paste) document.removeEventListener("paste", this.handlers.paste, true);
    if (this.handlers.contextmenu) document.removeEventListener("contextmenu", this.handlers.contextmenu, true);
    if (this.handlers.dragstart) document.removeEventListener("dragstart", this.handlers.dragstart, true);
    if (this.handlers.visibilitychange) document.removeEventListener("visibilitychange", this.handlers.visibilitychange);
    if (this.handlers.blur) window.removeEventListener("blur", this.handlers.blur);
    if (this.handlers.focus) window.removeEventListener("focus", this.handlers.focus);
    if (this.handlers.fullscreenchange) {
      document.removeEventListener("fullscreenchange", this.handlers.fullscreenchange);
      document.removeEventListener("webkitfullscreenchange", this.handlers.fullscreenchange);
    }
  }
}

window.securityEngine = new SecurityEngine();
