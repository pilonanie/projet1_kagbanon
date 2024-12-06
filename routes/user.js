const express = require('express');
const router = express.Router();
const db = require('../db');

// Enregistrement d'un utilisateur
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur enregistré avec succès');
    });
});

// Connexion d'un utilisateur
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.redirect('/user/dashboard');
        } else {
            res.status(401).send('Identifiants invalides');
        }
    });
});

// Modifier les informations personnelles
router.post('/edit/:id', (req, res) => {
    const { username, email } = req.body;
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    db.query(query, [username, email, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Informations mises à jour');
    });
});

module.exports = router;
