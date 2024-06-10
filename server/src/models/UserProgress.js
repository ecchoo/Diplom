const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserProgress extends Model {
        static associate(models) {
            UserProgress.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserProgress.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
            UserProgress.belongsTo(models.Leasson, { foreignKey: 'currentLeassonId', as: 'currentLeasson' });
            UserProgress.belongsTo(models.PracticalTask, { foreignKey: 'currentPracticalTaskId', as: 'currentPracticalTask' });
        }
    }

    UserProgress.init({
        userId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
        currentLeassonId: DataTypes.INTEGER,
        currentPracticalTaskId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserProgress',
        timestamps: true,
        tableName: 'user_progress'
    });

    return UserProgress;
};


