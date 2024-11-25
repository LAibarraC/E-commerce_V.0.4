// services/categoryService.js
const { Op } = require('sequelize');
const CategoryRepository = require('../repository/categoryRepository');

class CategoryService {
    async getAllCategories() {
        return await CategoryRepository.findAll();
    }

    async createCategory(categoryData) {
        const category = {
            name: categoryData.name,
            description: categoryData.description,
            image: categoryData.image,
            updateAt: new Date().toISOString()
        };
        return await CategoryRepository.createCategory(category);
    }

    async editCategory(id, categoryData) {
        const category = {
            id: id,
            name: categoryData.name,
            description: categoryData.description,
            image: categoryData.image,
            updateAt: new Date().toISOString()
        };
        return await CategoryRepository.updateCategory(category);
    }

    async deleteCategory(id) {
        return await CategoryRepository.deleteCategory(id);
    }

    async getCategory(id) {
        return await CategoryRepository.findById(id);
    }

    async searchCategories(criteria) {
        try {
            const query = {};

            if (criteria.name) {
                query.name = { [Op.like]: `%${criteria.name}%` };
            }
            if (criteria.description) {
                query.description = { [Op.like]: `%${criteria.description}%` };
            }

            // Buscar categorías con los criterios proporcionados usando el repositorio
            const categories = await CategoryRepository.findAll({ where: query });
            return categories;
        } catch (err) {
            throw new Error('Error al buscar categorías: ' + err.message);
        }
    }
}

module.exports = new CategoryService();
