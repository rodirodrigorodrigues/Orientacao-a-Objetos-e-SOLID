class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser(userData) {
    if (!userData.email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (userData.password.length < 8) {
      throw new Error("Senha fraca");
    }

    this.database.insert("users", userData);

    console.log(`Usuário ${userData.email} criado com sucesso`);
  }
}

/*
❗ Problemas dessa classe

Ela tem múltiplas responsabilidades:

Regra de negócio

Validação de email

Validação de senha

Persistência

Acesso ao banco (database.insert)

Infra / logging

console.log

👉 Logo, ela tem várias razões para mudar:

Mudou a regra de senha

Mudou o formato do log

Mudou o banco de dados

➡️ Violação direta do SRP
*/
