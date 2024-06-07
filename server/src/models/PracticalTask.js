const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PracticalTask extends Model {
        static associate(models) {
            PracticalTask.belongsTo(models.Partition, { foreignKey: 'leassonId', as: 'leasson' })
            PracticalTask.belongsToMany(models.User, {
                through: 'UserPracticalTask',
                foreignKey: 'practicalTaskId',
                otherKey: 'userId',
                as: 'practicalTaskUsers'
            })
        }
    }

    PracticalTask.init({
        condition: DataTypes.STRING,
        leassonId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'PracticalTask',
        timestamps: true,
        tableName: 'practical_tasks'
    });

    return PracticalTask;
};