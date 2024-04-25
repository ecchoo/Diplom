const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
        }
    }

    Message.init({
        text: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        chatId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Message',
        timestamps: true,
        tableName: 'messages'
    });

    return Message;
};


