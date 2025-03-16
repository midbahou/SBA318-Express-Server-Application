const express = require('express');
const router = express.Router();

// Sample data
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Frank', email: 'frank@example.com'}
];

// GET /users
router.get('/', (req, res) => {
    res.render('users', { users }); // render the users view
})

module.exports = router