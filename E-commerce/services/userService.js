const UserRepository = require('../repository/userRepository');
const User = require('../models/user');

class UserService {
    async login(username, password) {
        const user = await UserRepository.findByUsername(username);
        if (user && user.password === password) {
            return user; // O devolver un token JWT en un escenario más avanzado
        }
        throw new Error('Usuario o contraseña incorrectos');
    }

    async register(userData) {
        // Verifica si el nombre de usuario ya existe
        const existingUser = await UserRepository.findByUsername(userData.username);
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const user = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password, // Usamos la contraseña tal como está
            updatedAt: new Date(),
            image: userData.image,
            role: userData.role || 'user' // Por defecto, asignar rol 'user'
        };

        return await UserRepository.createUser(user); // Llama al repositorio para crear el usuario
    }

    async getAllUsers() {
        return await UserRepository.findAllUsers();
    }

    async editUser(id, userData) {
        const user = {
            id: id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            updatedAt: new Date(),
            image: userData.image,
            role: userData.role
        };
        return await UserRepository.updateUser(user);
    }

    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }

    async getUser(id) {
        return await UserRepository.findById(id);
    }

    
}

module.exports = new UserService();

