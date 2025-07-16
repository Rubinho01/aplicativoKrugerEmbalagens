module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('produto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
    foto1: {
      type: DataTypes.STRING
    },
    foto2: {
      type: DataTypes.STRING
    },
    foto3: {
      type: DataTypes.STRING
    }
  });

  return Produto;
};