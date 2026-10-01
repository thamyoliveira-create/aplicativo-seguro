/**
 * Biblioteca de Componentes Reutilizáveis - Atividade Segura
 * Componentes UI comuns com suporte completo e contrastado a Dark Mode
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
    const baseClasses = "font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 inline-flex items-center justify-center";

    const variants = {
      primary: "bg-brand-600 text-white hover:bg-brand-500 focus:ring-brand-500 shadow-glow-blue",
      secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 focus:ring-slate-500",
      danger: "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500 shadow-lg shadow-rose-950/50",
      success: "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500 shadow-glow-emerald",
      ghost: "text-brand-400 hover:bg-slate-800 hover:text-brand-300 focus:ring-brand-500"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
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
    const baseClasses = "w-full px-4 py-2.5 bg-slate-900 border text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-sans text-sm";
    const errorClass = error ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-700";

    return `
      ${label ? `<label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">${label}</label>` : ""}
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
      ${error ? `<p class="text-xs text-rose-400 mt-1.5 font-medium">${error}</p>` : ""}
      ${hint ? `<p class="text-xs text-slate-400 mt-1.5">${hint}</p>` : ""}
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
    const baseClasses = "w-full px-4 py-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-sans text-sm";
    const errorClass = error ? "border-rose-500" : "";

    return `
      ${label ? `<label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">${label}</label>` : ""}
      <select
        name="${name}"
        class="${baseClasses} ${errorClass} ${className}"
        ${required ? "required" : ""}
        ${disabled ? "disabled" : ""}
      >
        <option value="" class="bg-slate-900 text-slate-400">Selecione uma opção</option>
        ${options.map(opt => `<option value="${opt.value}" class="bg-slate-900 text-slate-100" ${opt.value === value ? "selected" : ""}>${opt.label}</option>`).join("")}
      </select>
      ${error ? `<p class="text-xs text-rose-400 mt-1.5 font-medium">${error}</p>` : ""}
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
      info: "bg-blue-950/60 border-blue-500/50 text-blue-200",
      success: "bg-emerald-950/60 border-emerald-500/50 text-emerald-200",
      warning: "bg-amber-950/60 border-amber-500/50 text-amber-200",
      error: "bg-rose-950/60 border-rose-500/50 text-rose-200"
    };

    const icons = {
      info: "ℹ️",
      success: "✓",
      warning: "⚠️",
      error: "✕"
    };

    return `
      <div class="border-l-4 ${variants[type]} p-4 rounded-xl border-y border-r border-slate-800 ${className}" role="alert">
        <div class="flex">
          <div class="flex-shrink-0 text-xl mr-3">
            ${icon || icons[type]}
          </div>
          <div class="flex-1">
            ${title ? `<h3 class="font-bold text-sm mb-1">${title}</h3>` : ""}
            <p class="text-xs leading-relaxed opacity-90">${message}</p>
          </div>
          ${dismissible ? `
            <button
              type="button"
              class="ml-4 text-base opacity-60 hover:opacity-100 transition-opacity"
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
      info: "bg-brand-600 shadow-glow-blue",
      success: "bg-emerald-600 shadow-glow-emerald",
      warning: "bg-amber-600 shadow-lg shadow-amber-950/50",
      error: "bg-rose-600 shadow-lg shadow-rose-950/50"
    };

    const toastId = `toast-${Date.now()}`;

    return `
      <div
        id="${toastId}"
        class="fixed ${positions[position]} ${variants[type]} text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 animate-fade-in z-50 text-sm font-semibold"
      >
        ${message}
      </div>
      <script>
        setTimeout(() => {
          const el = document.getElementById("${toastId}");
          if (el) el.remove();
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
      <div id="${id}" class="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 hidden p-4">
        <div class="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl ${sizes[size]} w-full p-6 max-h-[90vh] overflow-y-auto text-slate-100">
          <div class="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <h2 class="text-lg font-bold text-white">${title}</h2>
            ${closable ? `
              <button
                class="text-slate-400 hover:text-white text-xl leading-none transition-colors p-1"
                onclick="document.getElementById('${id}').classList.add('hidden')"
              >
                ✕
              </button>
            ` : ""}
          </div>

          <div class="mb-6 text-slate-300 text-sm leading-relaxed">
            ${content}
          </div>

          <div class="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
            ${buttons.map(btn => `
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-sm font-bold transition-all
                  ${btn.variant === "danger"
                    ? "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-950/40"
                    : "bg-brand-600 text-white hover:bg-brand-500 shadow-glow-blue"}
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
      sm: "p-3.5",
      md: "p-5",
      lg: "p-7"
    };

    return `
      <div class="glass-card rounded-2xl border border-slate-700/80 ${paddings[padding]} ${className}">
        ${title ? `<h3 class="text-base font-bold text-white mb-3">${title}</h3>` : ""}
        <div class="text-slate-300 text-sm leading-relaxed">
          ${content}
        </div>
        ${footer ? `<div class="mt-4 pt-4 border-t border-slate-800">${footer}</div>` : ""}
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
      <div class="${height} ${width} bg-slate-800/80 rounded-xl animate-pulse mb-2.5"></div>
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
      blue: "bg-blue-950 text-blue-300 border border-blue-500/40",
      red: "bg-rose-950 text-rose-300 border border-rose-500/40",
      green: "bg-emerald-950 text-emerald-300 border border-emerald-500/40",
      yellow: "bg-amber-950 text-amber-300 border border-amber-500/40",
      purple: "bg-purple-950 text-purple-300 border border-purple-500/40"
    };

    const sizes = {
      sm: "px-2.5 py-0.5 text-[10px]",
      md: "px-3 py-1 text-xs",
      lg: "px-4 py-1.5 text-sm"
    };

    return `<span class="${variants[variant]} ${sizes[size]} rounded-full font-bold inline-flex items-center gap-1">${text}</span>`;
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
      blue: "text-brand-500",
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
    const stripedClass = striped ? "odd:bg-slate-900/40 even:bg-slate-900/80" : "";
    const hoverClass = hoverable ? "hover:bg-slate-800/60" : "";

    return `
      <div class="overflow-x-auto rounded-2xl border border-slate-800">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-900 border-b border-slate-800">
            <tr>
              ${headers.map(h => `<th class="px-4 py-3 font-bold text-xs uppercase tracking-wider text-slate-300">${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs md:text-sm text-slate-300">
            ${rows.map(row => `
              <tr class="${stripedClass} ${hoverClass} transition-colors">
                ${row.map(cell => `<td class="px-4 py-3.5">${cell}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
};

window.Components = Components;
