const cartService = require('../services/cartService');
const Joi = require('joi');

class CartController {
    static cartSchema = Joi.object({
        userId: Joi.number().required(),
    });

    async createCart(req, res) {
        try {
            const userId = req.body.userId;
            if (!userId) {
                return res.status(400).json({ success: false, message: 'El id del usuario es requerido' });
            }

            const cartId = await cartService.createCart(userId);
            res.status(201).json({ success: true, id: cartId, message: 'Carrito creado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getCartByUserId(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId) {
                return res.status(400).json({ success: false, message: 'El id del usuario es requerido' });
            }

            const cart = await cartService.getCartByUserId(userId);
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Carrito no encontrado para este usuario' });
            }

            res.json({ success: true, cart });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async addItemToCart(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;
            if (!cartId || !productId || !quantity) {
                return res.status(400).json({ success: false, message: 'Se deben proporcionar cartId, productId y quantity' });
            }

            const cartItemId = await cartService.addItemToCart(cartId, { productId, quantity });
            res.status(201).json({ success: true, id: cartItemId, message: 'Ítem agregado al carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async removeItemFromCart(req, res) {
        try {
            const { cartId, productId } = req.params;
            if (!cartId || !productId) {
                return res.status(400).json({ success: false, message: 'Se deben proporcionar cartId y productId' });
            }

            await cartService.removeItemFromCart(cartId, productId);
            res.json({ success: true, message: 'Ítem eliminado exitosamente del carrito' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cartId;
            if (!cartId) {
                return res.status(400).json({ success: false, message: 'Se debe proporcionar un id de carrito' });
            }

            await cartService.clearCart(cartId);
            res.json({ success: true, message: 'Carrito limpiado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateCartItemQuantity(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;
            if (!cartId || !productId || !quantity) {
                return res.status(400).json({ success: false, message: 'Se deben proporcionar cartId, productId y quantity' });
            }

            await cartService.updateCartItemQuantity(cartId, productId, quantity);
            res.json({ success: true, message: 'Cantidad del ítem actualizada exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async calculateTotal(req, res) {
        try {
            const cartId = req.params.cartId;
            if (!cartId) {
                return res.status(400).json({ success: false, message: 'Se debe proporcionar el id del carrito' });
            }

            const total = await cartService.calculateCartTotal(cartId);
            res.json({ success: true, total });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getTotalItemsInCart(req, res) {
        const cartId = req.params.idcart;

        if (!cartId) {
            return res.status(400).json({ message: 'Se debe proporcionar un id de carrito' });
        }

        try {
            const itemCount = await cartService.countItemsInCart(cartId);
            res.status(200).json({ totalItems: itemCount });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el total de ítems en el carrito: ' + error.message });
        }
    }
}

module.exports = new CartController();

