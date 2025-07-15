module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    situacao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ATIVO'
    },
    foto1: DataTypes.STRING,
    foto2: DataTypes.STRING,
    foto3: DataTypes.STRING
  });

  return Produto;
};
