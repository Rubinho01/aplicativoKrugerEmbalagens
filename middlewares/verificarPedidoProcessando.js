const pedidoService = require('../services/pedidoService');

const verificarPedidoProcessandoMiddleware = async (req, res, next) => {
    try {
        const usuarioId = req.session.userId;
        const pedidoExistente = await pedidoService.verificarPedidoUsuarioProcessando(usuarioId);
        if(pedidoExistente) return res.status(200).send("funcionou");
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = verificarPedidoProcessandoMiddleware;