const express = require('express');
const router = express.Router();
const db = require('../server').db;

// Middleware pour vérifier si l'utilisateur est connecté
router.use((req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
});

// Profil utilisateur
router.get('/profile', (req, res) => {
    const { id } = req.session.user;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('user/profile', { user: results[0] });
    });
});

// Modifier le profil utilisateur
router.post('/profile', (req, res) => {
    const { id } = req.session.user;
    const { username, email } = req.body;

    db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', 
        [username, email, id], (err, result) => {
            if (err) throw err;
            res.redirect('/user/profile');
        });
});

module.exports = router;
