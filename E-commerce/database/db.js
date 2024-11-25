const { Sequelize } = require('sequelize');

// Configuración de Sequelize para SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite', // Dialecto para SQLite
  storage: './ecommerce.db', // Ruta al archivo de la base de datos
  logging: false, // Opcional: Deshabilitar logs SQL
});

// Verificar conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos SQLite');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;


