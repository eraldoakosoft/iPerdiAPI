const express = require("express");
const router = express.Router();
const enderecoService = require('../service/enderecoService');
const logado = require('../../middleware/logado');

router.get('/', logado.obrigatorio, enderecoService.getEnderecos);
router.get('/:id', enderecoService.getEndereco);
router.post('/', enderecoService.saveEndereco);
router.put('/:id', logado.obrigatorio, enderecoService.updateEndereco);
router.delete('/:id', logado.obrigatorio, enderecoService.deleteEndereco);
router.put('/inativar/:id', logado.obrigatorio, enderecoService.inativarEndereco);

module.exports = router;