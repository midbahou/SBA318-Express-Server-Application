const express = require('express');
const app = express(); // Create an Express application
const path = require('path'); // Node.js module for handling file paths
const PORT = 3000; // Define the port number


const bodyParser = require('body-parser');// Body-parser: Middleware to parse incoming data
const morgan = require('morgan'); //Morgan: HTTP request logger middleware

// Middleware 
app.use(bodyParser.json());// Parse JSON data from requests
app.use(bodyParser.urlencoded({ extended: true })); // parse form data (URL-encoded)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (e.g. CSS)


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