const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgres',
    password: 'Einstein3628',
    host: 'localhost',
    port: 5432,
    database: 'iPerdiV10'
});

module.exports = db;