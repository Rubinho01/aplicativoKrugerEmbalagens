const {Produto} = require('../models');

exports.addProduto = async({ nome, preco, descricao, situacao, fotos }) => {
  await Produto.create({
    nome,
    preco,
    descricao,
    situacao,
    foto1: fotos[0] || null,
    foto2: fotos[1] || null,
    foto3: fotos[2] || null
  });
};

exports.encontrarProduto = async(id) => {
  const produto = await Produto.findByPk(id);
  if(!produto) throw new Error("Produto Não encontrado");
  return produto;
  
}