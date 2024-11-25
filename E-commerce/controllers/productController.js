// controllers/productController.js
const productService = require('../services/productService');
const Joi = require('joi');
//const path = require('path'); 

class ProductController {
    // Esquema de validación para los productos
    static productSchema = Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional(),
        brand: Joi.string().optional(),
        price: Joi.number().optional(),
        discount: Joi.number().optional(),
        length: Joi.number().optional(),
        height: Joi.number().optional(),
        thumbnail: Joi.string().optional().allow(null),
        status: Joi.boolean().optional(),
        model: Joi.string().optional(),
        stock: Joi.number().optional(),
        weight: Joi.number().optional(),
        width: Joi.number().optional(),
        warranty: Joi.number().optional(),
        description: Joi.string().optional(),
        rating: Joi.number().precision(2).optional(),
        image1: Joi.string().optional().allow(null),
        color1: Joi.string().optional().allow(null),
        image2: Joi.string().optional().allow(null),
        color2: Joi.string().optional().allow(null),
        image3: Joi.string().optional().allow(null),
        color3: Joi.string().optional().allow(null),
        tags: Joi.array().items(Joi.string()).optional(),
        categoryId: Joi.number().required()
    });

    async createProduct(req, res) {
        try {
            const productData = req.body;
    
            // Verifica si tags es una cadena de texto, y si es así, la convierte en un arreglo
            if (productData.tags && typeof productData.tags === 'string') {
                productData.tags = productData.tags.split(',').map(tag => tag.trim());
            } else if (!productData.tags) {
                productData.tags = []; // Si no se proporciona tags, asignar un arreglo vacío
            }
    
            const files = req.files;
            if (files) {
                // Asignar solo el nombre del archivo (sin la ruta completa)
                productData.image1 = files.image1 ? files.image1[0].filename : null;
                productData.image2 = files.image2 ? files.image2[0].filename : null;
                productData.image3 = files.image3 ? files.image3[0].filename : null;
            }
    
            console.log('Generated Image Filenames:', productData.image1, productData.image2, productData.image3);
    
            // Validar el producto (si tienes validaciones adicionales)
            await ProductController.productSchema.validateAsync(productData);
    
            // Crear el producto en la base de datos
            const productId = await productService.createProduct(productData);
            res.status(201).json({ success: true, id: productId, message: 'Producto guardado exitosamente' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
        }
    }
    





    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await productService.getProduct(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
            res.json({ success: true, product });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const productData = await ProductController.productSchema.validateAsync(req.body);
            await productService.updateProduct(productId, productData);
            res.json({ success: true, message: 'Producto actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await productService.deleteProduct(productId);
            res.json({ success: true, message: 'Producto eliminado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query; // Asumiendo que la búsqueda viene en la query
            const products = await productService.searchProducts(query);
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async getProductsByCategory(req, res) {
        const categoryId = req.params.id;

        try {
            const products = await productService.getProductsByCategory(categoryId);
            res.json({ success: true, products });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    }

    async getFeaturedProducts(req, res) {
        try {
            const featuredProducts = await productService.getFeaturedProducts();
            if (featuredProducts.length === 0) {
                return res.status(404).json({ success: false, message: 'No se encontraron productos destacados' });
            }
            res.json({ success: true, products: featuredProducts });
        } catch (err) {
            console.error('Error al obtener productos destacados:', err.message);
            res.status(500).json({ success: false, message: 'Error en el servidor', error: err.message });
        }
    }
    async getSimilarProducts(req, res) {
        const { productId } = req.params;

        try {
            const similarProducts = await productService.getSimilarProducts(productId);
            return res.json({
                success: true,
                products: similarProducts
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // Nueva función para manejar la búsqueda por precio máximo y mínimo
    async searchProductMaxmin(req, res) {
        try {
            const { query, precioMin, precioMax } = req.query;
            const products = await productService.searchProductMaxmin(query, precioMin, precioMax);
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // Nueva función para obtener los productos más recientes
    async searchNewArrivals(req, res) {
        try {
            const { query } = req.query;
            const products = await productService.searchNewArrivals(query);
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // Nueva función para obtener los productos más populares
    async searchPopularProducts(req, res) {
        try {
            const { query } = req.query;
            const products = await productService.searchPopularProducts(query);
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }


}

module.exports = new ProductController();

