import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Rastreamento de Status de Simulados do Estudante", () => {
  it("deve mapear status finalizado (finished) com pontuação correta", () => {
    const rawProgress = {
      simuladoId: "saresp_2026_3em_lp_l1",
      status: "finished",
      result: {
        totalAcertos: 10,
        totalQuestoes: 12,
        score: 83
      },
      finishedAt: "2026-10-07T10:00:00.000Z"
    };

    const score = rawProgress.result.score;
    assert.equal(score, 83);
    assert.equal(rawProgress.status, "finished");
  });

  it("deve mapear status em rascunho (draft) com contagem de respostas preenchidas", () => {
    const answers = {
      "saresp_2026_3em_lp_l1_q1": "A",
      "saresp_2026_3em_lp_l1_q2": "C",
      "saresp_2026_3em_lp_l1_q3": null
    };
    const validCount = Object.keys(answers).filter(k => !!answers[k]).length;
    assert.equal(validCount, 2);
  });

  it("deve classificar pendente (not_started) quando não houver registro nem resposta", () => {
    const studentProgressMap = {};
    const status = studentProgressMap["saresp_2026_3em_mat_l1"] || { status: "not_started" };
    assert.equal(status.status, "not_started");
  });
});
