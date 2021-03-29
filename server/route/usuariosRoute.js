const express = require("express");
const router = express.Router();
const usuariosService = require('../service/usuariosService');

router.get('/usuarios', async function(req, res){
    const usuarios = await usuariosService.getUsuarios();
    res.json(usuarios);
});

router.get('/usuarios/:id', async function(req, res){
    const usuario = await usuariosService.getUsuario(req.params.id);
    res.json(usuario);
});

router.post('/usuario', async function(req, res){
    const usuario = req.body;
    const newUser = await usuariosService.saveUsuario(usuario);
    res.json(newUser);
});

router.delete('/usuario/:id', async function(req, res){
    await usuariosService.deleteUsuario(req.params.id);
    res.end();
});

router.put('/usuario/:id', async function(req, res){
    const user = req.body;
    console.log(user);
    console.log(req.params.id);
    const newUser = await usuariosService.updateUsuario(req.params.id, user);
    res.json(newUser);
});

module.exports = router;