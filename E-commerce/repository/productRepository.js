const Product = require('../models/product');
const { Op } = require('sequelize');

class ProductRepository {
    static async createProduct(product) {
        const newProduct = await Product.create(product);
        return newProduct.id;
    }

    static async findAllProducts() {
        return await Product.findAll();
    }

    static async findById(id) {
        return await Product.findByPk(id);
    }

    static async updateProduct(product) {
        await Product.update(product, {
            where: { id: product.id }
        });
    }

    static async deleteProduct(id) {
        await Product.destroy({ where: { id } });
    }

    static async searchProducts(query) {
        return await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { brand: { [Op.like]: `%${query}%` } },
                    { model: { [Op.like]: `%${query}%` } }
                ]
            }
        });
    }

    static async findProductsByCategory(categoryId) {
        return await Product.findAll({ where: { categoryId } });
    }

    static async findFeaturedProducts() {
        const products = await Product.findAll({
            where: {
                rating: {
                    [Op.gte]: 3.5
                }
            }
        });

        return products;
    }

    static async findSimilarProducts(productId) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return [];
            }

            // Definir el rango de precio (entre -10 y +20 del precio del producto actual)
            const minPrice = product.price - 10;
            const maxPrice = product.price + 20;

            // Buscar productos similares basados en marca, modelo, categoría, descuento, valoración y rango de precio
            const similarProducts = await Product.findAll({
                where: {
                    [Op.and]: [
                        { categoryId: product.categoryId },  // Mismo categoría
                        { brand: product.brand },  // Mismo marca
                        { model: product.model },  // Mismo modelo
                        { discount: product.discount },  // Mismo descuento
                        { rating: { [Op.gte]: product.rating } },  // Valoración similar o mayor
                        { price: { [Op.between]: [minPrice, maxPrice] } }  // Precio dentro del rango
                    ],
                    id: { [Op.ne]: productId }  // Asegurar que el producto actual no se incluya
                }
            });

            return similarProducts;
        } catch (error) {
            console.error("Error al obtener productos similares:", error);
            throw new Error("No se pudieron obtener productos similares.");
        }
    }


    static async searchProductMaxmin(query, precioMin, precioMax) {
        const whereConditions = {
            [Op.or]: [
                { name: { [Op.like]: `%${query}%` } },
                { brand: { [Op.like]: `%${query}%` } },
                { model: { [Op.like]: `%${query}%` } }
            ]
        };
        if (precioMin) {
            whereConditions.price = {
                [Op.gte]: precioMin  
            };
        }
        if (precioMax) {
            if (!whereConditions.price) whereConditions.price = {}; 
            whereConditions.price[Op.lte] = precioMax;  
        }

        return await Product.findAll({
            where: whereConditions,
            order: [['price', 'ASC']]  
        });
    }

    // Buscador de los productos más nuevos (ordenados por fecha de creación)
    static async searchNewArrivals(query) {
        return await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { brand: { [Op.like]: `%${query}%` } },
                    { model: { [Op.like]: `%${query}%` } }
                ]
            },
            order: [['createdAt', 'DESC']] 
        });
    }

    // Buscador de los productos más populares (ordenados por valoración de mayor a menor)
    static async searchPopularProducts(query) {
        return await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { brand: { [Op.like]: `%${query}%` } },
                    { model: { [Op.like]: `%${query}%` } }
                ]
            },
            order: [['rating', 'DESC']]  // Ordenar por valoración de mayor a menor
        });
    }
}


module.exports = ProductRepository;
