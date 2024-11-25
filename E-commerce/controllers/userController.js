const userService = require('../services/userService');

class UserController { 
    async login(req, res) {  
        try {
            const { username, password } = req.body;
            const user = await userService.login(username, password);
            res.json({ message: 'Login exitoso', user }); // Asegúrate de que esta respuesta esté llegando correctamente al frontend
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async register(req, res) { 
        try {
            const userData = req.body;
            const userId = await userService.register(userData);
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async editUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            await userService.editUser(userId, userData);
            res.json({ message: 'Usuario actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await userService.deleteUser(userId);
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getUser(req, res) { 
        try {
            const userId = req.params.id;
            const user = await userService.getUser(userId);
            res.json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


}

module.exports = new UserController();
