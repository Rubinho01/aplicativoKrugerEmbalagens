module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define('ItemPedido', {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return ItemPedido;
};
