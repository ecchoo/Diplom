const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Course, {
                through: 'UserCourse',
                foreignKey: 'userId',
                otherKey: 'courseId',
            })
            User.belongsToMany(models.Chat, {
                through: 'UserChat',
                foreignKey: 'userId',
                otherKey: 'chatId',
                as: 'userChats'
            })
            User.hasMany(models.Message, { foreignKey: 'userId' })
        }
    }

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        tableName: 'users'
    });

    return User;
};


