const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserAnswer extends Model {
        static associate(models) {
            UserAnswer.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserAnswer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
            UserAnswer.belongsTo(models.Answer, { foreignKey: 'answerId', as: 'answer' });
        }
    }

    UserAnswer.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answerId: {
            type: DataTypes.INTEGER,
        },
        userTestId: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'UserAnswer',
        timestamps: true,
        tableName: 'user_answers'
    });

    return UserAnswer;
};
