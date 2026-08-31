/**
 * Testes Unitários - SecurityUtils
 * Validação, sanitização e proteção contra XSS
 * 
 * Executar: npm test -- security-utils.test.js
 */

import { describe, it, expect } from "vitest";
import SecurityUtils from "../js/security-utils.js";

describe("SecurityUtils - Sanitização", () => {
  it("deve escapar tags HTML", () => {
    const input = "<script>alert('xss')</script>";
    const result = SecurityUtils.sanitizeHTML(input);
    expect(result).not.toContain("<script>");
  });

  it("deve remover scripts do texto", () => {
    const input = "Texto <script>malicioso</script> aqui";
    const result = SecurityUtils.stripDangerousCode(input);
    expect(result).not.toContain("<script>");
    expect(result).toContain("Texto");
  });

  it("deve remover event handlers", () => {
    const input = '<div onclick="alert(\'xss\')">Clique</div>';
    const result = SecurityUtils.stripDangerousCode(input);
    expect(result).not.toContain("onclick");
  });

  it("deve escapar caracteres especiais HTML", () => {
    const input = '<script>alert("xss")</script>';
    const result = SecurityUtils.escapeHTML(input);
    expect(result).toContain("&lt;");
    expect(result).toContain("&gt;");
    expect(result).toContain("&quot;");
  });
});

describe("SecurityUtils - Validação de Email", () => {
  it("deve aceitar emails válidos", () => {
    expect(SecurityUtils.isValidEmail("usuario@example.com")).toBe(true);
    expect(SecurityUtils.isValidEmail("john.doe@domain.co.uk")).toBe(true);
  });

  it("deve rejeitar emails inválidos", () => {
    expect(SecurityUtils.isValidEmail("invalid")).toBe(false);
    expect(SecurityUtils.isValidEmail("@example.com")).toBe(false);
    expect(SecurityUtils.isValidEmail("user@")).toBe(false);
    expect(SecurityUtils.isValidEmail("user name@example.com")).toBe(false);
  });

  it("deve validar emails SEDUC-SP", () => {
    expect(
      SecurityUtils.isValidSedUCEmail("maria@professor.educacao.sp.gov.br")
    ).toBe(true);
    expect(
      SecurityUtils.isValidSedUCEmail("joao@aluno.educacao.sp.gov.br")
    ).toBe(true);
  });

  it("deve rejeitar emails fora do domínio SEDUC-SP", () => {
    expect(SecurityUtils.isValidSedUCEmail("user@gmail.com")).toBe(false);
    expect(SecurityUtils.isValidSedUCEmail("user@empresa.com.br")).toBe(false);
  });
});

describe("SecurityUtils - Validação de Código de Acesso", () => {
  it("deve aceitar códigos válidos", () => {
    expect(SecurityUtils.isValidAccessCode("ABC-123")).toBe(true);
    expect(SecurityUtils.isValidAccessCode("PROVA-2024-001")).toBe(true);
    expect(SecurityUtils.isValidAccessCode("A1B2C3D4")).toBe(true);
  });

  it("deve rejeitar códigos inválidos", () => {
    expect(SecurityUtils.isValidAccessCode("ABC")).toBe(false); // muito curto
    expect(SecurityUtils.isValidAccessCode("abc-123")).toBe(true); // minúsculas são convertidas para maiúsculas
    expect(SecurityUtils.isValidAccessCode("ABC@123")).toBe(false); // caractere especial
    expect(SecurityUtils.isValidAccessCode("")).toBe(false);
  });
});

describe("SecurityUtils - Validação de Senha", () => {
  it("deve aceitar senhas válidas", () => {
    expect(SecurityUtils.isValidPassword("Senha123")).toBe(true);
    expect(SecurityUtils.isValidPassword("ValidPass2024")).toBe(true);
  });

  it("deve rejeitar senhas fracas", () => {
    expect(SecurityUtils.isValidPassword("abc")).toBe(false); // muito curta
    expect(SecurityUtils.isValidPassword("12345678")).toBe(false); // só números
    expect(SecurityUtils.isValidPassword("abcdefgh")).toBe(false); // só letras
    expect(SecurityUtils.isValidPassword("Pass")).toBe(false); // muito curta
  });
});

describe("SecurityUtils - Validação de Nome", () => {
  it("deve aceitar nomes válidos", () => {
    expect(SecurityUtils.isValidDisplayName("João Silva")).toBe(true);
    expect(SecurityUtils.isValidDisplayName("Maria da Silva Santos")).toBe(true);
  });

  it("deve rejeitar nomes inválidos", () => {
    expect(SecurityUtils.isValidDisplayName("A")).toBe(false); // muito curto
    expect(SecurityUtils.isValidDisplayName("<script>")).toBe(false); // caracteres perigosos
    expect(SecurityUtils.isValidDisplayName("Name'; DROP TABLE")).toBe(false);
    expect(SecurityUtils.isValidDisplayName("")).toBe(false);
  });
});

describe("SecurityUtils - Limpeza de Dados", () => {
  it("deve normalizar email", () => {
    expect(SecurityUtils.normalizeEmail("  USER@EXAMPLE.COM  ")).toBe(
      "user@example.com"
    );
  });

  it("deve limpar strings", () => {
    const input = "  Texto   com   espaços  ";
    const result = SecurityUtils.cleanString(input);
    expect(result).toBe("Texto com espaços");
    expect(result).not.toHaveLength(0);
  });

  it("deve normalizar quebras de linha", () => {
    const input = "Linha 1\r\nLinha 2\rLinha 3";
    const result = SecurityUtils.normalizeText(input);
    expect(result).toBe("Linha 1\nLinha 2\nLinha 3");
  });

  it("deve respeitar limite de caracteres", () => {
    const input = "a".repeat(1000);
    const result = SecurityUtils.cleanString(input, 100);
    expect(result.length).toBeLessThanOrEqual(100);
  });
});

describe("SecurityUtils - Proteção de Dados Sensíveis", () => {
  it("deve mascarar email", () => {
    const result = SecurityUtils.maskSensitiveData("usuario@example.com", 3);
    expect(result).toContain("@example.com");
    expect(result).toContain("*");
    expect(result).not.toContain("usuario");
  });

  it("deve remover campos sensíveis", () => {
    const obj = {
      name: "João",
      email: "joao@example.com",
      senha: "super-secreto",
      token: "abc123xyz"
    };

    const cleaned = SecurityUtils.stripSensitiveFields(obj);
    expect(cleaned.name).toBe("João");
    expect(cleaned.email).toBe("joao@example.com");
    expect(cleaned.senha).toBeUndefined();
    expect(cleaned.token).toBeUndefined();
  });
});

describe("SecurityUtils - CSRF & Origem", () => {
  it("deve detectar requisições de mesma origem", () => {
    const sameOrigin = window.location.href;
    expect(SecurityUtils.isSameOrigin(sameOrigin)).toBe(true);
  });

  it("deve rejeitar requisições de origem diferente", () => {
    expect(SecurityUtils.isSameOrigin("https://outro-site.com/path")).toBe(false);
  });

  it("deve gerar token CSRF válido", () => {
    const token1 = SecurityUtils.generateCSRFToken();
    const token2 = SecurityUtils.generateCSRFToken();

    expect(token1).toHaveLength(64); // 32 bytes em hex
    expect(token2).toHaveLength(64);
    expect(token1).not.toBe(token2); // tokens diferentes
  });
});

describe("SecurityUtils - Hash de Dados", () => {
  it("deve gerar hash consistente", async () => {
    const data = { name: "test", value: 123 };
    const hash1 = await SecurityUtils.hashData(data);
    const hash2 = await SecurityUtils.hashData(data);

    expect(hash1).toBe(hash2);
    expect(hash1.length).toBeGreaterThan(0);
  });

  it("deve gerar hashes diferentes para dados diferentes", async () => {
    const hash1 = await SecurityUtils.hashData({ value: 1 });
    const hash2 = await SecurityUtils.hashData({ value: 2 });

    expect(hash1).not.toBe(hash2);
  });
});

describe("SecurityUtils - Validação de URL", () => {
  it("deve aceitar URLs válidas", () => {
    expect(SecurityUtils.isValidUrl("https://example.com")).toBe(true);
    expect(SecurityUtils.isValidUrl("http://localhost:3000")).toBe(true);
    expect(SecurityUtils.isValidUrl("blob:https://example.com/123")).toBe(true);
  });

  it("deve rejeitar URLs maliciosas", () => {
    expect(SecurityUtils.isValidUrl("javascript:alert('xss')")).toBe(false);
    expect(SecurityUtils.isValidUrl("data:text/html,<script>alert('xss')</script>", ["https"])).toBe(false);
  });
});
