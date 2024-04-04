const { Model } = require('sequelize');

Leasson.exports = (sequelize, DataTypes) => {
    class Leasson extends Model {
        static associate(models) {
            Leasson.hasOne(models.Lecture, { foreignKey: 'leassonId' })
        }
    }

    Leasson.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Leasson',
        timestamps: true,
        tableName: 'leassons'
    });

    return Leasson;
};


