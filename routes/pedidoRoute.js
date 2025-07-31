var express = require('express');
var router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');
const carrinhoController  = require('../controllers/carrinhoController');
const pedidoController = require('../controllers/pedidoController');
const pedido = require('../models/pedido');
const verificarPedidoProcessandoMiddleware = require('../middlewares/verificarPedidoProcessando');


router.post('/adicionar', verificarSessao, verificarPedidoProcessandoMiddleware, itemPedidoController.adicionarAoPedido);

router.get('/carrinho', verificarSessao, carrinhoController.verCarrinho);

router.get('/remover/:id', verificarSessao, verificarPedidoProcessandoMiddleware, carrinhoController.removerDoCarrinho);

router.post('/atualizar', verificarSessao, verificarPedidoProcessandoMiddleware, carrinhoController.atualizarQuantidade);

router.get('/endereco', verificarSessao, verificarPedidoProcessandoMiddleware, async(req, res) =>{
  res.render('endereco');
});

router.post('/confirmarEndereco', verificarSessao, verificarPedidoProcessandoMiddleware, pedidoController.atribuirEnderecoAoPedido);

router.get('/checkout', verificarSessao, verificarPedidoProcessandoMiddleware, pedidoController.verificarPedido);

router.post('/finalizar', verificarSessao, verificarPedidoProcessandoMiddleware, pedidoController.finalizarPedido);

router.get('/verificarStatus', verificarSessao, pedidoController.verificarStatusPedido);

function verificarSessao(req, res, next){
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;