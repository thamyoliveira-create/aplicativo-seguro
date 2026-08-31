/**
 * Biblioteca de Componentes Reutilizáveis - Atividade Segura
 * Componentes UI comuns para evitar duplicação de código
 */

const Components = {
  // ============================================================
  // BOTÕES
  // ============================================================

  Button({
    text = "",
    variant = "primary", // primary, secondary, danger, success, ghost
    size = "md", // sm, md, lg
    disabled = false,
    onClick = null,
    className = "",
    icon = null,
    loading = false,
    type = "button"
  } = {}) {
    const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
      ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    const loadingClass = loading ? "opacity-75 pointer-events-none" : "";

    return `
      <button 
        type="${type}"
        class="${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClass} ${loadingClass} ${className}"
        ${disabled ? "disabled" : ""}
        ${onClick ? `onclick="${onClick}"` : ""}
      >
        ${loading ? `<span class="inline-block animate-spin mr-2">⟳</span>` : ""}
        ${icon ? `<span class="mr-2">${icon}</span>` : ""}
        ${text}
      </button>
    `;
  },

  // ============================================================
  // INPUTS & FORMULÁRIOS
  // ============================================================

  Input({
    type = "text",
    name = "",
    placeholder = "",
    value = "",
    required = false,
    disabled = false,
    maxLength = null,
    pattern = null,
    error = null,
    label = null,
    hint = null,
    className = ""
  } = {}) {
    const baseClasses = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
    const errorClass = error ? "border-red-500 focus:ring-red-500" : "border-slate-300";
    
    return `
      ${label ? `<label class="block text-sm font-medium text-slate-700 mb-2">${label}</label>` : ""}
      <input
        type="${type}"
        name="${name}"
        placeholder="${placeholder}"
        value="${value}"
        class="${baseClasses} ${errorClass} ${className}"
        ${required ? "required" : ""}
        ${disabled ? "disabled" : ""}
        ${maxLength ? `maxlength="${maxLength}"` : ""}
        ${pattern ? `pattern="${pattern}"` : ""}
      />
      ${error ? `<p class="text-sm text-red-600 mt-1">${error}</p>` : ""}
      ${hint ? `<p class="text-sm text-slate-500 mt-1">${hint}</p>` : ""}
    `;
  },

  Select({
    name = "",
    options = [],
    value = "",
    required = false,
    disabled = false,
    label = null,
    error = null,
    className = ""
  } = {}) {
    const baseClasses = "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClass = error ? "border-red-500" : "";
    
    return `
      ${label ? `<label class="block text-sm font-medium text-slate-700 mb-2">${label}</label>` : ""}
      <select 
        name="${name}"
        class="${baseClasses} ${errorClass} ${className}"
        ${required ? "required" : ""}
        ${disabled ? "disabled" : ""}
      >
        <option value="">Selecione uma opção</option>
        ${options.map(opt => `<option value="${opt.value}" ${opt.value === value ? "selected" : ""}>${opt.label}</option>`).join("")}
      </select>
      ${error ? `<p class="text-sm text-red-600 mt-1">${error}</p>` : ""}
    `;
  },

  // ============================================================
  // ALERTAS & NOTIFICAÇÕES
  // ============================================================

  Alert({
    type = "info", // info, success, warning, error
    title = "",
    message = "",
    dismissible = true,
    icon = null,
    className = ""
  } = {}) {
    const variants = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      success: "bg-emerald-50 border-emerald-200 text-emerald-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
      error: "bg-red-50 border-red-200 text-red-800"
    };

    const icons = {
      info: "ℹ️",
      success: "✓",
      warning: "⚠️",
      error: "✕"
    };

    return `
      <div class="border-l-4 ${variants[type]} p-4 rounded-md ${className}" role="alert">
        <div class="flex">
          <div class="flex-shrink-0 text-xl mr-3">
            ${icon || icons[type]}
          </div>
          <div class="flex-1">
            ${title ? `<h3 class="font-semibold mb-1">${title}</h3>` : ""}
            <p>${message}</p>
          </div>
          ${dismissible ? `
            <button 
              type="button" 
              class="ml-4 text-lg opacity-70 hover:opacity-100"
              onclick="this.parentElement.parentElement.remove()"
            >
              ✕
            </button>
          ` : ""}
        </div>
      </div>
    `;
  },

  Toast({
    message = "",
    type = "info", // info, success, warning, error
    duration = 3000,
    position = "top-right" // top-right, top-left, bottom-right, bottom-left
  } = {}) {
    const positions = {
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4"
    };

    const variants = {
      info: "bg-blue-600",
      success: "bg-emerald-600",
      warning: "bg-amber-600",
      error: "bg-red-600"
    };

    const toastId = `toast-${Date.now()}`;
    
    return `
      <div 
        id="${toastId}"
        class="fixed ${positions[position]} ${variants[type]} text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in z-50"
      >
        ${message}
      </div>
      <script>
        setTimeout(() => {
          document.getElementById("${toastId}").remove();
        }, ${duration});
      </script>
    `;
  },

  // ============================================================
  // MODALS & DIALOGS
  // ============================================================

  Modal({
    id = "",
    title = "",
    content = "",
    buttons = [], // [{text, variant, onClick}, ...]
    size = "md", // sm, md, lg, xl
    closable = true
  } = {}) {
    const sizes = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl"
    };

    return `
      <div id="${id}" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-xl ${sizes[size]} p-6 max-h-96 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-slate-900">${title}</h2>
            ${closable ? `
              <button 
                class="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                onclick="document.getElementById('${id}').classList.add('hidden')"
              >
                ✕
              </button>
            ` : ""}
          </div>
          
          <div class="mb-6 text-slate-700">
            ${content}
          </div>
          
          <div class="flex justify-end gap-2">
            ${buttons.map(btn => `
              <button 
                type="button"
                class="px-4 py-2 rounded-lg font-semibold transition-colors
                  ${btn.variant === "danger" ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}
                "
                onclick="${btn.onClick}"
              >
                ${btn.text}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  },

  // ============================================================
  // CARDS & CONTAINERS
  // ============================================================

  Card({
    title = "",
    content = "",
    footer = null,
    className = "",
    padding = "md"
  } = {}) {
    const paddings = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6"
    };

    return `
      <div class="bg-white rounded-lg border border-slate-200 shadow-sm ${paddings[padding]} ${className}">
        ${title ? `<h3 class="text-lg font-semibold text-slate-900 mb-3">${title}</h3>` : ""}
        <div class="text-slate-700">
          ${content}
        </div>
        ${footer ? `<div class="mt-4 pt-4 border-t border-slate-200">${footer}</div>` : ""}
      </div>
    `;
  },

  Skeleton({
    count = 1,
    height = "h-4",
    width = "w-full",
    className = ""
  } = {}) {
    const skeletons = Array(count).fill(0).map(() => `
      <div class="${height} ${width} bg-slate-200 rounded animate-pulse mb-2"></div>
    `).join("");

    return `<div class="${className}">${skeletons}</div>`;
  },

  // ============================================================
  // BADGES & LABELS
  // ============================================================

  Badge({
    text = "",
    variant = "blue", // blue, red, green, yellow, purple
    size = "md"
  } = {}) {
    const variants = {
      blue: "bg-blue-100 text-blue-800",
      red: "bg-red-100 text-red-800",
      green: "bg-emerald-100 text-emerald-800",
      yellow: "bg-amber-100 text-amber-800",
      purple: "bg-purple-100 text-purple-800"
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    };

    return `<span class="${variants[variant]} ${sizes[size]} rounded-full font-semibold">${text}</span>`;
  },

  // ============================================================
  // LOADERS & SPINNERS
  // ============================================================

  Spinner({
    size = "md", // sm, md, lg
    color = "blue"
  } = {}) {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12"
    };

    const colors = {
      blue: "text-blue-600",
      slate: "text-slate-400",
      white: "text-white"
    };

    return `
      <svg class="animate-spin ${sizes[size]} ${colors[color]}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
  },

  // ============================================================
  // TABELA
  // ============================================================

  Table({
    headers = [],
    rows = [],
    striped = true,
    hoverable = true
  } = {}) {
    const stripedClass = striped ? "odd:bg-slate-50" : "";
    const hoverClass = hoverable ? "hover:bg-slate-100" : "";

    return `
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-100 border-b border-slate-300">
            <tr>
              ${headers.map(h => `<th class="px-4 py-2 font-semibold text-slate-900">${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, idx) => `
              <tr class="border-b border-slate-200 ${stripedClass} ${hoverClass}">
                ${row.map(cell => `<td class="px-4 py-3">${cell}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  // ============================================================
  // UTILITÁRIOS
  // ============================================================

  /**
   * Renderiza um componente no DOM
   */
  render(html, container) {
    if (typeof container === "string") {
      container = document.querySelector(container);
    }
    if (container) {
      container.innerHTML = html;
    }
  },

  /**
   * Renderiza um componente e o adiciona ao final do container
   */
  append(html, container) {
    if (typeof container === "string") {
      container = document.querySelector(container);
    }
    if (container) {
      container.insertAdjacentHTML("beforeend", html);
    }
  }
};

// Exportar para uso em módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = Components;
}
