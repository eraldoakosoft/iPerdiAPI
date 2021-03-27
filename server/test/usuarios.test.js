const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');

const generate = function () {
    return crypto.randomBytes(5).toString('hex');
};

const request = function (url, method, data){
    return axios ({ url, method, data })
}

const usertest = function(){
    var created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    var updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    user = { 
        nick_name: generate(),
        nome: generate(),
        genero: 'M',
        cpf: generate(),
        rg: generate(),
        nome_mae: generate(),
        data_nascimento: '1995-10-10',
        id_endereco: '1',
        senha: generate(),
        email: generate(),
        telefone: generate(),
        created_at: created_at,
        updated_at: updated_at
    }
    return user;
};
const address = function(){
    var created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    var updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    const enderecotest = { 
        "logradouro": generate(),
        "numero": generate(),
        "cep": generate(),
        "cidade": generate(),
        "uf": 'SP',
        "created_at": created_at,
        "update_at": updated_at
    }
    return enderecotest;
}

test('Should get a users', async function(){
    const response = await request('http://localhost:3000/usuarios', 'get');
    //console.log(response.data)
});

test('Should save a user', async function(){
    const data = usertest();
    const enderecoteste = address();
    const res = await request('http://localhost:3000/endereco', 'post', enderecoteste);
    const endereco = res.data;
    data.id_endereco = endereco.id_endereco;
    const response = await request('http://localhost:3000/usuario', 'post', data);
    const user = response.data;
    expect(user.nick_name).toBe(data.nick_name);
    expect(user.senha).toBe(data.senha);
    expect(user.id_endereco).toBe(data.id_endereco);
});