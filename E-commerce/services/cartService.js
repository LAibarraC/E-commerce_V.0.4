const CartRepository = require('../repository/cartRepository');
const UserRepository = require('../repository/userRepository');

class CartService {
    async createCart(userId) {
        try {
            // Verificar si el usuario existe
            const user = await UserRepository.findById(userId);

            if (!user) {
                throw new Error('El usuario con el id proporcionado no existe');
            }

            // Crear el carrito
            const cartId = await CartRepository.createCart(userId);
            return cartId;  // Devuelve el ID del carrito creado
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    async getCartByUserId(userId) {
        if (!userId) {
            throw new Error('Se debe proporcionar un id de usuario');
        }

        const cart = await CartRepository.findByUserId(userId);

        if (!cart) {
            throw new Error('Carrito no encontrado para este usuario');
        }

        return cart;
    }

    async addItemToCart(cartId, cartItemData) {
        if (!cartId || !cartItemData) {
            throw new Error('Se deben proporcionar el id del carrito y los datos del ítem');
        }

        try {
            const existingItem = await CartRepository.findItemByCartAndProduct(cartId, cartItemData.productId);

            if (existingItem) {
                // Si el producto ya existe, actualiza la cantidad
                const newQuantity = existingItem.quantity + cartItemData.quantity;
                return await CartRepository.updateCartItemQuantity(cartId, cartItemData.productId, newQuantity);
            } else {
                // Si no existe, lo agrega
                return await CartRepository.addItemToCart(cartId, cartItemData);
            }
        } catch (error) {
            throw new Error('Error al agregar el producto al carrito: ' + error.message);
        }
    }

    async removeItemFromCart(cartId, productId) {
        if (!cartId || !productId) {
            throw new Error('Se deben proporcionar el id del carrito y el id del producto');
        }

        try {
            await CartRepository.removeItemFromCart(cartId, productId);
        } catch (error) {
            throw new Error('Error al eliminar el producto del carrito: ' + error.message);
        }
    }

    async clearCart(cartId) {
        if (!cartId) {
            throw new Error('Se debe proporcionar un id de carrito');
        }

        try {
            await CartRepository.clearCart(cartId);
        } catch (error) {
            throw new Error('Error al vaciar el carrito: ' + error.message);
        }
    }

    async updateCartItemQuantity(cartId, productId, quantity) {
        if (!cartId || !productId || quantity === undefined) {
            throw new Error('Se deben proporcionar el id del carrito, el id del producto y la cantidad');
        }

        try {
            await CartRepository.updateCartItemQuantity(cartId, productId, quantity);
        } catch (error) {
            throw new Error('Error al actualizar la cantidad del producto en el carrito: ' + error.message);
        }
    }

    async calculateCartTotal(cartId) {
        if (!cartId) {
            throw new Error('Se debe proporcionar un id de carrito');
        }

        try {
            const cartItems = await CartRepository.getCartItems(cartId);

            const total = cartItems.reduce((sum, item) => {
                return sum + item.product.price * item.quantity; // Suponiendo que el precio está relacionado al producto
            }, 0);

            return total;
        } catch (error) {
            throw new Error('Error al calcular el total del carrito: ' + error.message);
        }
    }


    async countItemsInCart(cartId) {
        try {
            const itemCount = await CartRepository.countItemsInCart(cartId);
            return itemCount;
        } catch (error) {
            throw new Error('Error al contar los ítems en el carrito: ' + error.message);
        }
    }
}

module.exports = new CartService();
