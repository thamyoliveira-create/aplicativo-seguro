import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const provaoCode = fs.readFileSync(path.resolve('./js/data/simulados-provao-2026.js'), 'utf-8');
const enemCode = fs.readFileSync(path.resolve('./js/data/questoes-enem.js'), 'utf-8');
const sarespCode = fs.readFileSync(path.resolve('./js/data/simulados-saresp-2026.js'), 'utf-8');

const context = {
  window: {},
  console
};
vm.createContext(context);
vm.runInContext(provaoCode, context);
vm.runInContext(enemCode, context);
vm.runInContext(sarespCode, context);

const EXPECTED_BOOKLETS = {
  saresp_2026_5ef_dia1: { total: 48, serieSlug: '5ef', dia: 1, alternativas: 4 },
  saresp_2026_6ef_dia1: { total: 40, serieSlug: '6ef', dia: 1, alternativas: 4 },
  saresp_2026_6ef_dia2: { total: 40, serieSlug: '6ef', dia: 2, alternativas: 4 },
  saresp_2026_7ef_dia1: { total: 40, serieSlug: '7ef', dia: 1, alternativas: 4 },
  saresp_2026_7ef_dia2: { total: 40, serieSlug: '7ef', dia: 2, alternativas: 4 },
  saresp_2026_8ef_dia1: { total: 40, serieSlug: '8ef', dia: 1, alternativas: 4 },
  saresp_2026_8ef_dia2: { total: 40, serieSlug: '8ef', dia: 2, alternativas: 4 },
  saresp_2026_9ef_dia1: { total: 48, serieSlug: '9ef', dia: 1, alternativas: 4 },
  saresp_2026_9ef_dia2: { total: 40, serieSlug: '9ef', dia: 2, alternativas: 4 },
  saresp_2026_3em_lp_l1: { total: 24, serieSlug: '3serie', dia: 1, alternativas: 5 },
  saresp_2026_3em_lp_l2: { total: 24, serieSlug: '3serie', dia: 2, alternativas: 5 },
  saresp_2026_3em_mat_l1: { total: 24, serieSlug: '3serie', dia: 1, alternativas: 5 },
  saresp_2026_3em_mat_l2: { total: 24, serieSlug: '3serie', dia: 2, alternativas: 5 }
};

describe('Simulados SARESP 2026 (Ensino Fundamental e 3ª Série EM)', () => {
  it('deve registrar os 13 cadernos oficiais do SARESP no catálogo global', () => {
    Object.entries(EXPECTED_BOOKLETS).forEach(([id, expected]) => {
      const config = context.window.SimuladosData.getConfig(id);
      assert.ok(config, `Configuração ${id} deve existir`);
      assert.strictEqual(config.id, id);
      assert.strictEqual(config.serieSlug, expected.serieSlug);
      assert.strictEqual(config.dia, expected.dia);
      assert.strictEqual(config.totalQuestoes, expected.total);
      assert.ok(config.pdfUrl.endsWith('.pdf'), `${id} deve apontar para PDF oficial`);
      assert.ok(config.gabaritoPdfUrl.endsWith('.pdf'), `${id} deve apontar para gabarito oficial`);
      assert.ok(Array.isArray(config.componentes) && config.componentes.length > 0, `${id} deve listar componentes`);
    });
  });

  it('deve conter exatamente 472 questões SARESP com gabarito oficial', () => {
    assert.ok(Array.isArray(context.window.QUESTOES_SARESP), 'QUESTOES_SARESP deve existir');
    assert.strictEqual(context.window.QUESTOES_SARESP.length, 472);

    const totalEsperado = Object.values(EXPECTED_BOOKLETS).reduce((sum, item) => sum + item.total, 0);
    assert.strictEqual(totalEsperado, 472);
  });

  it('deve manter a quantidade correta de questões por caderno', () => {
    Object.entries(EXPECTED_BOOKLETS).forEach(([id, expected]) => {
      const questoes = context.window.SimuladosData.getQuestoesPorSimulado(id);
      assert.strictEqual(questoes.length, expected.total, `${id} deve conter ${expected.total} questões`);
      assert.strictEqual(questoes[0].numero, 1, `${id} deve iniciar na questão 1`);
      assert.strictEqual(questoes.at(-1).numero, expected.total, `${id} deve terminar na questão ${expected.total}`);
    });
  });

  it('deve aplicar 4 alternativas no EF e 5 alternativas na 3ª Série EM', () => {
    Object.entries(EXPECTED_BOOKLETS).forEach(([id, expected]) => {
      const questoes = context.window.SimuladosData.getQuestoesPorSimulado(id);
      const letrasEsperadas = expected.alternativas === 4 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];

      questoes.forEach((q) => {
        assert.ok(['A', 'B', 'C', 'D', 'E'].includes(q.respostaCorreta), `${q.id} deve ter gabarito válido`);
        assert.ok(letrasEsperadas.includes(q.respostaCorreta), `${q.id} deve respeitar o padrão de alternativas do caderno`);
        assert.strictEqual(q.alternativas.length, expected.alternativas, `${q.id} deve conter ${expected.alternativas} alternativas`);
        assert.strictEqual(JSON.stringify(q.alternativas.map(alt => alt.id)), JSON.stringify(letrasEsperadas), `${q.id} deve manter letras de alternativas corretas`);
      });
    });
  });

  it('deve apontar cada questão para página WebP renderizada do caderno oficial', () => {
    context.window.QUESTOES_SARESP.forEach((q) => {
      assert.ok(Number.isInteger(q.paginaPdf) && q.paginaPdf > 0, `${q.id} deve ter página PDF válida`);
      assert.ok(q.imagemPagina.endsWith(`_p${q.paginaPdf}.webp`), `${q.id} deve apontar para imagem da página`);
      assert.ok(q.imagemPagina.startsWith('assets/simulados/pages/'), `${q.id} deve usar pasta de páginas renderizadas`);
      assert.ok(q.pdfUrl.endsWith('.pdf'), `${q.id} deve manter PDF oficial associado`);
    });
  });

  it('deve incluir as novas séries no filtro e nas estatísticas consolidadas', () => {
    const stats = context.window.SimuladosData.getEstatisticas();
    ['5ef', '6ef', '7ef', '8ef', '9ef', '3serie'].forEach((serie) => {
      assert.ok(stats.porSerie[serie] > 0, `Estatísticas devem contabilizar ${serie}`);
      assert.ok(context.window.SimuladosData.getQuestoesPorFiltro({ serie }).length > 0, `Filtro por ${serie} deve retornar questões`);
    });
  });
});
