# Integração de Rate Limiting e Logging no server.py

## Instalação

No topo do arquivo `server.py`, adicione:

```python
from server_security import (
    setup_structured_logging,
    RateLimiter,
    LoginAttemptTracker,
    rate_limit_endpoint,
    JSONFormatter
)

# Configurar logging estruturado
logger = setup_structured_logging(
    "atividade-segura",
    log_level=logging.INFO,
    log_file="logs/app.log"
)

# Inicializar rate limiters
general_limiter = RateLimiter(
    window_seconds=int(os.environ.get("RATE_LIMIT_WINDOW_MS", "900000")) // 1000,
    max_requests=int(os.environ.get("RATE_LIMIT_MAX_REQUESTS", "100")),
    lockout_seconds=15 * 60,
    storage_file="data/rate_limit.json"
)

login_limiter = RateLimiter(
    window_seconds=60,  # 1 minuto
    max_requests=5,
    lockout_seconds=15 * 60,  # 15 minutos
    storage_file="data/login_rate_limit.json"
)

login_tracker = LoginAttemptTracker(
    max_attempts=int(os.environ.get("MAX_LOGIN_ATTEMPTS", "5")),
    lockout_seconds=int(os.environ.get("LOCKOUT_DURATION_MINUTES", "15")) * 60,
    storage_file="data/login_attempts.json"
)
```

## Proteção de Endpoints

### 1. Login (com rate limit agressivo)

```python
def do_POST(self):
    # ... código existente ...
    
    if path == "/api/professor/login":
        email = body.get("email", "").strip().lower()
        
        # Verificar se está bloqueado
        is_locked, msg = login_tracker.is_locked(email, logger)
        if is_locked:
            return self._send_json(429, {
                "success": False,
                "error": msg
            })
        
        # Verificar rate limit
        is_allowed, reason, remaining = login_limiter.is_allowed(email, logger)
        if not is_allowed:
            return self._send_json(429, {
                "success": False,
                "error": reason,
                "retryAfter": remaining
            })
        
        # ... resto do código de login ...
        
        # Se login foi bem-sucedido
        login_tracker.record_attempt(email, success=True, logger=logger)
        
        # Se login falhou
        login_tracker.record_attempt(email, success=False, logger=logger)
```

### 2. Endpoints de API (com rate limit geral)

```python
def do_POST(self):
    client_ip = self.client_address[0]
    
    # Rate limit geral
    is_allowed, reason, remaining = general_limiter.is_allowed(client_ip, logger)
    if not is_allowed:
        return self._send_json(429, {
            "success": False,
            "error": reason,
            "retryAfter": remaining
        })
    
    # ... resto do código ...
```

## Logging Estruturado

Use o logger estruturado em todo o código:

```python
# Informações gerais
logger.info("Atividade criada", extra={
    "action": "activity_created",
    "user": professor_email,
    "activity_id": activity_id
})

# Warnings
logger.warning("Email não verificado", extra={
    "action": "unverified_email",
    "user": email
})

# Erros críticos
logger.critical("Possível ataque detectado", extra={
    "action": "security_alert",
    "ip": client_ip,
    "endpoint": path
})

# Exceções
try:
    # código
except Exception as e:
    logger.error("Erro ao processar", exc_info=True, extra={
        "action": "processing_error",
        "endpoint": path
    })
```

## Variáveis de Ambiente (.env)

```env
# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000  # 15 minutos em milissegundos
RATE_LIMIT_MAX_REQUESTS=100   # máximo de requisições por janela

# Login
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION_MINUTES=15

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## Arquivos de Dados

Os seguintes arquivos serão criados automaticamente:

- `data/rate_limit.json` - Estado do rate limiter geral
- `data/login_rate_limit.json` - Estado do rate limiter de login
- `data/login_attempts.json` - Rastreamento de tentativas de login
- `logs/app.log` - Log estruturado em JSON

## Monitoramento

Os logs são salvos em formato JSON, facilitando análise com ferramentas como:

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Splunk**
- **Datadog**
- **CloudWatch** (AWS)
- **Google Cloud Logging**

Exemplo de log:
```json
{
  "timestamp": "2026-08-29T14:30:45.123456Z",
  "level": "WARNING",
  "logger": "atividade-segura",
  "message": "Muitas requisições. Tente novamente em 45s",
  "module": "server",
  "function": "do_POST",
  "line": 542,
  "action": "rate_limit_lockout",
  "identifier": "192.168.1.100"
}
```

## Testes

Para testar o rate limiting:

```bash
# Teste manual
python3 -c "from server_security import *; setup_structured_logging('test'); limiter = RateLimiter(); [print(limiter.is_allowed('test_ip')) for _ in range(150)]"

# Com pytest
pytest tests/test_rate_limiting.py
```
