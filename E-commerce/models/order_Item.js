const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Order = require('./order');  // Asegúrate de importar el modelo de Order
const Product = require('./product');  // Asegúrate de importar el modelo de Product

class OrderItem extends Model {}

OrderItem.init({
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Relación con el modelo Product
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false
});

module.exports = OrderItem;
