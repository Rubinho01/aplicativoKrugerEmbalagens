const itemPedidoService = require('../services/itemPedido');
const {Produto} = require('../models');

exports.adicionarAoPedido = async(req, res) =>{
    const {produtoId, quantidade} = req.body;
    try {
        const produtos = await Produto.findAll();
        const produto = await Produto.findByPk(produtoId);
        await itemPedidoService.add(quantidade, produto.preco, req.session.pedidoId, produto.id);
        res.redirect('/pedido/carrinho');
    } catch (error) {
        res.status(500).send(error.message);
    }
}