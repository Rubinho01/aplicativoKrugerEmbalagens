module.exports = (sequelize, DataTypes) => {
    const Bairro = sequelize.define('Bairro', {
        nome : {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxa : {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });


    return Bairro;
};