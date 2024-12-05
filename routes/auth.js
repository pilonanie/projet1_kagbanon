const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../server').db;

// Page de login
router.get('/login', (req, res) => {
    res.render('admin/login');
});

// Connexion de l'utilisateur
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                if (user.role === 'admin') {
                    res.redirect('/admin/dashboard');
                } else {
                    res.redirect('/user/profile');
                }
            } else {
                res.send('Incorrect credentials');
            }
        } else {
            res.send('User not found');
        }
    });
});

// Déconnexion
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/auth/login');
    });
});

module.exports = router;
