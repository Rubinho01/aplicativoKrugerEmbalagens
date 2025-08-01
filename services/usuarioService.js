const { Usuario, Pedido} = require('../models');
const bcrypt = require('bcrypt');


exports.criarUsuario = async ({nome, email, telefone, senha}) =>{
    const existente = await Usuario.findOne({where: {email}});
    if (existente) throw new Error('Email Já Cadastrado');
    const senhaB = await bcrypt.hash(senha,10);
    await Usuario.create({nome,email,telefone,senha: senhaB});
} 

exports.buscarUsuarioEmaileSenha = async ({email, senha}) =>{
    const usuario = await Usuario.findOne({where : {email}});
    if(!usuario)  throw new Error('Usuário Não encontrado, verifique suas credenciais');
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if(!senhaCorreta) throw new Error("Senha Inválida");
    
    return usuario;
}

exports.atribuirPedido = async({usuario}) =>{
    const pedidoExistente = await Pedido.findOne({where : {usuarioId: usuario, status:"PENDENTE"}});
    if(pedidoExistente) return pedidoExistente;
    else {
        const pedido = await Pedido.create({usuarioId: usuario});
        return pedido;
    }
}

exports.editarUsuario = async (usuarioId, senhaAtual, senhaNova, emailNovo, telefoneNovo) => {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) throw new Error('Usuário não encontrado');

    const senhaConfere = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaConfere) throw new Error("A senha atual está errada");

    const dadosParaAtualizar = {};
    
    if (senhaNova && senhaNova.trim() !== "") {
        const senhaNovaB = await bcrypt.hash(senhaNova, 10);
        dadosParaAtualizar.senha = senhaNovaB;
    }
    if (emailNovo && emailNovo.trim().toLowerCase() !== usuario.email.toLowerCase()) {
        dadosParaAtualizar.email = emailNovo.trim();
    }
    if (telefoneNovo && telefoneNovo.trim() !== usuario.telefone) {
        dadosParaAtualizar.telefone = telefoneNovo.trim();
    }
    if (Object.keys(dadosParaAtualizar).length === 0) {
        throw new Error('Nenhum dado foi alterado');
    }

    await Usuario.update(dadosParaAtualizar, { where: { id: usuarioId } });
}


exports.buscarPorPk = async (usuarioId) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if(!usuario) throw new Error("Usuário não encontrado na Database");
    return usuario;
}