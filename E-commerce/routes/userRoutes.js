const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/users', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/users/:id', userController.getUser);
 
// Actualizar un usuario 
router.put('/users/:id', userController.editUser);

// Eliminar un usuario
router.delete('/users/:id', userController.deleteUser);

module.exports = router; 
