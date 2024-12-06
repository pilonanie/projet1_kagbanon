const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

// Page d'inscription admin
router.get('/register', (req, res) => res.render('admin/register'));

// Inscription admin
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword], err => {
        if (err) throw err;
        res.redirect('/admin/login');
    });
});

// Page de connexion admin
router.get('/login', (req, res) => res.render('admin/login'));

// Connexion admin
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            req.session.admin = results[0];
            res.redirect('/admin/dashboard');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Tableau de bord
router.get('/dashboard', (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    db.query('SELECT * FROM users', (err, users) => {
        if (err) throw err;
        res.render('admin/dashboard', { users });
    });
});

// Supprimer un utilisateur
router.post('/delete/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], err => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// Modifier un utilisateur (formulaire et traitement similaire)
router.post('/update/:id', (req, res) => {
    const { username } = req.body;
    db.query('UPDATE users SET username = ? WHERE id = ?', [username, req.params.id], err => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

module.exports = router;
