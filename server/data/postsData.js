const database = require('../infra/database');

exports.savePost = function(post){
    return database.one('INSERT INTO postagem (id_usuario, nome, nome_mae, data_nascimento, genero, numero_documento, tipo, local_encontrado, data_encontrado, descricao, recompensa, status, tipo_postagem, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING * ', 
    [post.id_usuario, post.nome,post.nome_mae, post.data_nascimento, post.genero, post.numero_documento, post.tipo, post.local_encontrado, post.data_encontrado, post.descricao, post.recompensa, post.status, post.tipo_postagem, post.created_at, post.updated_at]);
};

exports.deletePost = function(id){
    return database.none('DELETE FROM postagem WHERE id_postagem = $1', [id]);
};

exports.updatePost = function(id, post){
    return database.none('UPDATE postagem SET nome = $1, nome_mae = $2, data_nascimento = $3, genero = $4, numero_documento = $5, tipo = $6,  descricao = $7, recompensa = $8, status = $9, tipo_postagem = $10, updated_at = $11 WHERE id_postagem = $12', [
        post.nome, post.nome_mae, post.data_nascimento, post.genero, post.numero_documento, post.tipo, post.descricao, post.recompensa, post.status, post.tipo_postagem, post.updated_at, id
    ]);
};

exports.updateStatusPost = function(id, status){
    return database.none('UPDATE postagem SET status = $1 WHERE id_postagem = $2', [status, id])
}

exports.getPost = function(id){
    return database.oneOrNone('SELECT * FROM postagem WHERE id_postagem = $1', [id]);
};

exports.getPosts = function(){
    return database.query('SELECT * FROM postagem');
};