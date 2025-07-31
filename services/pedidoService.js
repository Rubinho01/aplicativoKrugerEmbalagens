const {Pedido, Usuario, Endereco, ItemPedido, Produto} = require('../models');
const carrinhoService = require('./carrinhoService');
const bairroService = require('./bairroService');
const enderecoService = require('./enderecoService');
const pedidoService = require('./pedidoService');
const { Where } = require('sequelize/lib/utils');



exports.encontrarPedidoPK = async (id) => {
    const pedidoEncontrado = await Pedido.findByPk(id, {
        include: [{
        model: Endereco,
        as: "endereco",
        attributes: ['rua', 'numero', 'bairro']
    }]
});
    if(!pedidoEncontrado) throw new Error("Erro ao encontrar o pedido no banco de dados");
    return pedidoEncontrado;
    
    
}

exports.adicionarEndereco = async(pedidoId, enderecoId) =>{
    await Pedido.update({enderecoId}, {
        where: {
            id: pedidoId
        }
    })
}

exports.calcularPedidoCompleto = async(id) => {
    const pedido = await Pedido.findByPk(id);
    const itens = await carrinhoService.carregarCarrinho(pedido.id);
    const endereco = await enderecoService.buscarEnderecoPorPK(pedido.enderecoId);
    const bairro = await bairroService.buscarBairroPorNome(endereco.bairro);

    if (!pedido) throw new Error("Pedido não encontrado");
    if (!endereco) throw new Error("Endereço não encontrado");
    if (!bairro) throw new Error("Bairro não encontrado");

    let total = 0;
    itens.forEach(item => {
        const preco = parseFloat(item.produto.preco);
        const quantidade = parseInt(item.quantidade);
        const subtotal = preco * quantidade;
        total += subtotal;
    });
    const taxaEntrega = parseFloat(bairro?.taxa || 0);
    const totalComEntrega = total + taxaEntrega;
    if(!totalComEntrega) throw new Error("Erro ao calcular o valor Total, favor Entrar em contato via Whatsapp");
    return totalComEntrega;

}

exports.finalizarPedido = async(id) => {
    const total = await pedidoService.calcularPedidoCompleto(id);
    await Pedido.update({total: total.toFixed(2)},{where: {id}});
    await Pedido.update({status: "PROCESSANDO"},{where: {id}});

}

exports.buscarProcessando = async () => {
    const pedidosProcessando = await Pedido.findAll({where: {status: "PROCESSANDO"},include: [
  { model: Usuario },
  { model: Endereco, as: 'endereco' },
  {
    model: ItemPedido,
    as: 'itens',
    include: {
      model: Produto
    }
  }
]});
console.log(JSON.stringify(pedidosProcessando, null, 2));
    if(pedidosProcessando) return pedidosProcessando || [];
}

exports.verificarPedidoUsuarioProcessando = async(usuarioId) =>{
    const pedidoProcessando = await Pedido.findOne({where : {status: 'PROCESSANDO', usuarioId}});
    if(pedidoProcessando) return pedidoProcessando;
    else return false;
}


exports.tornarPedidoRecusado = async(pedidoId) =>{
    const pedido = await pedidoService.encontrarPedidoPK(pedidoId);
    await Pedido.update({status: "RECUSADO"}, {where: {id: pedido.id}});
    const pedidoAfter = await pedidoService.encontrarPedidoPK(pedidoId);
    if(pedidoAfter.status !== "RECUSADO") throw new Error("ERRO AO RECUSAR PEDIDO"); 
}