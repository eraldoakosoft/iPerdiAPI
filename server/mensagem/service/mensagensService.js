const mensagemData = require('../data/mensagensData');

exports.getMsgs = function(){
    return mensagemData.getMsgs();
};

exports.getMsg = function(id){
    return mensagemData.getMsg(id);
};

exports.saveMsg = function(msg){
    return mensagemData.saveMsg(msg);
};

exports.deleteMsg = function(id){
    return mensagemData.deleteMsg(id);
};

exports.updateMsg = function(id, msg){
    return mensagemData.updateMsg(id, msg);
};

exports.updateStatusMsg = function(id, status){
    return mensagemData.updateStatusMsg(id, status);
};