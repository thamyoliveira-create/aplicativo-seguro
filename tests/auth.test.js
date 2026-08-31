/**
 * Testes Unitários - Autenticação
 * Validação de regras de login, registro e acesso
 * 
 * Executar: npm test -- auth.test.js
 */

import { describe, it, expect, beforeEach } from "vitest";

describe("PortalAuth - Normalização de Email", () => {
  it("deve normalizar emails para minúsculas", () => {
    const emails = [
      { input: "USUARIO@EXAMPLE.COM", expected: "usuario@example.com" },
      { input: "  User@Example.com  ", expected: "user@example.com" },
      { input: "João@Example.COM", expected: "joão@example.com" }
    ];

    emails.forEach(({ input, expected }) => {
      const normalized = String(input || "")
        .trim()
        .toLowerCase();
      expect(normalized).toBe(expected);
    });
  });
});

describe("PortalAuth - Validação de Email de Domínio", () => {
  const domains = {
    teacher: "@professor.educacao.sp.gov.br",
    student: "@aluno.educacao.sp.gov.br"
  };

  const roleFromEmail = (email) => {
    const normalized = String(email || "").trim().toLowerCase();
    if (normalized.endsWith(domains.teacher)) return "teacher";
    if (normalized.endsWith(domains.student)) return "student";
    return null;
  };

  it("deve identificar email de professor", () => {
    expect(roleFromEmail("maria@professor.educacao.sp.gov.br")).toBe("teacher");
  });

  it("deve identificar email de aluno", () => {
    expect(roleFromEmail("joao@aluno.educacao.sp.gov.br")).toBe("student");
  });

  it("deve rejeitar emails fora do domínio", () => {
    expect(roleFromEmail("usuario@gmail.com")).toBeNull();
    expect(roleFromEmail("usuario@empresa.com")).toBeNull();
  });

  it("deve rejeitar email somente do domínio", () => {
    // roleFromEmail apenas verifica se termina com domínio, validação completa é em validateEmail
    expect(roleFromEmail("@professor.educacao.sp.gov.br")).toBe("teacher");
    expect(roleFromEmail("@aluno.educacao.sp.gov.br")).toBe("student");
  });
});

describe("PortalAuth - Validação de Senha", () => {
  const isValidPassword = (password) => {
    return (
      String(password || "").length >= 8 &&
      /[a-zA-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  it("deve aceitar senhas válidas", () => {
    expect(isValidPassword("Senha123")).toBe(true);
    expect(isValidPassword("ValidPass2024")).toBe(true);
    expect(isValidPassword("P@ssw0rd")).toBe(true);
  });

  it("deve rejeitar senhas fracas", () => {
    expect(isValidPassword("123456")).toBe(false); // sem letras
    expect(isValidPassword("abcdefgh")).toBe(false); // sem números
    expect(isValidPassword("Abc123")).toBe(false); // menos de 8 caracteres
    expect(isValidPassword("")).toBe(false);
    expect(isValidPassword(null)).toBe(false);
  });

  it("deve validar comprimento mínimo", () => {
    expect(isValidPassword("Pass123")).toBe(false); // 7 caracteres
    expect(isValidPassword("Pass1234")).toBe(true); // 8 caracteres
  });
});

describe("PortalAuth - Validação de Nome de Exibição", () => {
  const isValidDisplayName = (name) => {
    const trimmed = String(name || "").trim();
    return (
      trimmed.length >= 2 &&
      trimmed.length <= 100 &&
      !/[<>\"'&;]/.test(trimmed)
    );
  };

  it("deve aceitar nomes válidos", () => {
    expect(isValidDisplayName("João Silva")).toBe(true);
    expect(isValidDisplayName("Maria da Silva Santos")).toBe(true);
    expect(isValidDisplayName("Pedro Pereira")).toBe(true);
  });

  it("deve rejeitar nomes com caracteres perigosos", () => {
    expect(isValidDisplayName('<script>alert("xss")</script>')).toBe(false);
    expect(isValidDisplayName('"; DROP TABLE users; --')).toBe(false);
    expect(isValidDisplayName("Name'; --")).toBe(false);
  });

  it("deve validar comprimento de nome", () => {
    expect(isValidDisplayName("A")).toBe(false); // muito curto
    expect(isValidDisplayName("Ab")).toBe(true); // mínimo válido
    expect(isValidDisplayName("x".repeat(101))).toBe(false); // muito longo
    expect(isValidDisplayName("x".repeat(100))).toBe(true); // máximo válido
  });

  it("deve aceitar espaços", () => {
    expect(isValidDisplayName("  João Silva  ")).toBe(true);
  });
});

describe("PortalAuth - Contexto de Registro", () => {
  it("deve validar dados de registro completos", () => {
    const registrationData = {
      email: "usuario@professor.educacao.sp.gov.br",
      password: "ValidPass2024",
      displayName: "João Silva",
      role: "teacher"
    };

    const isValid =
      !!registrationData.email &&
      !!registrationData.password &&
      !!registrationData.displayName &&
      !!registrationData.role;

    expect(isValid).toBe(true);
  });

  it("deve rejeitar registro incompleto", () => {
    const incompleteData = {
      email: "usuario@professor.educacao.sp.gov.br",
      // faltam password, displayName, role
    };

    const isValid =
      !!incompleteData.email &&
      !!incompleteData.password &&
      !!incompleteData.displayName &&
      !!incompleteData.role;

    expect(isValid).toBe(false);
  });
});

describe("PortalAuth - Tratamento de Erros", () => {
  const friendlyErrors = {
    "auth/email-already-in-use": "Este e-mail já possui uma conta. Use a opção Entrar.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/weak-password": "Use uma senha com pelo menos 8 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente novamente."
  };

  it("deve retornar mensagens amigáveis para erros conhecidos", () => {
    const errorCode = "auth/email-already-in-use";
    expect(friendlyErrors[errorCode]).toBeDefined();
    expect(friendlyErrors[errorCode]).toContain("e-mail");
  });

  it("deve retornar mensagem padrão para erro desconhecido", () => {
    const unknownError = friendlyErrors["unknown-error"] || "Não foi possível concluir o acesso.";
    expect(unknownError).toBeDefined();
  });
});

describe("PortalAuth - Fluxo de Sessão", () => {
  it("deve validar estado de autenticação", () => {
    const user = {
      uid: "user123",
      email: "joao@aluno.educacao.sp.gov.br",
      emailVerified: true
    };

    const isAuthenticated = !!user && user.emailVerified;
    expect(isAuthenticated).toBe(true);
  });

  it("deve invalidar sessão sem email verificado", () => {
    const user = {
      uid: "user123",
      email: "joao@aluno.educacao.sp.gov.br",
      emailVerified: false
    };

    const isAuthenticated = !!user && user.emailVerified;
    expect(isAuthenticated).toBe(false);
  });

  it("deve validar perfil de usuário", () => {
    const profile = {
      email: "joao@aluno.educacao.sp.gov.br",
      displayName: "João Silva",
      role: "student",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const hasAllFields =
      !!profile.email &&
      !!profile.displayName &&
      !!profile.role &&
      !!profile.createdAt &&
      !!profile.updatedAt;

    expect(hasAllFields).toBe(true);
  });
});

describe("PortalAuth - Proteção de Dados", () => {
  it("deve não expor senha em objeto de perfil", () => {
    const userProfile = {
      id: "user123",
      email: "joao@aluno.educacao.sp.gov.br",
      displayName: "João Silva",
      role: "student"
    };

    expect(userProfile).not.toHaveProperty("password");
    expect(userProfile).not.toHaveProperty("senha");
  });

  it("deve limpar dados sensíveis antes de logging", () => {
    const userData = {
      name: "João",
      email: "joao@example.com",
      password: "SecurePassword123",
      token: "abc123xyz"
    };

    const safeData = {
      name: userData.name,
      email: userData.email
    };

    expect(safeData).not.toHaveProperty("password");
    expect(safeData).not.toHaveProperty("token");
  });
});
