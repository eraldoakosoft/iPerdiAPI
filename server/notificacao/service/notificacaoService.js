const notificacaoData = require("../data/notificacaoData");
const datahora = require('../../help/datahora');

exports.saveNotificacao = async function(req, res){
    notificacaoData.saveNotificacao(req.body);
}

exports.updateStatusNoficacao = async function(req, res){
    const notificacao = { status: false, updated_at: datahora.updated_at()}
    const response = await notificacaoData.updateStatusNoficacao(req.params.id, notificacao);
    if(response){
        if(response.mensagem){
            return res.status(403).send(response);
        }
    }else{
        return res.status(200).send({ mensagem: "Atualizado com sucesso!" });
    }
    
};

exports.updateNoficacao = async function(req, res){
    req.body.updated_at = datahora.updated_at();
    const response = await notificacaoData.updateNoficacao(req.params.id, req.body);
    if(response){
        if(response.mensagem){
            return res.status(403).send(response);
        }
    }else{
        return res.status(200).send({ mensagem: "Atualizado com sucesso!" });
    }
    
};

exports.getNotificacao = async function(req, res){
    return await notificacaoData.getNotificacao(req.params.id);
};

exports.getNotificacoes = async function(req, res){
    const response = await notificacaoData.getNotificacoes(req.usuario.id_usuario);
    if(response){
        if(response.mensagem){
            return res.status(403).send(response);
        }
        return res.status(200).json(response);
    }
    return res.status(200).send({mensagem: "Não ha nofiticações"});
}