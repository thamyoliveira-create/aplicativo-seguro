/**
 * Utilitários de Segurança e Validação - Atividade Segura
 * Sanitização, validação e proteção contra XSS
 */

const SecurityUtils = {
  // ============================================================
  // SANITIZAÇÃO (Prevenção de XSS)
  // ============================================================
  
  /**
   * Remove tags HTML perigosas
   */
  sanitizeHTML(html, allowedTags = ["b", "i", "u", "strong", "em"]) {
    if (!html || typeof html !== "string") return "";
    
    const tempDiv = document.createElement("div");
    tempDiv.textContent = html;
    return tempDiv.innerHTML;
  },

  /**
   * Escapa caracteres HTML especiais
   */
  escapeHTML(text) {
    if (!text || typeof text !== "string") return "";
    
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    };
    
    return text.replace(/[&<>"'\/]/g, (char) => map[char]);
  },

  /**
   * Remove scripts e eventos perigosos
   */
  stripDangerousCode(text) {
    if (!text || typeof text !== "string") return "";
    
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
      .replace(/on\w+\s*=\s*[^\s>]*/gi, "");
  },

  // ============================================================
  // VALIDAÇÃO
  // ============================================================

  /**
   * Valida email com regex seguro
   */
  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  },

  /**
   * Valida domínio SEDUC-SP
   */
  isValidSedUCEmail(email) {
    if (!this.isValidEmail(email)) return false;
    const domain = email.toLowerCase().split("@")[1];
    return domain === "professor.educacao.sp.gov.br" || 
           domain === "aluno.educacao.sp.gov.br";
  },

  /**
   * Valida código de acesso (4-32 caracteres, alfanuméricos e hífen)
   */
  isValidAccessCode(code) {
    if (!code || typeof code !== "string") return false;
    return /^[A-Z0-9\-]{4,32}$/.test(code.trim().toUpperCase());
  },

  /**
   * Valida senha (mínimo 8 caracteres, letras e números)
   */
  isValidPassword(password) {
    if (!password || typeof password !== "string") return false;
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  },

  /**
   * Valida nome (sem caracteres especiais perigosos)
   */
  isValidDisplayName(name) {
    if (!name || typeof name !== "string") return false;
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 100 && 
           !/[<>\"'&;]/.test(trimmed);
  },

  /**
   * Valida URL (whitelist de protocolos)
   */
  isValidUrl(url, allowedProtocols = ["http", "https", "blob", "data"]) {
    try {
      const parsed = new URL(url);
      return allowedProtocols.includes(parsed.protocol.replace(":", ""));
    } catch {
      return false;
    }
  },

  // ============================================================
  // LIMPEZA DE DADOS
  // ============================================================

  /**
   * Normaliza e limpa email
   */
  normalizeEmail(email) {
    if (!email || typeof email !== "string") return "";
    return email.trim().toLowerCase();
  },

  /**
   * Limpa string de espaços extras e caracteres de controle
   */
  cleanString(str, maxLength = 500) {
    if (!str || typeof str !== "string") return "";
    return str
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .slice(0, maxLength);
  },

  /**
   * Remove espaços em branco e normaliza quebras de linha
   */
  normalizeText(text) {
    if (!text || typeof text !== "string") return "";
    return text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .trim();
  },

  // ============================================================
  // PROTEÇÃO DE DADOS SENSÍVEIS
  // ============================================================

  /**
   * Mascara informação sensível (email, telefone, etc)
   */
  maskSensitiveData(data, visibleChars = 3) {
    if (!data || typeof data !== "string") return "";
    
    if (data.includes("@")) {
      const [local, domain] = data.split("@");
      const masked = local.slice(0, visibleChars) + "*".repeat(Math.max(1, local.length - visibleChars));
      return `${masked}@${domain}`;
    }
    
    return data.slice(0, visibleChars) + "*".repeat(Math.max(1, data.length - visibleChars));
  },

  /**
   * Remove dados sensíveis de objetos (senhas, tokens, etc)
   */
  stripSensitiveFields(obj, sensitiveKeys = ["senha", "password", "token", "secret", "apiKey"]) {
    if (!obj || typeof obj !== "object") return obj;
    
    const cleaned = { ...obj };
    sensitiveKeys.forEach(key => {
      if (key in cleaned) delete cleaned[key];
    });
    
    return cleaned;
  },

  // ============================================================
  // VERIFICAÇÃO DE SEGURANÇA
  // ============================================================

  /**
   * Verifica se a requisição é de mesma origem (CSRF protection)
   */
  isSameOrigin(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      return urlObj.origin === window.location.origin;
    } catch {
      return false;
    }
  },

  /**
   * Gera token CSRF simples
   */
  generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  },

  /**
   * Hash simples para verificação de integridade
   */
  async hashData(data) {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(JSON.stringify(data));
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }
};

export default SecurityUtils;
