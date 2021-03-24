const database = require('../infra/database');

exports.getUsuarios = function(){
    return database.query('select * from usuario');
}