// NotaFiscalController.js
app.post('/nota-fiscal', async (req, res) => {
  const nf = req.body;

  if (!nf.valor || !nf.cliente) {
    return res.status(400).json({ erro: 'Nota fiscal inválida' });
  }

  const regraService = new NotaFiscalService();
  const emailSender = new EmailSender();
  const emailService = new EmailAltoValorService(emailSender);
  const repository = new NotaFiscalRepository(connection);
  const erpService = new ERPService();

  regraService.aplicaRegras(nf);
  await emailService.verificaEEnvia(nf);
  await repository.salvar(nf);
  await erpService.enviar(nf);

  res.json({ mensagem: 'Nota fiscal cadastrada com sucesso' });
});

/*
✔ Controller não contém regra de negócio
✔ Controller não conhece detalhes de banco
✔ Controller não conhece SMTP
✔ Controller apenas orquestra o fluxo
*/
