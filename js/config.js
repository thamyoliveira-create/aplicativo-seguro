/**
 * Configuração Centralizada - Atividade Segura
 * Lê variáveis de ambiente e expõe valores seguros
 */

const Config = {
  // ============================================================
  // FIREBASE
  // ============================================================
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
  },

  // ============================================================
  // GEMINI API
  // ============================================================
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
    model: import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash",
    maxTokens: 4000,
    temperature: 0.7
  },

  // ============================================================
  // SEGURANÇA & SESSION
  // ============================================================
  security: {
    sessionTimeoutMinutes: parseInt(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES || "30"),
    maxLoginAttempts: parseInt(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS || "5"),
    lockoutDurationMinutes: parseInt(import.meta.env.VITE_LOCKOUT_DURATION_MINUTES || "15"),
    enableRateLimit: import.meta.env.VITE_RATE_LIMIT_ENABLED !== "false"
  },

  // ============================================================
  // APLICAÇÃO
  // ============================================================
  app: {
    name: "Atividade Segura",
    version: "1.0.0",
    environment: import.meta.env.MODE || "development",
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    enablePWA: import.meta.env.VITE_ENABLE_PWA !== "false",
    enableOfflineMode: import.meta.env.VITE_OFFLINE_MODE !== "false"
  },

  // ============================================================
  // VALIDAÇÃO
  // ============================================================
  validate() {
    const requiredKeys = [
      this.firebase.apiKey,
      this.firebase.projectId,
      this.gemini.apiKey
    ];

    const missing = requiredKeys.filter(key => !key);
    if (missing.length > 0) {
      console.warn(
        "⚠️ Variáveis de ambiente faltando. Verifique .env e .env.local\n" +
        "Configure os valores em: https://console.firebase.google.com"
      );
    }

    return missing.length === 0;
  },

  // ============================================================
  // UTILITÁRIOS
  // ============================================================
  getFirebaseConfig() {
    return this.firebase;
  },

  getGeminiApiKey() {
    if (!this.gemini.apiKey) {
      throw new Error(
        "Chave Gemini não configurada. Verifique .env.local"
      );
    }
    return this.gemini.apiKey;
  },

  isProduction() {
    return this.app.environment === "production";
  }
};

// Validar na inicialização
if (typeof window !== "undefined") {
  Config.validate();
}

export default Config;
