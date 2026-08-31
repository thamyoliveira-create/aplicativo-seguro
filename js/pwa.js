/**
 * PWA Helper - Atividade Segura
 * Inicializa e gerencia o Progressive Web App
 */

const PWAHelper = {
  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================

  async init() {
    console.log("Initializing PWA...");

    // 1. Registrar Service Worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js",
          { scope: "/" }
        );
        console.log("Service Worker registered", registration);
        this.registration = registration;

        // Monitora atualizações
        registration.addEventListener("updatefound", () => {
          this.handleUpdateFound(registration);
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }

    // 2. Verificar suporte offline
    this.isOnline = navigator.onLine;
    window.addEventListener("online", () => this.handleOnline());
    window.addEventListener("offline", () => this.handleOffline());

    // 3. Verificar prompt de instalação
    window.addEventListener("beforeinstallprompt", (e) => {
      this.deferredPrompt = e;
      this.showInstallPrompt();
    });

    // 4. Sincronização em background
    if ("sync" in registration) {
      this.setupBackgroundSync();
    }

    // 5. Notificações push
    if ("Notification" in window) {
      this.requestNotificationPermission();
    }

    console.log("PWA initialized");
  },

  // ============================================================
  // SERVICE WORKER UPDATES
  // ============================================================

  handleUpdateFound(registration) {
    const newWorker = registration.installing;

    newWorker.addEventListener("statechange", () => {
      if (
        newWorker.state === "installed" &&
        navigator.serviceWorker.controller
      ) {
        // Nova versão disponível
        this.showUpdatePrompt();
      }
    });
  },

  showUpdatePrompt() {
    const message = "Nova versão disponível! Deseja atualizar?";
    const confirmed = confirm(message);

    if (confirmed) {
      if (this.registration.waiting) {
        this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      }
    }
  },

  // ============================================================
  // INSTALAÇÃO
  // ============================================================

  showInstallPrompt() {
    // Mostrar banner de instalação (personalizar conforme UI)
    const banner = this.createInstallBanner();
    document.body.insertAdjacentHTML("afterbegin", banner);
  },

  createInstallBanner() {
    return `
      <div id="pwa-install-banner" class="bg-blue-600 text-white p-4 rounded-lg mb-4 fixed bottom-4 right-4 max-w-sm shadow-lg z-40">
        <h3 class="font-bold mb-2">Instalar Atividade Segura</h3>
        <p class="text-sm mb-3">Instale nosso aplicativo para acesso rápido e funcionalidades offline.</p>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 bg-white text-blue-600 rounded font-semibold hover:bg-blue-50"
            onclick="PWAHelper.installApp()"
          >
            Instalar
          </button>
          <button 
            class="px-4 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800"
            onclick="document.getElementById('pwa-install-banner').remove()"
          >
            Depois
          </button>
        </div>
      </div>
    `;
  },

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log("User response:", outcome);

      this.deferredPrompt = null;
      document.getElementById("pwa-install-banner")?.remove();
    }
  },

  // ============================================================
  // STATUS OFFLINE/ONLINE
  // ============================================================

  handleOnline() {
    console.log("App is online");
    this.isOnline = true;

    // Mostrar notificação
    this.showNotification("Conectado", "Você está online novamente.");

    // Sincronizar dados pendentes
    this.syncPendingData();

    // Notificar views
    document.dispatchEvent(new Event("app-online"));
  },

  handleOffline() {
    console.log("App is offline");
    this.isOnline = false;

    // Mostrar notificação
    this.showNotification(
      "Offline",
      "Você está sem conexão. O app funcionará com dados em cache."
    );

    // Notificar views
    document.dispatchEvent(new Event("app-offline"));
  },

  // ============================================================
  // SINCRONIZAÇÃO DE DADOS
  // ============================================================

  setupBackgroundSync() {
    // Sincronizar submissões
    this.registration.sync.register("sync-submissions").catch((err) => {
      console.warn("Background sync unavailable:", err);
    });

    // Sincronizar infrações
    this.registration.sync.register("sync-infractions").catch((err) => {
      console.warn("Background sync unavailable:", err);
    });
  },

  async syncPendingData() {
    try {
      // Sincronizar submissões locais
      if ("indexedDB" in window) {
        const db = await this.openIndexedDB();
        // ... implementar sincronização
      }
    } catch (error) {
      console.error("Sync error:", error);
    }
  },

  // ============================================================
  // NOTIFICAÇÕES PUSH
  // ============================================================

  async requestNotificationPermission() {
    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  },

  async subscribeToNotifications() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          "YOUR_PUBLIC_VAPID_KEY"
        )
      });

      console.log("Subscribed to notifications:", subscription);
      return subscription;
    } catch (error) {
      console.error("Push subscription error:", error);
    }
  },

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  showNotification(title, options = {}) {
    if ("Notification" in window && Notification.permission === "granted") {
      const reg = navigator.serviceWorker.controller;
      if (reg) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            icon: "/icons/icon-192x192.png",
            badge: "/icons/badge-72x72.png",
            ...options
          });
        });
      }
    }
  },

  // ============================================================
  // ARMAZENAMENTO LOCAL (IndexedDB)
  // ============================================================

  async openIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("AtividadeSegura", 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Object stores
        if (!db.objectStoreNames.contains("submissions")) {
          db.createObjectStore("submissions", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("infractions")) {
          db.createObjectStore("infractions", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("activities")) {
          db.createObjectStore("activities", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache", { keyPath: "url" });
        }
      };
    });
  },

  async saveToIndexedDB(storeName, data) {
    try {
      const db = await this.openIndexedDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      return new Promise((resolve, reject) => {
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB save error:", error);
    }
  },

  async getFromIndexedDB(storeName, key = null) {
    try {
      const db = await this.openIndexedDB();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = key ? store.get(key) : store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB get error:", error);
    }
  },

  async clearIndexedDB(storeName) {
    try {
      const db = await this.openIndexedDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB clear error:", error);
    }
  },

  // ============================================================
  // UTILIDADES
  // ============================================================

  /**
   * Força atualização do Service Worker
   */
  checkForUpdates() {
    if (this.registration) {
      this.registration.update();
    }
  },

  /**
   * Limpa todos os caches
   */
  async clearAllCaches() {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
      console.log("All caches cleared");
    } catch (error) {
      console.error("Cache clear error:", error);
    }
  },

  /**
   * Retorna informações sobre o PWA
   */
  getInfo() {
    return {
      isInstalled: window.matchMedia("(display-mode: standalone)").matches,
      isOnline: this.isOnline,
      hasServiceWorker: !!this.registration,
      cacheSupport: "caches" in window,
      indexedDBSupport: "indexedDB" in window,
      notificationSupport: "Notification" in window,
      syncSupport: "sync" in this.registration ?? false
    };
  }
};

// Inicializar PWA quando o documento estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => PWAHelper.init());
} else {
  PWAHelper.init();
}

export default PWAHelper;
