const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Corregido el nombre del archivo

// Rutas para el carrito
router.post('/carts', cartController.createCart); // Crear un carrito
router.get('/carts/:userId', cartController.getCartByUserId); // Obtener un carrito por ID de usuario
router.put('/carts/item', cartController.updateCartItemQuantity); // Actualizar cantidad de ítem en el carrito
router.delete('/carts/:cartId/item/:productId', cartController.removeItemFromCart); // Eliminar un ítem del carrito
router.delete('/carts/:cartId', cartController.clearCart); // Limpiar el carrito
router.get('/carts/:cartId/total', cartController.calculateTotal); // Calcular el total del carrito
router.get('/totalitemscart/:idcart', cartController.getTotalItemsInCart);

module.exports = router;

