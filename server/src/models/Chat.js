const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        static associate(models) {
            Chat.belongsToMany(models.User, {
                through: 'UserChat',
                foreignKey: 'chatId',
                otherKey: 'userId',
                as: 'chatUsers'
            })
            Chat.hasMany(models.LockedUser, { foreignKey: 'chatId', as: 'lockedUsers' })
            Chat.hasMany(models.Message, { foreignKey: 'chatId', as: 'messages' })
            Chat.hasMany(models.ChatNotification, { foreignKey: 'chatId', as: 'notifications' })
        }
    }

    Chat.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        logo: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Chat',
        timestamps: true,
        tableName: 'chats'
    });

    return Chat;
};


