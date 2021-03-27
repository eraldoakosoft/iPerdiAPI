const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');

const generate = function () {
    return crypto.randomBytes(5).toString('hex');
};

const request = function (url, method, data){
    return axios ({ url, method, data })
}

const address = function(){
    var created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    var updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    const enderecotest = { 
        "logradouro": generate(),
        "numero": generate(),
        "cep": generate(),
        "cidade": generate(),
        "uf": 'SP',
        "status":true,
        "created_at": created_at,
        "update_at": updated_at
    }
    return enderecotest;
}

test('Should get a endereco', async function(){
    const response = await request('http://localhost:3000/endereco', 'get');
    const endereco = response.data;
});

test('Should save a endereco', async function(){
    const enderecoteste = address();
    const response = await request('http://localhost:3000/endereco', 'post', enderecoteste);
    const endereco = response.data;
});