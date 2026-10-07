/**
 * Testes Unitários - Autenticação & RA/Dígito SEDUC-SP
 * Validação de regras de login, conversão de RA, registro e acesso
 *
 * Executar: node --test tests/auth.test.js
 */

import { describe, it } from "node:test";
import assert from "node:assert";

// Implementação isolada das funções de validação e conversão do PortalAuth
const PortalAuthHelper = {
  domains: {
    teacher: ["@professor.educacao.sp.gov.br", "@prof.educacao.sp.gov.br"],
    student: ["@aluno.educacao.sp.gov.br"]
  },

  normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  },

  roleFromEmail(email) {
    const normalized = this.normalizeEmail(email);
    if (this.domains.teacher.some((domain) => normalized.endsWith(domain))) return "teacher";
    if (this.domains.student.some((domain) => normalized.endsWith(domain))) return "student";
    return null;
  },

  canBypassEmailVerification(email, role) {
    return ["teacher", "student"].includes(role) && this.roleFromEmail(email) === role;
  },

  raToEmail(ra, dig = "", uf = "sp") {
    const rawRa = String(ra || "").trim();
    if (!rawRa) throw new Error("Informe o RA do aluno.");

    if (rawRa.includes("@")) {
      return this.normalizeEmail(rawRa);
    }

    let cleanRa = "";
    let cleanDig = String(dig || "").trim().toLowerCase();
    let cleanUf = String(uf || "sp").trim().toLowerCase();

    const separatedMatch = rawRa.match(/^0*(\d{5,12})[-_/\s]+([0-9a-zA-Z])(?:[-_/\s]*([a-zA-Z]{2}))?$/i);
    if (separatedMatch) {
      cleanRa = separatedMatch[1];
      cleanDig = separatedMatch[2].toLowerCase();
      cleanUf = (separatedMatch[3] || cleanUf || "sp").toLowerCase();
    } else {
      cleanRa = rawRa.replace(/\D/g, "").replace(/^0+/, "");
      if (!cleanDig) {
        throw new Error("Informe o dígito do RA (ex: 5 ou X).");
      }
    }

    if (!cleanRa) throw new Error("Número de RA inválido.");
    if (!cleanDig) throw new Error("Informe o dígito do RA.");

    return `0000${cleanRa}${cleanDig}${cleanUf}@aluno.educacao.sp.gov.br`;
  },

  formatRA(ra, dig = "", uf = "SP") {
    const rawRa = String(ra || "").trim();
    if (rawRa.includes("@")) {
      const extracted = this.extractRAFromEmail(rawRa);
      return extracted ? `${extracted.replace(".", "-")}/SP` : rawRa;
    }

    const separatedMatch = rawRa.match(/^0*(\d{5,12})[-_/\s]+([0-9a-zA-Z])(?:[-_/\s]*([a-zA-Z]{2}))?$/i);
    if (separatedMatch) {
      return `${separatedMatch[1]}-${separatedMatch[2].toUpperCase()}/${(separatedMatch[3] || uf).toUpperCase()}`;
    }

    const cleanRa = rawRa.replace(/\D/g, "").replace(/^0+/, "");
    const cleanDig = String(dig || "").trim().toUpperCase();
    return cleanDig ? `${cleanRa}-${cleanDig}/${uf.toUpperCase()}` : cleanRa;
  },

  extractRAFromEmail(email) {
    const normalized = this.normalizeEmail(email);
    if (!this.domains.student.some((domain) => normalized.endsWith(domain))) return null;

    const localPart = normalized.split("@")[0];
    const plusParts = localPart.split("+");

    if (plusParts.length === 4 && plusParts[0] === "0000" && /^\d+$/.test(plusParts[1]) && /^\d$/.test(plusParts[2])) {
      return `${plusParts[1]}.${plusParts[2]}`;
    }

    const compact = localPart.match(/^0000(\d{5,12})([0-9a-zA-Z])sp$/i);
    if (compact) return `${compact[1]}.${compact[2].toUpperCase()}`;

    return null;
  }
};

describe("PortalAuth - Conversão de RA e Dígito para E-mail Institucional", () => {
  it("deve converter RA e dígito simples para o padrão oficial da SEDUC-SP", () => {
    const email = PortalAuthHelper.raToEmail("112790615", "5");
    assert.strictEqual(email, "00001127906155sp@aluno.educacao.sp.gov.br");
  });

  it("deve remover zeros à esquerda do RA e normalizar dígito X", () => {
    const email = PortalAuthHelper.raToEmail("000112790615", "X");
    assert.strictEqual(email, "0000112790615xsp@aluno.educacao.sp.gov.br");
  });

  it("deve reconhecer RA completo digitado com hífen no primeiro campo", () => {
    const email = PortalAuthHelper.raToEmail("000112790615-X");
    assert.strictEqual(email, "0000112790615xsp@aluno.educacao.sp.gov.br");
  });

  it("deve reconhecer RA completo com hífen e UF", () => {
    const email = PortalAuthHelper.raToEmail("112790615-5/SP");
    assert.strictEqual(email, "00001127906155sp@aluno.educacao.sp.gov.br");
  });

  it("deve aceitar e-mail institucional completo diretamente sem modificar", () => {
    const input = "0000112790615xsp@aluno.educacao.sp.gov.br";
    const email = PortalAuthHelper.raToEmail(input);
    assert.strictEqual(email, input);
  });

  it("deve lançar erro se o RA estiver vazio", () => {
    assert.throws(() => {
      PortalAuthHelper.raToEmail("");
    }, /Informe o RA/);
  });

  it("deve lançar erro se o dígito não for informado quando o RA não contiver hífen", () => {
    assert.throws(() => {
      PortalAuthHelper.raToEmail("112790615", "");
    }, /Informe o dígito/);
  });
});

describe("PortalAuth - Formatação e Extração de RA", () => {
  it("formatRA deve formatar RA e dígito no padrão visual para provas", () => {
    const formatted = PortalAuthHelper.formatRA("000112790615", "x");
    assert.strictEqual(formatted, "112790615-X/SP");
  });

  it("formatRA deve formatar a partir de RA com hífen colado", () => {
    const formatted = PortalAuthHelper.formatRA("000112790615-X");
    assert.strictEqual(formatted, "112790615-X/SP");
  });

  it("formatRA deve formatar a partir de e-mail institucional completo", () => {
    const formatted = PortalAuthHelper.formatRA("0000112790615xsp@aluno.educacao.sp.gov.br");
    assert.strictEqual(formatted, "112790615-X/SP");
  });

  it("extractRAFromEmail deve extrair RA e dígito a partir do e-mail do aluno", () => {
    const extracted = PortalAuthHelper.extractRAFromEmail("0000112790615xsp@aluno.educacao.sp.gov.br");
    assert.strictEqual(extracted, "112790615.X");
  });

  it("extractRAFromEmail deve retornar null para e-mail de professor", () => {
    const extracted = PortalAuthHelper.extractRAFromEmail("maria@professor.educacao.sp.gov.br");
    assert.strictEqual(extracted, null);
  });
});

describe("PortalAuth - Identificação de Perfil por Domínio", () => {
  it("deve identificar professor pelos domínios institucionais autorizados", () => {
    assert.strictEqual(PortalAuthHelper.roleFromEmail("tamiris@professor.educacao.sp.gov.br"), "teacher");
    assert.strictEqual(PortalAuthHelper.roleFromEmail("tamiris@prof.educacao.sp.gov.br"), "teacher");
  });

  it("deve identificar aluno pelo domínio @aluno.educacao.sp.gov.br", () => {
    assert.strictEqual(PortalAuthHelper.roleFromEmail("0000112790615xsp@aluno.educacao.sp.gov.br"), "student");
  });

  it("deve rejeitar domínios externos não institucionais", () => {
    assert.strictEqual(PortalAuthHelper.roleFromEmail("usuario@gmail.com"), null);
    assert.strictEqual(PortalAuthHelper.roleFromEmail("usuario@hotmail.com"), null);
  });

  it("deve dispensar confirmação de e-mail para domínios institucionais no perfil correto", () => {
    assert.strictEqual(
      PortalAuthHelper.canBypassEmailVerification("erikariva@professor.educacao.sp.gov.br", "teacher"),
      true
    );
    assert.strictEqual(
      PortalAuthHelper.canBypassEmailVerification("amanda@prof.educacao.sp.gov.br", "teacher"),
      true
    );
    assert.strictEqual(
      PortalAuthHelper.canBypassEmailVerification("0000112790615xsp@aluno.educacao.sp.gov.br", "student"),
      true
    );
    assert.strictEqual(
      PortalAuthHelper.canBypassEmailVerification("usuario@gmail.com", "teacher"),
      false
    );
    assert.strictEqual(
      PortalAuthHelper.canBypassEmailVerification("erikariva@professor.educacao.sp.gov.br", "student"),
      false
    );
  });
});
