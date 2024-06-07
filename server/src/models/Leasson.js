const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Leasson extends Model {
        static associate(models) {
            Leasson.hasMany(models.PracticalTask, { foreignKey: 'leassonId', as: 'practicalTasks' })
            Leasson.belongsTo(models.Partition, { foreignKey: 'partitionId', as: 'partition' })
        }
    }

    Leasson.init({
        name: DataTypes.STRING,
        time: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        partitionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Leasson',
        timestamps: true,
        tableName: 'leassons'
    });

    return Leasson;
};


