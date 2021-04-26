const express = require("express");
const router = express.Router();
const postsService = require('../service/postsService');
const login = require('../../middleware/login');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage });

router.post('/', login.obrigatorio, postsService.savePost);
router.post('/imagem', login.obrigatorio, upload.single('post_img'), postsService.saveImagem);
router.delete('/:id', login.obrigatorio, postsService.iniativarPost);
router.put('/:id', login.obrigatorio, postsService.updatePost);
router.put('/status/:id', login.obrigatorio, postsService.updateStatusPost);
router.get('/', postsService.getPosts);
router.get('/:id', postsService.getPost);

module.exports = router;