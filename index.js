const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Middleware 
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Template Engine 
app.set('view engine', 'ejs');

// import routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');

// use the routes
app.use('/products', productRoutes); // Products route
app.use('/categories', categoryRoutes); // Categories route
app.use('/users', userRoutes); // Users route

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})