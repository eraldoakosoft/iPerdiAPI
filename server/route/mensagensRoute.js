const express = require("express");
const router = express.Router();
const mensagemService = require('../service/mensagensService');

router.post('/', async function(req, res){
    const msg = req.body;
    const newmsg = await mensagemService.saveMsg(msg);
    res.json(newmsg);
});

router.delete('/:id', async function(req, res){
    await mensagemService.deleteMsg(req.params.id);
    res.end();
});

router.put('/:id', async function(req, res){
    const msg = req.body;
    await mensagemService.updateMsg(req.params.id, msg);
    res.end();
});

router.put('/status/:id', async function(req, res){
    const msg = req.body;
    await mensagemService.updateStatusMsg(req.params.id, msg.status);
    res.end();
});

router.get('/', async function(req, res){
    const msgs = await mensagemService.getMsgs();
    res.json(msgs);
});

router.get('/:id', async function(req, res){
    const msg = await mensagemService.getMsg(req.params.id);
    res.json(msg);
});

module.exports = router;