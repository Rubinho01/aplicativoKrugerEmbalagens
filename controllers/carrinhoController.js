const carrinhoService = require('../services/carrinhoService');


exports.verCarrinho = async(req ,res) =>{
    try {
        const itens = await carrinhoService.carregarCarrinho(req.session.pedidoId);
        res.render('carrinho',{itens});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.removerDoCarrinho = async(req, res) => {
    const produtoId = req.params.id;
    try {
        await carrinhoService.removerItem(req.session.pedidoId,produtoId);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error.message);
    }
}