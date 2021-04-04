const notificacaoData = require("../data/notificacaoData");

exports.saveNotificacao = async function(req, res){
    notificacaoData.saveNotificacao(req.body);
}