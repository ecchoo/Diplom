const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Leasson extends Model {
        static associate(models) {
            Leasson.hasOne(models.Lecture, { foreignKey: 'leassonId' })
        }
    }

    Leasson.init({
        name: DataTypes.STRING,
        partitionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Leasson',
        timestamps: true,
        tableName: 'leassons'
    });

    return Leasson;
};


