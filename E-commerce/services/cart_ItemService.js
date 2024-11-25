const CartItemRepository = require('../repository/cartItemRepository');

class CartItemService {
    async getCartItems(id) {
        if (!id) {
            throw new Error('Se debe proporcionar un id del ítem del carrito');
        }

        const cartItem = await CartItemRepository.findById(id);

        if (!cartItem) {
            throw new Error('Ítem del carrito no encontrado');
        }

        return cartItem;
    }

    async createCartItem(cartItemData) {
        if (!cartItemData) {
            throw new Error('Se deben proporcionar los datos del ítem del carrito');
        }

        return await CartItemRepository.createCartItem(cartItemData);
    }

    async updateCartItem(id, cartItemData) {
        if (!id || !cartItemData) {
            throw new Error('Se deben proporcionar el id del ítem y los datos actualizados');
        }

        const cartItem = await CartItemRepository.findById(id);

        if (!cartItem) {
            throw new Error('Ítem del carrito no encontrado para actualizar');
        }

        await CartItemRepository.updateCartItem({ id, ...cartItemData });
    }

    async deleteCartItem(id) {
        if (!id) {
            throw new Error('Se debe proporcionar un id del ítem del carrito');
        }

        await CartItemRepository.deleteCartItem(id);
    }

    async calculateCartItemSubtotal(cartItemId) {
        if (!cartItemId) {
            throw new Error('Se debe proporcionar un id del ítem del carrito');
        }

        return await CartItemRepository.calculateSubtotal(cartItemId);
    }
}

module.exports = new CartItemService();
