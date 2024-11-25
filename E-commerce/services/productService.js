const ProductRepository = require('../repository/productRepository');

class ProductService {
    async createProduct(productData) {
        return await ProductRepository.createProduct(productData);
    }

    async getAllProducts() {
        return await ProductRepository.findAllProducts();
    }

    async getProduct(id) {
        return await ProductRepository.findById(id);
    }

    async updateProduct(id, productData) {
        return await ProductRepository.updateProduct({ id, ...productData });
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }

    async searchProducts(query) {
        return await ProductRepository.searchProducts(query);
    }

    async getProductsByCategory(categoryId) {
        if (!categoryId) {
            throw new Error('Se debe proporcionar un id de categoría');
        }

        const products = await ProductRepository.findProductsByCategory(categoryId);

        if (products.length === 0) {
            throw new Error('No se encontraron productos para esta categoría');
        }

        return products;
    }
    async getFeaturedProducts() {
        return await ProductRepository.findFeaturedProducts();
    }

    async getSimilarProducts(productId) {
        try {
            return await ProductRepository.findSimilarProducts(productId);
        } catch (error) {
            throw new Error("Error en el servicio de productos similares.");
        }
    }


     // Agregar la nueva función para buscar productos por precio mínimo y máximo
     async searchProductMaxmin(query, precioMin, precioMax) {
        return await ProductRepository.searchProductMaxmin(query, precioMin, precioMax);
    }

    // Agregar la función para buscar los productos más nuevos
    async searchNewArrivals(query) {
        return await ProductRepository.searchNewArrivals(query);
    }

    // Agregar la función para buscar los productos más populares
    async searchPopularProducts(query) {
        return await ProductRepository.searchPopularProducts(query);
    }

}

module.exports = new ProductService();
