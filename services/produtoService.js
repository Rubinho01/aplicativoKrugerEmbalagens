const {Produto} = require('../models');
const produtoService = require('./produtoService');

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

exports.buscarTodosProdutos = async() => {
  const produtos = await Produto.findAll();
  if(!produtos) throw new Error("Erro ao procurar os produtos no Banco de Dados");
  return produtos;
}

exports.editarProduto = async (id,nome,preco,descricao,situacao,foto1) => {
  const produto = await produtoService.encontrarProduto(id);
  if(nome!= produto.nome) await Produto.update({nome},{where: {id}});
  if(preco!= produto.preco) await Produto.update({preco},{where: {id}});
  if(descricao!= produto.descricao) await Produto.update({descricao},{where: {id}});
  if(situacao!= produto.situacao) await Produto.update({situacao},{where: {id}});
  if(foto1!= produto.foto1) await Produto.update({foto1},{where: {id}});
}

exports.excluirProduto = async (id) => {
  const produto = await produtoService.encontrarProduto(id);
  await Produto.destroy({where: {id: produto.id}});
  
}