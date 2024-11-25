const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./E-commerce/routes/userRoutes');
const categoryRoutes = require('./E-commerce/routes/categoryRoutes');
const productRoutes = require('./E-commerce/routes/productRoutes');
const cartRoutes = require('./E-commerce/routes/cartRoutes');
const cart_ItemRoutes = require('./E-commerce/routes/cartItemRoutes');
const sequelize = require('./E-commerce/database/db');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde las carpetas necesarias para acceder a HTML y CSS
app.use(express.static(path.join(__dirname, 'E-commerce/views')));  // Cambié esta línea para asegurar que toda la carpeta 'views' sea accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/Product')));  // Asegura que 'Product' esté accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/carrito')));  // Asegura que 'Product' esté accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/principal')));  // Asegura que 'Product' esté accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/navbar')));  // Asegura que 'navbar' esté accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/icon')));  // Asegura que 'icon' esté accesible
app.use(express.static(path.join(__dirname, 'E-commerce/views/images')));  // Asegura que 'images' esté accesible
app.use('/uploads', express.static(path.join(__dirname, 'E-commerce', 'uploads')));

 // Asegura que la carpeta 'uploads' esté accesible

// Ruta para acceder a la página de agregar producto
app.get('/addproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/Product/HTML/Addproduct.html'));  // Ruta corregida
});

// Lista de productos
app.get('/listproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/Product/HTML/Listproduct.html'));  // Ruta corregida
});

app.get('/viewproduct/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/Product/HTML/Viewproduct.html'));  // Ruta corregida
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/login/HTML/login.html'));  // Ruta corregida
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/login/HTML/register.html'));  // Ruta corregida
});
app.get('/principal', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/principal/HTML/principal.html'));  // Ruta corregida
});

app.get('/product-details/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/principal/HTML/viewproduct.html'));  // Ruta corregida
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/principal/HTML/buscador.html'));  // Ruta corregida
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/carrito/HTML/cart.html'));  // Ruta corregida
});
app.get('/category', (req, res) => {
    res.sendFile(path.join(__dirname, 'E-commerce/views/Product/HTML/category.html'));  // Ruta corregida
});


// Rutas de la API
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', cart_ItemRoutes);

// Sincronización con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch(err => console.error('Error al sincronizar tablas:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
