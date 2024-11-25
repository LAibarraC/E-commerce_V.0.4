const Cart = require('../models/cart');
const CartItem = require('../models/cartitem');

class CartRepository {
    static async createCart(userId) {
        try {
            const newCart = await Cart.create({ userId });
            return newCart.id;  // Devuelve el ID del carrito creado
        } catch (error) {
            throw new Error('Error al crear el carrito en la base de datos: ' + error.message);
        }
    }
    

    static async findByUserId(userId) {
        return await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem }], // Incluye los ítems del carrito
        });
    }

    static async addItemToCart(cartId, cartItem) {
        const newItem = await CartItem.create({
            cartId,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
        });
        return newItem.id;
    }

    static async removeItemFromCart(cartId, productId) {
        await CartItem.destroy({
            where: {
                cartId,
                productId,
            },
        });
    }

    static async clearCart(cartId) {
        await CartItem.destroy({
            where: { cartId },
        });
    }

    static async updateCartItemQuantity(cartId, productId, quantity) {
        await CartItem.update(
            { quantity },
            {
                where: {
                    cartId,
                    productId,
                },
            }
        );
    }

    static async calculateCartTotal(cartId) {
        const cartItems = await CartItem.findAll({
            where: { cartId },
            include: ['product'], // Asegúrate de definir la relación con `Product` en el modelo.
        });

        const total = cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.product.price;
        }, 0);

        return total;
    }

    static async countItemsInCart(cartId) {
        try {
            const cartItems = await CartItem.count({
                where: { cartId }
            });
            return cartItems;
        } catch (error) {
            throw new Error('Error al contar los ítems en el carrito: ' + error.message);
        }
    }
}

module.exports = CartRepository;
