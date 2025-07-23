const {Endereco} = require('../models');
const bairroService = require('./bairroService');

exports.criarEndereco = async(cep, rua, bairro, numero, complemento) => {
    const enderecoCriado = await Endereco.create({cep, rua, bairro, numero, complemento});
    if(!enderecoCriado) throw new Error("Erro ao registrar o Endereço");
    return enderecoCriado.id;
}

exports.buscarEnderecoPorPK = async(id) => {
    const enderecoEncontrado = await Endereco.findByPk(id);
    if(!enderecoEncontrado) throw new Error("Endereço não foi encontrado no Sistema");
    return enderecoEncontrado;
}

exports.verificarBairroEndereco = async(enderecoBairro) =>{
    const bairroPedido = await bairroService.buscarBairroPorNome(enderecoBairro);
    if(!bairroPedido) throw new Error("Erro interno do Servidor favor entrar em contato vai whatsapp"); //Acho que não tem como dar erradokkkkkkkk
    return bairroPedido;

    
}