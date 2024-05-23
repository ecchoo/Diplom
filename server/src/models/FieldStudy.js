const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FieldStudy extends Model {
        static associate(models) {
            
        }
    }

    FieldStudy.init({
       name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'FieldStudy',
        timestamps: true,
        tableName: 'fields_study'
    });

    return FieldStudy;
};


