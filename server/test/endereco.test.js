const crypto = require('crypto');
const axios = require('axios');
const dateFormat = require('../help/dateFormat');
const enderecoService = require('../service/enderecoService');

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

test('Should get a enderecos', async function(){
    const addres1 = await enderecoService.saveEndereco( address() );
    const addres2 = await enderecoService.saveEndereco( address() );
    const addres3 = await enderecoService.saveEndereco( address() );
    const response = await request('http://localhost:3000/endereco', 'get');
    const enderecos = response.data;
    //expect(enderecos).toHaveLength(3);
    await enderecoService.deleteEndereco( addres1.id_endereco );
    await enderecoService.deleteEndereco( addres2.id_endereco );
    await enderecoService.deleteEndereco( addres3.id_endereco );
});

test('Should save a endereco', async function(){
    const enderecoteste = address();
    const response = await request('http://localhost:3000/endereco', 'post', enderecoteste);
    const endereco = response.data;
    expect(enderecoteste.rua).toBe(endereco.rua);
    expect(enderecoteste.cep).toBe(endereco.cep);
    await enderecoService.deleteEndereco(endereco.id_endereco);
});

test('Should update a endereco', async function(){
    const addres1 = await enderecoService.saveEndereco( address() );
    addres1.cidade = generate();
    addres1.cep = generate();
    const response = await request(`http://localhost:3000/endereco/${addres1.id_endereco}`, 'put', addres1);
    const newAddress = response.data;
    expect(addres1.cidade).toBe(newAddress.cidade);
    expect(addres1.cep).toBe(newAddress.cep);
    await enderecoService.deleteEndereco(addres1.id_endereco);
});