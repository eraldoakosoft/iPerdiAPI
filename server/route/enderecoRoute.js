const express = require("express");
const router = express.Router();
const enderecoService = require('../service/enderecoService');

router.get('/', async function(req, res){
    const endereco = await enderecoService.getEnderecos();
    res.json(endereco);
});

router.get('/:id', async function(req, res){
    const endereco = await enderecoService.getEnderecos(req.params.id);
    res.json(endereco);
});

router.post('/', async function(req, res){
    const endereco = req.body;
    const newEndereco = await enderecoService.saveEndereco(endereco);
    res.json(newEndereco);
});

router.put('/:id', async function(req, res){
    const endereco = req.body;
    const updatedaddress =  await enderecoService.updateEndereco(req.params.id, endereco);
    res.json(updatedaddress);
});

router.delete('/:id', async function(req, res){
    await enderecoService.deleteEndereco(req.params.id);
    res.end();
});

module.exports = router;