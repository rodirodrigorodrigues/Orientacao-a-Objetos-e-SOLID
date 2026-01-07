class AnalizadorDeNumeros {
  analisa(numeros) {
    let qtdPares = 0;
    for (const numero of numeros) {
      // Um programador que não fez este código precisa entender o que está acontecendo aqui.
      if (numero % 2 === 0) {
        qtdPares++;
      }
    }
    return qtdPares;
  }
}

// Exemplo de uso
const numeros = [1, 2, 3, 4, 5, 6];
const analisador = new AnalizadorDeNumeros();
console.log(analisador.analisa(numeros)); // Saída: 3

class AnalizadorDeNumeros {
  #qtdPares = 0;

  // Método público
  analisa(numeros) {
    for (const numero of numeros) {
      // O método #contaPar() deixa explícito o que acontece com cada número.
      this.#contaPar(numero);
    }
    return this.#qtdPares;
  }

  // Método privado
  #contaPar(numero) {
    if (this.#ePar(numero)) {
      this.#qtdPares++;
    }
  }

  // Outro método privado para clareza
  #ePar(numero) {
    return numero % 2 === 0;
  }
}

// Exemplo de uso
const numeros = [1, 2, 3, 4, 5, 6];
const analisador = new AnalizadorDeNumeros();
console.log(analisador.analisa(numeros)); // Saída: 3
