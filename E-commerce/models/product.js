const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thumbnail: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    image1: {  // Campo para la primera imagen
        type: DataTypes.STRING,
        allowNull: true
    },
    color1: { // Color asociado a image1
        type: DataTypes.STRING,
        allowNull: true
    },
    image2: {  // Campo para la segunda imagen
        type: DataTypes.STRING,
        allowNull: true
    },
    color2: { // Color asociado a image2
        type: DataTypes.STRING,
        allowNull: true
    },
    image3: {  // Campo para la tercera imagen
        type: DataTypes.STRING,
        allowNull: true
    },
    color3: { // Color asociado a image3
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    warranty: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    categoryId: { // Campo para la relación con categoría
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true // Para tener createdAt y updatedAt automáticos
});

module.exports = Product;


