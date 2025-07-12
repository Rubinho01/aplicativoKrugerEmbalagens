const Usuario = require('../models/Usuario');
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
