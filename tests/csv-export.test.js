import { describe, it } from 'node:test';
import assert from 'node:assert';

// Test implementation of CSV export logic matching ProfessorAtividadeDetalhesView and ProfessorDashboardView
function sanitizeCsv(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

function generateAtividadeCsv(atividade, submissoes) {
  const questoes = atividade.questoes || [];
  const headers = [
    "Estudante",
    "RA",
    "E-mail Institucional",
    "Data de Envio",
    "Horário de Envio",
    "Tempo de Prova (min)",
    "Trocas de Aba",
    "Tempo Fora da Aba (seg)",
    "Nota Final (0 a 10)",
    "Status da Correção"
  ];

  questoes.forEach((q, idx) => {
    const label = q.tipo === "dissertativa" ? "Dissertativa" : "Objetiva";
    headers.push(`Questão ${idx + 1} (${label})`);
  });

  const rows = [headers.map(h => sanitizeCsv(h)).join(";")];

  submissoes.forEach(s => {
    const trocas = s.infracoes?.totalTrocasAba || 0;
    const tempoFora = s.infracoes?.tempoForaSegundos || 0;
    const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
    const nota = s.correcao?.notaTotal !== undefined ? s.correcao.notaTotal : (s.notaFinal !== undefined ? s.notaFinal : "Não corrigida");
    const statusCorrecao = s.correcao ? "Corrigida com IA" : "Pendente";
    const dataEnvioObj = s.dataEnvio ? new Date(s.dataEnvio) : null;
    const dataStr = dataEnvioObj ? dataEnvioObj.toLocaleDateString("pt-BR") : "—";
    const horaStr = dataEnvioObj ? dataEnvioObj.toLocaleTimeString("pt-BR") : "—";

    const row = [
      sanitizeCsv(s.alunoNome || "Aluno"),
      sanitizeCsv(s.alunoRA || "—"),
      sanitizeCsv(s.alunoEmail || "—"),
      sanitizeCsv(dataStr),
      sanitizeCsv(horaStr),
      sanitizeCsv(mins),
      sanitizeCsv(trocas),
      sanitizeCsv(tempoFora),
      sanitizeCsv(nota),
      sanitizeCsv(statusCorrecao)
    ];

    questoes.forEach(q => {
      const resp = s.respostas ? s.respostas[q.id] : "";
      row.push(sanitizeCsv(resp || "Sem resposta"));
    });

    rows.push(row.join(";"));
  });

  return rows.join("\r\n");
}

function generateSimuladosCsv(resultadosSimulados) {
  const headers = [
    "Estudante",
    "RA",
    "E-mail Institucional",
    "Simulado / Caderno",
    "Acertos",
    "Total de Questões",
    "Aproveitamento (%)",
    "Data de Início",
    "Data de Conclusão"
  ];

  const rows = [headers.map(h => sanitizeCsv(h)).join(";")];

  resultadosSimulados.forEach(row => {
    const result = row.result || {};
    const score = result.score ?? 0;
    const acertos = result.totalAcertos ?? Object.keys(row.answers || {}).length;
    const total = result.totalQuestoes ?? "—";
    const inicio = row.startedAt ? new Date(row.startedAt).toLocaleString("pt-BR") : "—";
    const finalizado = row.finishedAt ? new Date(row.finishedAt).toLocaleString("pt-BR") : "—";

    const csvRow = [
      sanitizeCsv(row.studentName || "Aluno"),
      sanitizeCsv(row.studentRA || "—"),
      sanitizeCsv(row.studentEmail || "—"),
      sanitizeCsv(row.simuladoTitulo || row.simuladoId || "Simulado Provão Paulista"),
      sanitizeCsv(acertos),
      sanitizeCsv(total),
      sanitizeCsv(`${score}%`),
      sanitizeCsv(inicio),
      sanitizeCsv(finalizado)
    ];

    rows.push(csvRow.join(";"));
  });

  return rows.join("\r\n");
}

describe("Exportação para Planilha (CSV)", () => {
  it("sanitizeCsv deve escapar aspas duplas corretamente", () => {
    assert.strictEqual(sanitizeCsv('Texto com "aspas"'), '"Texto com ""aspas"""');
  });

  it("sanitizeCsv deve neutralizar fórmulas maliciosas de planilhas", () => {
    assert.strictEqual(sanitizeCsv('=SUM(1,2)'), '"\'=SUM(1,2)"');
    assert.strictEqual(sanitizeCsv('+100'), '"\'+100"');
    assert.strictEqual(sanitizeCsv('-50'), '"\'-50"');
    assert.strictEqual(sanitizeCsv('@cmd'), '"\'@cmd"');
  });

  it("sanitizeCsv deve lidar com null e undefined", () => {
    assert.strictEqual(sanitizeCsv(null), '""');
    assert.strictEqual(sanitizeCsv(undefined), '""');
  });

  it("generateAtividadeCsv deve montar a estrutura correta com questões e submissões", () => {
    const mockAtividade = {
      codigo: "TEST-1234",
      titulo: "Avaliação Bimestral de Matemática",
      questoes: [
        { id: "q1", tipo: "multipla_escolha", enunciado: "2 + 2?" },
        { id: "q2", tipo: "dissertativa", enunciado: "Explique a fórmula de Bhaskara." }
      ]
    };

    const mockSubmissoes = [
      {
        alunoNome: "João Silva",
        alunoRA: "123456789-SP",
        alunoEmail: "joao.silva@aluno.educacao.sp.gov.br",
        dataEnvio: "2026-10-01T10:00:00.000Z",
        tempoGastoSegundos: 1800,
        infracoes: { totalTrocasAba: 0, tempoForaSegundos: 0 },
        correcao: { notaTotal: 9.5 },
        respostas: { q1: "B", q2: "Fórmula para raízes de 2º grau: (-b +- sqrt(delta))/(2a)" }
      },
      {
        alunoNome: "Maria Souza",
        alunoRA: "987654321-SP",
        alunoEmail: "maria.souza@aluno.educacao.sp.gov.br",
        dataEnvio: "2026-10-01T10:30:00.000Z",
        tempoGastoSegundos: 2400,
        infracoes: { totalTrocasAba: 2, tempoForaSegundos: 15 },
        correcao: null,
        notaFinal: 7.0,
        respostas: { q1: "A", q2: "Não lembro direito" }
      }
    ];

    const csv = generateAtividadeCsv(mockAtividade, mockSubmissoes);
    const lines = csv.split("\r\n");

    assert.strictEqual(lines.length, 3);
    assert.ok(lines[0].includes("Questão 1 (Objetiva)"));
    assert.ok(lines[0].includes("Questão 2 (Dissertativa)"));
    assert.ok(lines[1].includes('"João Silva"'));
    assert.ok(lines[1].includes('"123456789-SP"'));
    assert.ok(lines[1].includes('"9.5"'));
    assert.ok(lines[1].includes('"Corrigida com IA"'));
    assert.ok(lines[2].includes('"Maria Souza"'));
    assert.ok(lines[2].includes('"2"')); // 2 trocas
    assert.ok(lines[2].includes('"Pendente"'));
  });

  it("generateSimuladosCsv deve exportar dados dos simulados do Provão", () => {
    const mockSimulados = [
      {
        studentName: "Carlos Eduardo",
        studentRA: "112233445-SP",
        studentEmail: "carlos.eduardo@aluno.educacao.sp.gov.br",
        simuladoTitulo: "Provão Paulista 2026 - 1ª Série EM - Dia 1",
        startedAt: "2026-10-01T08:00:00.000Z",
        finishedAt: "2026-10-01T09:30:00.000Z",
        result: {
          score: 85,
          totalAcertos: 38,
          totalQuestoes: 45
        }
      }
    ];

    const csv = generateSimuladosCsv(mockSimulados);
    const lines = csv.split("\r\n");

    assert.strictEqual(lines.length, 2);
    assert.ok(lines[0].includes("Simulado / Caderno"));
    assert.ok(lines[1].includes('"Carlos Eduardo"'));
    assert.ok(lines[1].includes('"38"'));
    assert.ok(lines[1].includes('"45"'));
    assert.ok(lines[1].includes('"85%"'));
  });
});
