const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsToMany(models.User, {
                through: 'UserMessage',
                foreignKey: 'messageId',
                otherKey: 'userId',
            })
        }
    }

    Message.init({
        text: DataTypes.STRING,
        chatId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Message',
        timestamps: true,
        tableName: 'messages'
    });

    return Message;
};


