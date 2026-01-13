class UserValidator {
  validate(userData) {
    if (!userData.email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (userData.password.length < 8) {
      throw new Error("Senha fraca");
    }
  }
}

class UserRepository {
  constructor(database) {
    this.database = database;
  }

  save(userData) {
    this.database.insert("users", userData);
  }
}

class Logger {
  info(message) {
    console.log(message);
  }
}

class UserService {
  constructor(validator, repository, logger) {
    this.validator = validator;
    this.repository = repository;
    this.logger = logger;
  }

  createUser(userData) {
    this.validator.validate(userData);
    this.repository.save(userData);
    this.logger.info(`Usuário ${userData.email} criado com sucesso`);
  }
}

/*
🧠 Por que agora o SRP está respeitado?

Cada classe tem uma única razão para mudar:

Classe	Responsabilidade
UserValidator	Regras de validação
UserRepository	Persistência
Logger	Log
UserService	Orquestração do caso de uso

👉 Se mudar a senha mínima → só UserValidator
👉 Se mudar o banco → só UserRepository
👉 Se mudar o log → só Logger

📌 Regra mental importante (igual ao texto que você trouxe)

Dois comportamentos pertencem à mesma responsabilidade se eles mudam juntos

No exemplo ruim:

Validação, banco e log não mudam juntos

No exemplo bom:

Cada mudança afeta uma classe apenas

🔚 Conclusão

SRP não é sobre classes pequenas, é sobre classes estáveis.
Classes coesas:

Crescem menos

Quebram menos

São mais fáceis de testar e reutilizar
*/