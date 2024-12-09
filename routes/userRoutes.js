const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes accessibles uniquement aux administrateurs
router.post('/add', authMiddleware.isAuthenticated, authMiddleware.isAdmin, userController.addUser);
router.put('/edit/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, userController.editUser);
router.delete('/delete/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, userController.deleteUser);

// Routes accessibles aux utilisateurs connectés (simples ou admin)
router.get('/profile', authMiddleware.isAuthenticated, userController.viewProfile);
router.put('/profile', authMiddleware.isAuthenticated, userController.updateProfile);

module.exports = router;
