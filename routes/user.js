const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Route pour ajouter un utilisateur
router.post('/', authenticateToken, (req, res) => {
  const { username, email, password, role } = req.body;

  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  db.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role || 'user'],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User added successfully' });
    }
  );
});

// Route pour modifier un utilisateur
router.put('/:id', authenticateToken, (req, res) => {
  const { username, email, password, role } = req.body;
  const userId = req.params.id;

  if (req.user.role !== 'admin' && req.user.id !== parseInt(userId))
    return res.status(403).json({ message: 'Forbidden' });

  db.query(
    'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
    [username, email, password, role, userId],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Route pour supprimer un utilisateur
router.delete('/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
