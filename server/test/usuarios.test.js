const crypto = require('crypto');
const axios = require('axios');
const postsService = require('../service/usuariosService');

test('Should get a users', async function(){
    const response = await request('http://localhost:3000/usuarios', 'get');
    console.log(response)
});