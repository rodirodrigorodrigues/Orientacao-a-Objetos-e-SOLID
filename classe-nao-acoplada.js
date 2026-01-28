// Persiste nota fiscal
class NFDao {
    executa(notaFiscal) {
        console.log(`Persistindo nota fiscal do cliente ${notaFiscal.cliente}`);
    }
}

// Envia email
class EnviadorDeEmail {
    executa(notaFiscal) {
        console.log(`Enviando email para ${notaFiscal.cliente} com valor ${notaFiscal.valor}`);
    }
}

// Outra ação genérica
class QualquerOutraAcao {
    executa(notaFiscal) {
        console.log(`Executando alguma outra ação para ${notaFiscal.cliente}`);
    }
}

class GeradorDeNotaFiscal {
    constructor(acoesAposGerarNota) {
        this.acoes = acoesAposGerarNota; // lista de ações
    }

    gera(fatura) {
        const valor = fatura.valorMensal;

        // Cria a nota fiscal
        const notaFiscal = {
            cliente: fatura.cliente,
            valor: valor,
            imposto: this.impostoSimplesSobreO(valor)
        };

        // Executa todas as ações
        this.acoes.forEach(acao => acao.executa(notaFiscal));

        return notaFiscal;
    }

    impostoSimplesSobreO(valor) {
        return valor * 0.06;
    }
}

const fatura = { cliente: "João", valorMensal: 1000 };

// Passando as ações como dependências (injeção)
const acoes = [
    new NFDao(),
    new EnviadorDeEmail(),
    new QualquerOutraAcao()
];

const gerador = new GeradorDeNotaFiscal(acoes);

// Gera a nota fiscal e dispara as ações
const notaGerada = gerador.gera(fatura);

console.log("\nNota fiscal gerada:", notaGerada);
