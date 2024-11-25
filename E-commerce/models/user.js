const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // Conexión de Sequelize
    modelName: 'User', // Nombre del modelo
    tableName: 'user', // Nombre de la tabla
    timestamps: false // Desactivar timestamps automáticos de Sequelize
});

module.exports = User;



