const { Model } = require('sequelize');

Partition.exports = (sequelize, DataTypes) => {
    class Partition extends Model {
        static associate(models) {
            Partition.hasMany(models.Leasson, { foreignKey: 'partitionId' })
        }
    }

    Partition.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Partition',
        timestamps: true,
        tableName: 'partitions'
    });

    return Partition;
};


