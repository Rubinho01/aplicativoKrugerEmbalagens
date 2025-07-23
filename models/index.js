const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = require('../config/database');


const Usuario = require('./Usuario')(sequelize, DataTypes);
const Produto = require('./produto')(sequelize, DataTypes);
const Pedido = require('./pedido')(sequelize, DataTypes);
const ItemPedido = require('./itemPedido')(sequelize, DataTypes);
const Endereco = require('./Endereco')(sequelize, DataTypes);
const Bairro = require('./bairro')(sequelize, DataTypes);
// Associações
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.hasMany(ItemPedido, { as: 'itens', foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Produto.hasMany(ItemPedido, { foreignKey: 'produtoId' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produtoId' });

Pedido.belongsTo(Endereco, { foreignKey: 'enderecoId', as: 'endereco', onDelete: 'CASCADE' });
Endereco.hasOne(Pedido, { foreignKey: 'enderecoId', as: 'pedido' });

module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Produto,
  Pedido,
  ItemPedido,
  Endereco,
  Bairro
};
