var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const produtoController = require('../controllers/produtoController');

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

router.post('/novo-item', verificarAdmin, produtoController.adicionar)


function verificarAdmin(req, res, next) {
  if(!req.session.adminId) return res.redirect('/admin');
  else next();
}

module.exports = router;
