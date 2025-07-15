const produtoModel = require('../models/produto');

exports.addProduto = async({ nome, preco, descricao, situacao, fotos }) => {
  await produtoModel.create({
    nome,
    preco,
    descricao,
    situacao,
    foto1: fotos[0] || null,
    foto2: fotos[1] || null,
    foto3: fotos[2] || null
  });
};