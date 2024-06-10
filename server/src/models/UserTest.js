const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserTest extends Model {
        static associate(models) {
            UserTest.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            UserTest.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
        }
    }

    UserTest.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'UserTest',
        timestamps: true,
        tableName: 'user_tests'
    });

    return UserTest;
};
