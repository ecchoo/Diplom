const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Module extends Model {
        static associate(models) {
            Module.hasMany(models.Partition, { foreignKey: 'moduleId' })
        }
    }

    Module.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Module',
        timestamps: true,
        tableName: 'modules'
    });

    return Module;
};


