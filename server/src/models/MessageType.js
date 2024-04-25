const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MessageType extends Model {
        static associate(models) {
            MessageType.hasMany(models.Message, { foreignKey: 'type', as: 'messages' })
        }
    }

    MessageType.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MessageType',
        timestamps: true,
        tableName: 'message_types'
    });

    return MessageType;
};


