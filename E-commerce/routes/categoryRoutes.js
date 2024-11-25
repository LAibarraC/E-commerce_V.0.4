const express = require('express');
const {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
    searchCategories
} = require('../controllers/categoryController');

const router = express.Router();

// Obtener todas las categorías
router.get('/categories', getAllCategories);

// Crear una nueva categoría
router.post('/categories', createCategory);

// Editar una categoría existente
router.put('/categories/:id', editCategory);

// Eliminar una categoría
router.delete('/categories/:id', deleteCategory);

// Obtener una categoría por ID
router.get('/categories/:id', getCategory);

// Buscar categorías por criterio
router.get('/categories/search', searchCategories);

module.exports = router;
 
