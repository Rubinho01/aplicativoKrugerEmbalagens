const Usuario = require('../models/Usuario');

exports.criarUsuario = async ({nome, email, telefone, senha}) =>{
    const existente = await Usuario.findOne({where: {email}});
    if (existente) throw new Error('Email Já Cadastrado');
    await Usuario.create({nome,email,telefone,senha});
} 

exports.buscarUsuarioEmaileSenha = async ({email, senha}) =>{
    const usuario = await Usuario.findOne({where: {email, senha}});
    if(!usuario)  throw new Error('Usuário Não encontrado, verifique suas credenciais');
    return usuario;
}
