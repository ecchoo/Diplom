const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LockedUser extends Model {
        static associate(models) {
            LockedUser.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            LockedUser.belongsTo(models.User, { foreignKey: 'moderatorId', as: 'moderator' });
        }
    }

    LockedUser.init({
        reason: DataTypes.STRING,
        duration: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        moderatorId: DataTypes.INTEGER,
        chatId: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'LockedUser',
        timestamps: true,
        tableName: 'locked_users',
    });

    return LockedUser;
};


