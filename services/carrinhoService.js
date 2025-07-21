const {Produto, Pedido, ItemPedido} = require('../models');

exports.carregarCarrinho = async(pedidoId) =>{
    const pedido = await Pedido.findByPk(pedidoId, {
      include: {
        model: ItemPedido,
        as: 'itens',
        include: Produto
      }
    });
    const itens = pedido?.itens || [];
    console.log(itens);
    return itens;
}

exports.removerItem = async(pedidoId, id) => {
  const pedido = await Pedido.findByPk(pedidoId);
  const existeNoPedido = await ItemPedido.findOne({where : {pedidoId, id}});
  if(!existeNoPedido) throw new Error("Este produto não foi encontrado no seu pedido");
  ItemPedido.destroy({
    where: {
      pedidoId,
      id
    }
  });
  
};