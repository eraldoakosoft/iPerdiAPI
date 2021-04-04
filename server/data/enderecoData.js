const database = require('../infra/database');

exports.getEnderecos = function () {
    return database.query('SELECT * FROM endereco').catch(error => { return { mensagem: error.detail } });
};

exports.getEndereco = function (id) {
    return database.oneOrNone('SELECT * FROM endereco WHERE id_endereco = $1', [
        id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.saveEndereco = function (endereco) {
    return database.one('INSERT INTO endereco (logradouro, numero, cep, cidade, uf, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_endereco ', [
        endereco.logradouro, endereco.numero, endereco.cep, endereco.cidade, endereco.uf, true, endereco.created_at, endereco.updated_at
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.deleteEndereco = function (id) {
    return database.none('DELETE FROM endereco WHERE id_endereco = $1', [
        id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.inativarEndereco = function (id, endereco) {
    return database.none('UPDATE endereco SET status = $1, updated_at = $2 WHERE id_endereco = $3', [
        endereco.status, endereco.updated_at, id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.updateEndereco = function (id, endereco) {
    return database.none('UPDATE endereco SET logradouro = $1, numero = $2, cep = $3, cidade = $4, uf = $5, status = $6, updated_at = $7 WHERE id_endereco = $8', [
        endereco.logradouro, endereco.numero, endereco.cep, endereco.cidade, endereco.uf, endereco.status, endereco.updated_at, id
    ]).catch(error => { return { mensagem: error.detail } });
};