// Interface para regra de cálculo
class RegraDeCalculo {
    calcula(funcionario) {
        throw new Error("Método não implementado");
    }
}

// Regras concretas
class DezOuVintePorcento extends RegraDeCalculo {
    calcula(funcionario) {
        if (funcionario.salarioBase > 3000) {
            return funcionario.salarioBase * 0.8;
        } else {
            return funcionario.salarioBase * 0.9;
        }
    }
}

class QuinzeOuVinteCincoPorcento extends RegraDeCalculo {
    calcula(funcionario) {
        if (funcionario.salarioBase > 3000) {
            return funcionario.salarioBase * 0.75;
        } else {
            return funcionario.salarioBase * 0.85;
        }
    }
}

// Fábrica ou mapeamento ou lookup de cargos -> regras
const regrasPorCargo = {
    DESENVOLVEDOR: new DezOuVintePorcento(),
    DBA: new QuinzeOuVinteCincoPorcento(),
    TESTER: new QuinzeOuVinteCincoPorcento()
};

// Calculadora delega o cálculo para a regra certa
class CalculadoraDeSalario {
    calcula(funcionario) {
        const regra = regrasPorCargo[funcionario.cargo];
        if (!regra) {
            throw new Error("Funcionário inválido");
        }
        return regra.calcula(funcionario);
    }
}

// Teste
const funcionario1 = { nome: "João", cargo: "DESENVOLVEDOR", salarioBase: 4000 };
const funcionario2 = { nome: "Maria", cargo: "DBA", salarioBase: 2500 };

const calculadora = new CalculadoraDeSalario();
console.log(calculadora.calcula(funcionario1)); // 3200
console.log(calculadora.calcula(funcionario2)); // 2125
