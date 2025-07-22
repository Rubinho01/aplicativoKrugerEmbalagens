module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        cep: {
            type : DataTypes.STRING,
            allowNull : false
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: true,
        }
  });
  return Endereco;
};
