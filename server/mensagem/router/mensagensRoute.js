const express = require("express");
const router = express.Router();
const mensagemService = require('../service/mensagensService');
const login = require("../../middleware/login");

router.post('/', login.obrigatorio, async function(req, res){
    const msg = req.body;
    const newmsg = await mensagemService.saveMsg(msg);
    res.json(newmsg);
});

router.delete('/:id', login.obrigatorio, async function(req, res){
    await mensagemService.deleteMsg(req.params.id);
    res.end();
});

router.put('/:id', login.obrigatorio, async function(req, res){
    const msg = req.body;
    await mensagemService.updateMsg(req.params.id, msg);
    res.end();
});

router.put('/status/:id', login.obrigatorio, async function(req, res){
    const msg = req.body;
    await mensagemService.updateStatusMsg(req.params.id, msg.status);
    res.end();
});

router.get('/', login.obrigatorio, async function(req, res){
    const msgs = await mensagemService.getMsgs();
    res.json(msgs);
});

router.get('/:id', login.obrigatorio, async function(req, res){
    const msg = await mensagemService.getMsg(req.params.id);
    res.json(msg);
});

module.exports = router;