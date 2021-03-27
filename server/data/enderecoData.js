const database = require('../infra/database');

exports.getEndereco = function(){
    return database.query('SELECT * FROM endereco');
};

exports.saveEndereco = function(endereco){
    return database.one('INSERT INTO endereco (logradouro, numero, cep, cidade, uf, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) returning * ',
     [endereco.logradouro, endereco.numero, endereco.cep, endereco.cidade, endereco.uf, endereco.created_at, endereco.update_at]);
}