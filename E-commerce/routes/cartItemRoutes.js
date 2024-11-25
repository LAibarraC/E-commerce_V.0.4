const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController'); // Asegúrate de que el nombre del archivo sea correcto (cartItemController.js)

// Rutas para los ítems del carrito
router.post('/cart-items', cartItemController.addItem); // Añadir un item al carrito
router.get('/cart-items/:cartId', cartItemController.getCartItems); // Obtener todos los items de un carrito
router.put('/cart-items/:id', cartItemController.updateItem); // Actualizar un item del carrito
router.delete('/cart-items/:id', cartItemController.removeItem); // Eliminar un item del carrito

module.exports = router;
 
