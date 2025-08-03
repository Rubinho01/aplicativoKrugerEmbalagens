const carrinhoService = require('../services/carrinhoService');


exports.verCarrinho = async(req ,res) =>{
    try {
        const itens = await carrinhoService.carregarCarrinho(req.session.pedidoId);
        return res.render('carrinho',{itens});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.removerDoCarrinho = async(req, res) => {
    const itemPeidoId = req.params.id;
    try {
        await carrinhoService.removerItem(req.session.pedidoId,itemPeidoId);
        return res.redirect('back');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.atualizarQuantidade = async (req, res) => {
  const { quantidades } = req.body;
  const pedidoId = req.session.pedidoId;
    console.log('Entrou no atualizarQuantidade');
  console.log('Body recebido:', req.body);

  try {
    for (let id in quantidades) {
      const novaQtd = parseInt(quantidades[id], 10);
      console.log("Alterar -> pedidoId:", pedidoId, "| itemId:", id, "| novaQtd:", novaQtd);
    }
    const itens = await carrinhoService.carregarCarrinho(req.session.pedidoId);
    res.set({
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'Pragma': 'no-cache',
  'Expires': '0'
});
return res.render('carrinho', { itens });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};