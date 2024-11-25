const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Order = require('./order');  // Asegúrate de importar el modelo de Order

class Payment extends Model {}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order, // Relación con el modelo Order
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: false
});

module.exports = Payment;
