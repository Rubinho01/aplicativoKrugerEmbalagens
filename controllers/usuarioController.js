const usuarioService = require('../services/usuarioService');

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
        res.redirect('/correto');
    } catch (error) {
        res.status(401).send(error.message);
    }
}