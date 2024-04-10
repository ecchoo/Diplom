const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lecture extends Model {
        static associate(models) {
            Lecture.belongsTo(models.Leasson, { foreignKey: 'leassonId' })
        }
    }

    Lecture.init({
        theme: DataTypes.STRING,
        readingTime: DataTypes.INTEGER,
        material: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lecture',
        timestamps: true,
        tableName: 'lectures'
    });

    return Lecture;
};


