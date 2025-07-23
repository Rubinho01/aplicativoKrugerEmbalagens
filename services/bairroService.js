const {Bairro} = require('../models');

exports.buscarBairroPorNome = async(nome) =>{
    const bairroEncontrado = Bairro.findOne({where: {nome}});
    if(!bairroEncontrado) throw new Error("Bairro não encontrado no Banco de Dados");
    return bairroEncontrado;
}