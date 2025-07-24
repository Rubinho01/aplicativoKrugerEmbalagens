const {Bairro} = require('../models');
const bairroService = require('./bairroService')

exports.buscarBairroPorNome = async(nome) =>{
    const bairroEncontrado = Bairro.findOne({where: {nome}});
    if(!bairroEncontrado) throw new Error("Bairro não encontrado no Banco de Dados");
    return bairroEncontrado;
}

exports.buscarTodosBairros = async() => {
    const bairros = await Bairro.findAll();
    if(!bairros) throw new Error("Erro ao encontrar os Bairros");
    return bairros;
    
}

exports.buscarPorId = async(id) => {
    const bairroEncontrado = Bairro.findByPk(id);
    if(!bairroEncontrado) throw new Error("Bairro não encontrado no Banco de Dados");
    return bairroEncontrado;
}

exports.editarTaxa = async(id,taxa) => {
        const bairro = await bairroService.buscarPorId(id);
        await Bairro.update({taxa},{where: {id}});
        const bairroAtt = await bairroService.buscarPorId(id);
        const taxaAtualizada = bairroAtt.taxa;
        if(!taxaAtualizada) throw new Error("Erro ao atualizar a Taxa do Bairro: " + bairroAtt.nome);
        if(taxaAtualizada<0) throw new Error("A taxa não pode ser menos que zero!");
}
