const express = require("express");
const router = express.Router();
const usuariosService = require('../service/usuariosService');

router.get('/usuarios', async function(req, res){
    const usuarios = await usuariosService.getUsuarios();
    res.json(usuarios);
});

module.exports = router;