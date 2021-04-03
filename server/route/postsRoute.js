const express = require("express");
const router = express.Router();
const postsService = require('../service/postsService');
const login = require("../middleware/login");

router.post('/', login.obrigatorio, postsService.savePost);
router.delete('/:id', login.obrigatorio, postsService.iniativarPost);
router.put('/:id', login.obrigatorio, postsService.updatePost);
router.put('/status/:id', login.obrigatorio, postsService.updateStatusPost);
router.get('/', postsService.getPosts);
router.get('/:id', postsService.getPost);

module.exports = router;