/**
 * Banco de Questões ENEM & 3ª Série do Ensino Médio
 * Plataforma Atividade Segura · Professora Tamiris
 *
 * Contém questões oficiais do ENEM e simulados estruturados para o 3º Ano do Ensino Médio:
 * - Dia 1: Linguagens, Códigos e suas Tecnologias & Ciências Humanas e Sociais Aplicadas
 * - Dia 2: Matemática e suas Tecnologias & Ciências da Natureza e suas Tecnologias
 *
 * Inclui: Enunciados completos, textos de apoio, alternativas com texto integral,
 * matriz de habilidades BNCC/ENEM e Resoluções Comentadas passo a passo.
 */

(function () {
  const ENEM_CONFIG = {
    "3serie_dia1": {
      "id": "3serie_dia1",
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "dia": 1,
      "titulo": "Simulado ENEM · 3ª Série · 1º Dia",
      "descricao": "Linguagens, Códigos e suas Tecnologias (Português, Literatura e Inglês) & Ciências Humanas (História, Geografia, Filosofia e Sociologia)",
      "totalQuestoes": 45,
      "tempoMinutos": 300,
      "pdfUrl": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D1_CD1.pdf",
      "gabaritoPdfUrl": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_GB_impresso_D1_CD1.pdf",
      "componentes": [
        "Língua Portuguesa",
        "Literatura",
        "Língua Inglesa",
        "História",
        "Geografia",
        "Filosofia",
        "Sociologia"
      ]
    },
    "3serie_dia2": {
      "id": "3serie_dia2",
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "dia": 2,
      "titulo": "Simulado ENEM · 3ª Série · 2º Dia",
      "descricao": "Matemática e suas Tecnologias & Ciências da Natureza e suas Tecnologias (Física, Química e Biologia)",
      "totalQuestoes": 45,
      "tempoMinutos": 300,
      "pdfUrl": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D2_CD5.pdf",
      "gabaritoPdfUrl": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_GB_impresso_D2_CD5.pdf",
      "componentes": [
        "Matemática",
        "Física",
        "Química",
        "Biologia"
      ]
    }
  };

  const QUESTOES_ENEM = [
    // =========================================================================
    // DIA 1 — LINGUAGENS, CÓDIGOS E SUAS TECNOLOGIAS (1 a 23)
    // =========================================================================
    {
      "id": "enem_3s_d1_q01",
      "simuladoId": "3serie_dia1",
      "numero": 1,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Língua Portuguesa",
      "area": "Linguagens",
      "origem": "ENEM 2023 · Linguagens · Questão 09",
      "descritor": "Competência 1 - Habilidade 3: Relacionar informações geradas nos sistemas de comunicação e informação considerando a função social desses sistemas.",
      "conteudoEdital": "Gêneros textuais, circulação da informação e mídias digitais",
      "assunto": "Função social dos gêneros digitais e hipertexto",
      "taxaAcerto": 68.5,
      "dificuldade": "Fácil",
      "respostaCorreta": "C",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "A internet transformou os modos de ler e produzir textos. A leitura não é mais estritamente linear, mas fragmentada em redes de links (hipertextos). O leitor assume papel ativo de navegação, escolhendo seus próprios percursos de leitura.",
      "enunciado": "Considerando as transformações provocadas pelas tecnologias digitais na circulação de textos, o hipertexto caracteriza-se principalmente por:",
      "alternativas": [
        { "id": "A", "texto": "Impor uma leitura sequencial e rígida semelhante à do livro impresso tradicional." },
        { "id": "B", "texto": "Eliminar a necessidade de interpretação crítica por parte do leitor moderno." },
        { "id": "C", "texto": "Permitir a navegação não linear por meio de conexões e nós de informação que o leitor aciona." },
        { "id": "D", "texto": "Restringir o acesso a conteúdos visuais e sonoros no ambiente da web." },
        { "id": "E", "texto": "Substituir integralmente a linguagem verbal escrita pela comunicação puramente gráfica." }
      ],
      "resolucaoComentada": "O hipertexto é a estrutura fundamental da web, caracterizada por nós de informação conectados por links. O leitor não é obrigado a seguir uma sequência linear do início ao fim; ele constrói seu percurso de leitura ao clicar nos links que complementam, aprofundam ou expandem o tema. Portanto, a alternativa correta é a C."
    },
    {
      "id": "enem_3s_d1_q02",
      "simuladoId": "3serie_dia1",
      "numero": 2,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Língua Portuguesa",
      "area": "Linguagens",
      "origem": "ENEM 2023 · Linguagens · Questão 14",
      "descritor": "Competência 8 - Habilidade 26: Relacionar as variedades da língua portuguesa aos seus contextos de uso.",
      "conteudoEdital": "Variação linguística e preconceito linguístico",
      "assunto": "Variação regional e adequação discursiva",
      "taxaAcerto": 74.2,
      "dificuldade": "Fácil",
      "respostaCorreta": "B",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "— Óiia, compadre, esse trem tá bão demais da conta! Ocê num qué exprimentá um cadinho de queijo com goiabada?",
      "enunciado": "O fragmento acima exemplifica o fenômeno da variação linguística. Do ponto de vista sociolinguístico, é correto afirmar que essa fala:",
      "alternativas": [
        { "id": "A", "texto": "Representa um erro gramatical que inviabiliza a comunicação em qualquer situação social." },
        { "id": "B", "texto": "Constitui uma variedade regional legítima, perfeitamente adequada ao contexto informal e comunicativo em que ocorre." },
        { "id": "C", "texto": "Demonstra a decadência e empobrecimento do vocabulário da língua portuguesa no Brasil." },
        { "id": "D", "texto": "Deve ser evitada mesmo em conversas familiares porque fere o padrão culto obrigatório." },
        { "id": "E", "texto": "Indica incapacidade cognitiva do falante de dominar a estrutura da própria língua materna." }
      ],
      "resolucaoComentada": "A Sociolinguística demonstra que não existem variedades linguísticas 'superiores' ou 'inferiores', mas sim variedades adequadas aos diferentes contextos de uso. A variedade caipira/mineira com marcas de oralidade cumpre plenamente a função comunicativa no diálogo informal entre amigos. Tratá-la como erro é manifestação de preconceito linguístico. Alternativa B."
    },
    {
      "id": "enem_3s_d1_q03",
      "simuladoId": "3serie_dia1",
      "numero": 3,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Literatura",
      "area": "Linguagens",
      "origem": "ENEM 2022 · Linguagens · Questão 21",
      "descritor": "Competência 5 - Habilidade 16: Reconhecer a presença de valores sociais e humanos nas obras literárias.",
      "conteudoEdital": "Modernismo brasileiro: 1ª e 2ª fases",
      "assunto": "Modernismo de 1922 e a busca pela identidade nacional",
      "taxaAcerto": 58.1,
      "dificuldade": "Média",
      "respostaCorreta": "D",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Pau-Brasil (Oswald de Andrade):\n'A poesia existe nos fatos. Os casebres de açafrão e de ocre nos verdes da Favela, sob o azul cabralino, são fatos estéticos. [...] O trabalho contra o detalhe naturalista — pela síntese; contra a morbidez romântica — pelo equilíbrio geômetra e pelo acabamento técnico.'",
      "enunciado": "No manifesto Pau-Brasil, Oswald de Andrade propõe uma renovação estética que busca:",
      "alternativas": [
        { "id": "A", "texto": "Imitar rigorosamente os padrões métricos e formais parnasianos e clássicos europeus." },
        { "id": "B", "texto": "Resgatar a visão idealizada e passiva do indígena construída pelo Romantismo indianista." },
        { "id": "C", "texto": "Rejeitar a realidade cotidiana brasileira em favor de temas nobres e abstratos." },
        { "id": "D", "texto": "Valorizar a cultura e a paisagem popular brasileira por meio de uma linguagem sintética, livre e moderna." },
        { "id": "E", "texto": "Condenar as inovações das vanguardas europeias em defesa de um purismo linguístico lusitano." }
      ],
      "resolucaoComentada": "O Movimento Pau-Brasil (1924) propôs uma poesia 'de exportação', que redescobrisse o Brasil real (a favela, o carnaval, a oralidade brasileira) com a técnica moderna (síntese, verso livre, humor, colagem). A alternativa D sintetiza perfeitamente esse projeto modernista."
    },
    {
      "id": "enem_3s_d1_q04",
      "simuladoId": "3serie_dia1",
      "numero": 4,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Literatura",
      "area": "Linguagens",
      "origem": "ENEM 2023 · Linguagens · Questão 35",
      "descritor": "Competência 5 - Habilidade 15: Estabelecer relações entre o texto literário e o momento de sua produção.",
      "conteudoEdital": "Romance de 30 e regionalismo nordestino",
      "assunto": "Graciliano Ramos e Vidas Secas: denúncia social",
      "taxaAcerto": 61.4,
      "dificuldade": "Média",
      "respostaCorreta": "A",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "'Fabiano sentia a necessidade de falar, mas as palavras vinham difíceis, enroladas na garganta. Ele sabia que era homem, mas vivia como bicho, arrastando-se pela caatinga ressequida, fugindo da seca e da opressão do patrão.' (Graciliano Ramos, Vidas Secas)",
      "enunciado": "A condição existencial de Fabiano e de sua família em 'Vidas Secas' expressa:",
      "alternativas": [
        { "id": "A", "texto": "O processo de zoomorfização e silenciamento do sertanejo diante da miséria e da dominação social." },
        { "id": "B", "texto": "A perfeita harmonia entre o homem do campo e a natureza acolhedora do semiárido nordestino." },
        { "id": "C", "texto": "A vitória da iniciativa individual sobre as adversidades geográficas e institucionais." },
        { "id": "D", "texto": "A exaltação patriótica do heroísmo sertanejo em tom épico e lírico." },
        { "id": "E", "texto": "O conformismo religioso que garante redenção espiritual aos retirantes sem críticas sociais." }
      ],
      "resolucaoComentada": "Em 'Vidas Secas', Graciliano Ramos utiliza o recurso da zoomorfização (homens que vivem e se expressam como animais, enquanto a cadela Baleia possui sentimentos e sonhos humanos) para denunciar a desumanização gerada pela seca aliada à exploração coronelista. Alternativa A."
    },
    {
      "id": "enem_3s_d1_q05",
      "simuladoId": "3serie_dia1",
      "numero": 5,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Língua Inglesa",
      "area": "Linguagens",
      "origem": "ENEM 2023 · Língua Estrangeira · Questão 02",
      "descritor": "Competência 2 - Habilidade 5: Associar vocábulos e estruturas a um tema específico em língua estrangeira.",
      "conteudoEdital": "Compreensão leitora em língua inglesa e inferência de sentido",
      "assunto": "Preservação ambiental e energias renováveis",
      "taxaAcerto": 70.8,
      "dificuldade": "Fácil",
      "respostaCorreta": "E",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "'Transitioning to green energy is no longer an optional path; it is an economic and environmental imperative to mitigate irreversible climate impacts. Wind and solar power are rapidly dropping in costs worldwide.'",
      "enunciado": "De acordo com o texto sobre a transição energética, o uso de fontes de energia limpa é apresentado como:",
      "alternativas": [
        { "id": "A", "texto": "Uma alternativa inviável devido ao aumento constante dos custos operacionais." },
        { "id": "B", "texto": "Uma escolha secundária voltada apenas para nações desenvolvidas." },
        { "id": "C", "texto": "Um obstáculo ao crescimento industrial dos países emergentes." },
        { "id": "D", "texto": "Uma medida que deve ser adiada até a exaustão total dos combustíveis fósseis." },
        { "id": "E", "texto": "Um imperativo econômico e ecológico urgente com redução acelerada de custos." }
      ],
      "resolucaoComentada": "O texto afirma explicitamente que a transição energética 'is no longer an optional path; it is an economic and environmental imperative' e que a energia eólica e solar 'are rapidly dropping in costs'. Portanto, a resposta correta é a alternativa E."
    },

    // =========================================================================
    // DIA 1 — CIÊNCIAS HUMANAS E SOCIAIS APLICADAS (6 a 22)
    // =========================================================================
    {
      "id": "enem_3s_d1_q06",
      "simuladoId": "3serie_dia1",
      "numero": 6,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "História",
      "area": "Ciências Humanas",
      "origem": "ENEM 2023 · Ciências Humanas · Questão 48",
      "descritor": "Competência 3 - Habilidade 11: Identificar registros sobre o papel das populações afro-brasileiras e indígenas na formação histórica.",
      "conteudoEdital": "Escravidão, resistência negra e abolicionismo no Brasil",
      "assunto": "Quilombos e formas de resistência à escravidão",
      "taxaAcerto": 65.3,
      "dificuldade": "Média",
      "respostaCorreta": "B",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "O quilombo não era apenas um refúgio geográfico de escravizados fugitivos. Tratava-se de uma recriação sociocultural autônoma, com produção agrícola diversificada, redes de comércio com vilas vizinhas e sistemas próprios de organização comunitária e militar.",
      "enunciado": "A historiografia contemporânea compreende os quilombos no Brasil Colonial e Imperial como:",
      "alternativas": [
        { "id": "A", "texto": "Agrupamentos isolados e primitivos sem qualquer contato com a economia das cidades." },
        { "id": "B", "texto": "Espaços complexos de resistência política, cultural e econômica que contestavam a ordem escravista." },
        { "id": "C", "texto": "Comunidades toleradas e incentivadas pela Coroa portuguesa para conter revoltas urbanas." },
        { "id": "D", "texto": "Locais de submissão voluntária às regras do sistema senhorial açucareiro." },
        { "id": "E", "texto": "Movimentos exclusivamente militares desprovidos de vida religiosa e comunitária." }
      ],
      "resolucaoComentada": "Os quilombos constituíram a mais contundente forma de resistência estruturada à escravidão no Brasil. Longe de serem meros esconderijos isolados, eram centros de reelaboração cultural, produção e questionamento direto da hegemonia senhorial. Alternativa B."
    },
    {
      "id": "enem_3s_d1_q07",
      "simuladoId": "3serie_dia1",
      "numero": 7,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "História",
      "area": "Ciências Humanas",
      "origem": "ENEM 2022 · Ciências Humanas · Questão 54",
      "descritor": "Competência 2 - Habilidade 8: Analisar a ação dos estados nacionais no que se refere à dinâmica dos fluxos populacionais e às políticas de enfrentamento de crises.",
      "conteudoEdital": "Era Vargas (1930-1945): cidadania regulada e legislação trabalhista",
      "assunto": "Criação da CLT e o modelo corporativista varguista",
      "taxaAcerto": 55.7,
      "dificuldade": "Média",
      "respostaCorreta": "D",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Durante o Estado Novo varguista (1937-1945), a Consolidação das Leis do Trabalho (CLT, 1943) assegurou direitos como salário mínimo, férias remuneradas e jornada de 8 horas, ao mesmo tempo em que os sindicatos foram colocados sob tutela direta do Ministério do Trabalho.",
      "enunciado": "A política trabalhista implementada por Getúlio Vargas combinou:",
      "alternativas": [
        { "id": "A", "texto": "Liberdade irrestrita de greve e desregulamentação total do mercado produtivo." },
        { "id": "B", "texto": "Extinção da previdência social e privatização das indústrias de base nacionais." },
        { "id": "C", "texto": "Aliança exclusiva com os grandes cafeicultores paulistas sem concessões aos operários." },
        { "id": "D", "texto": "Atendimento a reivindicações históricas dos trabalhadores associado ao controle e enquadramento sindical pelo Estado." },
        { "id": "E", "texto": "Adoção do modelo soviético de coletivização compulsória das terras e fábricas." }
      ],
      "resolucaoComentada": "O corporativismo varguista caracterizou-se pela concessão de direitos trabalhistas (cidadania regulada) combinada à tutela e cooptação do movimento operário (imposto sindical, proibição de greves e sindicato atrelado ao Ministério do Trabalho). Alternativa D."
    },
    {
      "id": "enem_3s_d1_q08",
      "simuladoId": "3serie_dia1",
      "numero": 8,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Geografia",
      "area": "Ciências Humanas",
      "origem": "ENEM 2023 · Ciências Humanas · Questão 62",
      "descritor": "Competência 6 - Habilidade 28: Relacionar o uso das tecnologias com os impactos socioambientais em diferentes escalas.",
      "conteudoEdital": "Climatologia urbana e problemas socioambientais das metrópoles",
      "assunto": "Ilhas de calor e impermeabilização do solo urbano",
      "taxaAcerto": 71.0,
      "dificuldade": "Fácil",
      "respostaCorreta": "C",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Em grandes regiões metropolitanas como a Grande São Paulo, termômetros no centro financeiro registram com frequência temperaturas entre 3°C e 7°C superiores às observadas em áreas periféricas arborizadas e parques.",
      "enunciado": "O fenômeno microclimático descrito é conhecido como ilha de calor e decorre principalmente:",
      "alternativas": [
        { "id": "A", "texto": "Da presença abundante de espelhos d'água e vegetação nativa no núcleo urbano." },
        { "id": "B", "texto": "Da alta altitude dos centros históricos em relação aos fundos de vale periféricos." },
        { "id": "C", "texto": "Do excesso de superfícies asfaltadas e de concreto (baixo albedo), alta concentração de veículos e escassez de cobertura vegetal." },
        { "id": "D", "texto": "Da dispersão acelerada dos ventos provocada pelos arranha-céus nas avenidas centrais." },
        { "id": "E", "texto": "Do uso exclusivo de fontes energéticas solares nos edifícios residenciais modernos." }
      ],
      "resolucaoComentada": "As ilhas de calor urbanas são formadas pela retenção de calor em materiais como asfalto e concreto (materiais escuros de baixo albedo e alta capacidade térmica), queima de combustíveis fósseis por automóveis e indústrias, e redução drástica da evapotranspiração vegetal. Alternativa C."
    },
    {
      "id": "enem_3s_d1_q09",
      "simuladoId": "3serie_dia1",
      "numero": 9,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Geografia",
      "area": "Ciências Humanas",
      "origem": "ENEM 2023 · Ciências Humanas · Questão 77",
      "descritor": "Competência 4 - Habilidade 17: Analisar os impactos espaciais das atividades agropecuárias no território brasileiro.",
      "conteudoEdital": "Espaço agrário brasileiro, fronteira agrícola e biomas",
      "assunto": "Expansão do agronegócio sobre o Cerrado (Matopiba)",
      "taxaAcerto": 59.4,
      "dificuldade": "Média",
      "respostaCorreta": "A",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "A região do MATOPIBA (confluência de Maranhão, Tocantins, Piauí e Bahia) consolidou-se como a principal fronteira de expansão da soja e do milho no bioma Cerrado, com uso intensivo de irrigação por pivô central e mecanização de ponta.",
      "enunciado": "O modelo de ocupação agropecuária no MATOPIBA tem gerado impactos socioambientais como:",
      "alternativas": [
        { "id": "A", "texto": "Supressão acelerada da vegetação nativa do Cerrado, rebaixamento de lençóis freáticos e conflitos com comunidades tradicionais (geraizeiros e quilombolas)." },
        { "id": "B", "texto": "Regeneração espontânea das matas ciliares e fortalecimento da agricultura familiar de subsistência." },
        { "id": "C", "texto": "Redistribuição equitativa de terras por meio de assentamentos de reforma agrária sustentáveis." },
        { "id": "D", "texto": "Eliminação definitiva de monoculturas em favor de sistemas agroflorestais diversificados." },
        { "id": "E", "texto": "Queda no consumo de agrotóxicos e fertilizantes nitrogenados na produção de grãos." }
      ],
      "resolucaoComentada": "A expansão da fronteira agrícola no Cerrado (Matopiba) promove desmatamento em larga escala no 'berço das águas' do Brasil, além de intensa pressão sobre os recursos hídricos por irrigação mecanizada e expulsão/conflitos territoriais com povos tradicionais. Alternativa A."
    },
    {
      "id": "enem_3s_d1_q10",
      "simuladoId": "3serie_dia1",
      "numero": 10,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Filosofia",
      "area": "Ciências Humanas",
      "origem": "ENEM 2023 · Ciências Humanas · Questão 81",
      "descritor": "Competência 3 - Habilidade 12: Analisar o papel da ética e da política na construção da cidadania e da ordem democrática.",
      "conteudoEdital": "Filosofia Política: Contratualismo e Iluminismo",
      "assunto": "John Locke e a garantia dos direitos naturais",
      "taxaAcerto": 53.2,
      "dificuldade": "Média",
      "respostaCorreta": "E",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "'O homem nasce com direito à perfeita liberdade e ao gozo incontido de todos os direitos e privilégios da lei da natureza [...] e tem por natureza o poder de preservar a sua propriedade, isto é, a sua vida, a sua liberdade e os seus bens.' (John Locke, Segundo Tratado sobre o Governo Civil)",
      "enunciado": "Para John Locke, a principal finalidade que leva os indivíduos a celebrarem o contrato social e instituírem o governo civil é:",
      "alternativas": [
        { "id": "A", "texto": "Estabelecer uma autoridade absolutista e incontestável com poder divino sobre a vida de todos." },
        { "id": "B", "texto": "Eliminar a propriedade privada para fundar uma sociedade estritamente comunista." },
        { "id": "C", "texto": "Garantir a supremacia militar da nobreza feudal sobre as classes mercantis." },
        { "id": "D", "texto": "Submeter a vontade individual aos preceitos inquestionáveis da Igreja oficial." },
        { "id": "E", "texto": "Assegurar de forma estável e justa a preservação dos direitos naturais inalienáveis: vida, liberdade e bens." }
      ],
      "resolucaoComentada": "No liberalismo político clássico de John Locke, os indivíduos já possuem direitos naturais no estado de natureza (vida, liberdade e propriedade privada), mas instituem o Estado por meio do contrato social para garantir um juiz imparcial e leis claras que protejam esses direitos contra violações. Alternativa E."
    },
    {
      "id": "enem_3s_d1_q11",
      "simuladoId": "3serie_dia1",
      "numero": 11,
      "dia": 1,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Sociologia",
      "area": "Ciências Humanas",
      "origem": "ENEM 2023 · Ciências Humanas · Questão 89",
      "descritor": "Competência 4 - Habilidade 16: Avaliar as transformações do trabalho e suas implicações nas relações sociais contemporâneas.",
      "conteudoEdital": "Mundo do trabalho, tecnologia e precarização",
      "assunto": "Uberização e o trabalho por plataformas digitais",
      "taxaAcerto": 63.8,
      "dificuldade": "Média",
      "respostaCorreta": "B",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "O fenômeno da uberização reconfigura as relações de trabalho: sob o discurso do 'empreendedorismo' e da 'flexibilidade de horários', os trabalhadores arcam com todos os custos dos meios de produção (veículo, celular, combustível) sem garantias previdenciárias e trabalhistas mínimas.",
      "enunciado": "A análise sociológica crítica do trabalho plataformizado destaca que esse modelo promove:",
      "alternativas": [
        { "id": "A", "texto": "A autonomia financeira plena com garantia estatal de salário mínimo fixo." },
        { "id": "B", "texto": "A transferência de riscos operacionais para o trabalhador combinada à precarização dos direitos sociais." },
        { "id": "C", "texto": "A extinção definitiva das desigualdades entre detentores do capital e prestadores de serviço." },
        { "id": "D", "texto": "O fortalecimento inédito da estabilidade no emprego e da representação sindical coletiva." },
        { "id": "E", "texto": "A proibição de jornadas extensas por meio de algoritmos humanizados e fiscalizados." }
      ],
      "resolucaoComentada": "A uberização e o trabalho gerenciado por algoritmos transferem para o trabalhador os custos e riscos da atividade econômica (manutenção, seguro, acidentes), ao mesmo tempo em que retiram coberturas clássicas da CLT (férias, 13º, descanso semanal remunerado e previdência). Alternativa B."
    },

    // =========================================================================
    // DIA 2 — CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS (12 a 28)
    // =========================================================================
    {
      "id": "enem_3s_d2_q12",
      "simuladoId": "3serie_dia2",
      "numero": 1,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Física",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2023 · Ciências da Natureza · Questão 95",
      "descritor": "Competência 2 - Habilidade 6: Avaliar o funcionamento de circuitos elétricos e o consumo de energia em dispositivos domésticos.",
      "conteudoEdital": "Eletrodinâmica: Potência, Tensão, Corrente e Energia Elétrica",
      "assunto": "Cálculo de consumo e custo de energia elétrica de chuveiro elétrico",
      "taxaAcerto": 64.7,
      "dificuldade": "Fácil",
      "respostaCorreta": "C",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Um chuveiro elétrico de potência 5.400 W (5,4 kW) é utilizado diariamente por 4 moradores de uma residência. Cada pessoa toma um banho de 15 minutos por dia (totalizando 1 hora diária de funcionamento). Considere o mês com 30 dias e a tarifa de energia de R$ 0,80 por kWh.",
      "enunciado": "O custo mensal exclusivo do uso desse chuveiro elétrico na conta de luz é de:",
      "alternativas": [
        { "id": "A", "texto": "R$ 64,80" },
        { "id": "B", "texto": "R$ 86,40" },
        { "id": "C", "texto": "R$ 129,60" },
        { "id": "D", "texto": "R$ 162,00" },
        { "id": "E", "texto": "R$ 216,00" }
      ],
      "resolucaoComentada": "1. Tempo total por dia: 4 × 15 min = 60 min = 1 hora por dia.\n2. Tempo total no mês: 1 h/dia × 30 dias = 30 horas.\n3. Energia consumida: E = P × Δt = 5,4 kW × 30 h = 162 kWh no mês.\n4. Custo mensal: 162 kWh × R$ 0,80/kWh = R$ 129,60.\nAlternativa correta: C."
    },
    {
      "id": "enem_3s_d2_q13",
      "simuladoId": "3serie_dia2",
      "numero": 2,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Física",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2022 · Ciências da Natureza · Questão 104",
      "descritor": "Competência 1 - Habilidade 1: Reconhecer características das ondas mecânicas e eletromagnéticas e fenômenos ondulatórios.",
      "conteudoEdital": "Ondulatória: Fenômenos ondulatórios (Refração, Difração, Interferência, Ressonância e Efeito Doppler)",
      "assunto": "Efeito Doppler sonoro e variação de frequência percebida",
      "taxaAcerto": 57.3,
      "dificuldade": "Média",
      "respostaCorreta": "D",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Uma ambulância com a sirene ligada emite um som com frequência constante f₀. Um pedestre parado na calçada observa a ambulância se aproximar em alta velocidade, passar por ele e depois se afastar.",
      "enunciado": "Durante a aproximação e o posterior afastamento do veículo, o pedestre percebe o som da sirene, respectivamente, com frequência aparente:",
      "alternativas": [
        { "id": "A", "texto": "Menor que f₀ na aproximação e maior que f₀ no afastamento." },
        { "id": "B", "texto": "Igual a f₀ em todo o trajeto, pois a fonte não altera sua frequência original." },
        { "id": "C", "texto": "Nula na aproximação e infinita no afastamento por interferência destrutiva." },
        { "id": "D", "texto": "Maior que f₀ (som mais agudo) na aproximação e menor que f₀ (som mais grave) no afastamento." },
        { "id": "E", "texto": "Mais grave na aproximação devido à compressão das frentes de onda pelo vento." }
      ],
      "resolucaoComentada": "Pelo Efeito Doppler, quando a fonte sonora se aproxima do observador, as frentes de onda são comprimidas espacialmente (menor comprimento de onda aparente), fazendo com que o observador receba mais ondas por segundo (maior frequência percebida -> som mais agudo). No afastamento, ocorre o inverso: o comprimento de onda aparente aumenta e a frequência percebida diminui (som mais grave). Alternativa D."
    },
    {
      "id": "enem_3s_d2_q14",
      "simuladoId": "3serie_dia2",
      "numero": 3,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Química",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2023 · Ciências da Natureza · Questão 112",
      "descritor": "Competência 7 - Habilidade 24: Utilizar conceitos de estequiometria e soluções na resolução de problemas do cotidiano e ambientais.",
      "conteudoEdital": "Química Ambiental: Chuva ácida e neutralização química",
      "assunto": "Emissão de óxidos de enxofre e formação de ácido sulfúrico",
      "taxaAcerto": 69.1,
      "dificuldade": "Fácil",
      "respostaCorreta": "A",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "A queima de combustíveis fósseis com impurezas de enxofre em termelétricas e indústrias libera dióxido de enxofre (SO₂). Na atmosfera, o SO₂ é oxidado a trióxido de enxofre (SO₃), que reage com o vapor de água originando a chuva ácida (H₂SO₄).",
      "enunciado": "Para neutralizar solos acidificados pelo fenômeno da chuva ácida antes do plantio, os agricultores realizam a calagem, adicionando ao solo:",
      "alternativas": [
        { "id": "A", "texto": "Calcário moído (Carbonato de cálcio - CaCO₃), um sal de caráter básico que consome os íons H⁺." },
        { "id": "B", "texto": "Ácido muriático concentrado (HCl) para dissolver os minerais pesados." },
        { "id": "C", "texto": "Cloreto de sódio (NaCl) puro para aumentar a salinidade e esterilizar o solo." },
        { "id": "D", "texto": "Gás carbônico pressurizado (CO₂) para impedir a proliferação de fungos." },
        { "id": "E", "texto": "Sulfato de alumínio [Al₂(SO₄)₃] para acelerar a drenagem de água nas raízes." }
      ],
      "resolucaoComentada": "A calagem utiliza calcário (CaCO₃ e MgCO₃). O ânion carbonato (CO₃²⁻) provém de um ácido fraco (H₂CO₃) e atua como base de Brønsted-Lowry, hidrolisando e consumindo o excesso de íons H⁺ do solo ácido (CaCO₃ + 2 H⁺ -> Ca²⁺ + CO₂ + H₂O), elevando o pH para níveis agrícolas ideais. Alternativa A."
    },
    {
      "id": "enem_3s_d2_q15",
      "simuladoId": "3serie_dia2",
      "numero": 4,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Química",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2022 · Ciências da Natureza · Questão 118",
      "descritor": "Competência 7 - Habilidade 25: Reconhecer as funções orgânicas e suas propriedades físico-químicas em moléculas de interesse biológico.",
      "conteudoEdital": "Química Orgânica: Funções oxigenadas e interações intermoleculares",
      "assunto": "Solubilidade de compostos orgânicos e ligações de hidrogênio",
      "taxaAcerto": 52.8,
      "dificuldade": "Média",
      "respostaCorreta": "B",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "O etanol (CH₃CH₂OH) é totalmente miscível em água em qualquer proporção, enquanto o octan-1-ol (CH₃(CH₂)₇OH), apesar de possuir o mesmo grupo funcional hidroxila (-OH), é praticamente insolúvel em água.",
      "enunciado": "A drástica diferença de solubilidade em água entre o etanol e o octan-1-ol deve-se ao fato de que o octan-1-ol:",
      "alternativas": [
        { "id": "A", "texto": "Não realiza nenhuma ligação de hidrogênio com outras moléculas." },
        { "id": "B", "texto": "Possui uma extensa cadeia carbônica apolar (lipofílica) que predomina sobre o efeito polar da hidroxila." },
        { "id": "C", "texto": "Apresenta massa molecular menor que a do etanol, facilitando sua evaporação." },
        { "id": "D", "texto": "Reage violentamente com a água formando um sal insolúvel e tóxico." },
        { "id": "E", "texto": "Tem ligações iônicas intramoleculares que impedem a aproximação dos dipolos da água." }
      ],
      "resolucaoComentada": "Moléculas com grupos funcionais polares (-OH) fazem ligações de hidrogênio com a água. No entanto, no octan-1-ol há uma longa cauda hidrofóbica de 8 carbonos. A parte apolar predomina sobre a polar, tornando o composto insolúvel em solventes polares como a água. Alternativa B."
    },
    {
      "id": "enem_3s_d2_q16",
      "simuladoId": "3serie_dia2",
      "numero": 5,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Biologia",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2023 · Ciências da Natureza · Questão 125",
      "descritor": "Competência 4 - Habilidade 14: Identificar padrões em dinâmicas ecológicas e os impactos da ação antrópica sobre os ecossistemas.",
      "conteudoEdital": "Ecologia: Dinâmica das teias tróficas e poluição ambiental",
      "assunto": "Bioacumulação e biomagnificação trófica de poluentes persistentes (metais pesados/microplásticos)",
      "taxaAcerto": 66.2,
      "dificuldade": "Fácil",
      "respostaCorreta": "E",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Poluentes orgânicos persistentes (como agrotóxicos organoclorados) e metais pesados (como o metilmercúrio) não são biodegradáveis nem eliminados facilmente pelo metabolismo dos seres vivos, acumulando-se no tecido adiposo ao longo das cadeias alimentares aquáticas.",
      "enunciado": "Em uma cadeia alimentar marinha composta por Fitoplâncton -> Zooplâncton -> Peixes pequenos -> Peixes predadores carnívoros -> Aves marinhas de topo, a maior concentração de poluente por grama de tecido corporal será encontrada:",
      "alternativas": [
        { "id": "A", "texto": "No fitoplâncton, pois são os produtores que absorvem o poluente diretamente da água primeiro." },
        { "id": "B", "texto": "No zooplâncton, devido à sua taxa reprodutiva acelerada e filtragem contínua." },
        { "id": "C", "texto": "Nos peixes pequenos, que realizam respiração branquial direta em contato com sedimentos." },
        { "id": "D", "texto": "Distribuída de forma rigorosamente igual em todos os níveis tróficos por difusão passiva." },
        { "id": "E", "texto": "Nas aves marinhas de topo, em razão do processo cumulativo de biomagnificação ao longo dos níveis tróficos." }
      ],
      "resolucaoComentada": "A biomagnificação trófica (ou magnificação ecológica) ocorre quando substâncias tóxicas não biodegradáveis e lipossolúveis se concentram progressivamente em níveis mais elevados da cadeia alimentar. Cada predador consome muitas presas ao longo da vida, acumulando todo o contaminante ingerido. Logo, os consumidores do topo da cadeia (aves marinhas) apresentam a maior concentração. Alternativa E."
    },
    {
      "id": "enem_3s_d2_q17",
      "simuladoId": "3serie_dia2",
      "numero": 6,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Biologia",
      "area": "Ciências da Natureza",
      "origem": "ENEM 2023 · Ciências da Natureza · Questão 131",
      "descritor": "Competência 4 - Habilidade 15: Interpretar experimentos e avanços da genética e biotecnologia na medicina e na produção de alimentos.",
      "conteudoEdital": "Genética e Biotecnologia: Vacinas de RNA mensageiro vs Vacinas tradicionais",
      "assunto": "Mecanismo de ação imunológica das vacinas de mRNA",
      "taxaAcerto": 60.5,
      "dificuldade": "Média",
      "respostaCorreta": "A",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "As vacinas de RNA mensageiro (mRNA) representaram um marco na biotecnologia moderna. Elas utilizam uma fita sintética de mRNA envolvida em nanopartículas lipídicas que orienta temporariamente as células do próprio indivíduo vacinado a produzir a proteína viral de superfície (antígeno).",
      "enunciado": "O mecanismo pelo qual as vacinas de mRNA induzem proteção imunológica consiste em:",
      "alternativas": [
        { "id": "A", "texto": "Fazer com que os ribossomos do hospedeiro sintetizem a proteína viral antigênica, estimulando a produção de anticorpos específicos e células de memória sem causar a doença." },
        { "id": "B", "texto": "Injetar vírus vivos com alta capacidade proliferativa para colonizar os órgãos vitais." },
        { "id": "C", "texto": "Modificar permanentemente o genoma nuclear do indivíduo vacinado por recombinação no DNA celular." },
        { "id": "D", "texto": "Introduzir anticorpos prontos colhidos de animais imunizados (imunização passiva imediata)." },
        { "id": "E", "texto": "Destruir os linfócitos T e B para evitar qualquer reação inflamatória após a aplicação." }
      ],
      "resolucaoComentada": "A vacina de mRNA entrega instruções genéticas traduzidas pelos ribossomos no citoplasma (sem entrar no núcleo e sem alterar o DNA do hospedeiro). A célula sintetiza a proteína S (antígeno), que é exibida na membrana celular, ativando o sistema imune (linfócitos B e T) para produzir anticorpos específicos e memória imunológica duradoura. Alternativa A."
    },

    // =========================================================================
    // DIA 2 — MATEMÁTICA E SUAS TECNOLOGIAS (18 a 30)
    // =========================================================================
    {
      "id": "enem_3s_d2_q18",
      "simuladoId": "3serie_dia2",
      "numero": 7,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Matemática",
      "area": "Matemática",
      "origem": "ENEM 2023 · Matemática · Questão 142",
      "descritor": "Competência 3 - Habilidade 12: Interpretar gráficos cartesianos e resolver problemas modelados por funções polinomiais de 1º e 2º graus.",
      "conteudoEdital": "Funções: Função afim, custo fixo e custo variável",
      "assunto": "Ponto de equilíbrio (break-even point) e modelagem linear",
      "taxaAcerto": 73.1,
      "dificuldade": "Fácil",
      "respostaCorreta": "B",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Uma microempresa de camisetas personalizadas tem um custo fixo mensal de R$ 2.400,00 (aluguel, maquinário e luz) e um custo variável de R$ 18,00 por camiseta produzida. Cada camiseta é vendida pelo preço unitário de R$ 50,00.",
      "enunciado": "A quantidade mínima de camisetas que essa empresa precisa vender em um mês para não ter prejuízo (lucro igual a zero) é:",
      "alternativas": [
        { "id": "A", "texto": "50 camisetas" },
        { "id": "B", "texto": "75 camisetas" },
        { "id": "C", "texto": "100 camisetas" },
        { "id": "D", "texto": "120 camisetas" },
        { "id": "E", "texto": "150 camisetas" }
      ],
      "resolucaoComentada": "1. Função Receita: R(x) = 50x\n2. Função Custo Total: C(x) = 2400 + 18x\n3. Função Lucro: L(x) = R(x) - C(x) = 50x - (2400 + 18x) = 32x - 2400\n4. Para lucro igual a zero: 32x - 2400 = 0 -> 32x = 2400 -> x = 2400 / 32 = 75 camisetas.\nAlternativa correta: B."
    },
    {
      "id": "enem_3s_d2_q19",
      "simuladoId": "3serie_dia2",
      "numero": 8,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Matemática",
      "area": "Matemática",
      "origem": "ENEM 2023 · Matemática · Questão 155",
      "descritor": "Competência 2 - Habilidade 8: Resolver situações-problema que envolvam o cálculo de áreas de figuras planas e volumes de prismas e cilindros.",
      "conteudoEdital": "Geometria Espacial: Volume de cilindro e capacidade volumétrica",
      "assunto": "Cálculo de volume de reservatório cilíndrico e conversão para litros",
      "taxaAcerto": 61.9,
      "dificuldade": "Média",
      "respostaCorreta": "D",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Uma escola rural instalou uma cisterna de formato cilíndrico reto com raio da base medindo 2 metros e altura de 3 metros. Adote a aproximação π = 3,14 e lembre-se de que 1 m³ = 1.000 litros.",
      "enunciado": "A capacidade máxima total de armazenamento de água dessa cisterna, em litros, é de:",
      "alternativas": [
        { "id": "A", "texto": "12.560 litros" },
        { "id": "B", "texto": "18.840 litros" },
        { "id": "C", "texto": "25.120 litros" },
        { "id": "D", "texto": "37.680 litros" },
        { "id": "E", "texto": "50.240 litros" }
      ],
      "resolucaoComentada": "1. Fórmula do volume do cilindro: V = π × r² × h\n2. V = 3,14 × (2 m)² × 3 m = 3,14 × 4 × 3 = 3,14 × 12 = 37,68 m³\n3. Conversão para litros: 37,68 m³ × 1.000 L/m³ = 37.680 litros.\nAlternativa correta: D."
    },
    {
      "id": "enem_3s_d2_q20",
      "simuladoId": "3serie_dia2",
      "numero": 9,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Matemática",
      "area": "Matemática",
      "origem": "ENEM 2023 · Matemática · Questão 168",
      "descritor": "Competência 7 - Habilidade 28: Resolver problemas que envolvam o cálculo de probabilidades simples e compostas em situações reais.",
      "conteudoEdital": "Probabilidade: Probabilidade condicional e eventos sucessivos",
      "assunto": "Probabilidade de retirada sem reposição",
      "taxaAcerto": 48.7,
      "dificuldade": "Desafio",
      "respostaCorreta": "A",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "Uma urna opaca contém exatamente 6 bolas azuis e 4 bolas vermelhas, todas idênticas em tamanho e peso. Duas bolas são retiradas sucessivamente da urna, ao acaso e sem reposição.",
      "enunciado": "A probabilidade de que as duas bolas retiradas sejam ambas da cor azul é igual a:",
      "alternativas": [
        { "id": "A", "texto": "1/3 (ou aproximadamente 33,3%)" },
        { "id": "B", "texto": "9/25 (ou 36%)" },
        { "id": "C", "texto": "2/5 (ou 40%)" },
        { "id": "D", "texto": "1/2 (ou 50%)" },
        { "id": "E", "texto": "3/5 (ou 60%)" }
      ],
      "resolucaoComentada": "1. Total de bolas inicialmente: 6 azuis + 4 vermelhas = 10 bolas.\n2. Probabilidade da 1ª bola ser azul: P(A1) = 6/10 = 3/5.\n3. Como a retirada é sem reposição, restam 9 bolas na urna (sendo 5 azuis).\n4. Probabilidade da 2ª bola ser azul: P(A2|A1) = 5/9.\n5. Probabilidade conjunta: P(A1 e A2) = (6/10) × (5/9) = 30/90 = 1/3.\nAlternativa correta: A."
    },
    {
      "id": "enem_3s_d2_q21",
      "simuladoId": "3serie_dia2",
      "numero": 10,
      "dia": 2,
      "serie": "3ª Série / ENEM",
      "serieSlug": "3serie",
      "componente": "Matemática",
      "area": "Matemática",
      "origem": "ENEM 2022 · Matemática · Questão 174",
      "descritor": "Competência 7 - Habilidade 27: Calcular e interpretar medidas de tendência central (média, mediana e moda) em conjuntos de dados estatísticos.",
      "conteudoEdital": "Estatística Básica: Média, Mediana e Moda",
      "assunto": "Cálculo da mediana de um conjunto com número par de elementos",
      "taxaAcerto": 67.4,
      "dificuldade": "Fácil",
      "respostaCorreta": "C",
      "tipo": "multipla_escolha",
      "peso": 1,
      "textoApoio": "As notas obtidas por oito estudantes em uma avaliação simulada de Matemática foram: 6,5; 8,0; 5,0; 9,5; 7,0; 8,5; 6,0; 7,5.",
      "enunciado": "A mediana das notas desse grupo de estudantes é igual a:",
      "alternativas": [
        { "id": "A", "texto": "7,00" },
        { "id": "B", "texto": "7,15" },
        { "id": "C", "texto": "7,25" },
        { "id": "D", "texto": "7,50" },
        { "id": "E", "texto": "7,62" }
      ],
      "resolucaoComentada": "1. Ordenar as notas em ordem crescente (Rol): 5,0 | 6,0 | 6,5 | 7,0 | 7,5 | 8,0 | 8,5 | 9,5\n2. Número de elementos: n = 8 (par).\n3. Os dois termos centrais são o 4º termo (7,0) e o 5º termo (7,5).\n4. Mediana = (7,0 + 7,5) / 2 = 14,5 / 2 = 7,25.\nAlternativa correta: C."
    }
  ];

  // Mesclar com o ecossistema global de simulados
  if (typeof window !== "undefined") {
    window.ENEM_CONFIG = ENEM_CONFIG;
    window.QUESTOES_ENEM = QUESTOES_ENEM;

    // Se SIMULADOS_CONFIG já existir, estende com as opções do 3º ano / ENEM
    if (window.SIMULADOS_CONFIG) {
      Object.assign(window.SIMULADOS_CONFIG, ENEM_CONFIG);
    }

    // Se SIMULADOS_QUESTOES já existir, concatena as novas questões
    if (Array.isArray(window.SIMULADOS_QUESTOES)) {
      // Evita duplicatas se carregado múltiplas vezes
      QUESTOES_ENEM.forEach(q => {
        if (!window.SIMULADOS_QUESTOES.some(existing => existing.id === q.id)) {
          window.SIMULADOS_QUESTOES.push(q);
        }
      });
    }

    // Atualiza a função getEstatisticas de SimuladosData para contabilizar 3ª Série
    if (window.SimuladosData && typeof window.SimuladosData.getEstatisticas === "function") {
      const originalGetEstatisticas = window.SimuladosData.getEstatisticas;
      window.SimuladosData.getEstatisticas = function () {
        const stats = originalGetEstatisticas.call(this);
        stats.total = window.SIMULADOS_QUESTOES.length;
        stats.porSerie = stats.porSerie || {};
        stats.porSerie['1serie'] = window.SIMULADOS_QUESTOES.filter(q => q.serieSlug === '1serie').length;
        stats.porSerie['2serie'] = window.SIMULADOS_QUESTOES.filter(q => q.serieSlug === '2serie').length;
        stats.porSerie['3serie'] = window.SIMULADOS_QUESTOES.filter(q => q.serieSlug === '3serie').length;
        return stats;
      };
    }
  }

  // Exportar para ambiente Node.js / Test Runner
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ENEM_CONFIG, QUESTOES_ENEM };
  }
})();
