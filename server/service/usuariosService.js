const usuariosData = require('../data/usuariosData');
const bcrypt = require("bcrypt");

exports.getUsuarios = function () {
    return usuariosData.getUsuarios();
};

exports.getUsuario = function (id) {
    return usuariosData.getUsuario(id);
};

exports.saveUsuario = async (req, res) => {
    const usuario = req.body;
    const verify = await usuariosData.getUsuarioEmail(usuario.email);
    if (!verify > 0) {
        bcrypt.hash(usuario.senha, 10, async (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            } else {
                usuario.senha = hash;
                const newUser = await usuariosData.saveUsuario(usuario);
                return res.json(newUser);
            }
        });
    } else {
        return res.status(409).send({ mensagem: 'Usuário já cadastrado!' })
    }
};

exports.deleteUsuario = function (id) {
    return usuariosData.deleteUsuario(id);
};

exports.updateUsuario = function (id, usuario) {
    return usuariosData.updateUsuario(id, usuario);
};

exports.getUsuarioEmail = function( email){
    return usuariosData.getUsuarioEmail(email);
};