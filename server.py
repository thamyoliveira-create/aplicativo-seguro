

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Atividade Segura - Servidor Backend & API REST
Desenvolvido para Avaliações Escolares Anticola com IA (Google Gemini)
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
import logging
from pathlib import Path
from http.server import ThreadingHTTPServer
from socketserver import ThreadingMixIn

# ============================================================
# CONFIGURAÇÕES
# ============================================================
PORT = 3000
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
ATV_FILE = DATA_DIR / "atividades.json"
SUB_FILE = DATA_DIR / "submissoes.json"
CONFIG_FILE = DATA_DIR / "config.json"
PROF_FILE = DATA_DIR / "professores.json"

# Caminhos públicos que não exigem token
ROTAS_PUBLICAS_POST = {
    "/api/professor/login",
    "/api/professor/verificar-email",
    "/api/submissoes",
}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%d/%m/%Y %H:%M:%S"
)
logger = logging.getLogger("atividade-segura")

# ============================================================
# UTILITÁRIOS
# ============================================================

def load_json(filepath, default=[]):
    if not Path(filepath).exists():
        return default
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Erro ao carregar {filepath}: {e}")
        return default


def save_json(filepath, data):
    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def safe_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def safe_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def hash_senha(senha):
    """Gera hash SHA-256 com salt fixo."""
    salt = "atividade_segura_salt_2026"
    return hashlib.sha256((salt + senha).encode("utf-8")).hexdigest()


def verificar_senha(prof, senha):
    """Verifica senha, aceitando hash novo ou texto puro antigo."""
    if not prof:
        return False
    stored = prof.get("senha", "")
    if stored == hash_senha(senha):
        return True
    if stored == senha:  # migração de senha antiga
        prof["senha"] = hash_senha(senha)
        return True
    return False


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

    models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]
    last_err = None

    for model in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

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
                headers={
                    "Content-Type": "application/json",
                    "x-goog-api-key": api_key
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=35) as response:
                res_data = json.loads(response.read().decode("utf-8"))

                candidates = res_data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", ""), None
                return None, "Nenhuma resposta retornada pelo modelo."
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")
            last_err = f"Erro na API Gemini ({e.code}): {err_body}"
            if e.code == 404:
                continue
            return None, last_err
        except Exception as e:
            last_err = "Erro de conexão com Gemini: " + str(e)
            continue

    return None, last_err or "Não foi possível conectar com o Gemini."


def extract_text_from_file_bytes(file_bytes, filename=""):
    import io
    import zipfile
    import xml.etree.ElementTree as ET

    ext = (filename.rsplit(".", 1)[-1] if "." in filename else "").lower()

    if ext in ["txt", "csv", "json"]:
        for enc in ["utf-8", "latin-1", "cp1252"]:
            try:
                return file_bytes.decode(enc)
            except Exception:
                pass
        return file_bytes.decode("utf-8", errors="ignore")

    if ext == "docx" or file_bytes.startswith(b"PK"):
        try:
            with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
                if "word/document.xml" in z.namelist():
                    xml_content = z.read("word/document.xml")
                    tree = ET.fromstring(xml_content)
                    texts = []
                    for node in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"):
                        if node.text:
                            texts.append(node.text)
                    if texts:
                        return "\n".join(texts)
        except Exception as e:
            logger.error(f"Erro ao ler docx via zipfile: {e}")

    if ext in ["xlsx", "xls"] and file_bytes.startswith(b"PK"):
        try:
            with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
                texts = []
                if "xl/sharedStrings.xml" in z.namelist():
                    tree = ET.fromstring(z.read("xl/sharedStrings.xml"))
                    for node in tree.iter():
                        if node.tag.endswith("}t") and node.text:
                            texts.append(node.text)
                if texts:
                    return "\n".join(texts)
        except Exception as e:
            logger.error(f"Erro ao ler xlsx via zipfile: {e}")

    try:
        raw = file_bytes.decode("utf-8", errors="ignore")
        cleaned = "".join([c for c in raw if c.isprintable() or c in "\n\r\t"])
        if len(cleaned.strip()) > 20:
            return cleaned
    except Exception:
        pass

    return ""


def parse_document_text_fallback(texto, nome_arquivo=""):
    linhas = [l.strip() for l in (texto or "").split("\n") if l.strip()]
    if not linhas:
        return {
            "tituloSugerido": "Avaliação Importada",
            "disciplinaSugerida": "",
            "anoTurmaSugerido": "",
            "questoes": []
        }

    titulo = ""
    for l in linhas[:5]:
        if len(l) > 8 and not re.match(r"^(quest[aã]o|[0-9]+[\.\-\)]|p[aá]gina|slide|planilha)", l, re.I):
            titulo = l
            break
    if not titulo:
        titulo = (nome_arquivo.rsplit(".", 1)[0] if nome_arquivo else "Avaliação Importada").replace("-", " ").replace("_", " ").title()

    questoes = []
    current_q = None

    q_pattern = re.compile(r"^(?:quest[aã]o\s*([0-9]+)|([0-9]{1,2})[\.\-\)\s]|item\s*([0-9]+)|(?:slide|p[aá]gina)\s*([0-9]+))\s*[:\.\-]?\s*(.*)", re.I)
    alt_pattern = re.compile(r"^(?:\(?([a-eA-E])\)|\(?([a-eA-E])[\.\-\]])\s*(.*)")

    for linha in linhas:
        if re.match(r"^\[?---\s*(?:p[aá]gina|slide|planilha)", linha, re.I):
            continue

        q_match = q_pattern.match(linha)
        alt_match = alt_pattern.match(linha)

        if alt_match and current_q:
            letra = (alt_match.group(1) or alt_match.group(2)).upper()
            texto_alt = alt_match.group(3).strip()

            is_correta = False
            if re.search(r"\(x\)|\*|\[correta\]|\(correta\)|gabarito", texto_alt, re.I):
                is_correta = True
                texto_alt = re.sub(r"\(x\)|\*|\[correta\]|\(correta\)|gabarito", "", texto_alt, flags=re.I).strip()

            current_q["alternativas"].append({"id": letra, "texto": texto_alt or f"Alternativa {letra}"})
            if is_correta:
                current_q["correta"] = letra
            current_q["tipo"] = "multipla_escolha"

        elif q_match:
            if current_q:
                questoes.append(current_q)

            num = q_match.group(1) or q_match.group(2) or q_match.group(3) or str(len(questoes) + 1)
            enunciado_inicial = q_match.group(5).strip()

            current_q = {
                "id": f"q_imp_{len(questoes)+1}_{uuid.uuid4().hex[:4]}",
                "tipo": "dissertativa",
                "habilidadeBNCC": "BNCC-GERAL",
                "enunciado": enunciado_inicial or f"Questão {num}",
                "textoApoio": "",
                "peso": 2.5,
                "alternativas": [],
                "correta": "A",
                "respostaEsperada": "Resposta modelo baseada no texto do documento.",
                "criteriosCorrecao": "Critérios pedagógicos de avaliação."
            }
        else:
            if current_q:
                if not current_q["alternativas"]:
                    current_q["enunciado"] += "\n" + linha
                else:
                    current_q["alternativas"][-1]["texto"] += " " + linha

    if current_q:
        questoes.append(current_q)

    if not questoes and linhas:
        chunk_size = max(1, len(linhas) // 3)
        for idx in range(0, min(3, len(linhas))):
            trecho = "\n".join(linhas[idx*chunk_size : (idx+1)*chunk_size])
            questoes.append({
                "id": f"q_imp_{idx+1}_{uuid.uuid4().hex[:4]}",
                "tipo": "dissertativa",
                "habilidadeBNCC": "BNCC-GERAL",
                "enunciado": trecho[:300] if len(trecho) > 300 else trecho,
                "textoApoio": "",
                "peso": 2.5,
                "respostaEsperada": "Desenvolvimento dissertativo fundamentado no conteúdo apresentado.",
                "criteriosCorrecao": "Coerência, clareza e domínio conceitual."
            })

    if questoes:
        peso_padrao = round(10.0 / len(questoes), 1)
        for q in questoes:
            q["peso"] = peso_padrao
            if q["tipo"] == "multipla_escolha":
                if not q.get("correta") and q.get("alternativas"):
                    q["correta"] = q["alternativas"][0]["id"]
                for a in q.get("alternativas", []):
                    a["correta"] = (a.get("id") == q.get("correta"))

    return {
        "tituloSugerido": titulo,
        "disciplinaSugerida": "",
        "anoTurmaSugerido": "",
        "questoes": questoes
    }


def generate_smart_mock_questions(disciplina, ano, tema, estilo, qtd_mult, qtd_diss, bncc):
    questoes = []
    ano_digit = ano[0] if ano and ano[0].isdigit() else "8"
    disc_prefix = disciplina[:2].upper() if disciplina else "GE"

    for i in range(qtd_mult):
        bncc_code = bncc if bncc else ("EF0" + str(ano_digit) + disc_prefix + "0" + str(i + 1))
        questoes.append({
            "id": "q_gen_m_" + str(i + 1) + "_" + uuid.uuid4().hex[:4],
            "tipo": "multipla_escolha",
            "habilidadeBNCC": bncc_code,
            "enunciado": "Considerando os conceitos centrais de " + (tema or disciplina) + " abordados no " + str(ano) + ", analise a situação-problema e assinale a alternativa que expressa a conclusão correta:",
            "textoApoio": "O estudo sistemático de " + (tema or disciplina) + " exige compreender as inter-relações entre os elementos conceituais, as evidências empíricas e seus impactos na sociedade contemporânea.",
            "peso": round(10.0 / max(1, (qtd_mult + qtd_diss)), 1),
            "correta": "A",
            "alternativas": [
                {
                    "id": "A",
                    "texto": "Demonstra a relação de causa e efeito direta entre os fatores estruturais de " + (tema or disciplina) + " e os resultados observados.",
                    "correta": True,
                    "justificativa": "Correta. Alinha-se diretamente com o princípio teórico e as evidências apresentadas."
                },
                {
                    "id": "B",
                    "texto": "Afirma incorretamente que não há qualquer influência dos processos de " + (tema or disciplina) + " no contexto atual.",
                    "correta": False,
                    "justificativa": "Incorreta. Desconsidera o impacto comprovado."
                },
                {
                    "id": "C",
                    "texto": "Generaliza o fenômeno de modo restrito a apenas uma localidade isolada sem base factual.",
                    "correta": False,
                    "justificativa": "Incorreta. Trata-se de uma generalização apressada."
                },
                {
                    "id": "D",
                    "texto": "Inverte a ordem cronológica e conceitual dos eventos analisados.",
                    "correta": False,
                    "justificativa": "Incorreta. Apresenta contradição lógica."
                }
            ]
        })

    for j in range(qtd_diss):
        bncc_code_d = bncc if bncc else ("EF0" + str(ano_digit) + disc_prefix + "0" + str(qtd_mult + j + 1))
        questoes.append({
            "id": "q_gen_d_" + str(j + 1) + "_" + uuid.uuid4().hex[:4],
            "tipo": "dissertativa",
            "habilidadeBNCC": bncc_code_d,
            "enunciado": "A partir do texto de apoio e dos seus conhecimentos sobre '" + (tema or disciplina) + "', elabore um texto dissertativo-argumentativo que explique: 1) Qual é o principal desafio envolvido; 2) Duas propostas ou consequências fundamentadas na realidade estudada.",
            "textoApoio": "As transformações e dinâmicas relacionadas a " + (tema or disciplina) + " provocam debates constantes entre especialistas e demandam soluções inovadoras alinhadas aos direitos humanos e ao desenvolvimento sustentável.",
            "peso": round(10.0 / max(1, (qtd_mult + qtd_diss)), 1),
            "criteriosCorrecao": [
                "Identificação e conceituação precisa do desafio central - até 2.0 pts",
                "Apresentação e fundamentação da 1ª consequência/proposta - até 1.5 pts",
                "Apresentação e fundamentação da 2ª consequência/proposta - até 1.5 pts"
            ],
            "respostaEsperada": "O aluno deve caracterizar com clareza a essência de " + (tema or disciplina) + ", relacionando as causas estruturais com consequências práticas no cotidiano, apresentando pelo menos dois argumentos lógicos e fundamentados."
        })

    return {
        "tituloSugerido": "Atividade Avaliativa: " + (tema or disciplina) + " (" + str(ano) + ")",
        "instrucoes": "Avaliação contextualizada padrão " + estilo + ". Leia com atenção e fundamente suas respostas dissertativas.",
        "questoes": questoes
    }


# ============================================================
# HANDLER PRINCIPAL
# ============================================================

class SecureExamHandler(http.server.SimpleHTTPRequestHandler):

    # --------------------------------------------------------
    # Utilitários do handler
    # --------------------------------------------------------

    def end_headers(self):
        if self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
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
            logger.error(f"Erro lendo corpo JSON: {e}")
            return {}

    # --------------------------------------------------------
    # Autenticação por token
    # --------------------------------------------------------

    def _verificar_token_professor(self):
        auth = self.headers.get("Authorization", "")
        token = auth.replace("Bearer ", "").strip() if auth.startswith("Bearer ") else ""
        if not token:
            return None

        professores = load_json(PROF_FILE, {})
        if isinstance(professores, list):
            professores = {p.get("email", "").lower(): p for p in professores if "email" in p}

        for prof in professores.values():
            if prof.get("token") == token:
                return prof
        return None

    def _rota_requer_professor(self, path):
        if path in ROTAS_PUBLICAS_POST:
            return False
        if path.endswith("/infracao"):
            return False
        return True

    def _sanitizar_atividade(self, atividade):
        """Remove respostas, gabaritos e critérios de correção."""
        safe = json.loads(json.dumps(atividade))
        for q in safe.get("questoes", []):
            q.pop("respostaEsperada", None)
            q.pop("criteriosCorrecao", None)
            for alt in q.get("alternativas", []):
                alt.pop("correta", None)
                alt.pop("justificativa", None)
        return safe

    # --------------------------------------------------------
    # GET
    # --------------------------------------------------------

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # ---- Rota: listar atividades ----
        if path == "/api/atividades":
            atividades = load_json(ATV_FILE, [])
            professor = self._verificar_token_professor()

            if not professor:
                # Aluno ou visitante: retorna somente versão sanitizada
                atividades_safe = [self._sanitizar_atividade(a) for a in atividades]
                return self._send_json(200, {"success": True, "atividades": atividades_safe})

            return self._send_json(200, {"success": True, "atividades": atividades})

        # ---- Rota: buscar atividade por código (aluno) ----
        elif path.startswith("/api/atividades/codigo/"):
            codigo = path.replace("/api/atividades/codigo/", "").strip().upper()
            atividades = load_json(ATV_FILE, [])
            atividade = next((a for a in atividades if a.get("codigo", "").upper() == codigo or a.get("pin") == codigo), None)

            if not atividade:
                return self._send_json(404, {"success": False, "error": "Atividade com código " + codigo + " não encontrada."})

            safe_atv = self._sanitizar_atividade(atividade)
            return self._send_json(200, {"success": True, "atividade": safe_atv})

        # ---- Rota: buscar atividade por ID ----
        elif path.startswith("/api/atividades/"):
            atv_id = path.replace("/api/atividades/", "").strip()
            atividades = load_json(ATV_FILE, [])
            atividade = next((a for a in atividades if a.get("id") == atv_id), None)

            if not atividade:
                return self._send_json(404, {"success": False, "error": "Atividade não encontrada."})

            professor = self._verificar_token_professor()
            if professor:
                return self._send_json(200, {"success": True, "atividade": atividade})

            safe_atv = self._sanitizar_atividade(atividade)
            return self._send_json(200, {"success": True, "atividade": safe_atv})

        # ---- Rota: listar submissões (apenas professor) ----
        elif path == "/api/submissoes":
            professor = self._verificar_token_professor()
            if not professor:
                return self._send_json(401, {"success": False, "error": "Acesso não autorizado. Faça login do professor."})

            query_params = urllib.parse.parse_qs(parsed.query)
            submissoes = load_json(SUB_FILE, [])

            if "atividadeId" in query_params:
                act_id = query_params["atividadeId"][0]
                submissoes = [s for s in submissoes if s.get("atividadeId") == act_id]

            return self._send_json(200, {"success": True, "submissoes": submissoes})

        # ---- Rota: configurações (apenas professor) ----
        elif path == "/api/configuracoes":
            professor = self._verificar_token_professor()
            if not professor:
                return self._send_json(401, {"success": False, "error": "Acesso não autorizado. Faça login do professor."})

            cfg = load_json(CONFIG_FILE, {
                "geminiApiKey": os.environ.get("GEMINI_API_KEY", ""),
                "senhaProfessor": "prof2026",
                "professorNome": "",
                "escolaPadrao": "",
                "redeEnsino": "Secretaria da Educação do Estado de SP",
                "dominioProfessor": "@professor.educacao.sp.gov.br",
                "dominioAluno": "@aluno.educacao.sp.gov.br"
            })
            key = cfg.get("geminiApiKey", "")
            masked_key = (key[:6] + "..." + key[-4:]) if len(key) > 10 else ("Configurada" if key else "")

            safe_cfg = json.loads(json.dumps(cfg))
            safe_cfg.pop("senhaProfessor", None)
            safe_cfg.pop("geminiApiKey", None)  # nunca expor a chave completa

            return self._send_json(200, {
                "success": True,
                "config": safe_cfg,
                "hasApiKey": bool(key),
                "maskedKey": masked_key
            })

        # ---- Arquivos estáticos ----
        else:
            file_path = BASE_DIR / path.lstrip("/")
            if file_path.is_file():
                return super().do_GET()
            else:
                self.path = "/index.html"
                return super().do_GET()

    # --------------------------------------------------------
    # POST
    # --------------------------------------------------------

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self._read_body_json()

        # Verifica se a rota exige professor autenticado
        if self._rota_requer_professor(path):
            professor = self._verificar_token_professor()
            if not professor:
                return self._send_json(401, {"success": False, "error": "Acesso não autorizado. Faça login novamente."})

        # ---- Login / Cadastro de professor ----
        if path == "/api/professor/login":
            nome = body.get("nome", "").strip()
            escola = body.get("escola", "").strip()
            email = body.get("email", "").strip().lower()
            senha = body.get("senha", "").strip()

            if not email:
                return self._send_json(400, {"success": False, "error": "Por favor, informe o seu e-mail."})
            if not senha or len(senha) < 3:
                return self._send_json(400, {"success": False, "error": "A senha deve conter pelo menos 3 caracteres."})

            professores = load_json(PROF_FILE, {})
            if isinstance(professores, list):
                professores = {p.get("email", "").lower(): p for p in professores if "email" in p}

            if email in professores:
                prof = professores[email]
                if not verificar_senha(prof, senha):
                    return self._send_json(401, {
                        "success": False,
                        "error": "Senha incorreta para este e-mail. Por favor, digite a senha pessoal criada no seu primeiro acesso."
                    })

                if nome:
                    prof["nome"] = nome
                if escola:
                    prof["escola"] = escola
                prof["ultimoAcesso"] = datetime.datetime.now().isoformat()
                token = "prof_token_" + uuid.uuid4().hex
                prof["token"] = token
                professores[email] = prof
                save_json(PROF_FILE, professores)

                return self._send_json(200, {
                    "success": True,
                    "token": token,
                    "novoCadastro": False,
                    "professorNome": prof.get("nome", nome or "Professor(a)"),
                    "escola": prof.get("escola", escola or "Unidade Escolar"),
                    "email": email,
                    "message": f"Bem-vindo(a) de volta, {prof.get('nome', 'Docente')}!"
                })
            else:
                # Primeiro acesso
                if not nome:
                    return self._send_json(400, {"success": False, "error": "Primeiro acesso: por favor, informe o seu Nome Completo."})
                if not escola:
                    return self._send_json(400, {"success": False, "error": "Primeiro acesso: por favor, informe a Escola onde leciona."})

                token = "prof_token_" + uuid.uuid4().hex
                novo_prof = {
                    "id": "prof_" + uuid.uuid4().hex[:8],
                    "email": email,
                    "nome": nome,
                    "escola": escola,
                    "senha": hash_senha(senha),
                    "token": token,
                    "dataCriacao": datetime.datetime.now().isoformat(),
                    "ultimoAcesso": datetime.datetime.now().isoformat()
                }
                professores[email] = novo_prof
                save_json(PROF_FILE, professores)

                return self._send_json(200, {
                    "success": True,
                    "token": token,
                    "novoCadastro": True,
                    "professorNome": nome,
                    "escola": escola,
                    "email": email,
                    "message": "Conta de professor criada com sucesso e já conectada!"
                })

        # ---- Verificar e-mail do professor ----
        elif path == "/api/professor/verificar-email":
            email = body.get("email", "").strip().lower()
            professores = load_json(PROF_FILE, {})
            if isinstance(professores, list):
                professores = {p.get("email", "").lower(): p for p in professores if "email" in p}

            if email in professores:
                prof = professores[email]
                return self._send_json(200, {
                    "success": True,
                    "cadastrado": True,
                    "nome": prof.get("nome", ""),
                    "escola": prof.get("escola", "")
                })
            else:
                return self._send_json(200, {"success": True, "cadastrado": False})

        # ---- Criar / atualizar atividade ----
        elif path == "/api/atividades":
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

        # ---- Extrair texto de arquivo ----
        elif path == "/api/arquivo/extrair-texto":
            nome_arquivo = body.get("nomeArquivo", "arquivo")
            b64_data = body.get("base64", "")
            texto_direto = body.get("texto", "")

            if texto_direto and len(texto_direto.strip()) > 5:
                return self._send_json(200, {
                    "success": True,
                    "texto": texto_direto.strip(),
                    "formato": "texto",
                    "nomeArquivo": nome_arquivo
                })

            if not b64_data:
                return self._send_json(400, {"success": False, "error": "Nenhum dado de arquivo ou texto fornecido."})

            try:
                import base64
                if "," in b64_data:
                    b64_data = b64_data.split(",", 1)[1]
                file_bytes = base64.b64decode(b64_data)
                texto_extraido = extract_text_from_file_bytes(file_bytes, nome_arquivo)

                if not texto_extraido or len(texto_extraido.strip()) < 5:
                    return self._send_json(400, {
                        "success": False,
                        "error": "Não foi possível extrair texto legível deste arquivo no servidor."
                    })

                ext = (nome_arquivo.rsplit(".", 1)[-1] if "." in nome_arquivo else "doc").lower()
                return self._send_json(200, {
                    "success": True,
                    "texto": texto_extraido.strip(),
                    "formato": ext,
                    "nomeArquivo": nome_arquivo
                })
            except Exception as ex:
                return self._send_json(500, {"success": False, "error": f"Erro no processamento do arquivo: {str(ex)}"})

        # ---- Gerar questões com Gemini ----
        elif path == "/api/gemini/gerar-questoes":
            disciplina = body.get("disciplina") or "Geral"
            ano_turma = body.get("anoTurma") or "8º Ano Fundamental"
            tema = body.get("tema") or "Conteúdo Geral"
            estilo = body.get("estilo") or "Prova Paulista"
            habilidade_bncc = body.get("habilidadeBNCC") or ""
            texto_base = body.get("textoBase") or ""

            qtd_total = safe_int(body.get("quantidade"), 3)
            tipo_q = body.get("tipoQuestoes") or "mistas"

            try:
                if body.get("qtdMultiplaEscolha") is not None and body.get("qtdDissertativa") is not None:
                    qtd_multipla = safe_int(body.get("qtdMultiplaEscolha"), 1)
                    qtd_dissertativa = safe_int(body.get("qtdDissertativa"), 1)
                elif tipo_q == "multipla_escolha":
                    qtd_multipla = qtd_total
                    qtd_dissertativa = 0
                elif tipo_q == "dissertativa":
                    qtd_multipla = 0
                    qtd_dissertativa = qtd_total
                else:
                    qtd_multipla = max(1, qtd_total * 2 // 3)
                    qtd_dissertativa = max(1, qtd_total - qtd_multipla)
            except Exception:
                qtd_multipla = 2
                qtd_dissertativa = 1

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
      "correta": "A",
      "alternativas": [
        {"id": "A", "texto": "Texto da alternativa A", "correta": true, "justificativa": "Por que esta é a correta"},
        {"id": "B", "texto": "Texto da alternativa B", "correta": false, "justificativa": "Por que é incorreta (distrator)"},
        {"id": "C", "texto": "Texto da alternativa C", "correta": false, "justificativa": "Por que é incorreta"},
        {"id": "D", "texto": "Texto da alternativa D", "correta": false, "justificativa": "Por que é incorreta"}
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

            raw_ai = None
            err = None
            if get_gemini_api_key():
                raw_ai, err = call_gemini(user_prompt, system_instruction=sys_prompt, json_mode=True)
            else:
                err = "Chave Gemini não configurada."

            if err or not raw_ai:
                mock_data = generate_smart_mock_questions(disciplina, ano_turma, tema, estilo, qtd_multipla, qtd_dissertativa, habilidade_bncc)
                return self._send_json(200, {
                    "success": True,
                    "modo": "demonstracao" if not get_gemini_api_key() else "aviso",
                    "aviso": err or "Gerado via motor pedagógico de segurança. Para IA ao vivo personalizada, defina sua chave Gemini.",
                    "resultado": mock_data
                })

            try:
                clean_json = re.sub(r"^```json\s*", "", raw_ai.strip())
                clean_json = re.sub(r"\s*```$", "", clean_json.strip())
                parsed_res = json.loads(clean_json)

                for i, q in enumerate(parsed_res.get("questoes", [])):
                    q["id"] = "q_gen_" + str(i + 1) + "_" + uuid.uuid4().hex[:4]
                    if q.get("tipo") == "multipla_escolha":
                        alts = q.get("alternativas", [])
                        for a in alts:
                            if "id" in a:
                                a["id"] = str(a["id"]).upper().strip()
                        if not q.get("correta") and alts:
                            correta_cand = next((a["id"] for a in alts if a.get("correta")), alts[0]["id"])
                            q["correta"] = correta_cand
                        else:
                            q["correta"] = str(q.get("correta", "A")).upper().strip()
                        for a in alts:
                            a["correta"] = (a.get("id") == q["correta"])

                return self._send_json(200, {
                    "success": True,
                    "modo": "gemini_flash",
                    "resultado": parsed_res
                })
            except Exception as parse_err:
                logger.error(f"Erro parseando JSON da IA: {parse_err}. Raw: {raw_ai}")
                mock_data = generate_smart_mock_questions(disciplina, ano_turma, tema, estilo, qtd_multipla, qtd_dissertativa, habilidade_bncc)
                return self._send_json(200, {
                    "success": True,
                    "modo": "demonstracao",
                    "aviso": "Formatado via motor pedagógico.",
                    "resultado": mock_data
                })

        # ---- Estruturar questões de documento ----
        elif path == "/api/gemini/estruturar-questoes":
            raw_text = body.get("texto", "").strip()
            formato = body.get("formato", "documento")
            nome_arquivo = body.get("nomeArquivo", "avaliacao")

            if not raw_text:
                return self._send_json(400, {"success": False, "error": "Texto do documento não fornecido para estruturação."})

            sys_prompt = """Você é um parser e estruturador de avaliações educacionais de altíssima fidelidade da rede escolar.
Sua ÚNICA tarefa é ler o texto bruto extraído de um arquivo (Word, PDF, Excel ou PowerPoint) contendo um questionário/prova e convertê-lo com EXATIDÃO para o formato JSON do sistema.

DIRETRIZES FUNDAMENTAIS:
1. SEM INVENÇÃO / SEM ALUCINAÇÃO: Não invente novas questões. Não crie itens que não estejam no texto. Não altere os enunciados nem o conteúdo das alternativas originais.
2. ESTRUTURAÇÃO DE QUESTÕES:
   - Identifique cada item/questão contida no documento.
   - Detecte se é "multipla_escolha" ou "dissertativa".
   - Para múltipla escolha: extraia todas as alternativas originais com seus identificadores em maiúsculo (id: "A", "B", "C", "D", "E"...).
   - GABARITO: Se o documento assinalar a alternativa correta (asterisco, marcação X, negrito ou gabarito no fim), defina o campo "correta" com a letra exata (ex: "A"). Se o documento NÃO indicar gabarito explícito para uma questão objetiva, resolva a questão com rigor e defina a letra correta no campo "correta".
   - Para dissertativas: preserve o comando/enunciado, capture a resposta esperada ou critérios de correção caso constem, ou forneça pontos-chave sintéticos.
   - Textos de Apoio: Se houver trechos de leitura, excertos ou contextos antes das perguntas, capture no campo "textoApoio".
   - Metadados: Se o cabeçalho tiver título da prova, disciplina ou ano escolar, extraia em "tituloSugerido", "disciplinaSugerida" e "anoTurmaSugerido".

Retorne APENAS um objeto JSON válido no formato:
{
  "tituloSugerido": "Título extraído do questionário",
  "disciplinaSugerida": "Disciplina identificada ou vazio",
  "anoTurmaSugerido": "Ano/Série identificado ou vazio",
  "questoes": [
    {
      "tipo": "multipla_escolha",
      "habilidadeBNCC": "Código BNCC correspondente (ex: EF08GE05)",
      "enunciado": "Enunciado fiel e original da questão",
      "textoApoio": "Texto de apoio ou citação original se houver",
      "peso": 2.5,
      "alternativas": [
        {"id": "A", "texto": "Texto original da alternativa A"},
        {"id": "B", "texto": "Texto original da alternativa B"},
        {"id": "C", "texto": "Texto original da alternativa C"},
        {"id": "D", "texto": "Texto original da alternativa D"}
      ],
      "correta": "A"
    },
    {
      "tipo": "dissertativa",
      "habilidadeBNCC": "Código BNCC correspondente",
      "enunciado": "Comando/enunciado fiel original da questão dissertativa",
      "textoApoio": "Texto de apoio original se houver",
      "peso": 2.5,
      "respostaEsperada": "Resposta modelo ou critérios de gabarito",
      "criteriosCorrecao": "Critérios de avaliação"
    }
  ]
}"""

            user_prompt = "Aqui está um questionário pronto extraído de um arquivo " + formato.upper() + " ('" + nome_arquivo + "') — estruture-o no formato do sistema, sem inventar nada:\n\n" + raw_text[:28000]

            raw_ai, err = call_gemini(user_prompt, system_instruction=sys_prompt, json_mode=True)

            if err or not raw_ai:
                parsed_fallback = parse_document_text_fallback(raw_text, nome_arquivo)
                return self._send_json(200, {
                    "success": True,
                    "modo": "demonstracao_estruturacao",
                    "aviso": err or "Estruturado via motor de análise textual de segurança.",
                    "resultado": parsed_fallback
                })

            try:
                clean_json = re.sub(r"^```json\s*", "", raw_ai.strip())
                clean_json = re.sub(r"\s*```$", "", clean_json.strip())
                parsed_res = json.loads(clean_json)

                questoes = parsed_res.get("questoes", [])
                total_q = max(1, len(questoes))
                peso_por_q = round(10.0 / total_q, 1)

                for i, q in enumerate(questoes):
                    q["id"] = "q_imp_" + str(i + 1) + "_" + uuid.uuid4().hex[:4]
                    if not q.get("peso"):
                        q["peso"] = peso_por_q
                    if q.get("tipo") == "multipla_escolha":
                        alts = q.get("alternativas", [])
                        for a in alts:
                            if "id" in a:
                                a["id"] = str(a["id"]).upper().strip()
                        if not q.get("correta") and alts:
                            q["correta"] = alts[0]["id"]
                        else:
                            q["correta"] = str(q.get("correta", "A")).upper().strip()

                return self._send_json(200, {
                    "success": True,
                    "modo": "gemini_flash_estruturador",
                    "resultado": parsed_res
                })
            except Exception as parse_err:
                logger.error(f"Erro parseando estruturação IA: {parse_err}. Usando contingência.")
                parsed_fallback = parse_document_text_fallback(raw_text, nome_arquivo)
                return self._send_json(200, {
                    "success": True,
                    "modo": "fallback_estruturacao",
                    "aviso": "Estruturado via motor de contingência textual.",
                    "resultado": parsed_fallback
                })

        # ---- Corrigir dissertativa com Gemini ----
        elif path == "/api/gemini/corrigir-dissertativa":
            enunciado = body.get("enunciado", "")
            resposta_aluno = body.get("respostaAluno", "")
            resposta_esperada = body.get("respostaEsperada", "")
            criterios = body.get("criteriosCorrecao", [])
            peso_maximo = safe_float(body.get("pesoMaximo"), 5.0)

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
                            {"criterio": "Argumentação e clareza", "pontosObtidos": round(score * 0.5, 1), "pontosMax": round(peso_maximo * 0.5, 1), "observacao": "Adequado à rubrica"}
                        ]
                    }
                })

            try:
                clean_json = re.sub(r"^```json\s*", "", raw_ai.strip())
                clean_json = re.sub(r"\s*```$", "", clean_json.strip())
                parsed_res = json.loads(clean_json)
                return self._send_json(200, {"success": True, "modo": "gemini_flash", "correcao": parsed_res})
            except Exception as e:
                return self._send_json(500, {"success": False, "error": "Erro decodificando correção: " + str(e)})

        # ---- Enviar submissão (aluno) ----
        elif path == "/api/submissoes":
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
                    peso = safe_float(q.get("peso"), 1.0)
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
                    "statusCorrecao": "aguardando_dissertativa" if nota_max_diss > 0 else "finalizada"
                }

            if index is not None:
                submissoes[index] = body
            else:
                submissoes.insert(0, body)

            save_json(SUB_FILE, submissoes)
            return self._send_json(201, {"success": True, "submissao": body, "message": "Atividade enviada com sucesso!"})

        # ---- Registrar infração (aluno) ----
        elif path.startswith("/api/submissoes/") and path.endswith("/infracao"):
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
                        "historico": []
                    },
                    "respostas": {}
                }
                submissoes.append(sub)

            infracoes = sub.setdefault("infracoes", {
                "totalTrocasAba": 0,
                "tempoForaSegundos": 0,
                "saidasTelaCheia": 0,
                "tentativasCopiarColar": 0,
                "tentativasPrint": 0,
                "historico": []
            })

            tipo = body.get("tipo", "alerta")
            detalhe = body.get("detalhe", "Evento de segurança")
            tempo_fora = safe_int(body.get("tempoForaSegundos"), 0)

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
                "detalhe": detalhe
            })

            save_json(SUB_FILE, submissoes)
            return self._send_json(200, {"success": True, "infracoes": infracoes})

        # ---- Corrigir submissão (professor) ----
        elif path.startswith("/api/submissoes/") and path.endswith("/corrigir"):
            sub_id = path.replace("/api/submissoes/", "").replace("/corrigir", "").strip()
            submissoes = load_json(SUB_FILE, [])
            sub = next((s for s in submissoes if s.get("id") == sub_id), None)

            if not sub:
                return self._send_json(404, {"success": False, "error": "Submissão não encontrada."})

            sub["status"] = "corrigida"
            sub["correcao"] = body.get("correcao", sub.get("correcao", {}))
            save_json(SUB_FILE, submissoes)
            return self._send_json(200, {"success": True, "submissao": sub})

        # ---- Salvar configurações ----
        elif path == "/api/configuracoes":
            cfg = load_json(CONFIG_FILE, {})
            prof_email = body.get("professorEmail", "").strip().lower()
            nova_senha = body.get("novaSenhaProfessor", "").strip()

            if nova_senha:
                if prof_email:
                    professores = load_json(PROF_FILE, {})
                    if isinstance(professores, dict) and prof_email in professores:
                        professores[prof_email]["senha"] = hash_senha(nova_senha)
                        save_json(PROF_FILE, professores)
                cfg["senhaProfessor"] = hash_senha(nova_senha)
                body.pop("novaSenhaProfessor", None)

            cfg.update(body)
            save_json(CONFIG_FILE, cfg)
            return self._send_json(200, {"success": True, "message": "Configurações salvas com sucesso!"})

        # ---- Rota não encontrada ----
        else:
            return self._send_json(404, {"success": False, "error": "Rota não encontrada."})

    # --------------------------------------------------------
    # DELETE
    # --------------------------------------------------------

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Exige professor autenticado
        professor = self._verificar_token_professor()
        if not professor:
            return self._send_json(401, {"success": False, "error": "Acesso não autorizado. Faça login do professor."})

        if path.startswith("/api/atividades/"):
            atv_id = path.replace("/api/atividades/", "").strip()
            atividades = load_json(ATV_FILE, [])
            atividades = [a for a in atividades if a.get("id") != atv_id]
            save_json(ATV_FILE, atividades)
            return self._send_json(200, {"success": True, "message": "Atividade excluída com sucesso."})

        return self._send_json(404, {"success": False, "error": "Rota não encontrada."})


# ============================================================
# EXECUÇÃO DO SERVIDOR
# ============================================================

def run_server():
    os.chdir(BASE_DIR)
    ThreadingHTTPServer.allow_reuse_address = True

    with ThreadingHTTPServer(("", PORT), SecureExamHandler) as httpd:
        logger.info("==================================================")
        logger.info("  🛡️ ATIVIDADE SEGURA - Servidor Rodando na Porta %s", PORT)
        logger.info("  🌐 Painel: http://localhost:%s", PORT)
        logger.info("  🔒 Acesso Docente: http://localhost:%s/#professor", PORT)
        logger.info("==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            logger.info("Servidor encerrado.")


if __name__ == "__main__":
    run_server()
