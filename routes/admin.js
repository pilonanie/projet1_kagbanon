const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../server').db;

// Middleware pour vérifier si l'utilisateur est admin
router.use((req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.redirect('/auth/login');
});

// Tableau de bord de l'admin
router.get('/dashboard', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('admin/dashboard', { users: results });
    });
});

// Ajouter un utilisateur
router.get('/add', (req, res) => {
    res.render('admin/add-user');
});

// Ajouter un utilisateur (POST)
router.post('/add', (req, res) => {
    const { username, password, email, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', 
        [username, hashedPassword, email, role], (err, result) => {
            if (err) throw err;
            res.redirect('/admin/dashboard');
        });
});

// Modifier un utilisateur
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('admin/edit-user', { user: results[0] });
    });
});

// Modifier un utilisateur (POST)
router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', 
        [username, email, role, id], (err, result) => {
            if (err) throw err;
            res.redirect('/admin/dashboard');
        });
});

// Supprimer un utilisateur
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

module.exports = router;
