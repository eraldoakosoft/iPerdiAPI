const express = require("express");
const app = express();

app.use(express.json());
app.use('/', require('./usuario/router/usuariosRoute'));
app.use('/endereco', require('./endereco/router/enderecoRoute'));
app.use('/posts', require('./mensagem/router/mensagensRoute'));
app.use('/mensagens', require('./mensagem/router/mensagensRoute'));
app.use('/notificacao', require('./notificacao/router/notificacaoRoute'));

app.listen(3003);
console.log("Listen in port : 3003");