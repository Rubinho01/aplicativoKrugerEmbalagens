module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PENDENTE'
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });

  return Pedido;
};
