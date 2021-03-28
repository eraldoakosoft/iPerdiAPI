const database = require('../infra/database');

exports.savePost = function(post){
    return database.one('INSERT INTO postagem (id_usuario, nome, nome_mae, data_nascimento, genero, numero_documento, tipo, local_encontrado, data_encontrado, descricao, recompensa, status, tipo_postagem, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING * ', 
    [post.id_usuario, post.nome,post.nome_mae, post.data_nascimento, post.genero, post.numero_documento, post.tipo, post.local_encontrado, post.data_encontrado, post.descricao, post.recompensa, post.status, post.tipo_postagem, post.created_at, post.updated_at]);
};