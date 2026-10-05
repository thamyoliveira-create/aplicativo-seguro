import { describe, it } from 'node:test';
import assert from 'node:assert';

function calcularDiagnostico(atividade, submissoes) {
  const totalSubs = submissoes.length;
  const questoes = atividade.questoes || [];

  const mediaNotasNum = totalSubs > 0
    ? submissoes.reduce((acc, s) => acc + (Number(s.correcao?.notaTotal ?? s.notaFinal ?? 0)), 0) / totalSubs
    : 0;

  let nivel = "Abaixo do Básico";
  if (mediaNotasNum >= 8.5) nivel = "Avançado";
  else if (mediaNotasNum >= 7.0) nivel = "Adequado";
  else if (mediaNotasNum >= 5.0) nivel = "Básico";

  const analiseQuestoes = questoes.map((q, idx) => {
    const isDiss = q.tipo === "dissertativa";
    let acertos = 0;
    let somaNotas = 0;
    const distratores = {};

    if (!isDiss) {
      (q.alternativas || []).forEach(a => {
        distratores[String(a.id).toUpperCase()] = 0;
      });
    }

    submissoes.forEach(s => {
      const resp = s.respostas ? String(s.respostas[q.id] || "").trim().toUpperCase() : "";
      if (!isDiss) {
        if (resp === String(q.correta || "A").trim().toUpperCase()) {
          acertos++;
        }
        if (resp && distratores[resp] !== undefined) {
          distratores[resp]++;
        } else if (resp) {
          distratores[resp] = (distratores[resp] || 0) + 1;
        }
      } else {
        const itemNota = Number(s.correcao?.detalhes?.[q.id]?.nota ?? (s.correcao ? 0 : (q.peso || 1)));
        somaNotas += itemNota;
        if (itemNota >= (q.peso || 1) * 0.6) acertos++;
      }
    });

    const taxaAcertoPct = totalSubs > 0 ? Math.round((acertos / totalSubs) * 100) : 0;
    const taxaErroPct = 100 - taxaAcertoPct;

    return {
      idx,
      questao: q,
      isDiss,
      acertos,
      taxaAcertoPct,
      taxaErroPct,
      distratores,
      mediaPontos: isDiss && totalSubs > 0 ? (somaNotas / totalSubs).toFixed(1) : null
    };
  });

  const sortedByAcerto = [...analiseQuestoes].sort((a, b) => b.taxaAcertoPct - a.taxaAcertoPct);
  const topAcerto = sortedByAcerto[0];
  const topErro = sortedByAcerto[sortedByAcerto.length - 1];

  return {
    mediaNotas: mediaNotasNum.toFixed(1),
    nivel,
    analiseQuestoes,
    topAcerto,
    topErro
  };
}

describe("Diagnóstico pedagógico por questão", () => {
  const atividade = {
    questoes: [
      {
        id: "q1",
        tipo: "multipla_escolha",
        correta: "B",
        alternativas: [
          { id: "A", texto: "3" },
          { id: "B", texto: "4" },
          { id: "C", texto: "5" },
          { id: "D", texto: "6" }
        ]
      },
      {
        id: "q2",
        tipo: "multipla_escolha",
        correta: "A",
        alternativas: [
          { id: "A", texto: "Sujeito" },
          { id: "B", texto: "Predicado" },
          { id: "C", texto: "Objeto" },
          { id: "D", texto: "Adjunto" }
        ]
      },
      {
        id: "q3",
        tipo: "dissertativa",
        peso: 2,
        respostaEsperada: "Explicação coerente"
      }
    ]
  };

  const submissoes = [
    { notaFinal: 8, respostas: { q1: "B", q2: "A", q3: "Boa resposta" }, correcao: { notaTotal: 8, detalhes: { q3: { nota: 2 } } } },
    { notaFinal: 6, respostas: { q1: "A", q2: "A", q3: "Parcial" }, correcao: { notaTotal: 6, detalhes: { q3: { nota: 1 } } } },
    { notaFinal: 4, respostas: { q1: "C", q2: "B", q3: "Incorreta" }, correcao: { notaTotal: 4, detalhes: { q3: { nota: 0 } } } },
    { notaFinal: 7, respostas: { q1: "B", q2: "C", q3: "Boa resposta" }, correcao: { notaTotal: 7, detalhes: { q3: { nota: 2 } } } }
  ];

  it("calcula nível da turma pela média", () => {
    const diag = calcularDiagnostico(atividade, submissoes);
    assert.strictEqual(diag.mediaNotas, "6.3");
    assert.strictEqual(diag.nivel, "Básico");
  });

  it("calcula taxa de acerto e erro das questões objetivas", () => {
    const diag = calcularDiagnostico(atividade, submissoes);
    assert.strictEqual(diag.analiseQuestoes[0].acertos, 2);
    assert.strictEqual(diag.analiseQuestoes[0].taxaAcertoPct, 50);
    assert.strictEqual(diag.analiseQuestoes[0].taxaErroPct, 50);
    assert.strictEqual(diag.analiseQuestoes[1].acertos, 2);
    assert.strictEqual(diag.analiseQuestoes[1].taxaAcertoPct, 50);
  });

  it("monta mapa de alternativas escolhidas pela turma", () => {
    const diag = calcularDiagnostico(atividade, submissoes);
    assert.deepStrictEqual(diag.analiseQuestoes[0].distratores, {
      A: 1,
      B: 2,
      C: 1,
      D: 0
    });
  });

  it("calcula desempenho das questões dissertativas por nota parcial", () => {
    const diag = calcularDiagnostico(atividade, submissoes);
    assert.strictEqual(diag.analiseQuestoes[2].acertos, 2);
    assert.strictEqual(diag.analiseQuestoes[2].taxaAcertoPct, 50);
    assert.strictEqual(diag.analiseQuestoes[2].mediaPontos, "1.3");
  });

  it("identifica questões com maior domínio e ponto de intervenção", () => {
    const diag = calcularDiagnostico(atividade, submissoes);
    assert.ok(diag.topAcerto);
    assert.ok(diag.topErro);
    assert.strictEqual(diag.topAcerto.taxaAcertoPct, 50);
    assert.strictEqual(diag.topErro.taxaErroPct, 50);
  });
});
