const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChatType extends Model {
        static associate(models) {
            ChatType.hasMany(models.Chat, { foreignKey: 'type', as: 'chats' })
        }
    }

    ChatType.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ChatType',
        timestamps: true,
        tableName: 'chat_types'
    });

    return ChatType;
};


