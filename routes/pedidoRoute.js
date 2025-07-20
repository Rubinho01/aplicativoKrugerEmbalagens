var express = require('express');
var router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');
const carrinhoController  = require('../controllers/carrinhoController');




router.post('/adicionar', verificarSessao, itemPedidoController.adicionarAoPedido);

router.get('/carrinho', verificarSessao, carrinhoController.verCarrinho);



function verificarSessao(req, res, next){
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;