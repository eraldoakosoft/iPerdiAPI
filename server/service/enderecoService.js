const enderecoData = require('../data/enderecoData');
const usuarioData = require('../data/usuariosData');
const postsData = require('../data/postsData');
const config = require('../help/config.json');
const datahora = require('../help/datahora');

exports.getEnderecos = async function (req, res) {
    if (req.usuario.email === config.email && req.usuario.nick_name === config.adm) {
        const response = await enderecoData.getEnderecos();
        return res.status(200).send(response);
    } else {
        res.status(403).send({ mensagem: "Você não tem permissão" });
    }
};

exports.getEndereco = async function (req, res) {
    const response = await enderecoData.getEndereco(req.params.id);
    return res.status(200).json(response);
};

exports.saveEndereco = async function (req, res) {
    const response = await enderecoData.saveEndereco(req.body);
    return res.status(200).json(response);
};

exports.deleteEndereco = async function (req, res) {
    if (req.usuario.email === config.email && req.usuario.nick_name === config.adm) {
        await enderecoData.deleteEndereco(req.params.id);
        return res.status(200).send({ mensagem: "Apagado permanentemente com sucesso!" });
    } else {
        res.status(403).send({ mensagem: "Você não tem permissão" });
    }
};

exports.inativarEndereco = async function (req, res) {
    const postresponse = await postsData.getLocalEncontradoPost(req.params.id);
    if (postresponse == null) {
        const usuarioresponse = await usuarioData.getUsuarioEmail(req.usuario.email);
        if (usuarioresponse.id_endereco = req.params.id) {
            const endereco = { status: false, updated_at: datahora.updated_at() };
            await enderecoData.inativarEndereco(req.params.id, endereco);
            return res.status(200).send({ mensagem: "Apagado com sucesso" });
        } else {
            return res.status(403).send({ mensagem: "Este endereco não pertence a você" })
        }
    } else {
        const postresponse = await postsData.getLocalEncontradoPost(req.params.id);
        if (req.usuario.id_usuario == postresponse.id_usuario) {
            const endereco = { status: false, updated_at: datahora.updated_at() };
            await enderecoData.inativarEndereco(req.params.id, endereco);
            return res.status(200).send({ mensagem: "Apagado com sucesso" });
        } else {
            return res.status(403).send({ mensagem: "Este endereco não pertence a você" });
        }
    }
};

exports.updateEndereco = async function (req, res) {
    const postresponse = await postsData.getLocalEncontradoPost(req.params.id);
    if (postresponse == null) {
        const usuarioresponse = await usuarioData.getUsuarioEmail(req.usuario.email);
        if (usuarioresponse.id_endereco = req.params.id) {
            const endereco = req.body;
            endereco.updated_at = datahora.updated_at();
            endereco.status = true;
            await enderecoData.updateEndereco(req.params.id, endereco);
            return res.status(200).send({ mensagem: "Atualizado com sucesso!" });
        } else {
            return res.status(403).send({ mensagem: "Este endereco não pertence a você" })
        }
    } else {
        const postresponse = await postsData.getLocalEncontradoPost(req.params.id);
        if (req.usuario.id_usuario == postresponse.id_usuario) {
            const endereco = req.body;
            endereco.updated_at = datahora.updated_at();
            endereco.status = true;
            await enderecoData.updateEndereco(req.params.id, endereco);
            return res.status(200).send({ mensagem: "Atualizado com sucesso" });
        } else {
            return res.status(403).send({ mensagem: "Este endereco não pertence a você" });
        }
    }
};