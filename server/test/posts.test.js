const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');
const usuariosService = require('../service/usuariosService');
const enderecoService = require('../service/enderecoService');
const postsService = require('../service/postsService');

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

test('Deve pegar todas as postagens', async function(){
    const response = await request('http://localhost:3000/posts', 'get');
    //console.log(response.data)
});

test('Should save a post', async function(){
    const enderecoUser = await enderecoService.saveEndereco(enderecoTeste());
    const enderecoPost = await enderecoService.saveEndereco(enderecoTeste());
    const usuario = await usuariosService.saveUsuario(usuarioTeste(enderecoUser.id_endereco));
    //console.log(usuario);
    /* const postagem = postTeste(usuario.id_usuario, enderecoPost.id_endereco);
    const response = await request('http://localhost:3000/posts', 'post', postagem);
    const post = response.data;
    await postsService.deletePost(post.id_postagem);
    await usuariosService.deleteUsuario(postagem.id_usuario);
    await enderecoService.deleteEndereco(enderecoUser.id_endereco);
    await enderecoService.deleteEndereco(enderecoPost.id_endereco); */
});

/*
test('Should delete a post', async function(){
    const endeUser = await enderecoService.saveEndereco(enderecoTeste());
    const endePost = await enderecoService.saveEndereco(enderecoTeste());
    const user = await usuariosService.saveUsuario(usuarioTeste(endeUser.id_endereco));
    const post = postTeste(user.id_usuario, endePost.id_endereco);
    const newpost = await postsService.savePost(post);
    await request(`http://localhost:3000/posts/${newpost.id_postagem}`, 'delete');
    await usuariosService.deleteUsuario(user.id_usuario);
    await enderecoService.deleteEndereco(endeUser.id_endereco);
    await enderecoService.deleteEndereco(endePost.id_endereco);
    const posts = await postsService.getPosts();
    expect(posts).toHaveLength(0);
});


test('Should update a post', async function(){
    const endeUser = await enderecoService.saveEndereco(enderecoTeste());
    const endePost = await enderecoService.saveEndereco(enderecoTeste());
    const user = await usuariosService.saveUsuario(usuarioTeste(endeUser.id_endereco));
    const post = postTeste(user.id_usuario, endePost.id_endereco);
    const newpost = await postsService.savePost(post);
    newpost.nome = generate();
    newpost.tipo = generate();
    await request(`http://localhost:3000/posts/${newpost.id_postagem}`, 'put', newpost);
    const updatedPost = await postsService.getPost(newpost.id_postagem);
    expect(newpost.nome).toBe(updatedPost.nome);
    expect(newpost.tipo).toBe(updatedPost.tipo);
    await postsService.deletePost(updatedPost.id_postagem);
    await usuariosService.deleteUsuario(user.id_usuario);
    await enderecoService.deleteEndereco(endeUser.id_endereco);
    await enderecoService.deleteEndereco(endePost.id_endereco);

});

test('Deve mudar apenas o status da postagem', async function(){
    const endeUser = await enderecoService.saveEndereco(enderecoTeste());
    const endePost = await enderecoService.saveEndereco(enderecoTeste());
    const user = await usuariosService.saveUsuario(usuarioTeste(endeUser.id_endereco));
    const post = postTeste(user.id_usuario, endePost.id_endereco);
    const newpost = await postsService.savePost(post);
    if(newpost.status){
        newpost.status = false;
    }else{
        newpost.status = true;
    }
    await request(`http://localhost:3000/posts/status/${newpost.id_postagem}`, 'put', newpost);
    const updatedPost = await postsService.getPost(newpost.id_postagem);
    expect(newpost.status).toBe(updatedPost.status);
    await postsService.deletePost(updatedPost.id_postagem);
    await usuariosService.deleteUsuario(user.id_usuario);
    await enderecoService.deleteEndereco(endeUser.id_endereco);
    await enderecoService.deleteEndereco(endePost.id_endereco);
}); */