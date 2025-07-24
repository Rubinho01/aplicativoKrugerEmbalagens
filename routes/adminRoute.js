var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const produtoController = require('../controllers/produtoController');
const bairroController = require('../controllers/bairroController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/loginForm');
});

router.post('/login',  adminController.entrarAdmin);

router.get('/dashboard',verificarAdmin,  (req, res) => {
  res.render('admin/dashboard');
})


router.get('/novo-item', verificarAdmin, (req, res) => {
  res.render('admin/novoItem');
})

router.post('/novo-item', verificarAdmin, produtoController.adicionar);

router.get('/taxas', verificarAdmin, bairroController.buscarBairros);

router.get('/editarTaxa/:id', verificarAdmin, bairroController.CarregarBairro);

router.post('/editarTaxa', verificarAdmin, bairroController.atualizarTaxaBairro);

router.get('/editarItens', verificarAdmin, adminController.carregarProdutosParaEditar);


function verificarAdmin(req, res, next) {
  if(!req.session.adminId) return res.redirect('/admin');
  else next();
}

module.exports = router;
