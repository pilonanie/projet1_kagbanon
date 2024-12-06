const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pour les utilisateurs
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
