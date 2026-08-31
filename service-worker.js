/**
 * Service Worker - Atividade Segura
 * Implementa cache inteligente e suporte offline
 */

const CACHE_VERSION = "v1.0.0";
const CACHE_NAMES = {
  STATIC: `atividade-segura-static-${CACHE_VERSION}`,
  DYNAMIC: `atividade-segura-dynamic-${CACHE_VERSION}`,
  API: `atividade-segura-api-${CACHE_VERSION}`
};

// Assets estáticos para cache no install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/js/auth.js",
  "/js/db.js",
  "/js/ai-service.js",
  "/js/security.js",
  "/js/security-utils.js",
  "/js/components.js",
  "/js/config.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// ============================================================
// INSTALL EVENT
// ============================================================

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  
  event.waitUntil(
    caches.open(CACHE_NAMES.STATIC).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(STATIC_ASSETS.map(url => {
        // Ignora erros de assets que não existem
        return fetch(url).then(res => {
          if (res.ok) return cache.put(url, res);
          console.warn(`Failed to cache: ${url}`);
        }).catch(() => console.warn(`Could not fetch: ${url}`));
      }));
    }).catch((err) => {
      console.error("Error during static asset caching:", err);
    })
  );
  
  // Force activate immediately
  self.skipWaiting();
});

// ============================================================
// ACTIVATE EVENT
// ============================================================

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old cache versions
          if (
            !cacheName.includes(CACHE_VERSION) &&
            cacheName.startsWith("atividade-segura-")
          ) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Claim all clients immediately
  self.clients.claim();
});

// ============================================================
// FETCH EVENT
// ============================================================

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET
  if (request.method !== "GET") {
    return;
  }

  // Ignora requisições fora do escopo
  if (url.origin !== self.location.origin) {
    return;
  }

  // APIs - Network first, fallback to cache
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Assets estáticos - Cache first
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/i)
  ) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // HTML - Stale while revalidate
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }

  // Default - Network first
  event.respondWith(networkFirstStrategy(request));
});

// ============================================================
// ESTRATÉGIAS DE CACHE
// ============================================================

/**
 * Cache First Strategy
 * Procura no cache primeiro, se não encontrar, vai para rede
 */
async function cacheFirstStrategy(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.DYNAMIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("Cache first error:", error);
    return caches.match("/index.html") || new Response("Offline");
  }
}

/**
 * Network First Strategy
 * Tenta rede primeiro, fallback para cache
 */
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.API);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.warn("Network error, using cache:", error);
    const cached = await caches.match(request);
    
    if (cached) {
      return cached;
    }

    // Fallback offline response
    if (request.headers.get("accept")?.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Você está offline. Alguns dados podem estar desatualizados.",
          offline: true
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return caches.match("/index.html") || new Response("Offline");
  }
}

/**
 * Stale While Revalidate Strategy
 * Retorna cache imediatamente, revalida em background
 */
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAMES.DYNAMIC);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
}

// ============================================================
// SINCRONIZAÇÃO EM BACKGROUND
// ============================================================

self.addEventListener("sync", (event) => {
  console.log("Background sync event:", event.tag);

  if (event.tag === "sync-submissions") {
    event.waitUntil(syncSubmissions());
  }

  if (event.tag === "sync-infractions") {
    event.waitUntil(syncInfractions());
  }
});

/**
 * Sincroniza submissões pendentes
 */
async function syncSubmissions() {
  try {
    const db = await openIndexedDB();
    const submissions = await getFromIndexedDB("submissions");

    for (const submission of submissions) {
      if (!submission.synced) {
        const response = await fetch("/api/submissoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission)
        });

        if (response.ok) {
          await updateIndexedDB("submissions", {
            ...submission,
            synced: true
          });
        }
      }
    }

    console.log("Submissions synced");
  } catch (error) {
    console.error("Sync submissions error:", error);
    throw error; // Retry
  }
}

/**
 * Sincroniza infrações pendentes
 */
async function syncInfractions() {
  try {
    const db = await openIndexedDB();
    const infractions = await getFromIndexedDB("infractions");

    for (const infraction of infractions) {
      if (!infraction.synced) {
        const response = await fetch("/api/infracoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(infraction)
        });

        if (response.ok) {
          await updateIndexedDB("infractions", {
            ...infraction,
            synced: true
          });
        }
      }
    }

    console.log("Infractions synced");
  } catch (error) {
    console.error("Sync infractions error:", error);
    throw error;
  }
}

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================

self.addEventListener("push", (event) => {
  const options = {
    body: event.data?.text() || "Nova notificação",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    tag: "atividade-segura",
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification("Atividade Segura", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

// ============================================================
// MENSAGENS DO CLIENTE
// ============================================================

self.addEventListener("message", (event) => {
  const { type, data } = event.data;

  if (type === "CLEAR_CACHE") {
    caches.keys().then((names) => {
      return Promise.all(names.map((name) => caches.delete(name)));
    });
  }

  if (type === "CACHE_URLS") {
    caches.open(CACHE_NAMES.DYNAMIC).then((cache) => {
      return cache.addAll(data.urls);
    });
  }

  if (type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("Service Worker loaded");
