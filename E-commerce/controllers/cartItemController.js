const cartItemService = require('../services/cart_ItemService');
const Joi = require('joi');

class CartItemController {
    static cartItemSchema = Joi.object({
        cartId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
    });

    // Agregar un ítem al carrito
    async addItem(req, res) {
        try {
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            const cartItemId = await cartItemService.createCartItem(itemData); // Asegúrate de que 'createCartItem' esté en el servicio
            res.status(201).json({ success: true, id: cartItemId, message: 'Item añadido al carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // Obtener todos los ítems de un carrito
    async getCartItems(req, res) {
        try {
            const cartId = req.params.cartId;
            const items = await cartItemService.getCartItems(cartId); // Asegúrate de que 'getCartItems' esté implementado en el servicio
            res.json({ success: true, items });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // Actualizar un ítem del carrito
    async updateItem(req, res) {
        try {
            const cartItemId = req.params.id;
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            await cartItemService.updateCartItem(cartItemId, itemData); // Asegúrate de que 'updateCartItem' esté implementado en el servicio
            res.json({ success: true, message: 'Item actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // Eliminar un ítem del carrito
    async removeItem(req, res) {
        try {
            const cartItemId = req.params.id;
            await cartItemService.deleteCartItem(cartItemId); // 'deleteCartItem' debe coincidir con el método del servicio
            res.json({ success: true, message: 'Item eliminado del carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

module.exports = new CartItemController();
