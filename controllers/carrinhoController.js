const carrinhoService = require('../services/carrinhoService');


exports.verCarrinho = async(req ,res) =>{
    try {
        const itens = await carrinhoService.carregarCarrinho(req.session.pedidoId);
        res.render('carrinho',{itens});
    } catch (error) {
        res.status(500).send(error.message);
    }
}