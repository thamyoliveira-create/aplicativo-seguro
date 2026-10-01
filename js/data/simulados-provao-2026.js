/**
 * Simulados Provão Paulista 2026 — Dados Estruturados Oficiais
 * Secretaria da Educação do Estado de São Paulo (SEDUC-SP) / VUNESP
 * 1ª e 2ª Série do Ensino Médio · 180 Questões com Metadados & Gabarito Oficial
 */

const SIMULADOS_CONFIG = {
  "1serie_dia1": {
    "id": "1serie_dia1",
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "dia": 1,
    "titulo": "Simulado Provão Paulista 2026 · 1ª Série · 1º Dia",
    "descricao": "Linguagens e suas Tecnologias (Língua Portuguesa e Inglês) & Ciências da Natureza (Física, Química e Biologia)",
    "totalQuestoes": 48,
    "tempoMinutos": 240,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "gabaritoPdfUrl": "assets/simulados/Gabarito_Simulado_Provao_2026.pdf",
    "componentes": [
      "Língua Portuguesa",
      "Língua Inglesa",
      "Física",
      "Química",
      "Biologia"
    ]
  },
  "1serie_dia2": {
    "id": "1serie_dia2",
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "dia": 2,
    "titulo": "Simulado Provão Paulista 2026 · 1ª Série · 2º Dia",
    "descricao": "Matemática e suas Tecnologias & Ciências Humanas e Sociais Aplicadas (História, Geografia e Filosofia)",
    "totalQuestoes": 42,
    "tempoMinutos": 210,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "gabaritoPdfUrl": "assets/simulados/Gabarito_Simulado_Provao_2026.pdf",
    "componentes": [
      "Matemática",
      "História",
      "Geografia",
      "Filosofia"
    ]
  },
  "2serie_dia1": {
    "id": "2serie_dia1",
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "dia": 1,
    "titulo": "Simulado Provão Paulista 2026 · 2ª Série · 1º Dia",
    "descricao": "Linguagens e suas Tecnologias (Língua Portuguesa e Inglês) & Ciências da Natureza (Física, Química e Biologia)",
    "totalQuestoes": 48,
    "tempoMinutos": 240,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "gabaritoPdfUrl": "assets/simulados/Gabarito_Simulado_Provao_2026.pdf",
    "componentes": [
      "Língua Portuguesa",
      "Língua Inglesa",
      "Física",
      "Química",
      "Biologia"
    ]
  },
  "2serie_dia2": {
    "id": "2serie_dia2",
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "dia": 2,
    "titulo": "Simulado Provão Paulista 2026 · 2ª Série · 2º Dia",
    "descricao": "Matemática e suas Tecnologias & Ciências Humanas e Sociais Aplicadas (História, Geografia e Sociologia)",
    "totalQuestoes": 42,
    "tempoMinutos": 210,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "gabaritoPdfUrl": "assets/simulados/Gabarito_Simulado_Provao_2026.pdf",
    "componentes": [
      "Matemática",
      "História",
      "Geografia",
      "Sociologia"
    ]
  }
};

const SIMULADOS_QUESTOES = [
  {
    "id": "provao2026_1s_d1_q01",
    "simuladoId": "1serie_dia1",
    "numero": 1,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 01",
    "descritor": "4.7. Interação entre texto verbal e não verbal.",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Interação entre texto verbal e não verbal: inferência em meme",
    "taxaAcerto": 72.4,
    "dificuldade": "Fácil",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p1.webp"
  },
  {
    "id": "provao2026_1s_d1_q02",
    "simuladoId": "1serie_dia1",
    "numero": 2,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 03",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Sentido figurado (conotação)",
    "taxaAcerto": 62.5,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p1.webp"
  },
  {
    "id": "provao2026_1s_d1_q03",
    "simuladoId": "1serie_dia1",
    "numero": 3,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 04",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "6.1.1 Literatura portuguesa: Trovadorismo",
    "assunto": "Trovadorismo: cantiga de amigo e eu lírico feminino",
    "taxaAcerto": 73.4,
    "dificuldade": "Fácil",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_1s_d1_q04",
    "simuladoId": "1serie_dia1",
    "numero": 4,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 07",
    "descritor": "3.2. Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos. Organização e reorganização de orações e períodos.",
    "conteudoEdital": "3.2 Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos",
    "assunto": "Conectivos: valor causal e reescrita de período",
    "taxaAcerto": 79.9,
    "dificuldade": "Fácil",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_1s_d1_q05",
    "simuladoId": "1serie_dia1",
    "numero": 5,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 08",
    "descritor": "5.2.1 Análise literária: gêneros literários (poema e conto); elementos de composição; recursos estilísticos.",
    "conteudoEdital": "5.1.1 Literatura brasileira: Barroco",
    "assunto": "Barroco: poesia lírico-amorosa de Gregório de Matos",
    "taxaAcerto": 59.4,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_1s_d1_q06",
    "simuladoId": "1serie_dia1",
    "numero": 6,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 10",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.8 Figuras de linguagem",
    "assunto": "Figuras de linguagem: metáfora",
    "taxaAcerto": 72.2,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_1s_d1_q07",
    "simuladoId": "1serie_dia1",
    "numero": 7,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 13",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Interação entre texto verbal e não verbal: elementos visuais",
    "taxaAcerto": 64.4,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_1s_d1_q08",
    "simuladoId": "1serie_dia1",
    "numero": 8,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 14",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Duplo sentido de palavras (polissemia)",
    "taxaAcerto": 73.3,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_1s_d1_q09",
    "simuladoId": "1serie_dia1",
    "numero": 9,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 15",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Significação explícita e implícita",
    "taxaAcerto": 65.7,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_1s_d1_q10",
    "simuladoId": "1serie_dia1",
    "numero": 10,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 01",
    "descritor": "4.7. Interação entre texto verbal e não verbal",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Onomatopeia em tira: interação verbal e não verbal",
    "taxaAcerto": 88.3,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_1s_d1_q11",
    "simuladoId": "1serie_dia1",
    "numero": 11,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 02",
    "descritor": "4.7. Interação entre texto verbal e não verbal.",
    "conteudoEdital": "4.2 Articulação do texto: coesão e coerência",
    "assunto": "Coerência textual: seleção lexical adequada ao contexto",
    "taxaAcerto": 78.1,
    "dificuldade": "Fácil",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_1s_d1_q12",
    "simuladoId": "1serie_dia1",
    "numero": 12,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 11",
    "descritor": "2.1. Classes de palavras: verbo; 4.7. Interação entre texto verbal e não verbal; 4.6. Intertextualidade e interdiscursividade",
    "conteudoEdital": "2.3 Flexão nominal e verbal (tempo, modo, aspecto, voz)",
    "assunto": "Modo imperativo: valor de apelo",
    "taxaAcerto": 80.7,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_1s_d1_q13",
    "simuladoId": "1serie_dia1",
    "numero": 13,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 13",
    "descritor": "5.1.2 Períodos literário: Romantismo",
    "conteudoEdital": "5.2.2 Análise literária: conto e crônica (literatura brasileira)",
    "assunto": "Análise literária: foco narrativo e caracterização de personagem",
    "taxaAcerto": 62.7,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_1s_d1_q14",
    "simuladoId": "1serie_dia1",
    "numero": 14,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 14",
    "descritor": "4.8. Figuras de Linguagem",
    "conteudoEdital": "4.8 Figuras de linguagem",
    "assunto": "Figuras de linguagem: comparação",
    "taxaAcerto": 61.6,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p5.webp"
  },
  {
    "id": "provao2026_1s_d1_q15",
    "simuladoId": "1serie_dia1",
    "numero": 15,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 18",
    "descritor": "6.1.2 Períodos literário: Realismo",
    "conteudoEdital": "6.2 Análise literária: poema e conto (literatura portuguesa)",
    "assunto": "Análise literária: caracterização de personagem em narrativa portuguesa",
    "taxaAcerto": 66.6,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p5.webp"
  },
  {
    "id": "provao2026_1s_d1_q16",
    "simuladoId": "1serie_dia1",
    "numero": 16,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 01",
    "descritor": "4.7. Interação entre texto verbal e não verbal",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Charge: interação entre linguagem verbal e não verbal",
    "taxaAcerto": 78.8,
    "dificuldade": "Fácil",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p5.webp"
  },
  {
    "id": "provao2026_1s_d1_q17",
    "simuladoId": "1serie_dia1",
    "numero": 17,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 1 · Questão 10",
    "descritor": "3.2 Conectivos: valores lógico-semânticos. Organização e reorganização de períodos.",
    "conteudoEdital": "3.2 Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos",
    "assunto": "Conectivos: valor condicional (caso e se)",
    "taxaAcerto": 72.7,
    "dificuldade": "Fácil",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_1s_d1_q18",
    "simuladoId": "1serie_dia1",
    "numero": 18,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 08",
    "descritor": "4.1 Níveis de significação do texto: significação explícita e implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Significação implícita em poema",
    "taxaAcerto": 75.7,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_1s_d1_q19",
    "simuladoId": "1serie_dia1",
    "numero": 19,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 19",
    "descritor": "5. Compreensão da relação entre conteúdos de diferentes textos, ou das relações entre imagens, gráficos, tabelas, infográficos e texto.",
    "conteudoEdital": "4 Relação entre textos, ou entre imagens, tabelas, infográficos e texto",
    "assunto": "Relação entre textos verbais e imagens",
    "taxaAcerto": 69.2,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_1s_d1_q20",
    "simuladoId": "1serie_dia1",
    "numero": 20,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 24",
    "descritor": "5. Compreensão da relação entre conteúdos de diferentes textos, ou das relações entre imagens, gráficos, tabelas, infográficos e texto.",
    "conteudoEdital": "4 Relação entre textos, ou entre imagens, tabelas, infográficos e texto",
    "assunto": "Relação entre imagem e texto em tirinha",
    "taxaAcerto": 37.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_1s_d1_q21",
    "simuladoId": "1serie_dia1",
    "numero": 21,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 21",
    "descritor": "2. Compreensão de ideias expressas em trechos, frases e parágrafos, e/ou de sua relação com ideias presentes em outros trechos, frases e parágrafos do texto.",
    "conteudoEdital": "6 Significado de itens lexicais (verbos modais, marcadores discursivos, conectivos)",
    "assunto": "Vocabulário: expressões idiomáticas e equivalência em português",
    "taxaAcerto": 50.7,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p7.webp"
  },
  {
    "id": "provao2026_1s_d1_q22",
    "simuladoId": "1serie_dia1",
    "numero": 22,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 1 · Questão 19",
    "descritor": "1. Compreensão do sentido geral e/ou do propósito do texto, bem como a identificação de seu gênero textual.",
    "conteudoEdital": "1 Sentido geral / propósito do texto; gênero textual",
    "assunto": "Sentido geral e gênero textual: notícia",
    "taxaAcerto": 46.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p7.webp"
  },
  {
    "id": "provao2026_1s_d1_q23",
    "simuladoId": "1serie_dia1",
    "numero": 23,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 1 · Questão 22",
    "descritor": "6. Compreensão crítica de textos: discriminação entre fato e opinião; reconhecimento de posicionamentos, crenças ou opiniões expressas no texto; comparação entre diferentes perspectivas apresentadas sobre um mesmo assunto, entre outros.",
    "conteudoEdital": "5 Compreensão crítica: fato e opinião, posicionamentos, perspectivas",
    "assunto": "Compreensão crítica: crítica em cartum",
    "taxaAcerto": 76.7,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p7.webp"
  },
  {
    "id": "provao2026_1s_d1_q24",
    "simuladoId": "1serie_dia1",
    "numero": 24,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 20",
    "descritor": "7. Identificação do significado de itens lexicais (palavras ou expressões) fundamentais para a adequada compreensão do texto, dentre eles verbos modais e marcadores discursivos como preposições, advérbios, conectivos e conjunções.",
    "conteudoEdital": "6 Significado de itens lexicais (verbos modais, marcadores discursivos, conectivos)",
    "assunto": "Verbos modais: may (possibilidade)",
    "taxaAcerto": 54.3,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_1s_d1_q25",
    "simuladoId": "1serie_dia1",
    "numero": 25,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 29",
    "descritor": "4.2. Energia mecânica: energia cinética.",
    "conteudoEdital": "4.2 Energia mecânica: cinética, potencial gravitacional e elástica",
    "assunto": "Energia cinética",
    "taxaAcerto": 30.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_1s_d1_q26",
    "simuladoId": "1serie_dia1",
    "numero": 26,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 26",
    "descritor": "2.2. Leis de Newton: Princípio de ação e reação.",
    "conteudoEdital": "2.2 Leis de Newton: inércia, princípio fundamental, ação e reação",
    "assunto": "Leis de Newton: ação e reação",
    "taxaAcerto": 50.9,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_1s_d1_q27",
    "simuladoId": "1serie_dia1",
    "numero": 27,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 31",
    "descritor": "3.2. Lei da gravitação universal de Newton.",
    "conteudoEdital": "3.2 Lei da gravitação universal; campo gravitacional",
    "assunto": "Lei da gravitação universal: dependência da distância",
    "taxaAcerto": 31.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_1s_d1_q28",
    "simuladoId": "1serie_dia1",
    "numero": 28,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 27",
    "descritor": "1.1. Velocidade escalar média.",
    "conteudoEdital": "1.3 MU e MUV; funções horárias; queda livre e lançamento vertical",
    "assunto": "Movimento uniforme: distância e tempo",
    "taxaAcerto": 26.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_1s_d1_q29",
    "simuladoId": "1serie_dia1",
    "numero": 29,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 25",
    "descritor": "1.1. Velocidade e Aceleração: escalar média e instantânea; vetorial média e instantânea.",
    "conteudoEdital": "1.1 Velocidade e aceleração: média e instantânea, escalar e vetorial",
    "assunto": "Velocidade escalar média",
    "taxaAcerto": 31.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_1s_d1_q30",
    "simuladoId": "1serie_dia1",
    "numero": 30,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 27",
    "descritor": "2.4. Forças: força gravitacional; força peso; força de reação normal; força de contato; força de tração; força de atrito; força elástica.",
    "conteudoEdital": "2.4 Forças: peso, normal, contato, tração, atrito, elástica",
    "assunto": "Força elástica: lei de Hooke e gráfico",
    "taxaAcerto": 36.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_1s_d1_q31",
    "simuladoId": "1serie_dia1",
    "numero": 31,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 31",
    "descritor": "4.1. Trabalho realizado por forças conservativas e não conservativas",
    "conteudoEdital": "4.1 Trabalho de forças conservativas e não conservativas",
    "assunto": "Trabalho da força resultante",
    "taxaAcerto": 24.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_1s_d1_q32",
    "simuladoId": "1serie_dia1",
    "numero": 32,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Física",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 32",
    "descritor": "4.3. Sistemas conservativos e não conservativos.",
    "conteudoEdital": "4.3 Sistemas conservativos e não conservativos",
    "assunto": "Sistemas não conservativos: energia dissipada",
    "taxaAcerto": 26.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_1s_d1_q33",
    "simuladoId": "1serie_dia1",
    "numero": 33,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 35",
    "descritor": "2.2. Representação de substâncias e de transformações químicas.",
    "conteudoEdital": "2.4 Equações químicas e balanceamento",
    "assunto": "Balanceamento de equações",
    "taxaAcerto": 27.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_1s_d1_q34",
    "simuladoId": "1serie_dia1",
    "numero": 34,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 33",
    "descritor": "7.1. Eletronegatividade, polaridade de ligaçoes e moléculas ;",
    "conteudoEdital": "1.2 Estado físico e propriedades dos materiais",
    "assunto": "Propriedades dos materiais: densidade e miscibilidade",
    "taxaAcerto": 53.5,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_1s_d1_q35",
    "simuladoId": "1serie_dia1",
    "numero": 35,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 40",
    "descritor": "8.2. Interações da água com outras substâncias.",
    "conteudoEdital": "3.1 Ácidos, bases, sais e óxidos: características e propriedades",
    "assunto": "Bases: caráter básico e pH",
    "taxaAcerto": 27.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_1s_d1_q36",
    "simuladoId": "1serie_dia1",
    "numero": 36,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 34",
    "descritor": "2.2. Representação de substâncias e de transformações químicas.",
    "conteudoEdital": "2.2 Representação de substâncias e de transformações químicas",
    "assunto": "Substâncias simples e compostas",
    "taxaAcerto": 33.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_1s_d1_q37",
    "simuladoId": "1serie_dia1",
    "numero": 37,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 36",
    "descritor": "8.4. Solubilidade e concentrações (porcentagem, ppm, g/L, mol/L, mol/kg, conversões de unidades).",
    "conteudoEdital": "8.4 Solubilidade e concentrações (%, ppm, g/L, mol/L)",
    "assunto": "Concentração em g/L",
    "taxaAcerto": 28.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_1s_d1_q38",
    "simuladoId": "1serie_dia1",
    "numero": 38,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 39",
    "descritor": "4.2. Óxidos e a chuva ácida",
    "conteudoEdital": "3.1 Ácidos, bases, sais e óxidos: características e propriedades",
    "assunto": "Óxidos: classificação e geometria do CO2",
    "taxaAcerto": 27.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_1s_d1_q39",
    "simuladoId": "1serie_dia1",
    "numero": 39,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 33",
    "descritor": "6.2. Características gerais das ligações químicas: ligação covalente, ligação iônica e ligação metálica.",
    "conteudoEdital": "6.2 Ligação covalente, iônica e metálica",
    "assunto": "Compostos iônicos: identificação de cátion e ânion na fórmula",
    "taxaAcerto": 42.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_1s_d1_q40",
    "simuladoId": "1serie_dia1",
    "numero": 40,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 34",
    "descritor": "5.2. Número atômico e de massa. Semelhanças entre átomos: isótopos, isóbaros e isótonos.",
    "conteudoEdital": "5.3 Classificação periódica e propriedades periódicas",
    "assunto": "Tabela periódica: leitura de massa atômica",
    "taxaAcerto": 55.0,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_1s_d1_q41",
    "simuladoId": "1serie_dia1",
    "numero": 41,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 41",
    "descritor": "1.9. Alternativas energéticas e soluções contra as ameaças ao equilíbrio dos ecossistemas.",
    "conteudoEdital": "1.8 Alternativas energéticas e soluções contra ameaças aos ecossistemas",
    "assunto": "Alternativas energéticas sustentáveis",
    "taxaAcerto": 44.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_1s_d1_q42",
    "simuladoId": "1serie_dia1",
    "numero": 42,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2024 · 1ª série · Prova Extra · Dia 1 · Questão 47",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "3.1 Níveis de organização; classificação binomial; taxonomia; cladogramas",
    "assunto": "Nomenclatura binomial: gênero e espécie",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_1s_d1_q43",
    "simuladoId": "1serie_dia1",
    "numero": 43,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 42",
    "descritor": "1.7. Principais ameaças antrópicas nos Ecossistemas terrestres e aquáticos, mudanças climáticas e seus efeitos",
    "conteudoEdital": "1.5 Sucessão ecológica",
    "assunto": "Sucessão ecológica",
    "taxaAcerto": 44.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p13.webp"
  },
  {
    "id": "provao2026_1s_d1_q44",
    "simuladoId": "1serie_dia1",
    "numero": 44,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 43",
    "descritor": "3.1. Níveis de organização da vida; classificação e nomenclatura binomial de Lineu; categorias taxonômicas; sistemática moderna; cladogramas.",
    "conteudoEdital": "3.1 Níveis de organização; classificação binomial; taxonomia; cladogramas",
    "assunto": "Cladogramas: leitura de caracteres compartilhados",
    "taxaAcerto": 53.1,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p13.webp"
  },
  {
    "id": "provao2026_1s_d1_q45",
    "simuladoId": "1serie_dia1",
    "numero": 45,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 43",
    "descritor": "2.6. Metabolismo energético: energia para a vida (fotossíntese, quimiossíntese, respiração aeróbia e fermentação).",
    "conteudoEdital": "2.4 Metabolismo energético: fotossíntese, quimiossíntese, respiração e fermentação",
    "assunto": "Metabolismo energético: respiração celular e ATP",
    "taxaAcerto": 41.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_1s_d1_q46",
    "simuladoId": "1serie_dia1",
    "numero": 46,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 41",
    "descritor": "1.8. Poluição ambiental e os impactos da intervenção humana: do ar, da água, do solo, sonora e visual.",
    "conteudoEdital": "1.7 Poluição ambiental e impactos da intervenção humana",
    "assunto": "Poluição da água: esgoto doméstico e saneamento",
    "taxaAcerto": 61.4,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_1s_d1_q47",
    "simuladoId": "1serie_dia1",
    "numero": 47,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 48",
    "descritor": "4.1. Fisiologia dos animais: digestão, respiração, circulação e reprodução.",
    "conteudoEdital": "4.1 Fisiologia dos animais: digestão, respiração, circulação e reprodução",
    "assunto": "Fisiologia animal: respiração pulmonar em mamíferos",
    "taxaAcerto": 39.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 15,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p15.webp"
  },
  {
    "id": "provao2026_1s_d1_q48",
    "simuladoId": "1serie_dia1",
    "numero": 48,
    "dia": 1,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 47",
    "descritor": "7.2. Procedimentos sistemáticos de investigação (elaboração de hipóteses, experimentação e simulação, construção e apresentação de conclusões).",
    "conteudoEdital": "6.1 Teorias da origem da vida",
    "assunto": "Origem da vida: biogênese x abiogênese (experimento de Redi)",
    "taxaAcerto": 49.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 16,
    "imagemPagina": "assets/simulados/pages/1serie_dia1_p16.webp"
  },
  {
    "id": "provao2026_1s_d2_q01",
    "simuladoId": "1serie_dia2",
    "numero": 1,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 02",
    "descritor": "1.5. Porcentagem, taxas e índices",
    "conteudoEdital": "1.3 Porcentagem, taxas e índices",
    "assunto": "Porcentagem: desconto",
    "taxaAcerto": 35.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_1s_d2_q02",
    "simuladoId": "1serie_dia2",
    "numero": 2,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 05",
    "descritor": "7.5. Áreas de polígonos (incluindo diferentes métodos para sua obtenção - reconfigurações, aproximações por cortes etc), círculos, coroa e setor circular.",
    "conteudoEdital": "3.3 Áreas de polígonos, círculos, coroa e setor circular",
    "assunto": "Área de polígonos por decomposição",
    "taxaAcerto": 28.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_1s_d2_q03",
    "simuladoId": "1serie_dia2",
    "numero": 3,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 07",
    "descritor": "5.3. Taxa de variação: crescimento linear.",
    "conteudoEdital": "2.3 Taxa de variação: crescimento linear",
    "assunto": "Taxa de variação constante: variação linear",
    "taxaAcerto": 34.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_1s_d2_q04",
    "simuladoId": "1serie_dia2",
    "numero": 4,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 05",
    "descritor": "7.5. Áreas de polígonos (incluindo diferentes métodos para sua obtenção - reconfigurações, aproximações por cortes etc), círculos, coroa e setor circular.",
    "conteudoEdital": "3.3 Áreas de polígonos, círculos, coroa e setor circular",
    "assunto": "Área de trapézio e triângulo",
    "taxaAcerto": 28.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_1s_d2_q05",
    "simuladoId": "1serie_dia2",
    "numero": 5,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 13",
    "descritor": "1.2. Razões, proporcionalidade direta.",
    "conteudoEdital": "1.2 Razões, proporcionalidade direta e inversa; grandeza proporcional ao quadrado da outra",
    "assunto": "Proporcionalidade direta: regra de três",
    "taxaAcerto": 43.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_1s_d2_q06",
    "simuladoId": "1serie_dia2",
    "numero": 6,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 07",
    "descritor": "1.2. Razões, proporcionalidade direta e inversa. Proporcionalidade entre duas grandezas, na qual uma é o quadrado da outra",
    "conteudoEdital": "1.2 Razões, proporcionalidade direta e inversa; grandeza proporcional ao quadrado da outra",
    "assunto": "Grandeza proporcional ao quadrado de outra",
    "taxaAcerto": 39.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_1s_d2_q07",
    "simuladoId": "1serie_dia2",
    "numero": 7,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 14",
    "descritor": "9.1. Gráficos: setores, linhas, barras, infográficos, histogramas, ramos e folhas. Tabelas e planilhas.",
    "conteudoEdital": "4.1 Gráficos (setores, linhas, barras, infográficos, histogramas, ramos e folhas), tabelas e planilhas",
    "assunto": "Gráfico de setores: representação de porcentagens",
    "taxaAcerto": 71.0,
    "dificuldade": "Fácil",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_1s_d2_q08",
    "simuladoId": "1serie_dia2",
    "numero": 8,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 04",
    "descritor": "5.5. Função quadrática: Conceitos e resolução de problemas, inclusive envolvendo inequações.",
    "conteudoEdital": "2.6 Pontos de máximo e mínimo em funções quadráticas",
    "assunto": "Função quadrática: ponto de máximo (área)",
    "taxaAcerto": 32.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_1s_d2_q09",
    "simuladoId": "1serie_dia2",
    "numero": 9,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 08",
    "descritor": "1.5. Porcentagem, taxas e índices.",
    "conteudoEdital": "1.3 Porcentagem, taxas e índices",
    "assunto": "Aumentos percentuais sucessivos",
    "taxaAcerto": 33.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_1s_d2_q10",
    "simuladoId": "1serie_dia2",
    "numero": 10,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 13",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "5.1 Sistema Internacional de Medidas: unidades e conversões",
    "assunto": "Conversão de unidades de capacidade: litro e mililitro",
    "taxaAcerto": 27.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_1s_d2_q11",
    "simuladoId": "1serie_dia2",
    "numero": 11,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 01",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "1.1 Números naturais, inteiros, racionais e reais: operações, ordem, reta numérica, problemas",
    "assunto": "Problemas com números naturais: equação do 1º grau",
    "taxaAcerto": 56.8,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_1s_d2_q12",
    "simuladoId": "1serie_dia2",
    "numero": 12,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 15",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "1.1 Números naturais, inteiros, racionais e reais: operações, ordem, reta numérica, problemas",
    "assunto": "Multiplicação com números decimais e milhões",
    "taxaAcerto": 47.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_1s_d2_q13",
    "simuladoId": "1serie_dia2",
    "numero": 13,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 03",
    "descritor": "5.4. Função polinomial do 1º grau e função constante: Conceitos e resolução de problemas, inclusive envolvendo inequações.",
    "conteudoEdital": "2.4 Função polinomial do 1º grau e função constante (inclui inequações)",
    "assunto": "Função polinomial do 1º grau",
    "taxaAcerto": 46.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_1s_d2_q14",
    "simuladoId": "1serie_dia2",
    "numero": 14,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 09",
    "descritor": "7.3. Semelhança e congruência de triângulos.",
    "conteudoEdital": "1.2 Razões, proporcionalidade direta e inversa; grandeza proporcional ao quadrado da outra",
    "assunto": "Razão e proporção: escala",
    "taxaAcerto": 58.0,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_1s_d2_q15",
    "simuladoId": "1serie_dia2",
    "numero": 15,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 10",
    "descritor": "7.4. Relações métricas nos triângulos, polígonos regulares e círculos.",
    "conteudoEdital": "3.2 Relações métricas nos triângulos, polígonos regulares e círculos",
    "assunto": "Comprimento da circunferência",
    "taxaAcerto": 45.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_1s_d2_q16",
    "simuladoId": "1serie_dia2",
    "numero": 16,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 10",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "1.1 Números naturais, inteiros, racionais e reais: operações, ordem, reta numérica, problemas",
    "assunto": "Divisão com resto: arredondamento para cima",
    "taxaAcerto": 49.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_1s_d2_q17",
    "simuladoId": "1serie_dia2",
    "numero": 17,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 07",
    "descritor": "9.1. Gráficos: setores, linhas, barras, infográficos, histogramas, ramos e folhas. Tabelas e planilhas.",
    "conteudoEdital": "4.1 Gráficos (setores, linhas, barras, infográficos, histogramas, ramos e folhas), tabelas e planilhas",
    "assunto": "Gráfico de setores: relação com tabela",
    "taxaAcerto": 85.8,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_1s_d2_q18",
    "simuladoId": "1serie_dia2",
    "numero": 18,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Matemática",
    "origem": "Provão 2024 · 1ª série · Prova Extra · Dia 2 · Questão 02",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "2.1 Relação entre grandezas: velocidade, densidade demográfica, densidade volumétrica",
    "assunto": "Densidade: relação massa e volume",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_1s_d2_q19",
    "simuladoId": "1serie_dia2",
    "numero": 19,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 21",
    "descritor": "2.2. Feudalismo e mundo feudal.",
    "conteudoEdital": "2.2 Feudalismo e mundo feudal",
    "assunto": "Técnicas agrícolas no feudalismo: rotação trienal",
    "taxaAcerto": 55.6,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_1s_d2_q20",
    "simuladoId": "1serie_dia2",
    "numero": 20,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 22",
    "descritor": "3.1. Renascimento Cultural",
    "conteudoEdital": "3.1 Renascimento Cultural",
    "assunto": "Renascimento: perspectiva na pintura",
    "taxaAcerto": 43.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_1s_d2_q21",
    "simuladoId": "1serie_dia2",
    "numero": 21,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 23",
    "descritor": "3.3. Expansão marítima e constituição do espaço atlântico.",
    "conteudoEdital": "3.3 Expansão marítima e espaço atlântico",
    "assunto": "Tráfico atlântico de africanos e colonização da América",
    "taxaAcerto": 54.7,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_1s_d2_q22",
    "simuladoId": "1serie_dia2",
    "numero": 22,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 26",
    "descritor": "3.8. Revolução Industrial.",
    "conteudoEdital": "3.8 Revolução Industrial",
    "assunto": "Revolução Industrial: ludismo",
    "taxaAcerto": 50.0,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_1s_d2_q23",
    "simuladoId": "1serie_dia2",
    "numero": 23,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 19",
    "descritor": "1.1. A democracia ateniense e a cidadania em Roma.",
    "conteudoEdital": "1.1 Democracia ateniense e cidadania em Roma",
    "assunto": "Cidadania no Império Romano",
    "taxaAcerto": 40.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_1s_d2_q24",
    "simuladoId": "1serie_dia2",
    "numero": 24,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 20",
    "descritor": "3.6. Iluminismo e Liberalismo.",
    "conteudoEdital": "3.6 Iluminismo e Liberalismo",
    "assunto": "Iluminismo: Locke e contratualismo",
    "taxaAcerto": 51.5,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_1s_d2_q25",
    "simuladoId": "1serie_dia2",
    "numero": 25,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 24",
    "descritor": "10.2. Primeira República: política, economia e movimentos sociais.",
    "conteudoEdital": "6.2 Primeira República: política, economia e movimentos sociais",
    "assunto": "Primeira República: política do café com leite",
    "taxaAcerto": 43.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_1s_d2_q26",
    "simuladoId": "1serie_dia2",
    "numero": 26,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "História",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 23",
    "descritor": "8.1. Povos indígenas na América portuguesa: dominação e resistência.",
    "conteudoEdital": "5.1 Povos indígenas na América portuguesa: dominação e resistência",
    "assunto": "Povos indígenas na visão do colonizador europeu",
    "taxaAcerto": 58.8,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_1s_d2_q27",
    "simuladoId": "1serie_dia2",
    "numero": 27,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 27",
    "descritor": "2.7. A geopolítica da água; o uso e a destruição dos recursos hídricos.",
    "conteudoEdital": "2.11 Conservação e preservação do patrimônio natural",
    "assunto": "Unidades de Conservação: objetivos",
    "taxaAcerto": 43.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_1s_d2_q28",
    "simuladoId": "1serie_dia2",
    "numero": 28,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 28",
    "descritor": "2.6. A dinâmica da água na superfície terrestre (hidrografia).",
    "conteudoEdital": "2.3 Dinâmica da água na superfície (hidrografia)",
    "assunto": "Bacia hidrográfica: divisor de águas",
    "taxaAcerto": 39.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_1s_d2_q29",
    "simuladoId": "1serie_dia2",
    "numero": 29,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 32",
    "descritor": "2.10. As paisagens vegetais no mundo e no Brasil (domínios morfoclimáticos, biomas, ecossistemas);",
    "conteudoEdital": "2.7 Paisagens vegetais: domínios morfoclimáticos, biomas",
    "assunto": "Domínios morfoclimáticos: Caatinga",
    "taxaAcerto": 35.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_1s_d2_q30",
    "simuladoId": "1serie_dia2",
    "numero": 30,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 29",
    "descritor": "3.2. Os sistemas de localização geográfica (coordenadas).",
    "conteudoEdital": "3.1 Cartografia como recurso para compreensão espacial",
    "assunto": "Fusos horários do Brasil",
    "taxaAcerto": 30.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_1s_d2_q31",
    "simuladoId": "1serie_dia2",
    "numero": 31,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 30",
    "descritor": "3.4. Métodos (representação qualitativa, ordenada, quantitativa e dinâmica), códigos, símbolos, escala cartográfica, anamorfose.",
    "conteudoEdital": "3.2 Sistemas, técnicas e tecnologias de representação gráfica e cartográfica",
    "assunto": "Projeções cartográficas: projeção cônica",
    "taxaAcerto": 30.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p9.webp"
  },
  {
    "id": "provao2026_1s_d2_q32",
    "simuladoId": "1serie_dia2",
    "numero": 32,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 30",
    "descritor": "1.4. Os países e as regiões geográficas.",
    "conteudoEdital": "1.3 Países e regiões geográficas",
    "assunto": "Oriente Médio: caracterização regional",
    "taxaAcerto": 43.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p9.webp"
  },
  {
    "id": "provao2026_1s_d2_q33",
    "simuladoId": "1serie_dia2",
    "numero": 33,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 31",
    "descritor": "1.5. Modos e sistemas de produção, setores da economia.",
    "conteudoEdital": "1.4 Modos e sistemas de produção; setores da economia",
    "assunto": "Indicadores econômicos: PIB",
    "taxaAcerto": 43.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p9.webp"
  },
  {
    "id": "provao2026_1s_d2_q34",
    "simuladoId": "1serie_dia2",
    "numero": 34,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 27",
    "descritor": "1.6. A relação entre produção e consumo nos territórios.",
    "conteudoEdital": "1.5 Relação entre produção e consumo nos territórios",
    "assunto": "Economia brasileira: PIB e instabilidade",
    "taxaAcerto": 43.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_1s_d2_q35",
    "simuladoId": "1serie_dia2",
    "numero": 35,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2024 · 1ª série · Prova Principal · Dia 2 · Questão 36",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "3.1 Questões éticas contemporâneas",
    "assunto": "Necropolítica: Mbembe",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_1s_d2_q36",
    "simuladoId": "1serie_dia2",
    "numero": 36,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 35",
    "descritor": "3.1. Questões éticas contemporâneas.",
    "conteudoEdital": "3.1 Questões éticas contemporâneas",
    "assunto": "Questões éticas contemporâneas: dependência digital",
    "taxaAcerto": 76.0,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_1s_d2_q37",
    "simuladoId": "1serie_dia2",
    "numero": 37,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 36",
    "descritor": "3.3. Meio ambiente e sociedade: impactos das novas tecnologias.",
    "conteudoEdital": "3.3 Meio ambiente e sociedade: impactos das novas tecnologias",
    "assunto": "Ética da responsabilidade: Hans Jonas",
    "taxaAcerto": 40.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_1s_d2_q38",
    "simuladoId": "1serie_dia2",
    "numero": 38,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 40",
    "descritor": "1.1. A Filosofia e o filosofar: natureza e especificidade da reflexão filosófica.",
    "conteudoEdital": "1.1 A Filosofia e o filosofar: natureza da reflexão filosófica",
    "assunto": "Reflexão filosófica: conceito",
    "taxaAcerto": 48.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_1s_d2_q39",
    "simuladoId": "1serie_dia2",
    "numero": 39,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 41",
    "descritor": "2.2. As abordagens racionalistas e empiristas do conhecimento: suas contribuições e seus problemas.",
    "conteudoEdital": "2.2 Racionalismo e empirismo",
    "assunto": "Racionalismo: Descartes e a crítica ao saber tradicional",
    "taxaAcerto": 41.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_1s_d2_q40",
    "simuladoId": "1serie_dia2",
    "numero": 40,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 35",
    "descritor": "3.3. Meio ambiente e sociedade: impactos das novas tecnologias.",
    "conteudoEdital": "3.3 Meio ambiente e sociedade: impactos das novas tecnologias",
    "assunto": "Meio ambiente e sociedade: mudanças climáticas",
    "taxaAcerto": 52.9,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_1s_d2_q41",
    "simuladoId": "1serie_dia2",
    "numero": 41,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 40",
    "descritor": "1.1. A Filosofia e o filosofar: natureza e especificidade da reflexão filosófica.",
    "conteudoEdital": "1.1 A Filosofia e o filosofar: natureza da reflexão filosófica",
    "assunto": "Sócrates e o método socrático",
    "taxaAcerto": 63.1,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_1s_d2_q42",
    "simuladoId": "1serie_dia2",
    "numero": 42,
    "dia": 2,
    "serie": "1ª Série",
    "serieSlug": "1serie",
    "componente": "Filosofia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 42",
    "descritor": "2.1. As relações entre o senso comum e o conhecimento científico.",
    "conteudoEdital": "2.1 Senso comum e conhecimento científico",
    "assunto": "Senso comum e conhecimento científico",
    "taxaAcerto": 43.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_1serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/1serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_2s_d1_q01",
    "simuladoId": "2serie_dia1",
    "numero": 1,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 07",
    "descritor": "3.2. Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos. Organização e reorganização de orações e períodos.",
    "conteudoEdital": "3.2 Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos",
    "assunto": "Conectivos: valor causal",
    "taxaAcerto": 79.9,
    "dificuldade": "Fácil",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p1.webp"
  },
  {
    "id": "provao2026_2s_d1_q02",
    "simuladoId": "2serie_dia1",
    "numero": 2,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 12",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Polissemia: sentido de palavra no contexto",
    "taxaAcerto": 59.4,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p1.webp"
  },
  {
    "id": "provao2026_2s_d1_q03",
    "simuladoId": "2serie_dia1",
    "numero": 3,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 16",
    "descritor": "4.1. Níveis de significação do texto: significação explícita e significação implícita; denotação e conotação.",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Denotação e conotação",
    "taxaAcerto": 59.2,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_2s_d1_q04",
    "simuladoId": "2serie_dia1",
    "numero": 4,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 01",
    "descritor": "4.7. Interação entre texto verbal e não verbal",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Onomatopeia e relação entre linguagem verbal e não verbal",
    "taxaAcerto": 88.3,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_2s_d1_q05",
    "simuladoId": "2serie_dia1",
    "numero": 5,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 03",
    "descritor": "4.2. Estratégias de articulação do texto: mecanismos de coesão (coesão lexical, referencial e articulação de enunciados de qualquer extensão) e coerência",
    "conteudoEdital": "4.2 Articulação do texto: coesão e coerência",
    "assunto": "Coesão referencial: catáfora pronominal",
    "taxaAcerto": 56.8,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_2s_d1_q06",
    "simuladoId": "2serie_dia1",
    "numero": 6,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 04",
    "descritor": "3.2. Conectivos: função sintática e valores lógico-semânticos",
    "conteudoEdital": "3.2 Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos",
    "assunto": "Conectivos: valor semântico de adição",
    "taxaAcerto": 61.5,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p2.webp"
  },
  {
    "id": "provao2026_2s_d1_q07",
    "simuladoId": "2serie_dia1",
    "numero": 7,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 11",
    "descritor": "2.1. Classes de palavras: verbo; 4.7. Interação entre texto verbal e não verbal; 4.6. Intertextualidade e interdiscursividade",
    "conteudoEdital": "2.2 Flexão nominal e verbal (tempo, modo, aspecto, voz)",
    "assunto": "Modo imperativo: valor de sentido da forma verbal",
    "taxaAcerto": 80.7,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_2s_d1_q08",
    "simuladoId": "2serie_dia1",
    "numero": 8,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 16",
    "descritor": "5.3. Relação do texto literário com seu contexto histórico e cultural. Literatura periférica e marginal.",
    "conteudoEdital": "5.3 Texto literário e contexto histórico-cultural. Literatura periférica e marginal",
    "assunto": "Literatura periférica e marginal",
    "taxaAcerto": 52.2,
    "dificuldade": "Média",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p3.webp"
  },
  {
    "id": "provao2026_2s_d1_q09",
    "simuladoId": "2serie_dia1",
    "numero": 9,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 17",
    "descritor": "6.1.2 Períodos literário: Realismo",
    "conteudoEdital": "6.1.1 Literatura portuguesa: Realismo",
    "assunto": "Realismo português: descrição objetiva (Eça de Queirós)",
    "taxaAcerto": 52.1,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_2s_d1_q10",
    "simuladoId": "2serie_dia1",
    "numero": 10,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 12",
    "descritor": "2.1. Classes de palavras: advérbio.",
    "conteudoEdital": "2.1 Classes de palavras",
    "assunto": "Advérbio de intensidade e valor argumentativo",
    "taxaAcerto": 54.6,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_2s_d1_q11",
    "simuladoId": "2serie_dia1",
    "numero": 11,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 16",
    "descritor": "5.3. Relação do texto literário com seu contexto histórico e cultural. Literatura periférica e marginal.",
    "conteudoEdital": "5.3 Texto literário e contexto histórico-cultural. Literatura periférica e marginal",
    "assunto": "Literatura periférica e marginal",
    "taxaAcerto": 48.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p4.webp"
  },
  {
    "id": "provao2026_2s_d1_q12",
    "simuladoId": "2serie_dia1",
    "numero": 12,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 01",
    "descritor": "4.2 Estratégias de articulação do texto: coerência",
    "conteudoEdital": "4.1 Níveis de significação do texto: explícita e implícita; denotação e conotação",
    "assunto": "Significação implícita: ponto de vista do autor",
    "taxaAcerto": 62.9,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p5.webp"
  },
  {
    "id": "provao2026_2s_d1_q13",
    "simuladoId": "2serie_dia1",
    "numero": 13,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 07",
    "descritor": "4.1 Níveis de significação do texto: denotação e conotação",
    "conteudoEdital": "4.6 Intertextualidade e interdiscursividade",
    "assunto": "Intertextualidade e metáfora",
    "taxaAcerto": 74.6,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p5.webp"
  },
  {
    "id": "provao2026_2s_d1_q14",
    "simuladoId": "2serie_dia1",
    "numero": 14,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 09",
    "descritor": "1.2 Distinção entre variedades linguísticas: categorias sociais e contextos de comunicação",
    "conteudoEdital": "1.2 Variedades linguísticas; registros de formalidade e informalidade",
    "assunto": "Variedades linguísticas",
    "taxaAcerto": 58.2,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_2s_d1_q15",
    "simuladoId": "2serie_dia1",
    "numero": 15,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 14",
    "descritor": "5.1.2 Períodos literário: Romantismo",
    "conteudoEdital": "5.1.2 Literatura brasileira: Romantismo",
    "assunto": "Romantismo",
    "taxaAcerto": 73.4,
    "dificuldade": "Fácil",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_2s_d1_q16",
    "simuladoId": "2serie_dia1",
    "numero": 16,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2024 · 2ª série · Prova Principal · Dia 1 · Questão 10",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "3.2 Coordenação e subordinação. Conectivos: função sintática e valores lógico-semânticos",
    "assunto": "Conjunções concessivas",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p6.webp"
  },
  {
    "id": "provao2026_2s_d1_q17",
    "simuladoId": "2serie_dia1",
    "numero": 17,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2024 · 2ª série · Prova Principal · Dia 1 · Questão 16",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "5.1.1 Literatura brasileira: Barroco",
    "assunto": "Barroco: poesia satírica de Gregório de Matos",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p7.webp"
  },
  {
    "id": "provao2026_2s_d1_q18",
    "simuladoId": "2serie_dia1",
    "numero": 18,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Língua Portuguesa",
    "origem": "Provão 2024 · 2ª série · Prova Extra · Dia 1 · Questão 11",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "4.7 Interação entre texto verbal e não verbal",
    "assunto": "Fusão de linguagem verbal e não verbal",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p7.webp"
  },
  {
    "id": "provao2026_2s_d1_q19",
    "simuladoId": "2serie_dia1",
    "numero": 19,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 22",
    "descritor": "3. Localização de informação específica em um ou mais trechos do texto",
    "conteudoEdital": "2 Ideias expressas em trechos, frases e parágrafos e relação entre elas",
    "assunto": "Ideia central de parágrafo",
    "taxaAcerto": 35.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_2s_d1_q20",
    "simuladoId": "2serie_dia1",
    "numero": 20,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 22",
    "descritor": "1. Compreensão do sentido geral e/ou do propósito do texto, bem como a identificação de seu gênero textual. 7. Identificação do significado de itens lexicais (palavras ou expressões) fundamentais para a adequada compreensão do texto, dentre eles verbos mo",
    "conteudoEdital": "7 Significado de itens lexicais (verbos modais, marcadores discursivos, conectivos)",
    "assunto": "Tempos verbais: presente contínuo e aspecto em curso",
    "taxaAcerto": 45.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_2s_d1_q21",
    "simuladoId": "2serie_dia1",
    "numero": 21,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 21",
    "descritor": "2. Compreensão de ideias expressas em trechos, frases e parágrafos, e/ou de sua relação com ideias presentes em outros trechos, frases e parágrafos do texto. 7. Identificação do significado de itens lexicais (palavras ou expressões) fundamentais para a ad",
    "conteudoEdital": "7 Significado de itens lexicais (verbos modais, marcadores discursivos, conectivos)",
    "assunto": "Expressões idiomáticas: equivalência de sentido",
    "taxaAcerto": 39.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p8.webp"
  },
  {
    "id": "provao2026_2s_d1_q22",
    "simuladoId": "2serie_dia1",
    "numero": 22,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 23",
    "descritor": "2. Compreensão de ideias expressas em trechos, frases e parágrafos, e/ou de sua relação com ideias presentes em outros trechos, frases e parágrafos do texto.  3. Localização de informação específica em um ou mais trechos do texto.",
    "conteudoEdital": "3 Localização de informação específica",
    "assunto": "Localização de informação específica",
    "taxaAcerto": 42.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_2s_d1_q23",
    "simuladoId": "2serie_dia1",
    "numero": 23,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 22",
    "descritor": "5. Compreensão da relação entre conteúdos de diferentes textos, ou das relações entre imagens, gráficos, tabelas, infográficos e texto.",
    "conteudoEdital": "5 Relação entre textos, ou entre imagens, tabelas, infográficos e texto",
    "assunto": "Relação entre textos e imagem",
    "taxaAcerto": 43.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_2s_d1_q24",
    "simuladoId": "2serie_dia1",
    "numero": 24,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Inglês",
    "origem": "Provão 2024 · 2ª série · Prova Principal · Dia 1 · Questão 20",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "6 Compreensão crítica: fato e opinião, posicionamentos, perspectivas",
    "assunto": "Compreensão crítica: uso de aspas e posicionamento",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_2s_d1_q25",
    "simuladoId": "2serie_dia1",
    "numero": 25,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 25",
    "descritor": "5.2. Escalas termométricas. As escalas Celsius, Fahrenheit e Kelvin. Relação matemática entre elas.",
    "conteudoEdital": "1.2 Escalas termométricas Celsius, Fahrenheit e Kelvin",
    "assunto": "Escalas termométricas: Kelvin e Celsius",
    "taxaAcerto": 24.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p9.webp"
  },
  {
    "id": "provao2026_2s_d1_q26",
    "simuladoId": "2serie_dia1",
    "numero": 26,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 26",
    "descritor": "6.1. Calor como forma de energia em trânsito. Capacidade térmica, calor específico e calor latente. Quantidade de calor sensível e latente. Mudanças de estado de agregação.",
    "conteudoEdital": "2.1 Calor: capacidade térmica, calor específico e latente; mudanças de estado",
    "assunto": "Calorimetria: calor específico e calor sensível",
    "taxaAcerto": 26.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_2s_d1_q27",
    "simuladoId": "2serie_dia1",
    "numero": 27,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 28",
    "descritor": "9.1. Trabalho realizado pelas forças exercidas por um gás. Energia interna. Transformações cíclicas.",
    "conteudoEdital": "5.1 Trabalho de um gás; energia interna; transformações cíclicas",
    "assunto": "Trabalho de um gás em transformação cíclica",
    "taxaAcerto": 24.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_2s_d1_q28",
    "simuladoId": "2serie_dia1",
    "numero": 28,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 29",
    "descritor": "11.2. Espelhos planos. Construção geométrica e classificação da imagem. Campo visual. Translação e rotação de um espelho plano. Associação de espelhos planos.",
    "conteudoEdital": "7.2 Espelhos planos",
    "assunto": "Espelhos planos: campo visual",
    "taxaAcerto": 31.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_2s_d1_q29",
    "simuladoId": "2serie_dia1",
    "numero": 29,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 32",
    "descritor": "13.8. Caráter ondulatório do som. Ondas sonoras. Velocidade de propagação do som. Qualidades fisiológicas do som: altura, timbre e intensidade. Reforço, reverberação e eco.",
    "conteudoEdital": "9.8 Som: velocidade, altura, timbre, intensidade; eco",
    "assunto": "Qualidades do som: intensidade e decibel",
    "taxaAcerto": 33.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p10.webp"
  },
  {
    "id": "provao2026_2s_d1_q30",
    "simuladoId": "2serie_dia1",
    "numero": 30,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 28",
    "descritor": "9.1. Trabalho realizado pelas forças exercidas por um gás. Energia interna. Transformações cíclicas.",
    "conteudoEdital": "5.1 Trabalho de um gás; energia interna; transformações cíclicas",
    "assunto": "Trabalho de um gás: área no diagrama p x V",
    "taxaAcerto": 26.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_2s_d1_q31",
    "simuladoId": "2serie_dia1",
    "numero": 31,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 30",
    "descritor": "12.2. Dioptro plano. Ângulo limite e reflexão total da luz.",
    "conteudoEdital": "8.2 Dioptro plano; ângulo limite e reflexão total",
    "assunto": "Dioptro plano: profundidade aparente",
    "taxaAcerto": 22.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_2s_d1_q32",
    "simuladoId": "2serie_dia1",
    "numero": 32,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Física",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 31",
    "descritor": "13.2. Comprimento de onda, período e frequência de uma onda. Velocidade de propagação. Equação fundamental da ondulatória.",
    "conteudoEdital": "9.2 Comprimento de onda, período, frequência; equação fundamental",
    "assunto": "Equação fundamental da ondulatória",
    "taxaAcerto": 22.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_2s_d1_q33",
    "simuladoId": "2serie_dia1",
    "numero": 33,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 36",
    "descritor": "9.7. Equilíbrio em sistemas homogêneos e heterogêneos",
    "conteudoEdital": "3.5 Equilíbrio químico",
    "assunto": "Equilíbrio químico: deslocamento (Le Chatelier) e pH",
    "taxaAcerto": 22.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p11.webp"
  },
  {
    "id": "provao2026_2s_d1_q34",
    "simuladoId": "2serie_dia1",
    "numero": 34,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 33",
    "descritor": "1.2. Estado físico e propriedades dos materiais.",
    "conteudoEdital": "5.10 Macromoléculas naturais e sintéticas",
    "assunto": "Polímeros sintéticos e metais: reciclagem de materiais",
    "taxaAcerto": 40.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_2s_d1_q35",
    "simuladoId": "2serie_dia1",
    "numero": 35,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 35",
    "descritor": "10.2. Calor de reação: reação exotérmica e endotérmica.",
    "conteudoEdital": "4.3 Entalpia e Lei de Hess",
    "assunto": "Entalpia de formação e ΔH: reação exotérmica",
    "taxaAcerto": 25.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_2s_d1_q36",
    "simuladoId": "2serie_dia1",
    "numero": 36,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 33",
    "descritor": "6.2. Características gerais das ligações químicas: ligação covalente, ligação iônica e ligação metálica.",
    "conteudoEdital": "5.2 Fórmulas moleculares e estruturais; cadeias carbônicas",
    "assunto": "Fórmulas estruturais de compostos orgânicos",
    "taxaAcerto": 42.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p12.webp"
  },
  {
    "id": "provao2026_2s_d1_q37",
    "simuladoId": "2serie_dia1",
    "numero": 37,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 38",
    "descritor": "10.11. Conceitos fundamentais da radioatividade: tipos de emissões e suas características.",
    "conteudoEdital": "4.11 Radioatividade: tipos de emissões",
    "assunto": "Radioatividade: emissão beta e decaimento",
    "taxaAcerto": 31.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p13.webp"
  },
  {
    "id": "provao2026_2s_d1_q38",
    "simuladoId": "2serie_dia1",
    "numero": 38,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 1 · Questão 38",
    "descritor": "11.5. Propriedades físicas dos compostos orgânicos.",
    "conteudoEdital": "1.2 Representação de substâncias e de transformações químicas",
    "assunto": "Representação de transformações químicas",
    "taxaAcerto": 34.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p13.webp"
  },
  {
    "id": "provao2026_2s_d1_q39",
    "simuladoId": "2serie_dia1",
    "numero": 39,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 1 · Questão 39",
    "descritor": "9.9. Produto iônico da água e escalas de pH e pOH",
    "conteudoEdital": "3.9 Produto iônico da água; pH e pOH",
    "assunto": "pH e indicadores ácido-base",
    "taxaAcerto": 33.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_2s_d1_q40",
    "simuladoId": "2serie_dia1",
    "numero": 40,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Química",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 1 · Questão 36",
    "descritor": "10.6. Reações de oxirredução e números de oxidação. Agentes oxidantes e redutores.",
    "conteudoEdital": "4.6 Oxirredução; número de oxidação; agentes oxidantes e redutores",
    "assunto": "Oxirredução: número de oxidação",
    "taxaAcerto": 27.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_2s_d1_q41",
    "simuladoId": "2serie_dia1",
    "numero": 41,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 1 · Questão 44",
    "descritor": "4.2. Fisiologia humana básica: Compreensão dos principais sistemas do corpo humano e sua relação com a saúde; interpretação de situações-problema, envolvendo os sistemas digestório, circulatório, respiratório; uso de drogas e o impacto no sistema nervoso;",
    "conteudoEdital": "4.1 Fisiologia humana básica: sistemas do corpo, drogas e sistema nervoso, sistema endócrino",
    "assunto": "Sistemas endócrino, nervoso e digestório",
    "taxaAcerto": 35.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_2s_d1_q42",
    "simuladoId": "2serie_dia1",
    "numero": 42,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 47",
    "descritor": "2.3. Principais componentes citoplasmáticos e funções das estruturas.",
    "conteudoEdital": "2.1 Componentes citoplasmáticos e funções",
    "assunto": "Organelas citoplasmáticas: retículo endoplasmático liso",
    "taxaAcerto": 29.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p14.webp"
  },
  {
    "id": "provao2026_2s_d1_q43",
    "simuladoId": "2serie_dia1",
    "numero": 43,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 1 · Questão 42",
    "descritor": "1.9. Alternativas energéticas e soluções contra as ameaças ao equilíbrio dos ecossistemas.",
    "conteudoEdital": "1.5 Alternativas energéticas e soluções contra ameaças aos ecossistemas",
    "assunto": "Mitigação das mudanças climáticas: captura de carbono",
    "taxaAcerto": 28.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 15,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p15.webp"
  },
  {
    "id": "provao2026_2s_d1_q44",
    "simuladoId": "2serie_dia1",
    "numero": 44,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 41",
    "descritor": "4.2. Fisiologia humana básica: Compreensão dos principais sistemas do corpo humano e sua relação com a saúde; interpretação de situações-problema, envolvendo os sistemas digestório, circulatório, respiratório; uso de drogas e o impacto no sistema nervoso;",
    "conteudoEdital": "4.1 Fisiologia humana básica: sistemas do corpo, drogas e sistema nervoso, sistema endócrino",
    "assunto": "Sistema respiratório: trocas gasosas e enfisema",
    "taxaAcerto": 43.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 15,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p15.webp"
  },
  {
    "id": "provao2026_2s_d1_q45",
    "simuladoId": "2serie_dia1",
    "numero": 45,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 1 · Questão 44",
    "descritor": "2.7. Estrutura molecular do DNA e do RNA; tipos de RNA e suas funções; replicação do DNA e transcrição gênica.",
    "conteudoEdital": "2.4 Código genético e síntese proteica",
    "assunto": "Transcrição e tradução: código genético",
    "taxaAcerto": 25.5,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 15,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p15.webp"
  },
  {
    "id": "provao2026_2s_d1_q46",
    "simuladoId": "2serie_dia1",
    "numero": 46,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 41",
    "descritor": "1.8. Poluição ambiental e os impactos da intervenção humana: do ar, da água, do solo, sonora e visual.",
    "conteudoEdital": "1.4 Poluição ambiental e impactos da intervenção humana",
    "assunto": "Poluição da água e saneamento: esgoto",
    "taxaAcerto": 61.4,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 16,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p16.webp"
  },
  {
    "id": "provao2026_2s_d1_q47",
    "simuladoId": "2serie_dia1",
    "numero": 47,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 1 · Questão 44",
    "descritor": "4.7. Doenças humanas causadas por fungos e protozoários (amebíase, malária, doença de Chagas e leishmaniose): formas de transmissão, etiologia, prevenção, profilaxia e fatores sociais que favorecem sua disseminação.",
    "conteudoEdital": "4.6 Doenças causadas por fungos e protozoários (malária, Chagas, leishmaniose, amebíase)",
    "assunto": "Doença de Chagas: transmissão e prevenção",
    "taxaAcerto": 42.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 16,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p16.webp"
  },
  {
    "id": "provao2026_2s_d1_q48",
    "simuladoId": "2serie_dia1",
    "numero": 48,
    "dia": 1,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Biologia",
    "origem": "Provão 2024 · 2ª série · Prova Principal · Dia 1 · Questão 45",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "1.4 Poluição ambiental e impactos da intervenção humana",
    "assunto": "Camada de ozônio e radiação ultravioleta",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia1.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 16,
    "imagemPagina": "assets/simulados/pages/2serie_dia1_p16.webp"
  },
  {
    "id": "provao2026_2s_d2_q01",
    "simuladoId": "2serie_dia2",
    "numero": 1,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 11",
    "descritor": "8.1. Vistas ortogonais e representação plana de uma figura espacial.",
    "conteudoEdital": "4.1 Vistas ortogonais e representação plana de figura espacial",
    "assunto": "Planificação de prisma",
    "taxaAcerto": 75.9,
    "dificuldade": "Fácil",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_2s_d2_q02",
    "simuladoId": "2serie_dia2",
    "numero": 2,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 1ª série · Prova Extra · Dia 2 · Questão 14",
    "descritor": "9.1. Gráficos: setores, linhas, barras, infográficos, histogramas, ramos e folhas. Tabelas e planilhas.",
    "conteudoEdital": "5.1 Gráficos (setores, linhas, barras, infográficos, histogramas, ramos e folhas), tabelas e planilhas",
    "assunto": "Gráficos e tabelas",
    "taxaAcerto": 68.0,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 1,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p1.webp"
  },
  {
    "id": "provao2026_2s_d2_q03",
    "simuladoId": "2serie_dia2",
    "numero": 3,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 01",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "1.1 Números naturais, inteiros, racionais e reais: operações, ordem, reta numérica, problemas",
    "assunto": "Problemas com números naturais",
    "taxaAcerto": 56.8,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q04",
    "simuladoId": "2serie_dia2",
    "numero": 4,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 03",
    "descritor": "5.4. Função polinomial do 1º grau e função constante: Conceitos e resolução de problemas, inclusive envolvendo inequações.",
    "conteudoEdital": "2.3 Taxa de variação: crescimento linear",
    "assunto": "Função afim: valor fixo mais taxa",
    "taxaAcerto": 27.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q05",
    "simuladoId": "2serie_dia2",
    "numero": 5,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 07",
    "descritor": "5.4. Função polinomial do 1º grau e função constante: Conceitos e resolução de problemas, inclusive envolvendo inequações.",
    "conteudoEdital": "2.3 Taxa de variação: crescimento linear",
    "assunto": "Crescimento linear",
    "taxaAcerto": 37.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q06",
    "simuladoId": "2serie_dia2",
    "numero": 6,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 16",
    "descritor": "7.5. Áreas de polígonos (incluindo diferentes métodos para sua obtenção - reconfigurações, aproximações por cortes etc), círculos, coroa e setor circular.",
    "conteudoEdital": "3.4 Áreas de polígonos, círculos, coroa e setor circular",
    "assunto": "Área de retângulo e trapézio",
    "taxaAcerto": 23.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q07",
    "simuladoId": "2serie_dia2",
    "numero": 7,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 02",
    "descritor": "1.4. Sequências: noção de sequência; progressões aritméticas e geométricas; lei de formação e lei de recorrência.",
    "conteudoEdital": "1.4 Sequências; progressões aritméticas e geométricas",
    "assunto": "Soma de progressão aritmética",
    "taxaAcerto": 43.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q08",
    "simuladoId": "2serie_dia2",
    "numero": 8,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 08",
    "descritor": "4.1. Resolução e discussão de um sistema linear.",
    "conteudoEdital": "2.3 Taxa de variação: crescimento linear",
    "assunto": "Comparação de funções afins",
    "taxaAcerto": 34.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 2,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p2.webp"
  },
  {
    "id": "provao2026_2s_d2_q09",
    "simuladoId": "2serie_dia2",
    "numero": 9,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 09",
    "descritor": "7.3. Semelhança e congruência de triângulos.",
    "conteudoEdital": "1.2 Razões, proporcionalidade direta e inversa; grandeza proporcional ao quadrado da outra",
    "assunto": "Razão e proporção: escala",
    "taxaAcerto": 58.0,
    "dificuldade": "Média",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_2s_d2_q10",
    "simuladoId": "2serie_dia2",
    "numero": 10,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 18",
    "descritor": "7.4. Relações métricas nos triângulos, polígonos regulares e círculos.",
    "conteudoEdital": "3.3 Relações métricas nos triângulos, polígonos regulares e círculos",
    "assunto": "Teorema de Pitágoras",
    "taxaAcerto": 25.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_2s_d2_q11",
    "simuladoId": "2serie_dia2",
    "numero": 11,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 01",
    "descritor": "7.5. Áreas de polígonos (incluindo diferentes métodos para sua obtenção - reconfigurações, aproximações por cortes etc), círculos, coroa e setor circular.",
    "conteudoEdital": "3.4 Áreas de polígonos, círculos, coroa e setor circular",
    "assunto": "Área de polígonos",
    "taxaAcerto": 36.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_2s_d2_q12",
    "simuladoId": "2serie_dia2",
    "numero": 12,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 06",
    "descritor": "7.3. Semelhança e congruência de triângulos.",
    "conteudoEdital": "3.2 Semelhança e congruência de triângulos",
    "assunto": "Semelhança de triângulos",
    "taxaAcerto": 34.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 3,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p3.webp"
  },
  {
    "id": "provao2026_2s_d2_q13",
    "simuladoId": "2serie_dia2",
    "numero": 13,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 11",
    "descritor": "8.2. Poliedros e corpos redondos - cálculo de áreas, volume e capacidade.",
    "conteudoEdital": "4.2 Poliedros e corpos redondos: áreas, volume e capacidade",
    "assunto": "Volume de prismas",
    "taxaAcerto": 35.6,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_2s_d2_q14",
    "simuladoId": "2serie_dia2",
    "numero": 14,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 12",
    "descritor": "8.1. Vistas ortogonais e representação plana de uma figura espacial.",
    "conteudoEdital": "4.2 Poliedros e corpos redondos: áreas, volume e capacidade",
    "assunto": "Área da superfície do paralelepípedo",
    "taxaAcerto": 30.3,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 4,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p4.webp"
  },
  {
    "id": "provao2026_2s_d2_q15",
    "simuladoId": "2serie_dia2",
    "numero": 15,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 13",
    "descritor": "1.1. Números naturais, inteiros, racionais e reais: operações e propriedades, ordem, reta numérica e resolução de problemas.",
    "conteudoEdital": "1.2 Razões, proporcionalidade direta e inversa; grandeza proporcional ao quadrado da outra",
    "assunto": "Razão entre grandezas",
    "taxaAcerto": 47.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_2s_d2_q16",
    "simuladoId": "2serie_dia2",
    "numero": 16,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 03",
    "descritor": "5.7. Função exponencial e função logarítmica. Conceitos e resolução de problemas.",
    "conteudoEdital": "2.4 Função exponencial e função logarítmica",
    "assunto": "Função exponencial",
    "taxaAcerto": 56.8,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_2s_d2_q17",
    "simuladoId": "2serie_dia2",
    "numero": 17,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2024 · 2ª série · Prova Extra · Dia 2 · Questão 13",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "1.1 Números naturais, inteiros, racionais e reais: operações, ordem, reta numérica, problemas",
    "assunto": "Operações com números racionais",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 5,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p5.webp"
  },
  {
    "id": "provao2026_2s_d2_q18",
    "simuladoId": "2serie_dia2",
    "numero": 18,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Matemática",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 07",
    "descritor": "9.1. Gráficos: setores, linhas, barras, infográficos, histogramas, ramos e folhas. Tabelas e planilhas.",
    "conteudoEdital": "5.1 Gráficos (setores, linhas, barras, infográficos, histogramas, ramos e folhas), tabelas e planilhas",
    "assunto": "Gráfico de setores",
    "taxaAcerto": 85.8,
    "dificuldade": "Fácil",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_2s_d2_q19",
    "simuladoId": "2serie_dia2",
    "numero": 19,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 1ª série · Prova Principal · Dia 2 · Questão 23",
    "descritor": "3.3. Expansão marítima e constituição do espaço atlântico.",
    "conteudoEdital": "4.1 Escravidão e outras formas de trabalho (colônia)",
    "assunto": "Escravidão colonial",
    "taxaAcerto": 54.7,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_2s_d2_q20",
    "simuladoId": "2serie_dia2",
    "numero": 20,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 21",
    "descritor": "5.1. A ideologia do Destino Manifesto.",
    "conteudoEdital": "3.1 Ideologia do Destino Manifesto",
    "assunto": "Destino Manifesto e expansão dos EUA",
    "taxaAcerto": 36.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 6,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p6.webp"
  },
  {
    "id": "provao2026_2s_d2_q21",
    "simuladoId": "2serie_dia2",
    "numero": 21,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 22",
    "descritor": "9.1. A emancipação política.",
    "conteudoEdital": "5.1 Emancipação política do Brasil",
    "assunto": "Guerras de Independência do Brasil",
    "taxaAcerto": 37.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_2s_d2_q22",
    "simuladoId": "2serie_dia2",
    "numero": 22,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 19",
    "descritor": "4.1. A Revolução Francesa e a era napoleônica.",
    "conteudoEdital": "2.1 Revolução Francesa e era napoleônica",
    "assunto": "Declaração dos Direitos do Homem e do Cidadão",
    "taxaAcerto": 46.0,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_2s_d2_q23",
    "simuladoId": "2serie_dia2",
    "numero": 23,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 23",
    "descritor": "9.5. Da mão de obra escrava à imigração.",
    "conteudoEdital": "5.5 Da mão de obra escrava à imigração",
    "assunto": "Abolição e pós-abolição",
    "taxaAcerto": 52.3,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_2s_d2_q24",
    "simuladoId": "2serie_dia2",
    "numero": 24,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 24",
    "descritor": "10.2. Primeira República: política, economia e movimentos sociais.",
    "conteudoEdital": "6.2 Primeira República: política, economia e movimentos sociais",
    "assunto": "Política dos Governadores",
    "taxaAcerto": 40.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 7,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p7.webp"
  },
  {
    "id": "provao2026_2s_d2_q25",
    "simuladoId": "2serie_dia2",
    "numero": 25,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 3ª série · Prova Principal · Dia 2 · Questão 25",
    "descritor": "10.4. Do fim do Estado Novo ao Golpe de 1964.",
    "conteudoEdital": "6.3 Getúlio Vargas: governo provisório ao Estado Novo",
    "assunto": "Era Vargas: legislação trabalhista",
    "taxaAcerto": 44.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_2s_d2_q26",
    "simuladoId": "2serie_dia2",
    "numero": 26,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "História",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 24",
    "descritor": "9.3. Segundo Reinado e a criação de uma identidade nacional.",
    "conteudoEdital": "5.4 Ascensão do café e primeira industrialização",
    "assunto": "Economia do Império: café e escravidão",
    "taxaAcerto": 51.8,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 8,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p8.webp"
  },
  {
    "id": "provao2026_2s_d2_q27",
    "simuladoId": "2serie_dia2",
    "numero": 27,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 27",
    "descritor": "1.13. A questão urbana mundo e no Brasil (processos de industrialização, de urbanização/metropolização).",
    "conteudoEdital": "1.7 Questão urbana: industrialização, urbanização, metropolização",
    "assunto": "Rede urbana e hierarquia das cidades",
    "taxaAcerto": 45.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 9,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p9.webp"
  },
  {
    "id": "provao2026_2s_d2_q28",
    "simuladoId": "2serie_dia2",
    "numero": 28,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 31",
    "descritor": "1.5. Modos e sistemas de produção, setores da economia.",
    "conteudoEdital": "1.3 Concentração espacial da riqueza",
    "assunto": "Indicadores econômicos: PIB",
    "taxaAcerto": 43.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_2s_d2_q29",
    "simuladoId": "2serie_dia2",
    "numero": 29,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 33",
    "descritor": "2.15. A degradação da natureza e suas relações com os principais processos de produção do espaço.",
    "conteudoEdital": "2.1 Impactos ambientais no mundo e no Brasil",
    "assunto": "Refugiados ambientais e mudanças climáticas",
    "taxaAcerto": 40.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_2s_d2_q30",
    "simuladoId": "2serie_dia2",
    "numero": 30,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 29",
    "descritor": "1.12. O trabalho e a divisão territorial do trabalho (questões tecnológicas, geopolíticas, econômicas e culturais).",
    "conteudoEdital": "1.6 Trabalho e divisão territorial do trabalho",
    "assunto": "Trabalho por plataformas e flexibilização",
    "taxaAcerto": 39.2,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_2s_d2_q31",
    "simuladoId": "2serie_dia2",
    "numero": 31,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2024 · 2ª série · Prova Extra · Dia 2 · Questão 32",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "2.2 Desenvolvimento sustentável",
    "assunto": "Objetivos de Desenvolvimento Sustentável",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "B",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 10,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p10.webp"
  },
  {
    "id": "provao2026_2s_d2_q32",
    "simuladoId": "2serie_dia2",
    "numero": 32,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 31",
    "descritor": "1.17. A análise geográfica da população mundial e brasileira.",
    "conteudoEdital": "1.13 Desigualdades socioeconômicas e socioespaciais",
    "assunto": "Desigualdade regional no acesso à água",
    "taxaAcerto": 33.8,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_2s_d2_q33",
    "simuladoId": "2serie_dia2",
    "numero": 33,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 32",
    "descritor": "1.4. Os países e as regiões geográficas.",
    "conteudoEdital": "1.1 Estado e planejamento territorial; geopolítica",
    "assunto": "Geopolítica do Oriente Médio",
    "taxaAcerto": 33.1,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 11,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p11.webp"
  },
  {
    "id": "provao2026_2s_d2_q34",
    "simuladoId": "2serie_dia2",
    "numero": 34,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Geografia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 27",
    "descritor": "1.5. Modos e sistemas de produção, setores da economia.",
    "conteudoEdital": "1.10 Espaço geográfico e globalização",
    "assunto": "Indústria 4.0 e globalização",
    "taxaAcerto": 40.4,
    "dificuldade": "Desafio",
    "respostaCorreta": "A",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_2s_d2_q35",
    "simuladoId": "2serie_dia2",
    "numero": 35,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Extra · Dia 2 · Questão 38",
    "descritor": "4.3. Cidadania: direitos sociais e a persistência da intolerância.",
    "conteudoEdital": "4.3 Cidadania: direitos sociais e intolerância",
    "assunto": "Intolerância étnica",
    "taxaAcerto": 47.9,
    "dificuldade": "Desafio",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_2s_d2_q36",
    "simuladoId": "2serie_dia2",
    "numero": 36,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 35",
    "descritor": "1.3. Preconceitos, estereótipos e outras formas de discriminação social.",
    "conteudoEdital": "1.3 Preconceitos, estereótipos e discriminação social",
    "assunto": "Estereótipos de gênero",
    "taxaAcerto": 62.7,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_2s_d2_q37",
    "simuladoId": "2serie_dia2",
    "numero": 37,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 36",
    "descritor": "3.1. Pluralismo cultural: a persistência do etnocentrismo e os desafios do relativismo.",
    "conteudoEdital": "3.1 Pluralismo cultural: etnocentrismo e relativismo",
    "assunto": "Pluralismo cultural",
    "taxaAcerto": 57.2,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 12,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p12.webp"
  },
  {
    "id": "provao2026_2s_d2_q38",
    "simuladoId": "2serie_dia2",
    "numero": 38,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 39",
    "descritor": "3.1. Pluralismo cultural: a persistência do etnocentrismo e os desafios do relativismo.",
    "conteudoEdital": "4.2 Movimentos sociais e novas formas de participação política",
    "assunto": "Movimento pelos direitos civis",
    "taxaAcerto": 45.7,
    "dificuldade": "Desafio",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p13.webp"
  },
  {
    "id": "provao2026_2s_d2_q39",
    "simuladoId": "2serie_dia2",
    "numero": 39,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 41",
    "descritor": "3.2. Consumismo, indústria cultural e manipulação da informação.",
    "conteudoEdital": "3.2 Consumismo, indústria cultural e manipulação da informação",
    "assunto": "Desinformação e manipulação da informação",
    "taxaAcerto": 54.2,
    "dificuldade": "Média",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p13.webp"
  },
  {
    "id": "provao2026_2s_d2_q40",
    "simuladoId": "2serie_dia2",
    "numero": 40,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 2ª série · Prova Principal · Dia 2 · Questão 42",
    "descritor": "4.3 Cidadania: direitos sociais e a persistência da intolerância.",
    "conteudoEdital": "4.3 Cidadania: direitos sociais e intolerância",
    "assunto": "Violência contra a mulher e direitos",
    "taxaAcerto": 60.4,
    "dificuldade": "Média",
    "respostaCorreta": "E",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 13,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p13.webp"
  },
  {
    "id": "provao2026_2s_d2_q41",
    "simuladoId": "2serie_dia2",
    "numero": 41,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2025 · 3ª série · Prova Extra · Dia 2 · Questão 36",
    "descritor": "2.2. Classes sociais, divisão do trabalho e trabalho na globalização.",
    "conteudoEdital": "2.2 Classes sociais, divisão do trabalho, trabalho na globalização",
    "assunto": "Desigualdade social e classes",
    "taxaAcerto": 52.5,
    "dificuldade": "Média",
    "respostaCorreta": "D",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p14.webp"
  },
  {
    "id": "provao2026_2s_d2_q42",
    "simuladoId": "2serie_dia2",
    "numero": 42,
    "dia": 2,
    "serie": "2ª Série",
    "serieSlug": "2serie",
    "componente": "Sociologia",
    "origem": "Provão 2024 · 2ª série · Prova Extra · Dia 2 · Questão 36",
    "descritor": "sem microdado (2024)",
    "conteudoEdital": "2.3 Impacto das novas tecnologias no trabalho",
    "assunto": "Uberização e precarização do trabalho",
    "taxaAcerto": null,
    "dificuldade": "Referência",
    "respostaCorreta": "C",
    "tipo": "multipla_escolha",
    "peso": 1,
    "pdfUrl": "assets/simulados/Simulado_Provao_2026_2serie_Dia2.pdf",
    "alternativas": [
      {
        "id": "A",
        "texto": "Alternativa A"
      },
      {
        "id": "B",
        "texto": "Alternativa B"
      },
      {
        "id": "C",
        "texto": "Alternativa C"
      },
      {
        "id": "D",
        "texto": "Alternativa D"
      },
      {
        "id": "E",
        "texto": "Alternativa E"
      }
    ],
    "paginaPdf": 14,
    "imagemPagina": "assets/simulados/pages/2serie_dia2_p14.webp"
  }
];

const SimuladosData = {
  getConfig(simuladoId) {
    return SIMULADOS_CONFIG[simuladoId] || null;
  },

  getAllConfigs() {
    return Object.values(SIMULADOS_CONFIG);
  },

  getQuestoesPorSimulado(simuladoId) {
    return SIMULADOS_QUESTOES.filter(q => q.simuladoId === simuladoId);
  },

  getQuestoesPorFiltro({ serie, dia, componente, dificuldade, busca } = {}) {
    return SIMULADOS_QUESTOES.filter(q => {
      if (serie && q.serieSlug !== serie && q.serie !== serie) return false;
      if (dia && q.dia !== Number(dia)) return false;
      if (componente && componente !== 'todos' && q.componente !== componente) return false;
      if (dificuldade && dificuldade !== 'todas' && q.dificuldade !== dificuldade) return false;
      if (busca) {
        const termo = busca.toLowerCase();
        const matchAssunto = (q.assunto || '').toLowerCase().includes(termo);
        const matchEdital = (q.conteudoEdital || '').toLowerCase().includes(termo);
        const matchDescritor = (q.descritor || '').toLowerCase().includes(termo);
        const matchComp = (q.componente || '').toLowerCase().includes(termo);
        const matchOrigem = (q.origem || '').toLowerCase().includes(termo);
        if (!matchAssunto && !matchEdital && !matchDescritor && !matchComp && !matchOrigem) return false;
      }
      return true;
    });
  },

  getComponentesPorSimulado(simuladoId) {
    const questoes = this.getQuestoesPorSimulado(simuladoId);
    const map = {};
    questoes.forEach(q => {
      map[q.componente] = (map[q.componente] || 0) + 1;
    });
    return map;
  },

  getEstatisticas() {
    const total = SIMULADOS_QUESTOES.length;
    const porSerie = {
      '1serie': SIMULADOS_QUESTOES.filter(q => q.serieSlug === '1serie').length,
      '2serie': SIMULADOS_QUESTOES.filter(q => q.serieSlug === '2serie').length
    };
    const componentes = {};
    SIMULADOS_QUESTOES.forEach(q => {
      componentes[q.componente] = (componentes[q.componente] || 0) + 1;
    });
    return { total, porSerie, componentes };
  }
};

window.SIMULADOS_CONFIG = SIMULADOS_CONFIG;
window.SIMULADOS_QUESTOES = SIMULADOS_QUESTOES;
window.SimuladosData = SimuladosData;
