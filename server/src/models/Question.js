const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        static associate(models) {
            // Define association here
            Question.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
            Question.hasMany(models.Answer, { foreignKey: 'questionId', as: 'answers' })
        }
    }

    Question.init({
        questionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        testId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Question',
        timestamps: true,
        tableName: 'questions'
    });

    return Question;
};
