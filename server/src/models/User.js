const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' })
            User.belongsToMany(models.Course, {
                through: 'UserCourse',
                foreignKey: 'userId',
                otherKey: 'courseId',
                as: 'courseUsers'
            })
            User.belongsToMany(models.Chat, {
                through: 'UserChat',
                foreignKey: 'userId',
                otherKey: 'chatId',
                as: 'userChats'
            })
            User.belongsToMany(models.Message, {
                through: 'UserMessage',
                foreignKey: 'userId',
                otherKey: 'messageId',
                as: 'userMessages'
            })
            User.hasOne(models.LockedUser, { foreignKey: 'userId', as: 'locked' })
        }
    }

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING,
        photo: DataTypes.STRING,
        verified: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        tableName: 'users'
    });

    return User;
};


