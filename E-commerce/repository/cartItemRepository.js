const CartItem = require('../models/cartitem');
const Product = require('../models/product'); // Importar el modelo Product

class CartItemRepository {
    static async findById(cartId) {
        return await CartItem.findAll({
            where: { cartId },  // Filtrar por cartId
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'description','image1','categoryId']  // Especifica solo los atributos que necesitas del Producto
            }],
        });
    }
    
    static async createCartItem(cartItem) {
        try {
            const newCartItem = await CartItem.create(cartItem);
            return newCartItem.id;
        } catch (error) {
            throw new Error('Error al crear el cart item: ' + error.message);
        }
    }

    static async updateCartItem(cartItem) {
        try {
            await CartItem.update(
                { quantity: cartItem.quantity },
                {
                    where: { id: cartItem.id },
                }
            );
        } catch (error) {
            throw new Error('Error al actualizar el cart item: ' + error.message);
        }
    }

    static async deleteCartItem(id) {
        try {
            await CartItem.destroy({ where: { id } });
        } catch (error) {
            throw new Error('Error al eliminar el cart item: ' + error.message);
        }
    }

    static async calculateSubtotal(cartItemId) {
        try {
            const cartItem = await CartItem.findByPk(cartItemId, {
                include: [Product], // Asegúrate de incluir el modelo Product
            });

            if (!cartItem) {
                throw new Error('CartItem no encontrado.');
            }

            return cartItem.quantity * cartItem.product.price;
        } catch (error) {
            throw new Error('Error al calcular el subtotal: ' + error.message);
        }
    }
}

module.exports = CartItemRepository;

