const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Cart = require('./cart'); // Importa Cart
const Product = require('./product'); // Importa Product

class CartItem extends Model {}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cart', // Evita dependencia circular con Cart
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartitem',
    timestamps: false
});

// Relaciones
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId' });

module.exports = CartItem;

