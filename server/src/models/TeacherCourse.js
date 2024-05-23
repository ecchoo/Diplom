const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TeacherCourse extends Model {
        static associate(models) {
            TeacherCourse.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });
            TeacherCourse.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
        }
    }

    TeacherCourse.init({
        courseId: DataTypes.INTEGER,
        teacherId: DataTypes.INTEGER,
        isAuthor: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'TeacherCourse',
        timestamps: true,
        tableName: 'teacher_courses'
    });

    return TeacherCourse;
};


