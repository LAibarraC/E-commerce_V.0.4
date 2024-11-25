const User = require('../models/user');

class UserRepository {
    static async findByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    static async createUser(user) {
        const newUser = await User.create(user);
        return newUser.id;
    }

    static async findAllUsers() {
        return await User.findAll();
    }

    static async updateUser(user) {
        await User.update({
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            updatedAt: user.updatedAt,
            image: user.image,
            role: user.role
        }, {
            where: { id: user.id }
        });
    }

    static async deleteUser(id) {
        await User.destroy({ where: { id } });
    }

    static async findById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;  // Devuelve el usuario si se encuentra
        } catch (error) {
            throw new Error('Error al buscar el usuario en la base de datos: ' + error.message);
        }
    }
}

module.exports = UserRepository;

