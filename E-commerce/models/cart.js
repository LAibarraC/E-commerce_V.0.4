const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Cart extends Model {}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // Evita importar directamente el modelo User
            key: 'id'
        }
    }
}, {
    sequelize, 
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: false
});

module.exports = Cart;


