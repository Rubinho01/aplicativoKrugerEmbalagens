module.exports = (sequelize, DataTypes) => {
    const Bairro = sequelize.define('Bairro', {
        nome : {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxa : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });


    return Bairro;
};