const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            Course.hasMany(models.Module, { foreignKey: 'courseId', as: 'modules' })
            Course.belongsToMany(models.User, {
                through: 'CourseTeacher',
                foreignKey: 'courseId',
                otherKey: 'teacherId',
                as: 'courseTeachers'
            })
        }
    }

    Course.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Course',
        timestamps: true,
        tableName: 'courses'
    });

    return Course;
};


