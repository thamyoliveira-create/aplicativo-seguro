/**
 * Testes Unitários - SecurityUtils
 * Validação, sanitização e proteção contra XSS
 *
 * Executar: node --test tests/security-utils.test.js
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import SecurityUtils from "../js/security-utils.js";

describe("SecurityUtils - Sanitização", () => {
  it("deve remover scripts do texto", () => {
    const input = "Texto <script>malicioso</script> aqui";
    const result = SecurityUtils.stripDangerousCode(input);
    assert.strictEqual(result.includes("<script>"), false);
    assert.strictEqual(result.includes("Texto"), true);
  });

  it("deve remover event handlers inline", () => {
    const input = '<div onclick="alert(\'xss\')">Clique</div>';
    const result = SecurityUtils.stripDangerousCode(input);
    assert.strictEqual(result.includes("onclick"), false);
  });

  it("deve escapar caracteres especiais HTML", () => {
    const input = '<script>alert("xss")</script>';
    const result = SecurityUtils.escapeHTML(input);
    assert.strictEqual(result.includes("&lt;"), true);
    assert.strictEqual(result.includes("&gt;"), true);
    assert.strictEqual(result.includes("&quot;"), true);
  });
});

describe("SecurityUtils - Validação de Email", () => {
  it("deve aceitar emails válidos", () => {
    assert.strictEqual(SecurityUtils.isValidEmail("usuario@example.com"), true);
    assert.strictEqual(SecurityUtils.isValidEmail("john.doe@domain.co.uk"), true);
  });

  it("deve rejeitar emails inválidos", () => {
    assert.strictEqual(SecurityUtils.isValidEmail("invalid"), false);
    assert.strictEqual(SecurityUtils.isValidEmail("@example.com"), false);
    assert.strictEqual(SecurityUtils.isValidEmail("user@"), false);
    assert.strictEqual(SecurityUtils.isValidEmail("user name@example.com"), false);
  });

  it("deve validar emails SEDUC-SP", () => {
    assert.strictEqual(
      SecurityUtils.isValidSedUCEmail("maria@professor.educacao.sp.gov.br"),
      true
    );
    assert.strictEqual(
      SecurityUtils.isValidSedUCEmail("joao@aluno.educacao.sp.gov.br"),
      true
    );
  });

  it("deve rejeitar emails fora do domínio SEDUC-SP", () => {
    assert.strictEqual(SecurityUtils.isValidSedUCEmail("user@gmail.com"), false);
    assert.strictEqual(SecurityUtils.isValidSedUCEmail("user@empresa.com.br"), false);
  });
});

describe("SecurityUtils - Validação de Código de Acesso", () => {
  it("deve aceitar códigos válidos", () => {
    assert.strictEqual(SecurityUtils.isValidAccessCode("ABC-123"), true);
    assert.strictEqual(SecurityUtils.isValidAccessCode("PROVA-2024-001"), true);
    assert.strictEqual(SecurityUtils.isValidAccessCode("A1B2C3D4"), true);
  });

  it("deve rejeitar códigos inválidos", () => {
    assert.strictEqual(SecurityUtils.isValidAccessCode("ABC"), false); // muito curto
    assert.strictEqual(SecurityUtils.isValidAccessCode("abc-123"), true); // minúsculas são aceitas
    assert.strictEqual(SecurityUtils.isValidAccessCode("ABC@123"), false); // caractere especial inválido
    assert.strictEqual(SecurityUtils.isValidAccessCode(""), false);
  });
});

describe("SecurityUtils - Validação de Senha", () => {
  it("deve aceitar senhas válidas", () => {
    assert.strictEqual(SecurityUtils.isValidPassword("Senha123"), true);
    assert.strictEqual(SecurityUtils.isValidPassword("ValidPass2024"), true);
  });

  it("deve rejeitar senhas fracas", () => {
    assert.strictEqual(SecurityUtils.isValidPassword("abc"), false);
    assert.strictEqual(SecurityUtils.isValidPassword("12345678"), false); // só números
    assert.strictEqual(SecurityUtils.isValidPassword("abcdefgh"), false); // só letras
    assert.strictEqual(SecurityUtils.isValidPassword("Pass"), false); // muito curta
  });
});

describe("SecurityUtils - Validação de Nome", () => {
  it("deve aceitar nomes válidos", () => {
    assert.strictEqual(SecurityUtils.isValidDisplayName("João Silva"), true);
    assert.strictEqual(SecurityUtils.isValidDisplayName("Maria da Silva Santos"), true);
  });

  it("deve rejeitar nomes inválidos", () => {
    assert.strictEqual(SecurityUtils.isValidDisplayName("A"), false); // muito curto
    assert.strictEqual(SecurityUtils.isValidDisplayName("<script>"), false); // caracteres perigosos
    assert.strictEqual(SecurityUtils.isValidDisplayName("Name'; DROP TABLE"), false);
    assert.strictEqual(SecurityUtils.isValidDisplayName(""), false);
  });
});

describe("SecurityUtils - Limpeza de Dados", () => {
  it("deve normalizar email", () => {
    assert.strictEqual(
      SecurityUtils.normalizeEmail("  USER@EXAMPLE.COM  "),
      "user@example.com"
    );
  });

  it("deve limpar strings", () => {
    const input = "  Texto   com   espaços  ";
    const result = SecurityUtils.cleanString(input);
    assert.strictEqual(result, "Texto com espaços");
  });

  it("deve normalizar quebras de linha", () => {
    const input = "Linha 1\r\nLinha 2\rLinha 3";
    const result = SecurityUtils.normalizeText(input);
    assert.strictEqual(result, "Linha 1\nLinha 2\nLinha 3");
  });

  it("deve respeitar limite de caracteres", () => {
    const input = "a".repeat(1000);
    const result = SecurityUtils.cleanString(input, 100);
    assert.strictEqual(result.length <= 100, true);
  });
});

describe("SecurityUtils - Proteção de Dados Sensíveis", () => {
  it("deve mascarar email", () => {
    const result = SecurityUtils.maskSensitiveData("usuario@example.com", 3);
    assert.strictEqual(result.includes("@example.com"), true);
    assert.strictEqual(result.includes("*"), true);
    assert.strictEqual(result.includes("usuario"), false);
  });

  it("deve remover campos sensíveis de objetos", () => {
    const obj = {
      name: "João",
      email: "joao@example.com",
      senha: "super-secreto",
      token: "abc123xyz"
    };

    const cleaned = SecurityUtils.stripSensitiveFields(obj);
    assert.strictEqual(cleaned.name, "João");
    assert.strictEqual(cleaned.email, "joao@example.com");
    assert.strictEqual(cleaned.senha, undefined);
    assert.strictEqual(cleaned.token, undefined);
  });
});

describe("SecurityUtils - Validação de URL", () => {
  it("deve aceitar URLs válidas", () => {
    assert.strictEqual(SecurityUtils.isValidUrl("https://example.com"), true);
    assert.strictEqual(SecurityUtils.isValidUrl("http://localhost:3000"), true);
    assert.strictEqual(SecurityUtils.isValidUrl("blob:https://example.com/123"), true);
  });

  it("deve rejeitar URLs maliciosas", () => {
    assert.strictEqual(SecurityUtils.isValidUrl("javascript:alert('xss')"), false);
    assert.strictEqual(SecurityUtils.isValidUrl("data:text/html,<script>alert('xss')</script>", ["https"]), false);
  });
});
