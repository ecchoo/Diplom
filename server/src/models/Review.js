const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
            Review.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' })
        }
    }

    Review.init({
       userId: DataTypes.INTEGER,
       courseId: DataTypes.INTEGER,
       text: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Review',
        timestamps: true,
        tableName: 'reviews'
    });

    return Review;
};


