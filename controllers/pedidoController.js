const pedidoService = require('../services/pedidoService');
const enderecoService = require('../services/enderecoService');
const carrinhoService = require('../services/carrinhoService');
const bairroService = require('../services/bairroService');



exports.atribuirEnderecoAoPedido = async(req, res) => {
    const {cep, rua, bairro, numero, complemento} = req.body;
    try {
        const enderecoId = await enderecoService.criarEndereco(cep, rua, bairro, numero, complemento);
        await pedidoService.adicionarEndereco(req.session.pedidoId,enderecoId);
        return res.redirect('/pedido/checkout');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.verificarPedido = async(req, res) => {
    try {
        const pedido = await pedidoService.encontrarPedidoPK(req.session.pedidoId);
        const itens = await carrinhoService.carregarCarrinho(pedido.id);
        const endereco = await enderecoService.buscarEnderecoPorPK(pedido.enderecoId);
        const bairro = await bairroService.buscarBairroPorNome(endereco.bairro);
        return res.render('checkout', {itens,bairro,endereco}); 

        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.finalizarPedido = async(req, res) => {
    try {
        await pedidoService.finalizarPedido(req.session.pedidoId);
        return res.redirect('/pedido/verificarStatus');
    } catch(error) {
        return res.status(500).send(error.message);
    }
};

exports.verificarStatusPedido = async (req,res) => {
    try {
        const pedido = await pedidoService.encontrarPedidoPK(req.session.pedidoId);
        console.log('usuarioId da sessão:', req.session.userId);
        return res.render("verificarStatus",{pedido});
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}