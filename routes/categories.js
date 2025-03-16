const express = require('express');
const router = express.Router();

// Sample data
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Kitchen' }
];

// GET / categories
router.get('/', (req, res) => {
    res.render('categories', { categories }); // render the categories view
});

module.exports = router