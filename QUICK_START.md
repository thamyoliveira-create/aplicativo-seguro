# 🚀 Quick Start - Guia Rápido de Implementação

## 1️⃣ Configuração Inicial (5 minutos)

### Copiar arquivo de configuração
```bash
cp .env.example .env.local
```

### Editar `.env.local` com suas credenciais
```env
# Firebase
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
# ... (completar com seus dados)

# Gemini
VITE_GEMINI_API_KEY=xxx
GEMINI_API_KEY=xxx
```

### Instalar dependências
```bash
npm install
```

---

## 2️⃣ Ativar PWA (3 minutos)

### Adicionar no `<head>` do `index.html`
```html
<!-- Antes de </head> -->
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#1e3a8a" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<script src="/js/pwa.js"></script>
```

### Resultado esperado
- ✅ Ícone de instalação no navegador
- ✅ Funciona offline
- ✅ Atualização automática

---

## 3️⃣ Ativar Rate Limiting (5 minutos)

### Editar `server.py` - Adicionar no topo
```python
from server_security import (
    setup_structured_logging,
    RateLimiter,
    LoginAttemptTracker
)

# Logo após imports existentes
logger = setup_structured_logging(
    "atividade-segura",
    log_level=logging.INFO,
    log_file="logs/app.log"
)

general_limiter = RateLimiter(
    window_seconds=900,
    max_requests=100,
    lockout_seconds=900,
    storage_file="data/rate_limit.json"
)

login_limiter = RateLimiter(
    window_seconds=60,
    max_requests=5,
    lockout_seconds=900,
    storage_file="data/login_rate_limit.json"
)
```

### No método `do_POST`, antes de processar a requisição
```python
def do_POST(self):
    # ... código existente ...
    
    # Rate limit geral
    client_ip = self.client_address[0]
    is_allowed, reason, remaining = general_limiter.is_allowed(client_ip, logger)
    if not is_allowed:
        return self._send_json(429, {"error": reason, "retryAfter": remaining})
    
    # Rest do código...
```

### Para login (proteção especial)
```python
if path == "/api/professor/login":
    email = body.get("email", "").strip().lower()
    
    # Verificar rate limit específico para login
    is_allowed, reason, remaining = login_limiter.is_allowed(email, logger)
    if not is_allowed:
        return self._send_json(429, {"error": reason, "retryAfter": remaining})
    
    # Rest do código de login...
```

---

## 4️⃣ Usar Componentes (2 minutos)

### Importar na view
```javascript
// No início da view
<script src="/js/components.js"></script>

// Usar
const html = Components.Button({
  text: "Enviar",
  variant: "primary",
  onClick: "handleSubmit()"
});

Components.render(html, "#container");
```

### Exemplos rápidos

#### Botão
```javascript
Components.Button({
  text: "Clique aqui",
  variant: "primary",  // primary|secondary|danger|success|ghost
  size: "md",          // sm|md|lg
  disabled: false
})
```

#### Alert
```javascript
Components.Alert({
  type: "success",     // info|success|warning|error
  title: "Sucesso!",
  message: "Operação concluída",
  dismissible: true
})
```

#### Modal
```javascript
Components.Modal({
  id: "confirm-modal",
  title: "Confirmar",
  content: "Tem certeza?",
  buttons: [
    { text: "Sim", variant: "primary", onClick: "save()" },
    { text: "Não", variant: "secondary", onClick: "cancel()" }
  ]
})
```

#### Input
```javascript
Components.Input({
  type: "email",
  name: "email",
  label: "Email",
  placeholder: "seu@email.com",
  required: true,
  error: null  // mostrar erro se não for nulo
})
```

---

## 5️⃣ Executar Testes (3 minutos)

### Rodar todos os testes
```bash
npm test
```

### Modo watch (atualiza ao salvar)
```bash
npm run test:watch
```

### Ver cobertura
```bash
npm run test:coverage
```

### Resultado esperado
- ✅ 60+ testes de segurança passando
- ✅ 30+ testes de autenticação passando
- ✅ Cobertura > 80%

---

## 6️⃣ Validação & Sanitização (2 minutos)

### Usar SecurityUtils antes de processar dados
```javascript
// Importar
<script src="/js/security-utils.js"></script>

// Validar email
if (!SecurityUtils.isValidEmail(email)) {
  alert("Email inválido");
}

// Validar email SEDUC-SP
if (!SecurityUtils.isValidSedUCEmail(email)) {
  alert("Use seu email institucional @professor.educacao.sp.gov.br");
}

// Sanitizar entrada de usuário
const cleanText = SecurityUtils.stripDangerousCode(userInput);

// Escapar HTML
const safeHtml = SecurityUtils.escapeHTML(userText);

// Validar senha
if (!SecurityUtils.isValidPassword(password)) {
  alert("Senha deve ter mínimo 8 caracteres com letras e números");
}
```

---

## 7️⃣ Verificação Final (2 minutos)

### Checklist de implementação

- [ ] `.env.local` configurado com credenciais
- [ ] `package.json` instalado com `npm install`
- [ ] PWA ativado (manifest.json linkado no HTML)
- [ ] Rate limiting integrado em `server.py`
- [ ] Testes passando com `npm test`
- [ ] Componentes importados nas views
- [ ] SecurityUtils usado para validação
- [ ] Service Worker registrado (DevTools > Application)

### Verificar no navegador
```javascript
// Abrir DevTools > Console e executar:

// 1. PWA Info
PWAHelper.getInfo()

// 2. Teste de validação
SecurityUtils.isValidEmail("usuario@example.com")

// 3. Teste de componentes
Components.Alert({ type: "success", message: "Tudo funcionando!" })
```

---

## 📝 Padrão de Uso Comum

### 1. Validar entrada
```javascript
const email = input.value.trim();
if (!SecurityUtils.isValidSedUCEmail(email)) {
  Components.render(
    Components.Alert({
      type: "error",
      message: "Email inválido"
    }),
    "#error-container"
  );
  return false;
}
```

### 2. Fazer requisição segura
```javascript
const response = await fetch("/api/professor/novo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({
    email: SecurityUtils.normalizeEmail(email),
    name: SecurityUtils.cleanString(name),
    password: password  // Já validado
  })
});
```

### 3. Mostrar resultado
```javascript
if (response.ok) {
  Components.render(
    Components.Alert({
      type: "success",
      title: "Sucesso!",
      message: "Professora cadastrada com sucesso"
    }),
    "#alert-container"
  );
} else if (response.status === 429) {
  // Rate limit atingido
  const data = await response.json();
  Components.render(
    Components.Alert({
      type: "warning",
      title: "Muitas tentativas",
      message: `Aguarde ${data.retryAfter}s`
    }),
    "#alert-container"
  );
}
```

---

## 🆘 Troubleshooting

### Service Worker não está registrando
```javascript
// Verificar no console
navigator.serviceWorker.getRegistrations().then(regs => console.log(regs));

// Limpar caches antigos
await PWAHelper.clearAllCaches();

// Recarregar página
location.reload();
```

### Testes falhando
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
npm test
```

### PWA não funciona offline
```javascript
// Verificar cache no DevTools
// Application > Cache Storage > Verificar os caches

// Manualmente fazer cache de URLs
if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({
    type: 'CACHE_URLS',
    data: { urls: ['/api/atividades', '/api/submissoes'] }
  });
}
```

### Rate limiting não está funcionando
```python
# Verificar se arquivo de estado existe
ls -la data/rate_limit.json

# Verificar logs
tail -f logs/app.log | grep "rate_limit"

# Resetar limiter (CUIDADO em produção!)
from server_security import RateLimiter
limiter = RateLimiter(storage_file="data/rate_limit.json")
limiter.reset("192.168.1.100")
```

---

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| PWA não instala | Verificar HTTPS em produção, manifest.json válido |
| Testes falham | Rodar `npm install` novamente |
| Rate limit muito restritivo | Aumentar `RATE_LIMIT_MAX_REQUESTS` em `.env` |
| Componentes não renderizam | Verificar import de `components.js` |
| Service Worker antigo | Limpar `Application > Cache Storage` |
| Logs muito verbosos | Mudar `LOG_LEVEL=warning` em `.env` |

---

**⏱️ Tempo total de implementação: ~20 minutos**

**✅ Resultado: Aplicação segura, offline-ready e testada**
