const pedidoService = require('../services/pedidoService');

const verificarPedidoProcessandoMiddleware = async (req, res, next) => {
  try {
    console.log('Entrou no middleware verificarPedidoProcessando');
    const usuarioId = req.session.userId;
    console.log('usuarioId:', usuarioId);

    const pedidoExistente = await pedidoService.verificarPedidoUsuarioProcessando(usuarioId);
    console.log('pedidoExistente:', pedidoExistente);

    if (pedidoExistente) {
      console.log('caiu no IF CERTO');
      req.session.pedidoId = pedidoExistente.id;
      return res.redirect('/pedido/verificarStatus');
    } else {
      next();
    }
  } catch (error) {
    console.error('Erro no middleware:', error);
    res.status(500).send(error.message);
  }
};

module.exports = verificarPedidoProcessandoMiddleware;