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

const usuarioTeste = function(id_endereco){
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
const enderecoTeste = function(){
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

const postTeste = function(id_usuario, id_endereco){
    var created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    var updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    post = { 
        id_usuario: id_usuario,
        nome: generate(),
        nome_mae: generate(),
        data_nascimento: '1895-10-10',
        genero: "Masculino",
        numero_documento: generate(),
        tipo: generate(),
        local_encontrado: id_endereco,
        data_encontrado: '2021-03-26',
        descricao: generate(),
        recompensa: 9.66,
        status: true,
        tipo_postagem: generate(),
        created_at: created_at,
        updated_at: updated_at
    }
    return post;
}

/* test('Should get a users', async function(){
    const response = await request('http://localhost:3000/usuarios', 'get');
    //console.log(response.data)
}); */

test('Should save a post', async function(){
    const enderecoUser = await enderecoService.saveEndereco(enderecoTeste());
    const enderecoPost = await enderecoService.saveEndereco(enderecoTeste());
    const usuario = await usuariosService.saveUsuario(usuarioTeste(enderecoUser.id_endereco));
    const postagem = postTeste(usuario.id_usuario, enderecoPost.id_endereco);
    //console.log(postagem);
    const response = request('http://localhost:3000/posts', 'post', postagem);
    const post = response.data;
    //console.log(post);
    //await usuariosService.deleteUsuario(postagem.id_usuario);
    //await enderecoService.deleteEndereco(enderecoUser.id_endereco);
    //await enderecoService.deleteEndereco(enderecoPost.id_endereco); 
});


/* 
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

test('Should update a user', async function(){
    //Cria o endereco
    const enderecotest = address();
    const enderecores = await enderecoService.saveEndereco(enderecotest);
    //Cria o usuario
    const datauser = usertest();
    datauser.id_endereco = enderecores.id_endereco;
    const user = await usuariosService.saveUsuario(datauser);
    user.nome = generate();
    user.senha = generate();
    const response = await request(`http://localhost:3000/usuario/${user.id_usuario}`, 'put', user);
    const newUser = response.data;
    expect(user.nome).toBe(newUser.nome);
    expect(user.senha).toBe(newUser.senha);
    await enderecoService.deleteEndereco(user.id_endereco);

}); */