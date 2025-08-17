const pedidoService = require('../services/pedidoService');

const verificarPedidoProcessandoMiddleware = async (req, res, next) => {
  try {
    const usuarioId = req.session.userId;
    const pedidoExistente = await pedidoService.verificarPedidoUsuarioProcessando(usuarioId);

    if (pedidoExistente) {
      req.session.pedidoId = pedidoExistente.id;
      return res.redirect('/pedido/verificarStatus');
    } else {
      return next();
    }
  } catch (error) {
    console.error('Erro no middleware:', error);
    return res.status(500).send(error.message);
  }
};

module.exports = verificarPedidoProcessandoMiddleware;