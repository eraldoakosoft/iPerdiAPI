const express = require("express");
const router = express.Router();
const login = require("../../middleware/logado");
const proprietario = require("../middleware/proprietario");
const notificacaoService = require("../service/notificacaoService");

router.put('/status/:id', login.obrigatorio, proprietario.obrigatorio, notificacaoService.updateStatusNoficacao);
router.get('/', login.obrigatorio, notificacaoService.getNotificacoes);
router.put('/atualizar/:id', login.obrigatorio, notificacaoService.updateNoficacao);

module.exports = router;

