const express = require("express");
const app = express();

app.use(express.json());
app.use('/', require('./route/usuariosRoute'));
app.use('/endereco', require('./route/enderecoRoute'));
app.use('/posts', require('./route/postsRoute'));
app.use('/mensagens', require('./route/mensagensRoute'));
app.use('/notificacao', require('./notificacao/router/notificacaoRoute'));

app.listen(3000);