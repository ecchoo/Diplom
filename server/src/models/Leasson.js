const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Leasson extends Model {
        static associate(models) {
            // Leasson.hasMany(models.Lecture, { foreignKey: 'leassonId' })
            Leasson.belongsTo(models.Partition, { foreignKey: 'partitionId', as: 'partition' })
        }
    }

    Leasson.init({
        name: DataTypes.STRING,
        time: DataTypes.INTEGER,
        partitionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Leasson',
        timestamps: true,
        tableName: 'leassons'
    });

    return Leasson;
};


