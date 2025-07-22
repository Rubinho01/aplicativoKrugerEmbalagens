const {ItemPedido, Produto, Pedido, Endereco} = require('../models');
const pedido = require('../models/pedido');

exports.adicionarEndereco = async(pedidoId, enderecoId) =>{
    await Pedido.update({enderecoId}, {
        where: {
            id: pedidoId
        }
    })
}