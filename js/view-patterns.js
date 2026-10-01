/**
 * Padrões e Melhores Práticas - Views Refatoradas
 * Exemplos de como usar o sistema de componentes
 */

// ============================================================
// EXEMPLO 1: Modal de Confirmação Reutilizável
// ============================================================

const ConfirmDialog = {
  /**
   * Abre um modal de confirmação
   * 
   * @param {object} options
   *   - title: string - Título do dialog
   *   - message: string - Mensagem
   *   - onConfirm: function - Callback se confirmado
   *   - onCancel: function - Callback se cancelado
   *   - confirmText: string - Texto do botão (padrão: "Confirmar")
   *   - cancelText: string - Texto do botão (padrão: "Cancelar")
   *   - type: string - 'info', 'warning', 'error', 'success' (padrão: 'info')
   */
  show(options = {}) {
    const {
      title = "Confirmação",
      message = "Deseja continuar?",
      onConfirm = () => {},
      onCancel = () => {},
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      type = "info"
    } = options;

    const modalId = `confirm-${Date.now()}`;
    const icons = { info: "ℹ️", warning: "⚠️", error: "❌", success: "✓" };

    const html = `
      <div id="${modalId}" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-6 text-slate-100">
          <div class="flex items-start">
            <div class="flex-shrink-0 text-3xl mr-3">
              ${icons[type] || icons.info}
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-white">${title}</h2>
              <p class="mt-2 text-slate-300 text-sm leading-relaxed">${message}</p>
            </div>
          </div>

          <div class="flex justify-end gap-2.5 mt-6">
            <button
              class="px-4 py-2 rounded-xl font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-sm transition-all"
              onclick="
                document.getElementById('${modalId}').remove();
                ${onCancel.toString().includes("=>") ? onCancel.toString() : "(" + onCancel.toString() + ")()"}
              "
            >
              ${cancelText}
            </button>
            <button
              class="px-4 py-2 rounded-xl font-semibold bg-brand-600 text-white hover:bg-brand-500 text-sm transition-all shadow-glow-blue"
              onclick="
                document.getElementById('${modalId}').remove();
                ${onConfirm.toString().includes("=>") ? onConfirm.toString() : "(" + onConfirm.toString() + ")()"}
              "
            >
              ${confirmText}
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);
  }
};

// ============================================================
// EXEMPLO 2: Formulário Genérico Reutilizável
// ============================================================

const FormBuilder = {
  /**
   * Constrói um formulário dinamicamente
   */
  build(fields = [], options = {}) {
    const {
      title = "Formulário",
      submitText = "Enviar",
      onSubmit = () => {},
      validationRules = {}
    } = options;

    return `
      <form class="space-y-4 text-slate-100" onsubmit="event.preventDefault(); FormBuilder.handleSubmit(event, ${JSON.stringify(validationRules)})">
        <h2 class="text-2xl font-bold text-white">${title}</h2>

        ${fields.map((field, idx) => {
          const errors = validationRules[field.name] || [];

          if (field.type === "text" || field.type === "email" || field.type === "password") {
            return `
              <div class="mb-4">
                <label class="block text-sm font-medium text-slate-300 mb-2">${field.label}</label>
                <input
                  type="${field.type}"
                  name="${field.name}"
                  placeholder="${field.placeholder || ""}"
                  class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-slate-600 transition-all"
                  ${field.required ? "required" : ""}
                  ${field.maxLength ? `maxlength="${field.maxLength}"` : ""}
                />
                ${field.hint ? `<p class="text-xs text-slate-400 mt-1">${field.hint}</p>` : ""}
              </div>
            `;
          } else if (field.type === "select") {
            return `
              <div class="mb-4">
                <label class="block text-sm font-medium text-slate-300 mb-2">${field.label}</label>
                <select
                  name="${field.name}"
                  class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  ${field.required ? "required" : ""}
                >
                  <option value="">Selecione...</option>
                  ${field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join("")}
                </select>
              </div>
            `;
          } else if (field.type === "textarea") {
            return `
              <div class="mb-4">
                <label class="block text-sm font-medium text-slate-300 mb-2">${field.label}</label>
                <textarea
                  name="${field.name}"
                  placeholder="${field.placeholder || ""}"
                  class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none placeholder:text-slate-600 transition-all"
                  rows="4"
                  ${field.required ? "required" : ""}
                ></textarea>
              </div>
            `;
          }

          return "";
        }).join("")}

        <button
          type="submit"
          class="w-full px-4 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow-blue transition-all"
        >
          ${submitText}
        </button>
      </form>
    `;
  },

  handleSubmit(event, rules) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    for (const [field, fieldRules] of Object.entries(rules)) {
      if (fieldRules.required && !data[field]) {
        alert(`O campo ${field} é obrigatório`);
        return false;
      }
      
      if (fieldRules.minLength && data[field].length < fieldRules.minLength) {
        alert(`O campo ${field} deve ter no mínimo ${fieldRules.minLength} caracteres`);
        return false;
      }
      
      if (fieldRules.email && !data[field].includes("@")) {
        alert(`O campo ${field} deve ser um email válido`);
        return false;
      }
    }
    
    return true;
  }
};

// ============================================================
// EXEMPLO 3: Listagem com Paginação
// ============================================================

const PaginatedList = {
  state: {
    items: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },

  /**
   * Inicializa a listagem
   */
  init(items = [], pageSize = 10) {
    this.state.items = items;
    this.state.pageSize = pageSize;
    this.state.totalItems = items.length;
    this.state.currentPage = 1;
  },

  /**
   * Retorna itens da página atual
   */
  getCurrentPageItems() {
    const start = (this.state.currentPage - 1) * this.state.pageSize;
    const end = start + this.state.pageSize;
    return this.state.items.slice(start, end);
  },

  /**
   * Retorna total de páginas
   */
  getTotalPages() {
    return Math.ceil(this.state.totalItems / this.state.pageSize);
  },

  /**
   * Renderiza a paginação
   */
  renderPagination() {
    const totalPages = this.getTotalPages();
    const current = this.state.currentPage;

    let html = `<div class="flex justify-center gap-2 mt-4">`;

    if (current > 1) {
      html += `
        <button class="px-3 py-2 border rounded hover:bg-slate-100" onclick="PaginatedList.goToPage(${current - 1})">
          Anterior
        </button>
      `;
    }

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === current;
      html += `
        <button 
          class="px-3 py-2 border rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"}"
          onclick="PaginatedList.goToPage(${i})"
        >
          ${i}
        </button>
      `;
    }

    if (current < totalPages) {
      html += `
        <button class="px-3 py-2 border rounded hover:bg-slate-100" onclick="PaginatedList.goToPage(${current + 1})">
          Próxima
        </button>
      `;
    }

    html += `</div>`;
    return html;
  },

  /**
   * Navega para uma página
   */
  goToPage(pageNumber) {
    const totalPages = this.getTotalPages();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.state.currentPage = pageNumber;
      this.render();
    }
  },

  /**
   * Renderiza a lista
   */
  render(containerId = "list-container") {
    const items = this.getCurrentPageItems();
    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
      <div class="space-y-2">
        ${items.map((item, idx) => `
          <div class="p-4 border rounded-lg hover:bg-slate-50">
            ${typeof item === "string" ? item : JSON.stringify(item)}
          </div>
        `).join("")}
      </div>
      ${this.renderPagination()}
    `;

    container.innerHTML = html;
  }
};

// ============================================================
// EXEMPLO 4: Padrão Observer para Reatividade
// ============================================================

const StateManager = {
  store: {},
  subscribers: {},

  /**
   * Define um valor no estado
   */
  setState(key, value) {
    this.store[key] = value;
    this.notifySubscribers(key, value);
  },

  /**
   * Obtém um valor do estado
   */
  getState(key) {
    return this.store[key];
  },

  /**
   * Subscribe a mudanças de um estado
   */
  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
  },

  /**
   * Notifica subscribers sobre mudanças
   */
  notifySubscribers(key, value) {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach(callback => callback(value));
    }
  }
};

// Exemplo de uso:
// StateManager.subscribe("userCount", (count) => {
//   document.getElementById("user-count").textContent = count;
// });
// StateManager.setState("userCount", 42);

export { ConfirmDialog, FormBuilder, PaginatedList, StateManager };
