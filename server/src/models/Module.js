const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Module extends Model {
        static associate(models) {
            Module.hasMany(models.Partition, { foreignKey: 'moduleId', as: 'partitions' })
            Module.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' })
        }
    }

    Module.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        courseId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Module',
        timestamps: true,
        tableName: 'modules'
    });

    return Module;
};


