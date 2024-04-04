const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            //
        }
    }

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        tableName: 'users'
    });

    return User;
};


