const Category = require('../models/category');

class CategoryRepository {
    async findAll() {
        try {
            return await Category.findAll(); // Correcto
        } catch (error) {
            throw new Error('Error al obtener todas las categorías: ' + error.message);
        }
    }

    async createCategory(category) {
        try {
            const createdCategory = await Category.create({
                name: category.name,
                description: category.description,
                image: category.image,
                updateAt: category.updateAt
            });
            return createdCategory.id; // Correcto
        } catch (error) {
            throw new Error('Error al crear categoría: ' + error.message);
        }
    }

    async updateCategory(category) { 
        try {
            await Category.update({
                name: category.name,
                description: category.description,
                image: category.image,
                updateAt: category.updateAt
            }, {
                where: { id: category.id }
            });
        } catch (error) {
            throw new Error('Error al actualizar la categoría: ' + error.message);
        }
    }

    async deleteCategory(id) {
        try {
            await Category.destroy({
                where: { id: id }
            });
        } catch (error) {
            throw new Error('Error al eliminar la categoría: ' + error.message);
        }
    }

    async findById(id) {
        try {
            return await Category.findByPk(id); // Correcto
        } catch (error) {
            throw new Error('Error al obtener la categoría por ID: ' + error.message);
        }
    }
    
    async searchCategories(criteria) {
        // Utilizar el modelo Sequelize para buscar categorías según los criterios
        return await Category.findAll({
            where: criteria
        });
    }
}

module.exports = new CategoryRepository();



