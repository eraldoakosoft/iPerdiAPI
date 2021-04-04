const database = require('../../infra/database');

exports.saveMsg = function (msg) {
    return database.one('INSERT INTO mensagem (id_emitente, id_destinatario, descricao, status, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ', [
        msg.id_emitente, msg.id_destinatario, msg.descricao, msg.status, msg.created_at, msg.updated_at
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.deleteMsg = function (id) {
    return database.none('DELETE FROM mensagem WHERE id_mensagem = $1', [
        id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.updateMsg = function (id, msg) {
    return database.none('UPDATE mensagem SET descricao = $1, status = $2, updated_at = $3 WHERE id_mensagem = $4', [
        msg.descricao, msg.status, msg.updated_at, id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.updateStatusMsg = function (id, status) {
    return database.none('UPDATE mensagem SET status = $1 WHERE id_mensagem = $2', [
        status, id
    ]).catch(error => { return { mensagem: error.detail } });
}

exports.getMsg = function (id) {
    return database.oneOrNone('SELECT * FROM mensagem WHERE id_mensagem = $1', [
        id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.getMsgs = function () {
    return database.query('SELECT * FROM mensagem').catch(error => { return { mensagem: error.detail } });
};