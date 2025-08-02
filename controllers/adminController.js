const adminService = require('../services/adminService');
const produtoService = require('../services/produtoService');
const pedidoService = require('../services/pedidoService');

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

exports.carregarDashboard = async (req, res) => {
    try {
        const pedidosProcessando = await pedidoService.buscarProcessando();
        res.render('admin/dashboard', {pedidosProcessando});
    } catch (error) {
        res.status(500).send(error.message);
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

exports.recusarPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        await pedidoService.tornarPedidoRecusado(pedidoId);
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}


exports.aceitarPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await pedidoService.encontrarPedidoPK(pedidoId);
        await pedidoService.tornarPedidoAprovado(pedido.id);

        res.render('admin/prepararPedido', {pedido});

    } catch (error) {
        res.status(500).send(error.message);
    }
    
}

exports.carregarHistoricoPedidos = async (req, res) => {
    try {
        const pedidosFinalizados = await pedidoService.buscarTodosRecusadoEAprovado();
        res.render('admin/historicoPedidos', {pedidosFinalizados});
    } catch (error) {
        res.status(500).send(error.message);
    }
}