const express = require('express');
const router = express.Router();
const con = require('../db'); // Importez la connexion MySQL

// Middleware pour vérifier le rôle admin
function isAdmin(req, res, next) {
    if (req.session.role === 'admin') {
        return next();
    }
    res.status(403).send('Accès interdit : vous devez être administrateur');
}

// Middleware pour vérifier si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).send('Veuillez vous connecter');
}

// *** Routes pour les administrateurs *** //

// Obtenir tous les utilisateurs (admin)
router.get('/users', isAdmin, (req, res) => {
    con.query('SELECT id, username, role FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.json(results);
    });
});

// Ajouter un utilisateur (admin)
router.post('/users', isAdmin, (req, res) => {
    const { username, password, role } = req.body;
    con.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.send('Utilisateur ajouté avec succès');
    });
});

// Modifier un utilisateur (admin)
router.put('/users/:id', isAdmin, (req, res) => {
    const { username, password, role } = req.body;
    const { id } = req.params;
    con.query('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id], (err) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.send('Utilisateur modifié avec succès');
    });
});

// Supprimer un utilisateur (admin)
router.delete('/users/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    con.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.send('Utilisateur supprimé avec succès');
    });
});

// *** Routes pour les utilisateurs simples *** //

// Obtenir les informations personnelles de l'utilisateur connecté
router.get('/profile', isAuthenticated, (req, res) => {
    con.query('SELECT id, username, role FROM users WHERE id = ?', [req.session.userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.json(results[0]);
    });
});

// Modifier les informations personnelles de l'utilisateur connecté
router.put('/profile', isAuthenticated, (req, res) => {
    const { username, password } = req.body;
    con.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, req.session.userId], (err) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        res.send('Profil modifié avec succès');
    });
});

module.exports = router;
