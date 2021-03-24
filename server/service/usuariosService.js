const usuariosData = require('../data/usuariosData');

exports.getUsuarios = function(){
    return usuariosData.getUsuarios();
}