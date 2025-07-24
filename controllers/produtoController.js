const produtoService = require('../services/produtoService');
const multer = require('multer');
const path = require('path');

//CONFIG MULTER PRA SUBIR AS FOTOS DOS PRODUTOS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas!'), false);
  }
}

const upload = multer({ storage, fileFilter });



exports.adicionar = (req, res) => {
  upload.array('fotos', 3)(req, res, async function(err) {
    if (err) return res.status(400).send(err.message);

    try {
      const { nome, preco, descricao, situacao } = req.body;
      const fotos = req.files.map(file => file.filename);
      await produtoService.addProduto({ nome, preco, descricao, situacao, fotos });
      
      res.redirect('/admin/dashboard');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

exports.carregarProduto = async(req, res) => {
  try {
    const {id} = req.params;
    const produto = await produtoService.encontrarProduto(id);
    console.log(produto);
    res.render('produto/verProduto', {produto});
  } catch (error) {
    res.status(500).send(error.message);
  }

}