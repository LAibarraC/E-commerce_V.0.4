const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path'); 
const upload = require('../config/multerConfig');
const Product = require('../models/product'); 

//const multer = require('multer'); // Importar multer

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombra el archivo con un timestamp
    }
});

// Configurar `multer` para recibir hasta 3 imágenes con nombres específicos (image1, image2, image3)
const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);*/

// Ruta para crear productos
router.post('/products', upload, productController.createProduct);
 
const Category = require('../models/category');

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Category,
                attributes: ['id', 'name'] // Obtén el ID y el nombre de la categoría
            }]
        });
        if (product) {
            res.json({ success: true, product });
        } else {
            res.json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }
});


// Rutas para obtener todos los productos y operaciones CRUD
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/prod/search', productController.searchProducts);
router.get('/products/categories/:id', productController.getProductsByCategory);
router.get('/product/featureds', productController.getFeaturedProducts);
router.get('/products/:productId/similar', productController.getSimilarProducts);

router.get('/prod/search/maxmin', productController.searchProductMaxmin);
router.get('/prod/search/newarrivals', productController.searchNewArrivals);
router.get('/prod/search/popular', productController.searchPopularProducts);



// Middleware para manejar errores de multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: err.message });
    } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
    next();
});

module.exports = router;
