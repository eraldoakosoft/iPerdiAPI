const database = require('../infra/database');

exports.getUsuarios = function(){
    return database.query('select * from usuario');
};

exports.saveUsuario = function(usuario){
    return database.one('INSERT INTO usuario (nick_name, nome, genero, cpf, rg, nome_mae, data_nascimento, id_endereco, senha, email, telefone, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING * ', 
    [usuario.nick_name, usuario.nome, usuario.genero, usuario.cpf, usuario.rg, usuario.nome_mae, usuario.data_nascimento, usuario.id_endereco, usuario.senha, usuario.email, usuario.telefone, usuario.status, usuario.created_at, usuario.updated_at]);
};

exports.deleteUsuario = function(id){
    return database.none('delete from usuario where id_usuario = $1', [id]);
};

exports.updateUsuario = function(id, usuario){
    return database.one('UPDATE usuario SET nick_name = $1, nome = $2, genero = $3, cpf = $4, rg = $5, nome_mae = $6, data_nascimento = $7, senha = $8, email = $9, telefone = $10, status = $11, updated_at = $12 WHERE id_usuario = $13 RETURNING * ',
    [usuario.nick_name, usuario.nome, usuario.genero, usuario.cpf, usuario.rg, usuario.nome_mae, usuario.data_nascimento, usuario.senha, usuario.email, usuario.telefone, usuario.status, usuario.updated_at , id]);
};