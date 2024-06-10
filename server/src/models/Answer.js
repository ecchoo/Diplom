const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        static associate(models) {
            Answer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
        }
    }

    Answer.init({
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        answerText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Answer',
        timestamps: true,
        tableName: 'answers'
    });

    return Answer; 
};
