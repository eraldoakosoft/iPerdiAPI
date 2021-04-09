const usuariosData = require('../data/usuariosData');
const enderecoData = require('../../endereco/data/enderecoData');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const config = require('../../help/config.json');
const dateFormat = require('../../help/dateFormat');
const datahora = require('../../help/datahora');

exports.getUsuarios = async function (req, res) {
    const usuarios = await usuariosData.getUsuarios();
    return res.status(200).json(usuarios);
};

exports.getUsuario = async function (req, res) {
    if (req.usuario.id_usuario == req.params.id) {
        const usuario = await usuariosData.getUsuario(req.params.id);
        return res.status(200).json(usuario);
    } else {
        return res.status(403).send({ mensagem: "Usuário diferente" });
    }
};

exports.saveUsuario = async (req, res) => {
    const usuario = req.body;
    const verify = await usuariosData.getUsuarioEmail(usuario.email);
    if (!verify > 0) {
        usuario.id_endereco.created_at = datahora.created_at;
        usuario.id_endereco.updated_at = datahora.updated_at;
        const id_endereco = await enderecoData.saveEndereco(usuario.id_endereco);
        usuario.id_endereco = id_endereco.id_endereco;
        usuario.created_at = datahora.created_at;
        usuario.updated_at = datahora.updated_at;
        bcrypt.hash(usuario.senha, 10, async (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            } else {
                usuario.senha = hash;
                const response = await usuariosData.saveUsuario(usuario);
                if (response.mensagem) {
                    return res.status(403).send(response);
                }
                return res.status(200).json(response);
            }
        });
    } else {
        return res.status(409).send({ mensagem: 'Usuário já cadastrado!' })
    }
};

exports.inativarUsuario = async function (req, res) {
    if (req.usuario.id_usuario == req.params.id) {
        const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
        const usuario = { status: false, updated_at: updated_at }
        await usuariosData.inativarUsuario(req.params.id, usuario);
        return res.status(200).send({ mensagem: "Usuário Excluido com sucesso!" });
    } else {
        return res.status(403).send({ mensagem: "Usuário diferente" });
    }
};


exports.updateUsuario = async function (req, res) {
    if (req.usuario.id_usuario == req.params.id) {
        bcrypt.hash(req.body.senha, 10, async (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            } else {
                req.body.senha = hash;
                const response = await usuariosData.updateUsuario(req.usuario.id_usuario, req.body);
                if (response.mensagem) {
                    return res.status(403).send(response);
                }
                return res.status(200).send({ mensagem: "Atualizado com sucesso!" });

            }
        });
    } else {
        res.status(403).send({ mensagem: "Usuário diferente" })
    }
};

exports.getUsuarioEmail = function (email) {
    return usuariosData.getUsuarioEmail(email);
};

exports.Login = async (req, res) => {
    const user = await usuariosData.getUsuarioEmail(req.body.email);
    if (user < 1) {
        return res.status(500).send({ mensagem: "Falha na autenticação" });
    } else {
        bcrypt.compare(req.body.senha, user.senha, (err, result) => {
            if (err) {
                return res.status(401).send({ mensagem: "Falha na autenticação Senha" });
            }
            if (result) {
                const token = jwt.sign({
                    id_usuario: user.id_usuario,
                    email: user.email,
                    nick_name: user.nick_name
                }, config.secret, { expiresIn: "1h" });
                return res.status(200).send({ mensagem: "Autenticado com sucesso", token: token });
            }
            return res.status(401).send({ mensagem: "Falha na autenticação" });
        });
    }
}

exports.salvarSocket = async (req, res) => {
    /* console.log(req.usuario.id_usuario); */
    const response = await usuariosData.salvarSocket(req.usuario.id_usuario, req.body.socketID)
    if(response.mensagem){
        console.log(response);
        return res.status(500).send({mensagem: "Error no servidor"});
    }
    return res.status(200).send({mensagem: "Salvo com sucesso!"});
}

exports.getUsuarioEmailSocket = async (req, res) => {
    const response = await usuariosData.getUsuarioEmailSocket(req.params.email);
    return res.status(200).json(response);
}