var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req, res) => {
  res.render('auth/loginForm')
});

router.post('/login', usuarioController.entrarSistema);

router.get('/cadastro', (req,res) =>{
  res.render('auth/registroForm');
})

router.post('/registrar', usuarioController.registrar);

router.get('/inicio', verificarSessao, usuarioController.gerarPedido);

router.get('/produto/:id', verificarSessao, produtoController.carregarProduto);

router.get('/logout', verificarSessao, usuarioController.sair);

function verificarSessao(req, res, next){
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;
