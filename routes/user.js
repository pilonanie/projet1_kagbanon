const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

// Page d'inscription utilisateur
router.get('/register', (req, res) => res.render('user/register'));

// Inscription utilisateur
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], err => {
        if (err) throw err;
        res.redirect('/user/login');
    });
});

// Page de connexion utilisateur
router.get('/login', (req, res) => res.render('user/login'));

// Connexion utilisateur
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            req.session.user = results[0];
            res.redirect('/user/profile');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Page de profil utilisateur
router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
    res.render('user/profile', { user: req.session.user });
});

module.exports = router;
