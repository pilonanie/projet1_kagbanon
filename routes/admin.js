const express = require('express');
const router = express.Router();
const db = require('../db');

// Connexion d'administrateur
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.redirect('/admin/dashboard');
        } else {
            res.status(401).send('Identifiants invalides');
        }
    });
});

// Page d'administration (Tableau des utilisateurs)
router.get('/dashboard', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);  // Retourne la liste des utilisateurs
    });
});

// Ajouter un utilisateur
router.post('/add', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur ajouté avec succès');
    });
});

// Modifier un utilisateur
router.post('/edit/:id', (req, res) => {
    const { username, email } = req.body;
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    db.query(query, [username, email, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur modifié avec succès');
    });
});

// Supprimer un utilisateur
router.post('/delete/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur supprimé avec succès');
    });
});

module.exports = router;
