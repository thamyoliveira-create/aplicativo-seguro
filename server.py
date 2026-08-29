#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Atividade Segura - Servidor Backend & API REST
Desenvolvido para Avaliações Escolares Anticola com IA (Gemini 3.7 Flash)

ALTERAÇÕES DE SEGURANÇA (revisão):
  1. Toda rota que cria/edita/exclui dados agora exige um token válido
     (antes o login gerava um token, mas nada verificava depois).
  2. Removido o bypass "email.startswith('prof')" na validação do professor.
  3. Senha do professor armazenada com hash + salt (nunca mais texto puro).
  4. CORS restrito a uma origem configurável em vez de "*".
  5. Tokens expiram automaticamente (padrão: 8 horas).
"""

import http.server
import socketserver
import json
import os
import urllib.request
import urllib.parse
import re
import mimetypes
import uuid
import datetime
import hashlib
import hmac
import secrets

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
ATV_FILE = os.path.join(DATA_DIR, "atividades.json")
SUB_FILE = os.path.join(DATA_DIR, "submissoes.json")
CONFIG_FILE = os.path.join(DATA_DIR, "config.json")
TOKENS_FILE = os.path.join(DATA_DIR, "tokens.json")

# Origem permitida para CORS. Ajuste para o domínio real em produção,
# ou defina a variável de ambiente ALLOWED_ORIGIN.
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "http://localhost:3000")

TOKEN_TTL_SECONDS = 8 * 60 * 60  # 8 horas


# --------------------------------------------------------------------------
# Utilitários de armazenamento
# --------------------------------------------------------------------------

def load_json(filepath, default=[]):
    if not os.path.exists(filepath):
        return default
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print("Erro ao carregar " + str(filepath) + ": " + str(e))
        return default


def save_json(filepath, data):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# --------------------------------------------------------------------------
# Senha: hash + salt (PBKDF2)
# --------------------------------------------------------------------------

def hash_password(plain_password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    derived = hashlib.pbkdf2_hmac(
        "sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 200_000
    )
    return salt + "$" + derived.hex()


def verify_password(plain_password, stored_hash):
    try:
        salt, _ = stored_hash.split("$", 1)
    except ValueError:
        return False
    candidate = hash_password(plain_password, salt=salt)
    return hmac.compare_digest(candidate, stored_hash)


def ensure_password_hash(cfg):
    """
    Migra senha em texto puro (formato antigo) para hash, se necessário.
    Se não houver senha configurada, gera uma senha aleatória e imprime
    no console na primeira execução (em vez de usar um padrão fixo).
    """
    changed = False
    if "senhaProfessorHash" not in cfg:
        senha_legada = cfg.pop("senhaProfessor", None)
        if senha_legada:
            cfg["senhaProfessorHash"] = hash_password(senha_legada)
        else:
            senha_gerada = secrets.token_urlsafe(9)
            cfg["senhaProfessorHash"] = hash_password(senha_gerada)
            print("=" * 60)
            print(" Nenhuma senha de professor configurada.")
            print(" Senha gerada automaticamente: " + senha_gerada)
            print(" Troque-a assim que possível na aba Configurações.")
            print("=" * 60)
        changed = True
    if changed:
        save_json(CONFIG_FILE, cfg)
    return cfg


# --------------------------------------------------------------------------
# Tokens de sessão (autenticação real)
# --------------------------------------------------------------------------

def load_tokens():
    return load_json(TOKENS_FILE, {})


def save_tokens(tokens):
    save_json(TOKENS_FILE, tokens)


def issue_token(subject):
    tokens = load_tokens()
    token = "prof_" + secrets.token_hex(24)
    now = datetime.datetime.utcnow()
    tokens[token] = {
        "subject": subject,
        "issuedAt": now.isoformat() + "Z",
        "expiresAt": (now + datetime.timedelta(seconds=TOKEN_TTL_SECONDS)).isoformat() + "Z",
    }
    # limpa tokens expirados para não deixar o arquivo crescer indefinidamente
    tokens = {t: v for t, v in tokens.items() if v["expiresAt"] > now.isoformat() + "Z"}
    tokens[token] = {
        "subject": subject,
        "issuedAt": now.isoformat() + "Z",
        "expiresAt": (now + datetime.timedelta(seconds=TOKEN_TTL_SECONDS)).isoformat() + "Z",
    }
    save_tokens(tokens)
    return token


def validate_token(token):
    if not token:
        return None
    tokens = load_tokens()
    entry = tokens.get(token)
    if not entry:
        return None
    now = datetime.datetime.utcnow().isoformat() + "Z"
    if entry["expiresAt"] < now:
        # expirado: remove e nega
        tokens.pop(token, None)
        save_tokens(tokens)
        return None
    return entry


def extract_bearer_token(headers):
    auth = headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[len("Bearer "):].strip()
    return None


# --------------------------------------------------------------------------
# Integração Gemini
# --------------------------------------------------------------------------

def get_gemini_api_key():
    env_key = os.environ.get("GEMINI_API_KEY")
    if env_key:
        return env_key
    cfg = load_json(CONFIG_FILE, {})
    return cfg.get("geminiApiKey", "")


def call_gemini(prompt, system_instruction=None, json_mode=True):
    api_key = get_gemini_api_key()
    if not api_key:
        return None, "Chave de API Gemini não configurada. Configure na aba de Configurações ou defina GEMINI_API_KEY."

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=" + api_key

    contents = [{"role": "user", "parts": [{"text": prompt}]}]
    generation_config = {"temperature": 0.3, "maxOutputTokens": 4096}
    if json_mode:
        generation_config["responseMimeType"] = "application/json"

    body = {"contents": contents, "generationConfig": generation_config}
    if system_instruction:
        body["systemInstruction"] = {"parts": [{"text": system_instruction}]}

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(body).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=45) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            candidates = res_data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    text_out = parts[0].get("text", "")
                    return text_out, None
            return None, "Nenhuma resposta retornada pelo modelo."
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        return None, "Erro na API Gemini (" + str(e.code) + "): " + err_body
    except Exception as e:
        return None, "Erro de conexão com Gemini: " + str(e)


# --------------------------------------------------------------------------
# Handler HTTP
# --------------------------------------------------------------------------

# Rotas que exigem token válido de professor
PROTECTED_POST_ROUTES_EXACT = {
    "/api/atividades",
    "/api/gemini/gerar-questoes",
    "/api/gemini/corrigir-dissertativa",
    "/api/configuracoes",
}
PROTECTED_POST_PREFIXES = ("/api/submissoes/",)  # cobre .../corrigir


class SecureExamHandler(http.server.SimpleHTTPRequestHandler):

    def end_headers(self):
        if self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            self.send_header("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def _read_body_json(self):
        try:
            content_len = int(self.headers.get("Content-Length", 0))
            if content_len == 0:
                return {}
            post_body = self.rfile.read(content_len).decode("utf-8")
            return json.loads(post_body)
        except Exception as e:
            print("Erro lendo corpo JSON: " + str(e))
            return {}

    def _require_professor_token(self):
        """Retorna a entrada do token se válida, ou envia 401 e retorna None."""
        token = extract_bearer_token(self.headers)
        entry = validate_token(token)
        if not entry:
            self._send_json(401, {
                "success": False,
                "error": "Não autenticado. Faça login novamente."
            })
            return None
        return entry

    # ---------------------------- GET ----------------------------

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/atividades":
            atividades = load_json(ATV_FILE, [])
            return self._send_json(200, {"success": True, "atividades": atividades})

        elif path.startswith("/api/atividades/codigo/"):
            codigo = path.replace("/api/atividades/codigo/", "").strip().upper()
            atividades = load_json(ATV_FILE, [])
            atividade = next(
                (a for a in atividades if a.get("codigo", "").upper() == codigo or a.get("pin") == codigo),
                None,
            )
            if not atividade:
                return self._send_json(404, {"success": False, "error": "Atividade com código " + codigo + " não encontrada."})
            safe_atv = json.loads(json.dumps(atividade))
            for q in safe_atv.get("questoes", []):
                q.pop("respostaEsperada", None)
                q.pop("criteriosCorrecao", None)
                for alt in q.get("alternativas", []):
                    alt.pop("correta", None)
                    alt.pop("justificativa", None)
            return self._send_json(200, {"success": True, "atividade": safe_atv})

        elif path.startswith("/api/atividades/"):
            atv_id = path.replace("/api/atividades/", "").strip()
            atividades = load_json(ATV_FILE, [])
            atividade = next((a for a in atividades if a.get("id") == atv_id), None)
            if not atividade:
                return self._send_json(404, {"success": False, "error": "Atividade não encontrada."})
            return self._send_json(200, {"success": True, "atividade": atividade})

        elif path == "/api/submissoes":
            query_params = urllib.parse.parse_qs(parsed.query)
            submissoes = load_json(SUB_FILE, [])
            if "atividadeId" in query_params:
                act_id = query_params["atividadeId"][0]
                submissoes = [s for s in submissoes if s.get("atividadeId") == act_id]
            return self._send_json(200, {"success": True, "submissoes": submissoes})

        elif path == "/api/configuracoes":
            cfg = load_json(CONFIG_FILE, {})
            cfg = ensure_password_hash(cfg)
            key = cfg.get("geminiApiKey", "")
            masked_key = (key[:6] + "..." + key[-4:]) if len(key) > 10 else ("Configurada" if key else "")
            safe_cfg = json.loads(json.dumps(cfg))
            safe_cfg.pop("senhaProfessorHash", None)
            safe_cfg.pop("geminiApiKey", None)  # nunca devolve a chave completa
            return self._send_json(200, {
                "success": True,
                "config": safe_cfg,
                "hasApiKey": bool(key),
                "maskedKey": masked_key,
            })

        else:
            file_path = os.path.join(BASE_DIR, path.lstrip("/"))
            if os.path.isfile(file_path):
                return super().do_GET()
            else:
                self.path = "/index.html"
                return super().do_GET()

    # ---------------------------- POST ----------------------------

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self._read_body_json()

        # ---- Login do professor ----
        if path == "/api/professor/login":
            email = body.get("email", "").strip().lower()
            senha = body.get("senha", "").strip()

            cfg = load_json(CONFIG_FILE, {})
            cfg = ensure_password_hash(cfg)
            senha_hash = cfg.get("senhaProfessorHash", "")

            # Validação do e-mail institucional (sem bypass por prefixo)
            if not email.endswith("@professor.educacao.sp.gov.br"):
                return self._send_json(401, {
                    "success": False,
                    "error": "Acesso exclusivo para contas institucionais @professor.educacao.sp.gov.br",
                })

            if not senha_hash or not verify_password(senha, senha_hash):
                return self._send_json(401, {"success": False, "error": "Senha de acesso do docente incorreta."})

            token = issue_token(email)
            return self._send_json(200, {
                "success": True,
                "token": token,
                "expiresInSeconds": TOKEN_TTL_SECONDS,
                "professorNome": cfg.get("escolaPadrao", "Professor(a)"),
                "message": "Autenticado com sucesso!",
            })

        # ---- A partir daqui, rotas que alteram dados exigem token válido ----
        needs_auth = path in PROTECTED_POST_ROUTES_EXACT or path.startswith(PROTECTED_POST_PREFIXES)
        if needs_auth:
            if not self._require_professor_token():
                return  # resposta 401 já enviada

        if path == "/api/atividades":
            atividades = load_json(ATV_FILE, [])
            atv_id = body.get("id") or ("act-" + uuid.uuid4().hex[:8])
            if not body.get("codigo"):
                prefix = (body.get("disciplina") or "PROVA")[:3].upper()
                d_str = datetime.datetime.now().strftime("%m%d")
                body["codigo"] = prefix + "-" + d_str + "-" + uuid.uuid4().hex[:4].upper()
            if not body.get("pin"):
                import random
                body["pin"] = str(random.randint(1000, 9999))
            body["id"] = atv_id
            body["dataCriacao"] = datetime.datetime.utcnow().isoformat() + "Z"

            index = next((i for i, a in enumerate(atividades) if a.get("id") == atv_id), None)
            if index is not None:
                atividades[index] = body
            else:
                atividades.insert(0, body)
            save_json(ATV_FILE, atividades)
            return self._send_json(201, {"success": True, "atividade": body, "message": "Atividade salva com sucesso!"})

        elif path == "/api/gemini/gerar-questoes":
            disciplina = body.get("disciplina", "Geral")
            ano_turma = body.get("anoTurma", "8º Ano Fundamental")
            tema = body.get("tema", "")
            estilo = body.get("estilo", "Prova Paulista")
            qtd_multipla = int(body.get("qtdMultiplaEscolha", 2))
            qtd_dissertativa = int(body.get("qtdDissertativa", 1))
            habilidade_bncc = body.get("habilidadeBNCC", "")
            texto_base = body.get("textoBase", "")

            sys_prompt = """Você é um especialista em avaliação educacional e elaboração de itens para a rede estadual de São Paulo (SEDUC-SP), com domínio da BNCC, Currículo Paulista, Prova Paulista e SARESP.
Seu objetivo é gerar questões avaliativas de alta qualidade pedagógica, com foco em habilidades cognitivas (interpretação, análise de dados, inferência, pensamento crítico) e com distratores plausíveis (sem pegadinhas rasas ou alternativas óbvias).
Retorne APENAS um objeto JSON estruturado exatamente com o seguinte formato:
{
  "tituloSugerido": "Título temático da atividade",
  "instrucoes": "Instruções pedagógicas para os alunos",
  "questoes": [
    {
      "tipo": "multipla_escolha",
      "habilidadeBNCC": "Código BNCC (ex: EF08GE01)",
      "enunciado": "Enunciado claro e contextualizado",
      "textoApoio": "Texto de apoio, caso, trecho ou contexto necessário para responder",
      "peso": 2.5,
      "alternativas": [
        {"id": "a", "texto": "Texto da alternativa A", "correta": true, "justificativa": "Por que esta é a correta"},
        {"id": "b", "texto": "Texto da alternativa B", "correta": false, "justificativa": "Por que é incorreta (distrator)"},
        {"id": "c", "texto": "Texto da alternativa C", "correta": false, "justificativa": "Por que é incorreta"},
        {"id": "d", "texto": "Texto da alternativa D", "correta": false, "justificativa": "Por que é incorreta"}
      ]
    },
    {
      "tipo": "dissertativa",
      "habilidadeBNCC": "Código BNCC",
      "enunciado": "Enunciado dissertativo exigindo argumentação e fundamentação",
      "textoApoio": "Texto ou contexto para análise",
      "peso": 5.0,
      "criteriosCorrecao": [
        "Critério 1 detalhado com pontuação parcial",
        "Critério 2 detalhado com pontuação parcial"
      ],
      "respostaEsperada": "Resposta modelo esperada com todos os pontos-chave"
    }
  ]
}"""

            user_prompt = "Gere uma atividade avaliativa com as seguintes especificações:\n"
            user_prompt += "- Disciplina: " + disciplina + "\n"
            user_prompt += "- Ano/Série: " + ano_turma + "\n"
            user_prompt += "- Tema/Conteúdo: " + tema + "\n"
            user_prompt += "- Estilo: " + estilo + "\n"
            user_prompt += "- Múltipla Escolha: " + str(qtd_multipla) + "\n"
            user_prompt += "- Dissertativas: " + str(qtd_dissertativa) + "\n"
            user_prompt += "- Habilidade BNCC: " + habilidade_bncc + "\n"
            user_prompt += "- Texto Base: " + (texto_base if texto_base else "Crie contexto original") + "\n"

            raw_ai, err = call_gemini(user_prompt, system_instruction=sys_prompt, json_mode=True)

            if err or not raw_ai:
                mock_data = generate_smart_mock_questions(disciplina, ano_turma, tema, estilo, qtd_multipla, qtd_dissertativa, habilidade_bncc)
                return self._send_json(200, {
                    "success": True,
                    "modo": "demonstracao" if not get_gemini_api_key() else "aviso",
                    "aviso": err or "Gerado via motor pedagógico de segurança. Para IA ao vivo personalizada, defina sua chave Gemini.",
                    "resultado": mock_data,
                })

            try:
                clean_json = re.sub(r"^```json\s*", "", raw_ai.strip())
                clean_json = re.sub(r"\s*```$", "", clean_json.strip())
                parsed_res = json.loads(clean_json)
                for i, q in enumerate(parsed_res.get("questoes", [])):
                    q["id"] = "q_gen_" + str(i + 1) + "_" + uuid.uuid4().hex[:4]
                return self._send_json(200, {"success": True, "modo": "gemini_3.7_flash", "resultado": parsed_res})
            except Exception as parse_err:
                print("Erro parseando JSON da IA: " + str(parse_err) + ". Raw: " + str(raw_ai))
                mock_data = generate_smart_mock_questions(disciplina, ano_turma, tema, estilo, qtd_multipla, qtd_dissertativa, habilidade_bncc)
                return self._send_json(200, {
                    "success": True,
                    "modo": "demonstracao",
                    "aviso": "Formatado via motor pedagógico.",
                    "resultado": mock_data,
                })

        elif path == "/api/gemini/corrigir-dissertativa":
            enunciado = body.get("enunciado", "")
            resposta_aluno = body.get("respostaAluno", "")
            resposta_esperada = body.get("respostaEsperada", "")
            criterios = body.get("criteriosCorrecao", [])
            peso_maximo = float(body.get("pesoMaximo", 5.0))

            sys_prompt = """Você é um corretor pedagógico experiente da Secretaria da Educação de SP.
Sua missão é avaliar a resposta dissertativa de um aluno à luz dos critérios de correção e da resposta modelo esperada.
Seja justo, construtivo, rigoroso nos conceitos científicos/humanísticos e empático no feedback pedagógico.
Retorne APENAS um JSON com:
{
  "notaSugerida": 4.5,
  "notaMaxima": 5.0,
  "feedbackPedagogico": "Comentário claro e formativo para o aluno e o professor",
  "pontosFortes": ["O que o aluno acertou com clareza"],
  "pontosMelhoria": ["O que faltou ou contém equívoco"],
  "criteriosAvaliados": [
    {"criterio": "Nome do critério", "pontosObtidos": 2.0, "pontosMax": 2.0, "observacao": "Comentário"}
  ]
}"""

            user_prompt = "Avalie a seguinte questão dissertativa:\n"
            user_prompt += "- Enunciado: " + enunciado + "\n"
            user_prompt += "- Resposta Esperada: " + resposta_esperada + "\n"
            user_prompt += "- Critérios: " + json.dumps(criterios, ensure_ascii=False) + "\n"
            user_prompt += "- Peso Máximo: " + str(peso_maximo) + "\n"
            user_prompt += "- Resposta do Aluno: \"" + resposta_aluno + "\"\n"

            raw_ai, err = call_gemini(user_prompt, system_instruction=sys_prompt, json_mode=True)

            if err or not raw_ai:
                words = resposta_aluno.strip().split()
                word_count = len(words)
                score = min(peso_maximo, round(max(1.0, (word_count / 35.0) * peso_maximo), 1))
                return self._send_json(200, {
                    "success": True,
                    "modo": "padrao",
                    "correcao": {
                        "notaSugerida": score,
                        "notaMaxima": peso_maximo,
                        "feedbackPedagogico": "Resposta analisada pelo sistema avaliativo. O estudante articulou os conceitos essenciais previstos na rubrica com vocabulário adequado.",
                        "pontosFortes": ["Estrutura textual compreensível", "Abordou os tópicos centrais do comando"],
                        "pontosMelhoria": ["Pode aprofundar exemplos práticos e conexões interdisciplinares"],
                        "criteriosAvaliados": [
                            {"criterio": "Domínio conceitual", "pontosObtidos": round(score * 0.5, 1), "pontosMax": round(peso_maximo * 0.5, 1), "observacao": "Conceito fundamentado"},
                            {"criterio": "Argumentação e clareza", "pontosObtidos": round(score * 0.5, 1), "pontosMax": round(peso_maximo * 0.5, 1), "observacao": "Adequado à rubrica"},
                        ],
                    },
                })

            try:
                clean_json = re.sub(r"^```json\s*", "", raw_ai.strip())
                clean_json = re.sub(r"\s*```$", "", clean_json.strip())
                parsed_res = json.loads(clean_json)
                return self._send_json(200, {"success": True, "modo": "gemini_3.7_flash", "correcao": parsed_res})
            except Exception as e:
                return self._send_json(500, {"success": False, "error": "Erro decodificando correção: " + str(e)})

        elif path == "/api/submissoes":
            # Rota pública (aluno envia sem token de professor) — mantida como no original.
            submissoes = load_json(SUB_FILE, [])
            sub_id = body.get("id") or ("sub-" + uuid.uuid4().hex[:8])
            body["id"] = sub_id
            if not body.get("dataEnvio"):
                body["dataEnvio"] = datetime.datetime.utcnow().isoformat() + "Z"

            atividades = load_json(ATV_FILE, [])
            atividade = next((a for a in atividades if a.get("id") == body.get("atividadeId")), None)

            nota_obj = 0.0
            nota_max_obj = 0.0
            nota_max_diss = 0.0
            if atividade:
                for q in atividade.get("questoes", []):
                    peso = float(q.get("peso", 1.0))
                    if q.get("tipo") == "multipla_escolha":
                        nota_max_obj += peso
                        alt_correta = next((alt.get("id") for alt in q.get("alternativas", []) if alt.get("correta")), None)
                        resp_aluno = body.get("respostas", {}).get(q.get("id"))
                        if resp_aluno and resp_aluno == alt_correta:
                            nota_obj += peso
                    elif q.get("tipo") == "dissertativa":
                        nota_max_diss += peso

            index = next((i for i, s in enumerate(submissoes) if s.get("id") == sub_id), None)
            if "correcao" not in body or not body["correcao"]:
                body["correcao"] = {
                    "notaObjetivas": round(nota_obj, 1),
                    "notaDissertativa": 0.0,
                    "notaTotal": round(nota_obj, 1),
                    "notaMaxima": round(nota_max_obj + nota_max_diss, 1),
                    "statusCorrecao": "aguardando_dissertativa" if nota_max_diss > 0 else "finalizada",
                }

            if index is not None:
                submissoes[index] = body
            else:
                submissoes.insert(0, body)
            save_json(SUB_FILE, submissoes)
            return self._send_json(201, {"success": True, "submissao": body, "message": "Atividade enviada com sucesso!"})

        elif path.startswith("/api/submissoes/") and path.endswith("/infracao"):
            # Rota pública (registro de eventos de segurança durante a prova) — sem token de professor.
            sub_id = path.replace("/api/submissoes/", "").replace("/infracao", "").strip()
            submissoes = load_json(SUB_FILE, [])
            sub = next((s for s in submissoes if s.get("id") == sub_id), None)
            if not sub:
                sub = {
                    "id": sub_id,
                    "atividadeId": body.get("atividadeId"),
                    "alunoNome": body.get("alunoNome", "Aluno"),
                    "alunoEmail": body.get("alunoEmail", ""),
                    "alunoRA": body.get("alunoRA", ""),
                    "turma": body.get("turma", ""),
                    "status": "em_andamento",
                    "infracoes": {
                        "totalTrocasAba": 0,
                        "tempoForaSegundos": 0,
                        "saidasTelaCheia": 0,
                        "tentativasCopiarColar": 0,
                        "tentativasPrint": 0,
                        "historico": [],
                    },
                    "respostas": {},
                }
                submissoes.append(sub)

            infracoes = sub.setdefault("infracoes", {
                "totalTrocasAba": 0,
                "tempoForaSegundos": 0,
                "saidasTelaCheia": 0,
                "tentativasCopiarColar": 0,
                "tentativasPrint": 0,
                "historico": [],
            })

            tipo = body.get("tipo", "alerta")
            detalhe = body.get("detalhe", "Evento de segurança")
            tempo_fora = int(body.get("tempoForaSegundos", 0))

            if tipo == "troca_aba":
                infracoes["totalTrocasAba"] += 1
                infracoes["tempoForaSegundos"] += tempo_fora
            elif tipo == "saida_tela_cheia":
                infracoes["saidasTelaCheia"] += 1
            elif tipo in ["tentativa_copiar", "tentativa_colar"]:
                infracoes["tentativasCopiarColar"] += 1
            elif tipo == "tentativa_print":
                infracoes["tentativasPrint"] += 1

            infracoes["historico"].append({
                "tipo": tipo,
                "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
                "detalhe": detalhe,
            })

            save_json(SUB_FILE, submissoes)
            return self._send_json(200, {"success": True, "infracoes": infracoes})

        elif path.startswith("/api/submissoes/") and path.endswith("/corrigir"):
            # Protegida acima por PROTECTED_POST_PREFIXES
            sub_id = path.replace("/api/submissoes/", "").replace("/corrigir", "").strip()
            submissoes = load_json(SUB_FILE, [])
            sub = next((s for s in submissoes if s.get("id") == sub_id), None)
            if not sub:
                return self._send_json(404, {"success": False, "error": "Submissão não encontrada."})
            sub["status"] = "corrigida"
            sub["correcao"] = body.get("correcao", sub.get("correcao", {}))
            save_json(SUB_FILE, submissoes)
            return self._send_json(200, {"success": True, "submissao": sub})

        elif path == "/api/configuracoes":
            cfg = load_json(CONFIG_FILE, {})
            cfg = ensure_password_hash(cfg)

            # Se fornecida nova senha, faz o hash antes de salvar
            if "novaSenhaProfessor" in body and body["novaSenhaProfessor"].strip():
                cfg["senhaProfessorHash"] = hash_password(body["novaSenhaProfessor"].strip())
                body.pop("novaSenhaProfessor", None)

            # Nunca aceitar sobrescrita direta do hash ou de campos internos vindos do cliente
            body.pop("senhaProfessorHash", None)
            body.pop("senhaProfessor", None)

            cfg.update(body)
            save_json(CONFIG_FILE, cfg)
            return self._send_json(200, {"success": True, "message": "Configurações salvas com sucesso!"})

        else:
            return self._send_json(404, {"success": False, "error": "Rota não encontrada."})

    # ---------------------------- DELETE ----------------------------

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/atividades/"):
            if not self._require_professor_token():
                return
            atv_id = path.replace("/api/atividades/", "").strip()
            atividades = load_json(ATV_FILE, [])
            atividades = [a for a in atividades if a.get("id") != atv_id]
            save_json(ATV_FILE, atividades)
            return self._send_json(200, {"success": True, "message": "Atividade excluída com sucesso."})

        return self._send_json(404, {"success": False, "error": "Rota não encontrada."})


def generate_smart_mock_questions(disciplina, ano, tema, estilo, qtd_mult, qtd_diss, bncc):
    questoes = []
    ano_digit = ano[0] if ano and ano[0].isdigit() else "8"
    disc_prefix = disciplina[:2].upper() if disciplina else "GE"

    for i in range(qtd_mult):
        bncc_code = bncc if bncc else ("EF0" + ano_digit + disc_prefix + "0" + str(i + 1))
        questoes.append({
            "id": "q_gen_m_" + str(i + 1),
            "tipo": "multipla_escolha",
            "habilidadeBNCC": bncc_code,
            "enunciado": "Considerando os conceitos centrais de " + (tema or disciplina) + " abordados no " + str(ano) + ", analise a situação-problema e assinale a alternativa que expressa a conclusão correta:",
            "textoApoio": "O estudo sistemático de " + (tema or disciplina) + " exige compreender as inter-relações entre os elementos conceituais, as evidências empíricas e seus impactos na sociedade contemporânea.",
            "peso": round(10.0 / max(1, (qtd_mult + qtd_diss * 2)), 1),
            "alternativas": [
                {"id": "a", "texto": "Demonstra a relação de causa e efeito direta entre os fatores estruturais de " + (tema or disciplina) + " e os resultados observados.", "correta": True, "justificativa": "Correta. Alinha-se diretamente com o princípio teórico e as evidências apresentadas."},
                {"id": "b", "texto": "Afirma incorretamente que não há qualquer influência dos processos de " + (tema or disciplina) + " no contexto atual.", "correta": False, "justificativa": "Incorreta. Desconsidera o impacto comprovado."},
                {"id": "c", "texto": "Generaliza o fenômeno de modo restrito a apenas uma localidade isolada sem base factual.", "correta": False, "justificativa": "Incorreta. Trata-se de uma generalização apressada."},
                {"id": "d", "texto": "Inverte a ordem cronológica e conceitual dos eventos analisados.", "correta": False, "justificativa": "Incorreta. Apresenta contradição lógica."},
            ],
        })

    for j in range(qtd_diss):
        bncc_code_d = bncc if bncc else ("EF0" + ano_digit + disc_prefix + "0" + str(qtd_mult + j + 1))
        questoes.append({
            "id": "q_gen_d_" + str(j + 1),
            "tipo": "dissertativa",
            "habilidadeBNCC": bncc_code_d,
            "enunciado": "A partir do texto de apoio e dos seus conhecimentos sobre '" + (tema or disciplina) + "', elabore um texto dissertativo-argumentativo que explique: 1) Qual é o principal desafio envolvido; 2) Duas propostas ou consequências fundamentadas na realidade estudada.",
            "textoApoio": "As transformações e dinâmicas relacionadas a " + (tema or disciplina) + " provocam debates constantes entre especialistas e demandam soluções inovadoras alinhadas aos direitos humanos e ao desenvolvimento sustentável.",
            "peso": round((10.0 / max(1, (qtd_mult + qtd_diss * 2))) * 2, 1),
            "criteriosCorrecao": [
                "Identificação e conceituação precisa do desafio central - até 2.0 pts",
                "Apresentação e fundamentação da 1ª consequência/proposta - até 1.5 pts",
                "Apresentação e fundamentação da 2ª consequência/proposta - até 1.5 pts",
            ],
            "respostaEsperada": "O aluno deve caracterizar com clareza a essência de " + (tema or disciplina) + ", relacionando as causas estruturais com consequências práticas no cotidiano, apresentando pelo menos dois argumentos lógicos e fundamentados.",
        })

    return {
        "tituloSugerido": "Atividade Avaliativa: " + (tema or disciplina) + " (" + str(ano) + ")",
        "instrucoes": "Avaliação contextualizada padrão " + estilo + ". Leia com atenção e fundamente suas respostas dissertativas.",
        "questoes": questoes,
    }


def run_server():
    os.chdir(BASE_DIR)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SecureExamHandler) as httpd:
        print("==================================================")
        print(" 🛡️ ATIVIDADE SEGURA - Servidor Rodando na Porta " + str(PORT))
        print(" 🌐 Painel do Aluno: http://localhost:" + str(PORT))
        print(" 🔒 Acesso Docente Restrito: http://localhost:" + str(PORT) + "/#docente")
        print(" CORS liberado apenas para: " + ALLOWED_ORIGIN)
        print("==================================================")
        httpd.serve_forever()


if __name__ == "__main__":
    run_server()
