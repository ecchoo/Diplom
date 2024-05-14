const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CourseChat extends Model {
        static associate(models) {
            CourseChat.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
            CourseChat.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
        }
    }

    CourseChat.init({
        chatId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'CourseChat',
        timestamps: true,
        tableName: 'course_chats'
    });

    return CourseChat;
};


