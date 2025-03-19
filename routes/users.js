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
});


// GET /users/:id - Get a single user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id)); // Find user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user); // Return the user as JSON
});


// POST /users - Add a new user
router.post('/', (req, res) => {
    const { name, email } = req.body; // Extract data from the request body
    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide name and email' }); // Validate input
    }
    const newUser = { id: users.length + 1, name, email }; // Create a new user
    users.push(newUser); // Add the user to the array
    res.status(201).json(newUser); // Return the new user as JSON
});


// PATCH /users/:id - Partially update users
router.patch('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id))
    if(!user) return res.status(404).json({ message: "User Not Found!" })

    const {name, email} = req.body;

    if(name) user.name = name;
    if(email) user.email = email;

    res.json(user)
})


// DELETE /users/:id - Delete a user by ID
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id)); // Find user index
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    users.splice(userIndex, 1); // Remove the user from the array
    res.json({ message: 'User deleted' }); // Return a success message
});


module.exports = router