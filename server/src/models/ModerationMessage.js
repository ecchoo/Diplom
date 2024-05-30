const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ModerationMessage extends Model {
        static associate(models) {
            ModerationMessage.belongsTo(models.User, { foreignKey: 'moderatorId', as: 'moderator' });
            ModerationMessage.belongsTo(models.Message, { foreignKey: 'messageId', as: 'message' });
        }
    }

    ModerationMessage.init({
        messageId: DataTypes.INTEGER,
        moderatorId: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ModerationMessage',
        timestamps: true,
        tableName: 'moderation_messages'
    });

    return ModerationMessage;
};


