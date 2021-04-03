const postData = require('../data/postsData');
const enderecoData = require('../data/enderecoData');
const usuarioData = require('../data/usuariosData');
const dateFormat = require('../help/dateFormat');
const datahora = require('../help/datahora');

exports.savePost = async function (req, res) {
    const usuarioresponse = await usuarioData.getUsuario(req.usuario.id_usuario);
    if(usuarioresponse != null){
        const post = req.body;
        post.local_encontrado.created_at = datahora.created_at;
        post.local_encontrado.updated_at = datahora.updated_at;
        const enderecoresponse = await enderecoData.saveEndereco(post.local_encontrado);
        post.local_encontrado = enderecoresponse.id_endereco;
        post.id_usuario = req.usuario.id_usuario;
        post.created_at = datahora.created_at;
        post.updated_at = datahora.updated_at;  
        const novoPost = await postData.savePost(post);
        return res.status(200).json(novoPost);
    }else{
        return res.status(403).send({mensagem:"Usuario não cadastrado"})
    }
};

exports.iniativarPost = async function (req, res) {
    const post = await postData.getPost(req.params.id);
    if (req.usuario.id_usuario == post.id_usuario) {
        const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
        const post = { apagado: true, updated_at: updated_at };
        await postData.iniativarPost(req.params.id, post);
        return res.status(200).send({ mensagem: "Deletado com sucesso!" });
    } else {
        return res.status(403).send({ mensagem: "Usuário diferente" })
    }
};

exports.updatePost = async function (req, res) {
    if (req.usuario.id_usuario == req.body.id_usuario) {
        if (req.body.id_postagem == req.params.id) {
            const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
            const post = req.body;
            post.updated_at = updated_at;
            await postData.updatePost(req.params.id, post);
            res.status(200).send({ mensagem: "Atualizaco com sucesso" });
        } else {
            return res.status(403).send({ mensagem: "Permissão negada" });
        }
    } else {
        return res.status(403).send({ mensagem: "Usuário diferente" });
    }
};

exports.updateStatusPost = async function (req, res) {
    const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    const post = { status: false, updated_at: updated_at };
    await postData.updateStatusPost(req.params.id, post);
    res.status(200).send({ mensagem: "Atualizaco com sucesso" });
};

exports.getPost = async function (req, res) {
    const post = await postData.getPost(req.params.id);
    return res.status(200).send(post);
};

exports.getPosts = async function (req, res) {
    const posts = await postData.getPosts();
    return res.status(200).send(posts);
};