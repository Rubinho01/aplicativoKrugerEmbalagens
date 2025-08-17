const usuarioService = require('../services/usuarioService');
const { Usuario, Pedido, Produto} = require('../models');

exports.registrar = async (req, res) => {
    const {email, nome, telefone, senha} = req.body;
    try {
        await usuarioService.criarUsuario({email, nome, telefone, senha});
        return res.redirect('/login');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

exports.entrarSistema = async (req,res) => {
    const {email, senha} = req.body;
    try {
        const usuario = await usuarioService.buscarUsuarioEmaileSenha({email,senha});
        req.session.userId = usuario.id
        return  res.redirect('/inicio');
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

exports.gerarPedido = async(req,res) => {
    try {
        const usuario = await Usuario.findByPk(req.session.userId);
        const produtos = await Produto.findAll();
        if(!usuario) return res.status(401).send("Usuario Não encontrado");
        const pedido = await usuarioService.atribuirPedido({usuario: usuario.id});
        req.session.pedidoId = pedido.id;
        return res.render('mainpage',{produtos});
    } catch (error) {
       return res.status(404).send(error.message);
    }
}

exports.sair = async(req, res) => {
    try {
        req.session.destroy();
        return res.redirect('/');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.carregarEditarUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.buscarPorPk(req.session.userId);
        res.set('Cache-Control', 'no-store');
        return res.render('editarUsuario', {usuario});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.editarUsuario = async (req,res) => {
    const { senhaAtual, senhaNova, emailNovo, telefoneNovo } = req.body;
    const usuarioId = req.session.userId;
    try {
        await usuarioService.editarUsuario(usuarioId, senhaAtual, senhaNova, emailNovo, telefoneNovo);
        return res.redirect('/usuario/editar');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}