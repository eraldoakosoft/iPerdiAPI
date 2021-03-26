const database = require('../infra/database');

exports.getUsuarios = function(){
    return database.query('select * from usuario');
};

exports.saveUsuario = function(usuario){
    return database.one('INSERT INTO usuario (nick_name, nome, genero, cpf, rg, nome_mae, data_nascimento, id_endereco, senha, email, telefone, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING * ', 
    [usuario.nick_name, usuario.nome, usuario.genero, usuario.cpf, usuario.rg, usuario.nome_mae, usuario.data_nascimento, usuario.id_endereco, usuario.senha, usuario.email, usuario.telefone, usuario.created_at, usuario.updated_at]);
}