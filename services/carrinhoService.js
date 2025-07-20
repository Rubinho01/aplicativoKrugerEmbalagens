const {Produto, Pedido, ItemPedido} = require('../models');

exports.carregarCarrinho = async(pedidoId) =>{
    const pedido = await Pedido.findByPk(pedidoId, {
      include: {
        model: ItemPedido,
        as: 'itens',
        include: Produto
      }
    })
    const itens = pedido?.itens || [];
    return itens;
}