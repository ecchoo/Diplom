const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Partition extends Model {
        static associate(models) {
            Partition.hasMany(models.Leasson, { foreignKey: 'partitionId', as: 'leassons' })
        }
    }

    Partition.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        moduleId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Partition',
        timestamps: true,
        tableName: 'partitions'
    });

    return Partition;
};


