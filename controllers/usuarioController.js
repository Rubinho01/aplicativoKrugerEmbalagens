const usuarioService = require('../services/usuarioService');
const { Usuario, Pedido, Produto} = require('../models');

exports.registrar = async (req, res) => {
    const {email, nome, telefone, senha} = req.body;
    try {
        await usuarioService.criarUsuario({email, nome, telefone, senha});
        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.entrarSistema = async (req,res) => {
    const {email, senha} = req.body;
    try {
        const usuario = await usuarioService.buscarUsuarioEmaileSenha({email,senha});
        req.session.userId = usuario.id
        res.redirect('/mainpage');
    } catch (error) {
        res.status(401).send(error.message);
    }
}

exports.gerarPedido = async(req,res) => {
    try {
        const usuario = await Usuario.findByPk(req.session.userId);
        const produtos = await Produto.findAll();
        if(!usuario) return res.status(401).send("Usuario Não encontrado");
        console.log(usuario.id);
        const pedido = await usuarioService.atribuirPedido({usuario: usuario.id});
        req.session.pedidoId = pedido.id;
        res.render('mainpage',{produtos});
    } catch (error) {
        res.status(404).send(error.message);
    }
}