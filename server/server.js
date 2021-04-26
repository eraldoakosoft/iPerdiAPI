const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log("Novo usuário conectado => ", socket.id);


    socket.on("disconnect", ()=>{
        console.log("Desconectado => ", socket.id);
    })
});


app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Xrequested-With, Content-Type, Accept, Autorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Constrol-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})
app.use('/', require('./usuario/router/usuariosRoute'));
app.use('/endereco', require('./endereco/router/enderecoRoute'));
app.use('/posts', require('./postagem/router/postsRoute'));
app.use('/mensagens', require('./mensagem/router/mensagensRoute'));
app.use('/notificacao', require('./notificacao/router/notificacaoRoute'));

http.listen(3003);
console.log("Listen in port : 3003");