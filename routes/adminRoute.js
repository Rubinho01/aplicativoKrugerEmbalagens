var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/loginForm');
});

router.post('/login',  adminController.entrarAdmin);

router.get('/dashboard',verificarAdmin,  (req, res) => {
  res.render('admin/dashboard');
})




function verificarAdmin(req, res, next) {
  if(!req.session.adminId) return res.redirect('/admin');
  else next();
}

module.exports = router;
