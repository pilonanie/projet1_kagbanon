const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

// User routes
router.get('/dashboard', authMiddleware, UserController.dashboard);
router.post('/update/:id', authMiddleware, UserController.updateUser);

// Admin routes
router.get('/admin/dashboard', authMiddleware, adminMiddleware, UserController.adminDashboard);
router.post('/admin/users', authMiddleware, adminMiddleware, UserController.createUser);
router.post('/admin/users/:id', authMiddleware, adminMiddleware, UserController.updateUser);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, UserController.deleteUser);

module.exports = router;