const {ItemPedido, Produto, Pedido} = require('../models');

exports.add = async(quantidade, valor, pedido, produto) =>{
    const produtoExistente = await Produto.findByPk(produto);
    if(!produtoExistente) throw new Error("Produto Inexistente");
    const pedidoExistente = await Pedido.findByPk(pedido);
    if(!pedidoExistente) throw new Error("O código do Pedido não foi encontrado, favor entrar em contato via Whatsapp");
    await ItemPedido.create({
        quantidade,
        preco_unitario: valor,
        pedidoId: pedido,
        produtoId: produto
    });
    
    
}

