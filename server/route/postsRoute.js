const express = require("express");
const router = express.Router();
const postsService = require('../service/postsService');

router.post('/', async function(req, res){
    const post = req.body;
    const novoPost = await postsService.savePost(post);
    res.json(novoPost);
});

router.delete('/:id', async function(req, res){
    await postsService.deletePost(req.params.id);
    res.end();
});

router.put('/:id', async function(req, res){
    const post = req.body;
    await postsService.updatePost(req.params.id, post);
    res.end();
});

router.put('/status/:id', async function(req, res){
    const post = req.body;
    await postsService.updateStatusPost(req.params.id, post.status);
    res.end();
});

router.get('/', async function(req, res){
    const posts = await postsService.getPosts();
    res.json(posts);
});

router.get('/:id', async function(req, res){
    const post = await postsService.getPosts(req.params.id);
    res.json(post);
});

module.exports = router;