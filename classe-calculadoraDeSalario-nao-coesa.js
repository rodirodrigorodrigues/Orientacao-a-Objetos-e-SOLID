// Para descobrir por que essa classe não é coesa, analise-a e veja o que levaria o desenvolvedor a escrever mais código.
//  A classe CalculadoraDeSalario sempre que um cargo novo surgir ou sempre que uma regra de cálculo nova surgir

// Como refatorar?
// dezOuVintePorcento e quinzeOuVinteCincoPorcento possuem o mesmo esqueleto (forma, abstração).
// Os dois métodos recem um funcionrio e devolvem um double.
// A ideia, portanto, será colocar cada uma dessas regras em classes diferentes, todas implementando a mesma interface.
// Por que não quebrar em métodos? Pois não teremos reuso dos métodos privados (isolados)

class CalculadoraDeSalario {
    calcula(funcionario) {
        if (funcionario.cargo === "DESENVOLVEDOR") {
            return this.dezOuVintePorcento(funcionario);
        }
        if (funcionario.cargo === "DBA" || funcionario.cargo === "TESTER") {
            return this.quinzeOuVinteCincoPorcento(funcionario);
        }
        // Cada cargo novo implica em um novo if.
        throw new Error("Funcionário inválido");
    }
    
    // Se o cálculo se tornar complexo, teremos que modificar todos os métodos para ajustar as regras.
    dezOuVintePorcento(funcionario) {
        if (funcionario.salarioBase > 3000) {
            return funcionario.salarioBase * 0.8;
        } else {
            return funcionario.salarioBase * 0.9;
        }
    }

    quinzeOuVinteCincoPorcento(funcionario) {
        if (funcionario.salarioBase > 3000) {
            return funcionario.salarioBase * 0.75;
        } else {
            return funcionario.salarioBase * 0.85;
        }
    }
    // Cada cargo novo implic num método privado novo.
}

// Exemplo de uso
const funcionario1 = { nome: "João", cargo: "DESENVOLVEDOR", salarioBase: 4000 };
const funcionario2 = { nome: "Maria", cargo: "DBA", salarioBase: 2500 };

const calculadora = new CalculadoraDeSalario();
console.log(calculadora.calcula(funcionario1)); // 3200
console.log(calculadora.calcula(funcionario2)); // 2125
