#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rate Limiter & Logging Estruturado - Atividade Segura
Proteção contra abuse, força bruta e DDoS
"""

import time
import json
import logging
from pathlib import Path
from collections import defaultdict
from datetime import datetime, timedelta
from functools import wraps
import os

# ============================================================
# CONFIGURAÇÃO DE LOGGING ESTRUTURADO
# ============================================================

class JSONFormatter(logging.Formatter):
    """Formatter que gera logs estruturados em JSON"""
    
    def format(self, record):
        log_obj = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        # Adiciona informações extras se disponíveis
        if hasattr(record, "user"):
            log_obj["user"] = record.user
        if hasattr(record, "ip"):
            log_obj["ip"] = record.ip
        if hasattr(record, "action"):
            log_obj["action"] = record.action
        if hasattr(record, "endpoint"):
            log_obj["endpoint"] = record.endpoint
        if record.exc_info:
            log_obj["exception"] = self.formatException(record.exc_info)
        
        return json.dumps(log_obj, ensure_ascii=False)


def setup_structured_logging(name, log_level=logging.INFO, log_file=None):
    """
    Configura logging estruturado em JSON
    
    Args:
        name: Nome do logger
        log_level: Nível de logging (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_file: Arquivo para salvar logs (opcional)
    """
    logger = logging.getLogger(name)
    logger.setLevel(log_level)
    
    # Handler para console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(JSONFormatter())
    logger.addHandler(console_handler)
    
    # Handler para arquivo (opcional)
    if log_file:
        Path(log_file).parent.mkdir(parents=True, exist_ok=True)
        file_handler = logging.FileHandler(log_file, encoding="utf-8")
        file_handler.setFormatter(JSONFormatter())
        logger.addHandler(file_handler)
    
    return logger


# ============================================================
# RATE LIMITER
# ============================================================

class RateLimiter:
    """
    Rate limiter baseado em IP e identificador de usuário
    Implementa token bucket algorithm
    """
    
    def __init__(self, 
                 window_seconds=900,  # 15 minutos
                 max_requests=100,
                 lockout_seconds=900,
                 storage_file=None):
        """
        Inicializa o rate limiter
        
        Args:
            window_seconds: Janela de tempo em segundos
            max_requests: Máximo de requisições por janela
            lockout_seconds: Duração do lockout após limiar excedido
            storage_file: Arquivo para persistir estado (opcional)
        """
        self.window_seconds = window_seconds
        self.max_requests = max_requests
        self.lockout_seconds = lockout_seconds
        self.storage_file = storage_file
        
        # Em memória: {identifier: [(timestamp, timestamp, ...), locked_until]}
        self.requests = defaultdict(lambda: {"timestamps": [], "locked_until": None})
        
        # Carrega estado anterior se existir
        if storage_file:
            self._load_state()
    
    def _load_state(self):
        """Carrega estado persistido do disco"""
        if not self.storage_file or not Path(self.storage_file).exists():
            return
        
        try:
            with open(self.storage_file, "r") as f:
                data = json.load(f)
                current_time = time.time()
                
                for identifier, info in data.items():
                    # Remove timestamps expirados
                    valid_timestamps = [
                        ts for ts in info.get("timestamps", [])
                        if current_time - ts < self.window_seconds
                    ]
                    
                    locked_until = info.get("locked_until")
                    if locked_until and current_time > locked_until:
                        locked_until = None
                    
                    self.requests[identifier] = {
                        "timestamps": valid_timestamps,
                        "locked_until": locked_until
                    }
        except Exception as e:
            logging.error(f"Erro ao carregar estado do rate limiter: {e}")
    
    def _save_state(self):
        """Salva estado atual no disco"""
        if not self.storage_file:
            return
        
        try:
            Path(self.storage_file).parent.mkdir(parents=True, exist_ok=True)
            with open(self.storage_file, "w") as f:
                json.dump(dict(self.requests), f, indent=2, default=str)
        except Exception as e:
            logging.error(f"Erro ao salvar estado do rate limiter: {e}")
    
    def is_allowed(self, identifier, logger=None):
        """
        Verifica se uma requisição é permitida
        
        Args:
            identifier: IP, email ou qualquer identificador único
            logger: Logger para registrar eventos
        
        Returns:
            tuple: (is_allowed, reason, remaining_time)
        """
        current_time = time.time()
        info = self.requests[identifier]
        
        # Verifica se está em lockout
        if info["locked_until"] and current_time < info["locked_until"]:
            remaining = int(info["locked_until"] - current_time)
            reason = f"Muitas requisições. Tente novamente em {remaining}s"
            
            if logger:
                extra = {"action": "rate_limit_lockout", "identifier": identifier}
                logger.warning(reason, extra=extra)
            
            return False, reason, remaining
        
        # Remove timestamps expirados
        info["timestamps"] = [
            ts for ts in info["timestamps"]
            if current_time - ts < self.window_seconds
        ]
        
        # Verifica limite
        if len(info["timestamps"]) >= self.max_requests:
            info["locked_until"] = current_time + self.lockout_seconds
            self._save_state()
            
            reason = f"Limite de {self.max_requests} requisições excedido"
            
            if logger:
                extra = {"action": "rate_limit_exceeded", "identifier": identifier}
                logger.warning(reason, extra=extra)
            
            return False, reason, self.lockout_seconds
        
        # Permite requisição
        info["timestamps"].append(current_time)
        info["locked_until"] = None
        
        remaining_requests = self.max_requests - len(info["timestamps"])
        
        if logger and remaining_requests < 10:
            extra = {"action": "rate_limit_warning", "identifier": identifier, "remaining": remaining_requests}
            logger.warning(f"Aproximando-se do limite: {remaining_requests} requisições restantes", extra=extra)
        
        self._save_state()
        return True, None, 0
    
    def reset(self, identifier):
        """Reseta contador para um identificador"""
        if identifier in self.requests:
            self.requests[identifier] = {"timestamps": [], "locked_until": None}
            self._save_state()


# ============================================================
# PROTEÇÃO DE ENDPOINTS COM RATE LIMITING
# ============================================================

def rate_limit_endpoint(limiter, get_identifier_fn, logger=None):
    """
    Decorator para proteger endpoints com rate limiting
    
    Args:
        limiter: Instância de RateLimiter
        get_identifier_fn: Função que retorna o identificador (deve receber 'self')
        logger: Logger para estruturado
    
    Uso:
        @rate_limit_endpoint(limiter, lambda self: self.client_address[0], logger)
        def do_POST(self):
            ...
    """
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            identifier = get_identifier_fn(self)
            
            is_allowed, reason, remaining_time = limiter.is_allowed(identifier, logger)
            
            if not is_allowed:
                self._send_json(429, {
                    "success": False,
                    "error": reason,
                    "retryAfter": remaining_time
                })
                return
            
            return func(self, *args, **kwargs)
        return wrapper
    return decorator


# ============================================================
# PROTEÇÃO CONTRA BRUTE FORCE DE LOGIN
# ============================================================

class LoginAttemptTracker:
    """Rastreia tentativas de login para detectar força bruta"""
    
    def __init__(self, max_attempts=5, lockout_seconds=900, storage_file=None):
        self.max_attempts = max_attempts
        self.lockout_seconds = lockout_seconds
        self.storage_file = storage_file
        
        # {email: {"attempts": int, "last_attempt": timestamp, "locked_until": timestamp}}
        self.attempts = {}
        
        if storage_file:
            self._load_state()
    
    def _load_state(self):
        """Carrega estado do disco"""
        if not self.storage_file or not Path(self.storage_file).exists():
            return
        
        try:
            with open(self.storage_file, "r") as f:
                self.attempts = json.load(f)
        except Exception as e:
            logging.error(f"Erro ao carregar tentativas de login: {e}")
    
    def _save_state(self):
        """Salva estado no disco"""
        if not self.storage_file:
            return
        
        try:
            Path(self.storage_file).parent.mkdir(parents=True, exist_ok=True)
            with open(self.storage_file, "w") as f:
                json.dump(self.attempts, f, indent=2)
        except Exception as e:
            logging.error(f"Erro ao salvar tentativas de login: {e}")
    
    def is_locked(self, email, logger=None):
        """Verifica se o email está em lockout"""
        email = email.lower().strip()
        current_time = time.time()
        
        if email not in self.attempts:
            return False, None
        
        info = self.attempts[email]
        locked_until = info.get("locked_until")
        
        if locked_until and current_time < locked_until:
            remaining = int(locked_until - current_time)
            reason = f"Conta bloqueada por {remaining}s. Tente novamente mais tarde."
            
            if logger:
                extra = {"action": "login_locked", "email": email}
                logger.warning(reason, extra=extra)
            
            return True, reason
        
        # Destranca se passou o tempo
        if locked_until and current_time >= locked_until:
            self.attempts[email] = {"attempts": 0, "last_attempt": None, "locked_until": None}
            self._save_state()
        
        return False, None
    
    def record_attempt(self, email, success=False, logger=None):
        """Registra uma tentativa de login"""
        email = email.lower().strip()
        current_time = time.time()
        
        if success:
            # Reseta contador em caso de sucesso
            if email in self.attempts:
                del self.attempts[email]
                self._save_state()
            return
        
        # Registra tentativa falhada
        if email not in self.attempts:
            self.attempts[email] = {"attempts": 0, "last_attempt": None, "locked_until": None}
        
        info = self.attempts[email]
        info["attempts"] = info.get("attempts", 0) + 1
        info["last_attempt"] = current_time
        
        if info["attempts"] >= self.max_attempts:
            info["locked_until"] = current_time + self.lockout_seconds
            
            if logger:
                extra = {"action": "login_brute_force", "email": email, "attempts": info["attempts"]}
                logger.critical("Tentativa de força bruta de login detectada", extra=extra)
        
        self._save_state()
        
        if logger:
            extra = {"action": "login_failed", "email": email, "attempts": info["attempts"]}
            logger.warning(f"Login falhou. Tentativas: {info['attempts']}/{self.max_attempts}", extra=extra)


# ============================================================
# EXEMPLO DE USO
# ============================================================

if __name__ == "__main__":
    # Configurar logging
    logger = setup_structured_logging(
        "atividade-segura",
        log_level=logging.INFO,
        log_file="logs/app.log"
    )
    
    # Criar rate limiter
    limiter = RateLimiter(
        window_seconds=900,  # 15 minutos
        max_requests=100,
        lockout_seconds=900,
        storage_file="data/rate_limit.json"
    )
    
    # Criar rastreador de login
    login_tracker = LoginAttemptTracker(
        max_attempts=5,
        lockout_seconds=900,
        storage_file="data/login_attempts.json"
    )
    
    # Testes
    print("=== Teste de Rate Limiter ===")
    ip = "192.168.1.100"
    
    for i in range(5):
        allowed, reason, remaining = limiter.is_allowed(ip, logger)
        print(f"Requisição {i+1}: {'✓ Permitida' if allowed else f'✗ Bloqueada: {reason}'}")
    
    print("\n=== Teste de Login Tracker ===")
    email = "usuario@example.com"
    
    for i in range(6):
        locked, msg = login_tracker.is_locked(email, logger)
        if not locked:
            login_tracker.record_attempt(email, success=False, logger=logger)
            print(f"Tentativa {i+1}: Registrada")
        else:
            print(f"Tentativa {i+1}: Bloqueada - {msg}")
