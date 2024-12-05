const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

// Afficher tous les utilisateurs (Admin)
router.get('/admin', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ajouter un utilisateur (Admin)
router.post('/admin/add', async (req, res) => {
  const { username, password, role, email, fullname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword, role, email, fullname };

  db.query('INSERT INTO users SET ?', user, (err, results) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur ajouté avec succès!' });
  });
});

// Modifier un utilisateur (Admin)
router.put('/admin/edit/:id', async (req, res) => {
  const { username, password, role, email, fullname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword, role, email, fullname };

  db.query('UPDATE users SET ? WHERE id = ?', [user, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur mis à jour avec succès!' });
  });
});

// Supprimer un utilisateur (Admin)
router.delete('/admin/delete/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur supprimé avec succès!' });
  });
});

// Modifier ses propres informations (Utilisateur simple)
router.put('/user/edit/:id', async (req, res) => {
  const { email, fullname } = req.body;
  const user = { email, fullname };

  db.query('UPDATE users SET ? WHERE id = ?', [user, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Informations mises à jour!' });
  });
});

module.exports = router;
