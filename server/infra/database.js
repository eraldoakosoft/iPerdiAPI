const help = require('../help/config.json');
const pgp = require('pg-promise')();


const db = pgp({
    user: 'postgres',
    password: help.db.senha,
    host: 'localhost',
    port: 5432,
    database: 'iPerdiV10'
});

module.exports = db;