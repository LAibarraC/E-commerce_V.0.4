const path = require('path'); 
const multer = require('multer'); // Importar multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E-commerce/uploads/products'); // Carpeta donde se guardarán las imágenes
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
]);


module.exports = upload; // Asegúrate de exportarlo correctamente
