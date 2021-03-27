const express = require("express");
const router = express.Router();
const usuariosService = require('../service/usuariosService');

router.get('/usuarios', async function(req, res){
    const usuarios = await usuariosService.getUsuarios();
    res.json(usuarios);
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


module.exports = router;