const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserCourse extends Model {
        static associate(models) {
            //
        }
    }

    UserCourse.init({
        courseId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'UserCourse',
        timestamps: true,
        tableName: 'user_courses'
    });

    return UserCourse;
};


