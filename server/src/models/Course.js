const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            Course.hasMany(models.Module, { foreignKey: 'courseId', as: 'modules' })
            Course.hasMany(models.Review, { foreignKey: 'courseId', as: 'reviews' })
            Course.belongsToMany(models.User, {
                through: 'UserCourse',
                foreignKey: 'courseId',
                otherKey: 'userId',
                as: 'courseUsers'
            })
            Course.belongsToMany(models.Teacher, {
                through: 'TeacherCourse',
                foreignKey: 'courseId',
                otherKey: 'teacherId',
                as: 'teachers'
            })
        }
    }

    Course.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        logo: DataTypes.STRING,
        difficultyLevel: DataTypes.STRING,
        fieldStudy: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course',
        timestamps: true,
        tableName: 'courses',
        hooks: {

        }
    });

    return Course;
};


