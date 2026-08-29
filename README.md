# 🛡️ Atividade Segura — Plataforma de Avaliações Anticola & IA Pedagógica

Plataforma web para professores e estudantes das redes estadual e particular, que une **inteligência artificial** para criar e corrigir atividades com um **modo prova protegido**, impedindo cópias, troca de abas e saídas da tela cheia.

---

## ✨ Destaques

- 🧠 **Geração de questões com IA** alinhadas à BNCC, Prova Paulista e SARESP
- 📝 **Correção automática de dissertativas** com feedback formativo
- 🔒 **Modo Prova Blindado** com bloqueio de atalhos e tela cheia obrigatória
- 🕵️ **Monitoramento de infrações** em tempo real (troca de abas, cópias, saída de tela)
- 💾 **Salvamento automático** contra quedas de conexão

---

## 👩‍🏫 Funcionalidades

### Painel da Professora

- **Gerador Pedagógico com IA (Google Gemini)**  
  Cria questões de múltipla escolha e dissertativas alinhadas às diretrizes educacionais.

- **Corretor Automático de Dissertativas**  
  Analisa respostas com base na rubrica do professor e sugere nota + feedback formativo em 1 clique.

- **Painel de Monitoramento & Infrações**  
  Relatório em tempo real de trocas de abas, saídas de tela cheia e tentativas de cópia, tudo com data e hora.

- **Modo Visualizar como Aluno**  
  Permite testar a experiência do estudante e validar as travas de segurança.

### Área do Estudante — Modo Prova Blindado

- **Bloqueio de teclas e atalhos**: Ctrl+C, Ctrl+V, Ctrl+P, F12, botão direito e seleção de texto.
- **Tela cheia obrigatória** com avisos caso o aluno tente sair.
- **Detecção de troca de abas** com cronometragem e notificação.
- **Marca d'água dinâmica** com nome e RA do aluno sobre as questões, dificultando fotos.
- **Salvamento automático em tempo real** para evitar perda de respostas.

---

## 🛠️ Tecnologias Utilizadas

- **Python 3** — servidor local
- **HTML, CSS e JavaScript** — interface e controle de segurança no navegador
- **Google Gemini API** — geração e correção de atividades
- **Git/GitHub** — versionamento

---

## 📋 Pré-requisitos

- **Python 3.8 ou superior**
- Navegador atualizado (Chrome, Edge ou Firefox)
- Uma chave de API do Google Gemini (gratuita no [Google AI Studio](https://aistudio.google.com/app/apikey))

---

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/atividade-segura.git
