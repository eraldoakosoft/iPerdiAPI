const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const secret = require('../help/secret.json');
const router = express.Router();
const usuariosService = require('../service/usuariosService');


router.get('/usuarios', async function (req, res) {
    const usuarios = await usuariosService.getUsuarios();
    res.json(usuarios);
});

router.get('/usuarios/:id', async function (req, res) {
    const usuario = await usuariosService.getUsuario(req.params.id);
    res.json(usuario);
});

router.post('/usuario', async function (req, res) {
    const usuario = req.body;
    const newUser = await usuariosService.saveUsuario(usuario);
    res.json(newUser);
});

router.post('/cadastro', usuariosService.saveUsuario);

router.post('/login', async function (req, res) {
    const user = await usuariosService.getUsuarioEmail(req.body.email);
    if(user < 1){
        return res.status(500).send({ mensagem: "Falha na autenticação" });
    }else{
        bcrypt.compare(req.body.senha, user.senha, (err, result) =>{
            if(err){
                return res.status(401).send({ mensagem: "Falha na autenticação" });
            }
            if(result){
                const token = jwt.sign({
                    id_usuario: user.id_usuario,
                    email: user.email,
                    nick_name: user.nick_name
                }, secret.secret, { expiresIn: "1h" }); 
                return res.status(200).send({ mensagem: "Autenticado com sucesso", token: token });
            }
            return res.status(401).send({ mensagem: "Falha na autenticação" }); 
        });
    }
});

router.delete('/usuario/:id', async function (req, res) {
    await usuariosService.deleteUsuario(req.params.id);
    res.end();
});

router.put('/usuario/:id', async function (req, res) {
    const user = req.body;
    console.log(user);
    console.log(req.params.id);
    const newUser = await usuariosService.updateUsuario(req.params.id, user);
    res.json(newUser);
});

module.exports = router;