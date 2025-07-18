var express = require('express');
var router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');




router.post('/adicionar', verificarSessao, itemPedidoController.adicionarAoPedido);



function verificarSessao(req, res, next){
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;