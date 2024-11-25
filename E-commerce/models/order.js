const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./user');  // Asegúrate de importar el modelo de User

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Relación con el modelo User
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
