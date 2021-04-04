const database = require("../infra/database");

exports.saveNotificacao = function(notificacao){
    database.one('INSERT INTO notificacao (id_usuario, descricao, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id_notificacao',[
        notificacao.id_usuario, notificacao.descricao, notificacao.status, notificacao.created_at, notificacao.updated_at
    ]);
};