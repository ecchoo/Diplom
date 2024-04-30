const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserMessage extends Model {
        static associate(models) {
            UserMessage.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserMessage.belongsTo(models.Message, { foreignKey: 'messageId', as: 'message' });
        }
    }

    UserMessage.init({
        status: DataTypes.STRING,
        type: DataTypes.STRING,
        messageId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserMessage',
        timestamps: true,
        tableName: 'user_messages'
    });

    return UserMessage;
};


