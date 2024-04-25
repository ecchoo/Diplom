const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserChat extends Model {
        static associate(models) {
            UserChat.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserChat.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
        }
    }

    UserChat.init({
        chatId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'UserChat',
        timestamps: true,
        tableName: 'user_chats'
    });

    return UserChat;
};


