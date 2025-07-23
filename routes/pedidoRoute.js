var express = require('express');
var router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');
const carrinhoController  = require('../controllers/carrinhoController');
const pedidoController = require('../controllers/pedidoController');
const pedido = require('../models/pedido');



router.post('/adicionar', verificarSessao, itemPedidoController.adicionarAoPedido);

router.get('/carrinho', verificarSessao, carrinhoController.verCarrinho);

router.get('/remover/:id', verificarSessao, carrinhoController.removerDoCarrinho);

router.post('/atualizar', verificarSessao, carrinhoController.atualizarQuantidade);

router.get('/endereco', verificarSessao, async(req, res) =>{
  res.render('endereco');
});

router.post('/confirmarEndereco', verificarSessao, pedidoController.atribuirEnderecoAoPedido);

router.get('/checkout', verificarSessao, pedidoController.verificarPedido);

router.post('/finalizar', verificarSessao, pedidoController.finalizarPedido);

function verificarSessao(req, res, next){
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;