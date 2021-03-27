const enderecoData = require('../data/enderecoData');

exports.getEnderecos = function(){
    return enderecoData.getEnderecos();
};

exports.getEndereco = function(id){
    return enderecoData.getEndereco(id);
};

exports.saveEndereco = function(endereco){
    return enderecoData.saveEndereco(endereco);
};

exports.deleteEndereco = function(id){
    return enderecoData.deleteEndereco(id);
};

exports.updateEndereco = function(id, endereco){
    return enderecoData.updateEndereco(id, endereco);
};