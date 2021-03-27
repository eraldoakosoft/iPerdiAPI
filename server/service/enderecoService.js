const enderecoData = require('../data/enderecoData');

exports.getEndereco = function(){
    return enderecoData.getEndereco();
};

exports.saveEndereco = function(endereco){
    return enderecoData.saveEndereco(endereco);
};

exports.deleteEndereco = function(id){
    return enderecoData.deleteEndereco(id);
}