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

const usertest = function(id_endereco){
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
        id_endereco: id_endereco,
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
    const res = await enderecoService.saveEndereco(address());
    const data = usertest(res.id_endereco);
    const response = await request('http://localhost:3000/usuario', 'post', data);
    const user = response.data;
    expect(user.nick_name).toBe(data.nick_name);
    expect(user.senha).toBe(data.senha);
    expect(user.id_endereco).toBe(data.id_endereco);
    await usuariosService.deleteUsuario(user.id_usuario);
    await enderecoService.deleteEndereco(res.id_endereco);
});

test('Should delete a user', async function(){
    const enderecores = await enderecoService.saveEndereco(address());
    const user = await usuariosService.saveUsuario(usertest(enderecores.id_endereco));
    await request(`http://localhost:3000/usuario/${user.id_usuario}`, 'delete');
    await enderecoService.deleteEndereco(enderecores.id_endereco);
    //console.log(user);
    const users = await usuariosService.getUsuarios();
    //expect(users).toHaveLength(0);
});

test('Should update a user', async function(){
    const enderecores = await enderecoService.saveEndereco(address());
    const user = await usuariosService.saveUsuario(usertest(enderecores.id_endereco));
    user.nome = generate();
    user.senha = generate();
    const response = await request(`http://localhost:3000/usuario/${user.id_usuario}`, 'put', user);
    const newUser = response.data;
    expect(user.nome).toBe(newUser.nome);
    expect(user.senha).toBe(newUser.senha);
    await usuariosService.deleteUsuario(newUser.id_usuario);
    await enderecoService.deleteEndereco(enderecores.id_endereco);
});