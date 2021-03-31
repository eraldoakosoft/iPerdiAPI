const usuariosData = require('../data/usuariosData');

exports.getUsuarios = function () {
    return usuariosData.getUsuarios();
};

exports.getUsuario = function (id) {
    return usuariosData.getUsuario(id);
};

exports.saveUsuario = function (usuario) {
    return usuariosData.saveUsuario(usuario);
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