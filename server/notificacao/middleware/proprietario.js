const notificacaoData = require('../data/notificacaoData');

exports.obrigatorio = async (req, res, next) =>{
    const response = await notificacaoData.getNotificacao(req.params.id);
    if(response){
        if(response.mensagem){
            return res.status(403).send(response);
        }
        if(req.usuario.id_usuario == response.id_usuario){
            next();
        }else{
            return res.status(202).send({mensagem: "Está notificação não pertence a você"});
        }
    }else{
        return res.status(202).send({mensagem: "Está notificação não existe"});
    }
}

exports.opcional = (req, res, next) =>{
    
}