const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChatNotification extends Model {
        static associate(models) {
            //
        }
    }

    ChatNotification.init({
        text: DataTypes.STRING,
        chatId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ChatNotification',
        timestamps: true,
        tableName: 'chat_notifications'
    });

    return ChatNotification;
};


