const pedidoService = require('../services/pedidoService');
const enderecoService = require('../services/enderecoService');
const pedido = require('../models/pedido');



exports.atribuirEnderecoAoPedido = async(req, res) => {
    const {cep, rua, bairro, numero, complemento} = req.body;
    try {
        const enderecoId = await enderecoService.criarEndereco(cep, rua, bairro, numero, complemento);
        await pedidoService.adicionarEndereco(req.session.pedidoId,enderecoId);
        res.status(200).send(console.log("Endereço adicionado ao pedido"));
    } catch (error) {
        res.status(500).send(error.message);
    }
}