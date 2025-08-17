const upload = require("../config/upload");
const produtoService = require("../services/produtoService");

exports.adicionar = (req, res) => {
  upload.array('fotos', 3)(req, res, async function(err) {
    if (err) return res.status(400).send(err.message);
    try {
      const { nome, preco, descricao, situacao } = req.body;
      const fotos = req.files.map(file => file.path);
      await produtoService.addProduto({ nome, preco, descricao, situacao, fotos });
      
      return res.redirect('/admin/dashboard');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
}

exports.carregarProduto = async(req, res) => {
  try {
    const {id} = req.params;
    const produto = await produtoService.encontrarProduto(id);
    console.log(produto);
    return res.render('produto/verProduto', {produto});
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

exports.editarProduto = async (req,res) => {
  upload.single('foto1')(req, res, async function(err) {
    if (err) return res.status(400).send(err.message);

    try {
      const { id, nome, preco, descricao, situacao, } = req.body;
      const foto1 = req.file?.filepath;
      await produtoService.editarProduto(id, nome, preco, descricao, situacao, foto1 );
      
      return res.redirect(`/admin/editarItem/${id}`);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  
}

exports.excluirProduto = async (req, res) => {
  try {
    const {id} = req.params;
    await produtoService.excluirProduto(id);
    return res.redirect('/admin/editarItens');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}