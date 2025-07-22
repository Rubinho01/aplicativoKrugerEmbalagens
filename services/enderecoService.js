const {Endereco} = require('../models');

exports.criarEndereco = async(cep, rua, bairro, numero, complemento) => {
    const enderecoCriado = await Endereco.create({cep, rua, bairro, numero, complemento});
    if(!enderecoCriado) throw new Error("Erro ao registrar o Endereço");
    return enderecoCriado.id;
}