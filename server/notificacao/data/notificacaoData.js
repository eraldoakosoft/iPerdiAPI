const database = require("../../infra/database");

exports.saveNotificacao = function(notificacao){
    return database.one('INSERT INTO notificacao (id_usuario, descricao, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id_notificacao',[
        notificacao.id_usuario, notificacao.descricao, notificacao.status, notificacao.created_at, notificacao.updated_at
    ]).catch(error => { return {mensagem: error} });
};

exports.getNotificacao = function(id){
    return database.oneOrNone('SELECT id_usuario, descricao, status FROM notificacao WHERE id_notificacao = $1', [
        id
    ]).catch(error => { return {mensagem: error} });
};

exports.getNotificacoes = function(id_usuario){
    return database.query('SELECT id_notificacao, id_usuario, descricao, status FROM notificacao WHERE id_usuario = $1', [
        id_usuario
    ]).catch(error => { return {mensagem: error} });
};

exports.updateStatusNoficacao = function(id, notificacao){
    return database.none('UPDATE notificacao SET status = $1, updated_at = $2 WHERE id_notificacao = $3',[
        notificacao.status, notificacao.updated_at, id
    ]).catch(error => { return {mensagem: error} });
};

exports.updateNoficacao = function(id, notificacao){
    return database.none('UPDATE notificacao SET descricao = $1 , updated_at = $2 WHERE id_notificacao = $3',[
        notificacao.descricao, notificacao.updated_at, id
    ]).catch(error => { return {mensagem: error} });
};
