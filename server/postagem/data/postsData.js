const database = require('../../infra/database');

exports.savePost = function (post) {
    return database.one('INSERT INTO postagem (id_usuario, nome, nome_mae, data_nascimento, genero, numero_documento, cpf, tipo, local_encontrado, data_encontrado, descricao, recompensa, status, tipo_postagem, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING * ',
        [post.id_usuario, post.nome, post.nome_mae, post.data_nascimento, post.genero, post.numero_documento, post.cpf, post.tipo, post.local_encontrado, post.data_encontrado, post.descricao, post.recompensa, true, post.tipo_postagem, post.created_at, post.updated_at]).catch(error => { return { mensagem: error.detail } });
};

exports.deletePost = function (id) {
    return database.none('DELETE FROM postagem WHERE id_postagem = $1', [id]).catch(error => { return { mensagem: error.detail } });
};
exports.iniativarPost = function (id, post) {
    return database.none('UPDATE postagem SET apagado = $1, updated_at = $2 WHERE id_postagem = $3', [post.apagado, post.updated_at, id]).catch(error => { return { mensagem: error.detail } });
};

exports.updatePost = function (id, post) {
    return database.none('UPDATE postagem SET nome = $1, nome_mae = $2, data_nascimento = $3, genero = $4, numero_documento = $5, tipo = $6,  descricao = $7, recompensa = $8, status = $9, tipo_postagem = $10, updated_at = $11 WHERE id_postagem = $12', [
        post.nome, post.nome_mae, post.data_nascimento, post.genero, post.numero_documento, post.tipo, post.descricao, post.recompensa, post.status, post.tipo_postagem, post.updated_at, id
    ]).catch(error => { return { mensagem: error.detail } });
};

exports.updateStatusPost = function (id, post) {
    return database.none('UPDATE postagem SET status = $1, updated_at = $2 WHERE id_postagem = $3', [post.status, post.updated_at, id]).catch(error => { return { mensagem: error.detail } });
}

exports.getPost = function (id) {
    return database.oneOrNone('SELECT * FROM postagem WHERE id_postagem = $1', [id]).catch(error => { return { mensagem: error.detail } });
};

exports.getLocalEncontradoPost = function (local_encontrado) {
    return database.oneOrNone('SELECT id_postagem, id_usuario FROM postagem WHERE local_encontrado = $1', [local_encontrado]).catch(error => { return { mensagem: error.detail } });
};

exports.getPosts = function () {
    return database.query('SELECT * FROM postagem').catch(error => { return { mensagem: error.detail } });
};