const express = require("express");
const router = express.Router();
const mensagemService = require('../service/mensagensService');
const login = require("../../middleware/login");

router.post('/', login.obrigatorio, mensagemService.saveMsg);
router.delete('/:id', login.obrigatorio, mensagemService.deleteMsg);
router.put('/:id', login.obrigatorio, mensagemService.updateMsg);
router.put('/status/:id', login.obrigatorio, mensagemService.updateStatusMsg);
router.get('/conversas/:id', login.obrigatorio, mensagemService.getMsgs);
router.get('/:id', login.obrigatorio, mensagemService.getMsg);

module.exports = router;