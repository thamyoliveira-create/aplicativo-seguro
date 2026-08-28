# 🛡️ Atividade Segura - Plataforma de Avaliações Anticola & IA Pedagógica

Desenvolvido para professores e estudantes da rede estadual e escolas públicas/privadas, integrando **Google Gemini 3.7 Flash** e mecanismos de segurança no navegador.

---

## 🚀 Funcionalidades Principais

### 👩‍🏫 Painel da Professora
- **Gerador Pedagógico com IA (Gemini 3.7 Flash)**: Criação de questões de Múltipla Escolha e Dissertativas alinhadas à **BNCC**, **Prova Paulista** e **SARESP**.
- **Corretor Automático de Dissertativas por IA**: Análise da resposta do aluno com base na rubrica do professor, sugerindo nota e feedback formativo com 1 clique.
- **Painel de Monitoramento & Infrações**: Relatório em tempo real de trocas de abas, saídas de tela cheia e tentativas de cópia com carimbo de data/hora.
- **Modo "Visualizar como Aluno"**: Teste instantâneo de toda a experiência e travas de segurança.

### 🎓 Área do Estudante ("Modo Prova Blindado")
- **Bloqueio de Teclas & Atalhos**: Interceptação de `Ctrl+C`, `Ctrl+V`, `Ctrl+P` (impressão), `F12`, clique direito e seleção de texto.
- **Tela Cheia Obrigatória**: Bloqueio com aviso caso o aluno saia da tela cheia.
- **Detecção de Troca de Abas**: Cronometragem e notificação de saídas da página.
- **Marca d'Água Dinâmica Anti-Foto**: Carimbo visual contínuo com Nome e RA do aluno cobrindo as questões.
- **Salvamento Automático em Tempo Real**: Proteção contra queda de conexão ou fechamento acidental.

---

## 🏃 Como Executar Localmente

No terminal, execute:
```bash
python3 server.py
```
Acesse no seu navegador:
- **Painel Geral**: `http://localhost:3000`
- **Área da Professora**: `http://localhost:3000/#professor`
- **Área do Estudante**: `http://localhost:3000/#aluno`

---

## ⚙️ Configuração da Chave Gemini

Você pode configurar a chave da API do Gemini de duas formas:
1. Pelo próprio painel da professora na aba **Configurações & IA**; ou
2. Definindo a variável de ambiente: `export GEMINI_API_KEY="sua-chave"`
