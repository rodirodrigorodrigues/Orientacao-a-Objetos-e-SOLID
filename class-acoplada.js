// Dependências concretas
class EnviadorDeEmail {
    enviaEmail(nota) {
        console.log(`Enviando email para ${nota.cliente} com valor ${nota.valor}`);
    }
}

class NotaFiscalDao {
    persiste(nota) {
        console.log(`Persistindo nota fiscal do cliente ${nota.cliente}`);
    }
}

// Classe muito acoplada
class GeradorDeNotaFiscal {
    constructor() {
        this.email = new EnviadorDeEmail();
        this.dao = new NotaFiscalDao();
    }

    gera(fatura) {
        const valor = fatura.valorMensal;
        const nota = {
            cliente: fatura.cliente,
            valor: valor,
            imposto: this.impostoSimplesSobreO(valor)
        };
        this.email.enviaEmail(nota); // acoplada a EnviadorDeEmail
        this.dao.persiste(nota);      // acoplada a NotaFiscalDao
        return nota;
    }

    impostoSimplesSobreO(valor) {
        return valor * 0.06;
    }
}

// Uso
const fatura = { cliente: "João", valorMensal: 1000 };
const gerador = new GeradorDeNotaFiscal();
gerador.gera(fatura);

/*
✅ O que deixa essa classe muito acoplada:
GeradorDeNotaFiscal cria diretamente as instâncias de EnviadorDeEmail e NotaFiscalDao.
Qualquer mudança em EnviadorDeEmail ou NotaFiscalDao quebraria GeradorDeNotaFiscal.
Não é possível reutilizar GeradorDeNotaFiscal sem levar junto todas essas dependências.
*/
