const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');
const usuariosService = require('../service/usuariosService');
const enderecoService = require('../service/enderecoService');

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
        status: true,
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
        "status": true,
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
    const res = await enderecoService.saveEndereco(enderecoteste);
    data.id_endereco = res.id_endereco;
    const response = await request('http://localhost:3000/usuario', 'post', data);
    const user = response.data;
    expect(user.nick_name).toBe(data.nick_name);
    expect(user.senha).toBe(data.senha);
    expect(user.id_endereco).toBe(data.id_endereco);
    await enderecoService.deleteEndereco(data.id_endereco);
});

test('Should delete a user', async function(){
    //Cria o endereco
    const enderecotest = address();
    const enderecores = await enderecoService.saveEndereco(enderecotest);
    //Cria o usuario
    const datauser = usertest();
    datauser.id_endereco = enderecores.id_endereco;
    const user = await usuariosService.saveUsuario(datauser);
    await request(`http://localhost:3000/usuario/${user.id_usuario}`, 'delete');
    await enderecoService.deleteEndereco(user.id_endereco);
    const users = await usuariosService.getUsuarios();
    expect(users).toHaveLength(0);
});