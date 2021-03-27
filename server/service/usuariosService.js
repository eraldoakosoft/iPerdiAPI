const usuariosData = require('../data/usuariosData');
const { func } = require('../infra/database');

exports.getUsuarios = function(){
    return usuariosData.getUsuarios();
};

exports.saveUsuario = function(usuario){
    return usuariosData.saveUsuario(usuario);
};

exports.deleteUsuario = function(id){
    return usuariosData.deleteUsuario(id);
}