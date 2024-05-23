const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FieldStudyTeacher extends Model {
        static associate(models) {

        }
    }

    FieldStudyTeacher.init({
        teacherId: DataTypes.INTEGER,
        fieldStudyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'FieldStudyTeacher',
        timestamps: true,
        tableName: 'fields_study_teachers'
    });

    return FieldStudyTeacher;
};


