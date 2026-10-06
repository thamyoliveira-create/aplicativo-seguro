import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// Carregar arquivos de dados
const provaoCode = fs.readFileSync(path.resolve('./js/data/simulados-provao-2026.js'), 'utf-8');
const enemCode = fs.readFileSync(path.resolve('./js/data/questoes-enem.js'), 'utf-8');

// Executar em contexto simulado do browser
const context = {
  window: {},
  console
};
vm.createContext(context);
vm.runInContext(provaoCode, context);
vm.runInContext(enemCode, context);

describe('Banco de Questões e Simulados ENEM (3ª Série EM)', () => {
  it('deve registrar as configurações dos cadernos do ENEM (Dia 1 e Dia 2)', () => {
    const configDia1 = context.window.SimuladosData.getConfig('3serie_dia1');
    const configDia2 = context.window.SimuladosData.getConfig('3serie_dia2');

    assert.ok(configDia1, 'Configuração do 3ª Série Dia 1 deve existir');
    assert.strictEqual(configDia1.id, '3serie_dia1');
    assert.strictEqual(configDia1.serieSlug, '3serie');
    assert.strictEqual(configDia1.dia, 1);
    assert.ok(configDia1.componentes.includes('Língua Portuguesa'));
    assert.ok(configDia1.componentes.includes('História'));

    assert.ok(configDia2, 'Configuração do 3ª Série Dia 2 deve existir');
    assert.strictEqual(configDia2.id, '3serie_dia2');
    assert.strictEqual(configDia2.serieSlug, '3serie');
    assert.strictEqual(configDia2.dia, 2);
    assert.ok(configDia2.componentes.includes('Matemática'));
    assert.ok(configDia2.componentes.includes('Física'));
  });

  it('deve conter todas as questões catalogadas com campos obrigatórios íntegros', () => {
    const questoesDia1 = context.window.SimuladosData.getQuestoesPorSimulado('3serie_dia1');
    const questoesDia2 = context.window.SimuladosData.getQuestoesPorSimulado('3serie_dia2');

    assert.ok(questoesDia1.length > 0, 'Deve conter questões para 3ª Série Dia 1');
    assert.ok(questoesDia2.length > 0, 'Deve conter questões para 3ª Série Dia 2');

    const todasENEM = [...questoesDia1, ...questoesDia2];

    todasENEM.forEach((q, idx) => {
      assert.ok(q.id, `Questão index ${idx} deve ter id único`);
      assert.ok(typeof q.numero === 'number' && q.numero > 0, `Questão ${q.id} deve ter número válido`);
      assert.ok(q.componente, `Questão ${q.id} deve ter componente curricular definido`);
      assert.ok(q.assunto, `Questão ${q.id} deve ter assunto/tópico definido`);
      assert.ok(['A', 'B', 'C', 'D', 'E'].includes(q.respostaCorreta), `Questão ${q.id} deve ter gabarito oficial entre A e E (encontrado: ${q.respostaCorreta})`);
      assert.ok(q.enunciado, `Questão ${q.id} deve conter o enunciado da questão`);
      assert.ok(Array.isArray(q.alternativas), `Questão ${q.id} deve conter array de alternativas`);
      assert.strictEqual(q.alternativas.length, 5, `Questão ${q.id} deve conter 5 alternativas de A a E`);
      const letras = q.alternativas.map(a => a.id);
      assert.strictEqual(JSON.stringify(letras), JSON.stringify(['A', 'B', 'C', 'D', 'E']), `Questão ${q.id} deve conter ids A, B, C, D, E`);
      q.alternativas.forEach(alt => {
        assert.ok(alt.texto && typeof alt.texto === 'string' && alt.texto.length > 0, `Alternativa ${alt.id} da questão ${q.id} deve ter texto preenchido`);
      });
      assert.ok(q.resolucaoComentada, `Questão ${q.id} deve conter resolução comentada para treino`);
      assert.ok(q.descritor || q.habilidadeBncc, `Questão ${q.id} deve conter código de habilidade/descritor BNCC`);
    });
  });

  it('deve permitir filtragem de questões por série 3ª série via getQuestoesPorFiltro', () => {
    const filtradas3Serie = context.window.SimuladosData.getQuestoesPorFiltro({ serie: '3serie' });
    const filtradas1Serie = context.window.SimuladosData.getQuestoesPorFiltro({ serie: '1serie' });
    const todas = context.window.SIMULADOS_QUESTOES;

    assert.ok(filtradas3Serie.length > 0, 'Filtro por 3serie deve retornar questões');
    assert.ok(filtradas1Serie.length > 0, 'Filtro por 1serie deve retornar questões');
    assert.ok(todas.length >= filtradas3Serie.length + filtradas1Serie.length, 'Total consolidado deve abranger todas as séries');
  });

  it('deve calcular estatísticas consolidadas incluindo cadernos do ENEM', () => {
    const stats = context.window.SimuladosData.getEstatisticas();
    assert.ok(stats.total > 0, 'Total de questões nas estatísticas deve ser positivo');
    assert.ok(stats.porSerie, 'Estatísticas devem detalhar por série');
    assert.ok(stats.porSerie['3serie'] > 0, 'Estatísticas devem contabilizar 3ª série');
  });
});
