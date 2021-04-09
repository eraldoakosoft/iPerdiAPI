const database = require('../../infra/database');

exports.getUsuarios = function () {
    return database.query('select nick_name, nome, telefone from usuario where status = true ').catch(error => { return { mensagem: error.detail } });
};
exports.getUsuario = function (id) {
    return database.oneOrNone('select nick_name, nome, genero, cpf, rg, nome_mae, data_nascimento, id_endereco, email, telefone, status from usuario where id_usuario = $1', [id]).catch(error => { return { mensagem: error.detail } });
};

exports.saveUsuario = function (usuario) {
    return database.one('INSERT INTO usuario (nick_name, nome, genero, cpf, rg, nome_mae, data_nascimento, id_endereco, senha, email, telefone, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id_usuario',
        [usuario.nick_name, usuario.nome, usuario.genero, usuario.cpf, usuario.rg, usuario.nome_mae, usuario.data_nascimento, usuario.id_endereco, usuario.senha, usuario.email, usuario.telefone, true, usuario.created_at, usuario.updated_at]).catch(error => { return { mensagem: error.detail } });
};

exports.deleteUsuario = function (id) {
    return database.none('delete from usuario where id_usuario = $1', [id]).catch(error => { return { mensagem: error.detail } }).catch(error => { return { mensagem: error.detail } });
};

exports.updateUsuario = function (id, usuario) {
    return database.one('UPDATE usuario SET nick_name = $1, nome = $2, genero = $3, cpf = $4, rg = $5, nome_mae = $6, data_nascimento = $7, senha = $8, email = $9, telefone = $10, status = $11, updated_at = $12 WHERE id_usuario = $13 RETURNING * ',
        [usuario.nick_name, usuario.nome, usuario.genero, usuario.cpf, usuario.rg, usuario.nome_mae, usuario.data_nascimento, usuario.senha, usuario.email, usuario.telefone, usuario.status, usuario.updated_at, id]).catch(error => { return { mensagem: error.detail } });
};

exports.inativarUsuario = function (id, usuario) {
    return database.none('UPDATE usuario SET status = $1, updated_at = $2 WHERE id_usuario = $3',
        [usuario.status, usuario.updated_at, id]).catch(error => { return { mensagem: error.detail } });
};

exports.getUsuarioEmail = function (email) {
    return database.oneOrNone('SELECT id_usuario, nick_name, cpf, rg, id_endereco, senha, email, status FROM usuario WHERE email = $1', [email]).catch(error => { return { mensagem: error.detail } });
};

exports.getUsuarioCPF = function (cpf) {
    return database.oneOrNone('SELECT * FROM usuario WHERE cpf = $1', [cpf]).catch(error => { return { mensagem: error.detail } });
};

exports.getUsuarioNomeAndNomeMae = function (post) {
    return database.oneOrNone('SELECT * FROM usuario WHERE unaccent(nome) ILIKE unaccent($1) and unaccent(nome_mae) ILIKE unaccent($2)', [post.nome, post.nome_mae]).catch(error => { return { mensagem: error.detail } });
};

exports.getUsuarioNomeMae = function (nome_mae) {
    return database.oneOrNone('SELECT * FROM usuario WHERE nome_mae = $1', [nome_mae]).catch(error => { return { mensagem: error.detail } });
}

exports.salvarSocket = function (id, socket) {
    return database.one('UPDATE usuario SET socketID = $1 WHERE id_usuario = $2 RETURNING *',
        [socket, id]).catch(error => {  return { mensagem: error } });
};

exports.getUsuarioEmailSocket = function (email) {
    return database.oneOrNone('SELECT id_usuario, socketID FROM usuario WHERE email = $1', [email]).catch(error => { return { mensagem: error } });
};