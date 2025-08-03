var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController');
const verificarPedidoProcessandoMiddleware = require('../middlewares/verificarPedidoProcessando');


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

router.get('/inicio', verificarSessao, verificarPedidoProcessandoMiddleware, usuarioController.gerarPedido);

router.get('/produto/:id', verificarSessao, produtoController.carregarProduto);

router.get('/logout', verificarSessao, usuarioController.sair);

router.get('/usuario/editar', verificarSessao, usuarioController.carregarEditarUsuario);

router.post('/usuario/editar', verificarSessao, usuarioController.editarUsuario);
function verificarSessao(req, res, next){
  console.log("Sessão recebida:", req.session);
  if(!req.session.userId) return res.redirect('/');
  else{
    next();
  }
}

module.exports = router;
