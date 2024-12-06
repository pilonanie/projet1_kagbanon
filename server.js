require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db'); // Import du module de connexion à la base de données

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes API

// Ajouter un utilisateur (admin uniquement)
app.post('/api/users', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, role || 'user'],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User added successfully' });
    }
  );
});

// Modifier un utilisateur (admin uniquement)
app.put('/api/users/:id', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const query = hashedPassword
    ? 'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?'
    : 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';

  const values = hashedPassword
    ? [username, email, hashedPassword, role, req.params.id]
    : [username, email, role, req.params.id];

  db.query(query, values, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User updated successfully' });
  });
});

// Supprimer un utilisateur (admin uniquement)
app.delete('/api/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User deleted successfully' });
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
