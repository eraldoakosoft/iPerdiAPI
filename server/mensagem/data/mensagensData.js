const database = require('../../infra/database');

exports.saveMsg = function (msg) {
    return database.one('INSERT INTO mensagem (id_emitente, id_destinatario, descricao, status, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ', [
        msg.id_emitente, msg.id_destinatario, msg.descricao, msg.status, msg.created_at, msg.updated_at
    ]).catch(error => { return { erro: error } });
};

exports.deleteMsg = function (id, id_emitente) {
    return database.result('DELETE FROM mensagem WHERE id_mensagem = $1 and id_emitente = $2', [
        id, id_emitente
    ]).catch(error => { return { erro: error } });
};

exports.updateMsg = function (id, msg, id_emitente) {
    return database.result('UPDATE mensagem SET descricao = $1, updated_at = $2 WHERE id_mensagem = $3 and id_emitente = $4', [
        msg.descricao, msg.updated_at, id, id_emitente
    ]).catch(error => { return { erro: error } });
};

exports.updateStatusMsg = function (id, updated_at) {
    return database.result('UPDATE mensagem SET status = true, updated_at = $1 WHERE id_mensagem = $2', [
        updated_at, id
    ]).catch(error => { return { erro: error } });
}

exports.getMsg = function (id) {
    return database.oneOrNone('SELECT * FROM mensagem WHERE id_mensagem = $1', [
        id
    ]).catch(error => { return { erro: error } });
};

exports.getMsgs = async function (id_emitente, id_destinatario) {
    return database.query('select id_mensagem, descricao, status, created_at from mensagem where (id_emitente = $1 and id_destinatario = $2) or (id_emitente = $3 and id_destinatario = $4)',[
        id_emitente, id_destinatario, id_destinatario, id_emitente
    ]).catch(error => { return { erro: error } });
};