const usuariosData = require('../data/usuariosData');

exports.getUsuarios = function(){
    return usuariosData.getUsuarios();
};

exports.saveUsuario = function(usuario){
    return usuariosData.saveUsuario(usuario);
};