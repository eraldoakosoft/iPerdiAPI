const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');
const usuariosService = require('../service/usuariosService');
const enderecoService = require('../service/enderecoService');
const mensagemService = require('../service/mensagensService');

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

const msgteste = function(emitente, destinatario){
    var created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    var updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    mensagem = {
        id_emitente: emitente,
        id_destinatario: destinatario,
        descricao: generate(),
        status: true,
        created_at: created_at,
        updated_at: updated_at
    }
    return mensagem;
}

/* test('Deveria pegar mensagens', async function(){
    const enderecoEmitenete = await enderecoService.saveEndereco(address());
    const emitente = await usuariosService.saveUsuario(usertest(enderecoEmitenete.id_endereco));
    const enderecoDestinatario = await enderecoService.saveEndereco(address());
    const destinatario = await usuariosService.saveUsuario(usertest(enderecoDestinatario.id_endereco));
    const msg = msgteste(emitente.id_usuario, destinatario.id_usuario);
    await mensagemService.saveMsg(msg);
    const response = await request('http://localhost:3000/mensagens', 'get');
    const msgs = response.data;
    expect(msgs).toHaveLength(1);
    await mensagemService.deleteMsg(msgs[0].id_mensagem);
    await usuariosService.deleteUsuario(msgs[0].id_emitente);
    await usuariosService.deleteUsuario(msgs[0].id_destinatario);
    await enderecoService.deleteEndereco(enderecoEmitenete.id_endereco);
    await enderecoService.deleteEndereco(enderecoDestinatario.id_endereco);
    
});

test('Deveria salvar uma mensagem', async function(){
    const enderecoEmitenete = await enderecoService.saveEndereco(address());
    const emitente = await usuariosService.saveUsuario(usertest(enderecoEmitenete.id_endereco));
    const enderecoDestinatario = await enderecoService.saveEndereco(address());
    const destinatario = await usuariosService.saveUsuario(usertest(enderecoDestinatario.id_endereco));
    const msg = msgteste(emitente.id_usuario, destinatario.id_usuario);
    const response = await request('http://localhost:3000/mensagens', 'post', msg);
    const msgs = response.data;
    expect(msgs.descricao).toBe(msg.descricao);
    await mensagemService.deleteMsg(msgs.id_mensagem);
    await usuariosService.deleteUsuario(msgs.id_emitente);
    await usuariosService.deleteUsuario(msgs.id_destinatario);
    await enderecoService.deleteEndereco(enderecoEmitenete.id_endereco);
    await enderecoService.deleteEndereco(enderecoDestinatario.id_endereco);
});


test('Deveria apagar uma mensagem', async function(){
    const enderecoEmitenete = await enderecoService.saveEndereco(address());
    const emitente = await usuariosService.saveUsuario(usertest(enderecoEmitenete.id_endereco));
    const enderecoDestinatario = await enderecoService.saveEndereco(address());
    const destinatario = await usuariosService.saveUsuario(usertest(enderecoDestinatario.id_endereco));
    const msg = msgteste(emitente.id_usuario, destinatario.id_usuario);
    const newmsg =  await mensagemService.saveMsg(msg);
    await request(`http://localhost:3000/mensagens/${newmsg.id_mensagem}`, 'delete');
    const msgs = await mensagemService.getMsgs();
    expect(msgs).toHaveLength(0);
    await usuariosService.deleteUsuario(emitente.id_usuario);
    await usuariosService.deleteUsuario(destinatario.id_usuario);
    await enderecoService.deleteEndereco(enderecoEmitenete.id_endereco);
    await enderecoService.deleteEndereco(enderecoDestinatario.id_endereco);
    

});
 */
/*

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
    await usuariosService.deleteUsuario(newUser.id_usuario);
    await enderecoService.deleteEndereco(user.id_endereco);

}); */