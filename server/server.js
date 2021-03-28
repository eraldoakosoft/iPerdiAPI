const express = require("express");
const app = express();

app.use(express.json());
app.use('/', require('./route/usuariosRoute'));
app.use('/endereco', require('./route/enderecoRoute'));
app.use('/posts', require('./route/postsRoute'));

app.listen(3000);