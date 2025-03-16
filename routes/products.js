const { name } = require('ejs');
const express = require('express');
const router = express.Router();

// sample Data

const products = [
    {id: 1, name: "Laptop", price: 1200},
    {id:2, name: "Phone", price: 800},
    {id:3, name: "Tablet", price: 600}
];

// GET /products
router.get('/', (req, res) => {
    res.render('products', { products }) // render the products view
});

module.exports = router;