const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserPracticalTask extends Model {
        static associate(models) {
            UserPracticalTask.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserPracticalTask.belongsTo(models.PracticalTask, { foreignKey: 'practicalTaskId', as: 'practicalTask' });
        }
    }

    UserPracticalTask.init({
        practicalTaskId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        filePath: DataTypes.STRING,
        mark: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserPracticalTask',
        timestamps: true,
        tableName: 'user_practical_tasks'
    });

    return UserPracticalTask;
};


