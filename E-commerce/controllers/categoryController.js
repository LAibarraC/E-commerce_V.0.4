const Category = require('../models/category');
const categoryService = require('../services/categoryService');

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } 
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            // Enviar tanto el ID como el nombre de las categorías
            const categoryData = categories.map(category => ({
                id: category.id,
                name: category.name,
                image: category.image,
                updatedAt: category.updatedAt
            }));
            res.json(categoryData); // Enviar el array con objetos {id, name}
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    

    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const categoryId = await categoryService.createCategory(categoryData);
            res.json({ message: 'Categoría creada exitosamente', categoryId });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async editCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const categoryData = req.body;
            await categoryService.editCategory(categoryId, categoryData);
            res.json({ message: 'Categoría actualizada exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id;
            await categoryService.deleteCategory(categoryId);
            res.json({ message: 'Categoría eliminada exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await categoryService.getCategory(categoryId);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ message: 'Categoría no encontrada' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async searchCategories(req, res) {
        try {
            // Obtener los filtros desde la query string
            const { name, description } = req.query;
            const criteria = {};

            if (name) criteria.name = name;
            if (description) criteria.description = description;

            // Buscar categorías con los filtros proporcionados
            const categories = await categoryService.searchCategories(criteria);
            if (categories.length > 0) {
                res.json(categories);
            } else {
                res.status(404).json({ message: 'Categoría no encontrada' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new CategoryController();

