const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        static associate(models) {
            Teacher.belongsToMany(models.Course, {
                through: 'TeacherCourse',
                foreignKey: 'teacherId',
                otherKey: 'courseId',
                as: 'courses'
            })
            Teacher.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        }
    }

    Teacher.init({
       userId: DataTypes.INTEGER,
       bio: DataTypes.STRING,
       yearsExperience: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Teacher',
        timestamps: true,
        tableName: 'teachers'
    });

    return Teacher;
};


