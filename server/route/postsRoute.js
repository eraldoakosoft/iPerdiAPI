const express = require("express");
const router = express.Router();
const postsService = require('../service/postsService');

router.post('/', async function(req, res){
    const post = req.body;
    const novoPost = await postsService.savePost(post);
    res.json(novoPost);
});

module.exports = router;