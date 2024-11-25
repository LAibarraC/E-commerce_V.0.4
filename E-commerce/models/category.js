const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Product = require('./product'); // Importar el modelo de Producto para la relación

class Category extends Model {
    // Método para actualizar la información de la categoría
    updateCategory(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.updateAt = new Date();
    } 
}
 
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize, 
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true // Para tener createdAt y updatedAt automáticos
});

// Relación uno a muchos: Una categoría puede tener muchos productos
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Category;

