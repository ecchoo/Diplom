const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Test extends Model {
        static associate(models) {
            Test.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
            Test.hasMany(models.Question, { foreignKey: 'testId', as: 'questions' })
        }
    }

    Test.init({
        name: DataTypes.STRING,
        courseId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Test',
        timestamps: true,
        tableName: 'tests'
    });

    return Test;
};
