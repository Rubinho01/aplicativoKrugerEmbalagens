const adminService = require('../services/adminService');
const produtoService = require('../services/produtoService');

exports.entrarAdmin = async (req, res) => {
    const {nome, senha} = req.body
    try {
        const admin = await adminService.buscarAdmin({nome, senha});
        req.session.adminId = admin.id;
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

exports.carregarProdutosParaEditar = async(req, res) =>{
    try {
        const produtos = await produtoService.buscarTodosProdutos();
        res.render('admin/produtos', {produtos});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.carregarProdutoParaEditar = async(req, res) => {
    try {
        const {id} = req.params;
        const produto = await produtoService.encontrarProduto(id);
        res.render("admin/produto", {produto});
    } catch (error) {
        
    }
}