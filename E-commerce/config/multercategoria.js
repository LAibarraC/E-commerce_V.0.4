const path = require('path'); 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E-commerce/uploads/categories'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 }
]);


module.exports = upload; 


