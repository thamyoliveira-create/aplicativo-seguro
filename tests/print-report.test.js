import { describe, it } from 'node:test';
import assert from 'node:assert';

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function gerarAtaHtml({ atividade, submissoes, professorNome, escola }) {
  const atv = atividade || {};
  const subs = submissoes || [];
  const totalSubs = subs.length;
  const mediaNotasNum = totalSubs > 0
    ? subs.reduce((acc, s) => acc + (Number(s.correcao?.notaTotal ?? s.notaFinal ?? 0)), 0) / totalSubs
    : 0;
  const mediaNotas = mediaNotasNum.toFixed(1);
  const totalInf = subs.reduce((acc, s) => acc + (s.infracoes?.totalTrocasAba || 0), 0);
  const hoje = new Date("2026-10-05T12:00:00.000Z").toLocaleDateString("pt-BR");

  const linhas = subs.map((s, idx) => {
    const nota = s.correcao?.notaTotal !== undefined ? s.correcao.notaTotal : (s.notaFinal !== undefined ? s.notaFinal : "Pendente");
    const mins = Math.floor((s.tempoGastoSegundos || 0) / 60);
    const trocas = s.infracoes?.totalTrocasAba || 0;
    const dataEnvio = s.dataEnvio ? new Date(s.dataEnvio).toLocaleString("pt-BR") : "—";
    return `
      <tr>
        <td>${idx + 1}</td>
        <td>${escapeHtml(s.alunoNome || "Aluno")}</td>
        <td>${escapeHtml(s.alunoRA || "—")}</td>
        <td>${escapeHtml(String(nota))}</td>
        <td>${mins} min</td>
        <td>${trocas}</td>
        <td>${escapeHtml(dataEnvio)}</td>
      </tr>
    `;
  }).join("");

  return `
    <!doctype html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Ata de Avaliação - ${escapeHtml(atv.titulo || "Atividade Segura")}</title>
      <style>
        @page { size: A4; margin: 18mm 14mm; }
        @media print { .print-actions { display: none; } }
      </style>
    </head>
    <body>
      <div class="print-actions">
        <button class="primary" onclick="window.print()">Imprimir / Salvar em PDF</button>
        <button class="secondary" onclick="window.close()">Fechar</button>
      </div>
      <main class="sheet">
        <header>
          <div>
            <div class="brand">Atividade Segura • Relatório Oficial</div>
            <h1>Ata de Avaliação</h1>
            <div class="meta">
              <strong>Escola:</strong> ${escapeHtml(escola)}<br>
              <strong>Professor(a):</strong> ${escapeHtml(professorNome)}<br>
              <strong>Atividade:</strong> ${escapeHtml(atv.titulo || "Avaliação")}<br>
              <strong>Turma/Ano:</strong> ${escapeHtml(atv.anoTurma || "—")} • <strong>Disciplina:</strong> ${escapeHtml(atv.disciplina || "—")}
            </div>
          </div>
          <div class="stamp">
            <strong>Código:</strong> ${escapeHtml(atv.codigo || "—")}<br>
            <strong>Data:</strong> ${hoje}<br>
            <strong>Questões:</strong> ${(atv.questoes || []).length}<br>
            <strong>Tempo limite:</strong> ${atv.tempoLimiteMinutos || 45} min
          </div>
        </header>
        <section class="stats">
          <div class="card"><div class="label">Entregas</div><div class="value">${totalSubs}</div></div>
          <div class="card"><div class="label">Média Geral</div><div class="value">${mediaNotas}</div></div>
          <div class="card"><div class="label">Trocas de Aba</div><div class="value">${totalInf}</div></div>
          <div class="card"><div class="label">Status</div><div class="value">Registrado</div></div>
        </section>
        <table>
          <tbody>${linhas || `<tr><td colspan="7" style="text-align:center;color:#64748b;">Nenhuma entrega registrada até o momento.</td></tr>`}</tbody>
        </table>
        <section class="assinaturas">
          <div class="linha">Assinatura do(a) Professor(a)</div>
          <div class="linha">Coordenação / Gestão Escolar</div>
        </section>
      </main>
    </body>
    </html>
  `;
}

describe("Ata de fechamento / impressão", () => {
  const atividade = {
    codigo: "AVAL-2026",
    titulo: "Avaliação de Ciências",
    anoTurma: "9º Ano A",
    disciplina: "Ciências",
    tempoLimiteMinutos: 45,
    questoes: [{ id: "q1" }, { id: "q2" }]
  };

  const submissoes = [
    {
      alunoNome: "Ana Clara",
      alunoRA: "123-SP",
      tempoGastoSegundos: 2700,
      dataEnvio: "2026-10-01T10:00:00.000Z",
      infracoes: { totalTrocasAba: 0 },
      correcao: { notaTotal: 9 }
    },
    {
      alunoNome: "Bruno Lima",
      alunoRA: "456-SP",
      tempoGastoSegundos: 2400,
      dataEnvio: "2026-10-01T10:30:00.000Z",
      infracoes: { totalTrocasAba: 2 },
      notaFinal: 7
    }
  ];

  it("gera HTML com cabeçalho, métricas e ações de impressão", () => {
    const html = gerarAtaHtml({ atividade, submissoes, professorNome: "Professora Tamiris", escola: "Escola Estadual Modelo" });

    assert.ok(html.includes("Ata de Avaliação"));
    assert.ok(html.includes("Atividade Segura • Relatório Oficial"));
    assert.ok(html.includes("Imprimir / Salvar em PDF"));
    assert.ok(html.includes("Escola Estadual Modelo"));
    assert.ok(html.includes("Professora Tamiris"));
    assert.ok(html.includes("AVAL-2026"));
    assert.ok(html.includes("Média Geral"));
    assert.ok(html.includes(">8.0<"));
    assert.ok(html.includes("Trocas de Aba"));
    assert.ok(html.includes(">2<"));
  });

  it("lista estudantes, RA, nota, tempo e envio", () => {
    const html = gerarAtaHtml({ atividade, submissoes, professorNome: "Professora Tamiris", escola: "Escola Estadual Modelo" });

    assert.ok(html.includes("Ana Clara"));
    assert.ok(html.includes("123-SP"));
    assert.ok(html.includes(">9<"));
    assert.ok(html.includes("45 min"));
    assert.ok(html.includes("Bruno Lima"));
    assert.ok(html.includes("456-SP"));
    assert.ok(html.includes(">7<"));
    assert.ok(html.includes("40 min"));
  });

  it("escapa HTML inserido em nomes e títulos", () => {
    const html = gerarAtaHtml({
      atividade: { ...atividade, titulo: '<script>alert("x")</script>' },
      submissoes: [{ ...submissoes[0], alunoNome: '<img src=x onerror=alert(1)>' }],
      professorNome: '<b>Prof</b>',
      escola: '<i>Escola</i>'
    });

    assert.ok(!html.includes('<script>alert("x")</script>'));
    assert.ok(html.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'));
    assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
    assert.ok(html.includes('&lt;b&gt;Prof&lt;/b&gt;'));
    assert.ok(html.includes('&lt;i&gt;Escola&lt;/i&gt;'));
  });

  it("mostra estado vazio quando não há entregas", () => {
    const html = gerarAtaHtml({ atividade, submissoes: [], professorNome: "Professora Tamiris", escola: "Escola Estadual Modelo" });

    assert.ok(html.includes("Nenhuma entrega registrada até o momento."));
    assert.ok(html.includes(">0.0<"));
  });
});
