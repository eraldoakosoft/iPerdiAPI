const express = require("express");
const router = express.Router();
const enderecoService = require('../service/enderecoService');

router.get('/', async function(req, res){
    const endereco = await enderecoService.getEndereco();
    res.json(endereco);
    console.log(endereco);
});

router.post('/', async function(req, res){
    const endereco = req.body;
    const newEndereco = await enderecoService.saveEndereco(endereco);
    res.json(newEndereco);
});

router.delete('/:id', async function(req, res){
    await enderecoService.deleteEndereco(req.params.id);
    res.end();
});

module.exports = router;