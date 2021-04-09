const mensagemData = require('../data/mensagensData');
const datahora = require('../../help/datahora');

exports.getMsgs = async function(req, res){
    console.log(req.usuario.id_usuario);
    console.log(req.params.id_destinatario);
    const response = await mensagemData.getMsgs(req.usuario.id_usuario, req.params.id);
    if(response.erro === undefined){
        return res.status(200).json(response);
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao salvar mensagem" });
    }
};

exports.getMsg = async function(req, res){
    const response = await mensagemData.getMsg(req.params.id);
    if(response.erro === undefined){
        if(response.id_destinatario == req.usuario.id_usuario || response.id_emitente == req.usuario.id_usuario ){
            return res.status(200).json(response);
        }else{
            return res.status(403).send({ mensagem: "Está não é sua!" });
        }
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao salvar mensagem" });
    }
};

exports.saveMsg = async function(req, res){
    let mensagem = req.body;
    mensagem.id_emitente = req.usuario.id_usuario;
    mensagem.created_at = datahora.datahora();
    mensagem.updated_at = datahora.datahora();
    mensagem.status = false;
    console.log(mensagem);
    const response = await mensagemData.saveMsg(mensagem);
    if(response.erro === undefined){
        return res.status(200).json(response);
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao salvar mensagem" });
    }
};

exports.deleteMsg = async function(req, res){
    const response = await mensagemData.deleteMsg(req.params.id, req.usuario.id_usuario);
    if(response.erro === undefined){
        if(response.rowCount == 0){
            return res.status(403).send({ mensagem: "Erro ao apagar mensagem!" });
        }else{
            return res.status(200).send({ mensagem: "Deletado com sucesso!" })
        }
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao apagar mensagem" });
    }
};

exports.updateMsg = async function(req, res){
    let msg = req.body;
    msg.updated_at = datahora.datahora();
    const response = await mensagemData.updateMsg(req.params.id, msg, req.usuario.id_usuario);
    if(response.erro === undefined){
        if(response.rowCount == 0){
            return res.status(403).send({ mensagem: "Erro ao atualizar mensagem!" });
        }else{
            return res.status(200).send({ mensagem: "Atualizado com sucesso!" })
        }
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao atualizar mensagem" });
    }
};

exports.updateStatusMsg = async function(req, res){
    const updated_at = datahora.datahora();
    const response = await mensagemData.updateStatusMsg(req.params.id, updated_at);
    if(response.erro === undefined){
        if(response.rowCount == 0){
            return res.status(403).send({ mensagem: "Erro ao atualizar status!" });
        }else{
            return res.status(200).send({ mensagem: "Atualizado com sucesso!" })
        }
    }else{
        console.log(response.erro);
        return res.status(400).send({ mensagem: "Erro ao atualizar status" });
    }
};