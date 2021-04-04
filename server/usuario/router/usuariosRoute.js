const express = require("express");
const router = express.Router();
const usuariosService = require('../service/usuariosService');
const login = require("../../middleware/login");

router.get('/usuarios', login.obrigatorio, usuariosService.getUsuarios);
router.get('/usuario/:id', login.obrigatorio, usuariosService.getUsuario );
router.post('/cadastro', usuariosService.saveUsuario);
router.post('/login', usuariosService.Login);
router.put('/usuario/atualizar/:id', login.obrigatorio, usuariosService.updateUsuario);
router.delete('/usuario/:id', login.obrigatorio, usuariosService.inativarUsuario);

module.exports = router;