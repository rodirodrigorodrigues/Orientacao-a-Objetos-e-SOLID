// NotaFiscalController.js
app.post('/nota-fiscal', async (req, res) => {
  const nf = req.body;

  // validação
  if (!nf.valor || !nf.cliente) {
    return res.status(400).json({ erro: 'Nota fiscal inválida' });
  }

  // regra de negócio
  if (nf.estado === 'SP') {
    nf.imposto = nf.imposto * 2;
  }

  // outra regra de negócio
  if (nf.valor > 10000) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587
    });

    await transporter.sendMail({
      to: nf.emailCliente,
      subject: 'Nota fiscal de alto valor',
      text: 'Sua nota fiscal ultrapassou o valor limite'
    });
  }

  // acesso a banco de dados
  const connection = await mysql.createConnection(config);
  await connection.execute(
    'INSERT INTO nota_fiscal (cliente, valor, imposto) VALUES (?, ?, ?)',
    [nf.cliente, nf.valor, nf.imposto]
  );

  // integração com sistema externo
  await axios.post('http://erp.interno/api/nota-fiscal', nf);

  // resposta HTTP
  res.json({ mensagem: 'Nota fiscal cadastrada com sucesso' });
});

/*
Esse único método está fazendo:

Responsabilidade	Tipo
Validação	Negócio
Cálculo de imposto	Negócio
Regra de envio de e-mail	Negócio
Envio de e-mail	Infraestrutura
Persistência no MySQL	Infraestrutura
Chamada HTTP para ERP	Infraestrutura
Controle de fluxo HTTP	Web

👉 Múltiplas responsabilidades = baixa coesão

Problemas reais:

Difícil de testar

Difícil de reutilizar regras

Difícil de manter

Controller vira um “Deus” do sistema

Qualquer mudança quebra tudo

Exatamente o problema descrito no livro.
*/
