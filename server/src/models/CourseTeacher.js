const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CourseTeacher extends Model {
        static associate(models) {
            //
        }
    }

    CourseTeacher.init({
        courseId: DataTypes.INTEGER,
        teacherId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'CourseTeacher',
        timestamps: true,
        tableName: 'courseTeachers'
    });

    return CourseTeacher;
};


