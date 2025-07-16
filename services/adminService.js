const adminModel = require('../models/admin');

exports.buscarAdmin = async ({nome, senha}) => {
    const admin = await adminModel.findOne({where : {nome}});
    if(!admin) throw new Error("Administrador não Encontrado");
    if(admin.senha != senha) throw new Error("Senha Incorreta");
    return admin;
    
    
    
}