const db = require('../config/db');

// Obtenir tous les utilisateurs
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Ajouter un utilisateur
exports.addUser = (req, res) => {
  const { username, password, role, fullname, email } = req.body;
  db.query(
    'INSERT INTO users (username, password, role, fullname, email) VALUES (?, ?, ?, ?, ?)',
    [username, password, role, fullname, email],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Utilisateur ajouté avec succès!' });
    }
  );
};

// Authentification utilisateur
exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          res.json({
            success: true,
            role: results[0].role, // Retourne le rôle pour redirection
          });
        } else {
          res.json({ success: false });
        }
      }
    );
  };
  

// Modifier un utilisateur
exports.updateUser = (req, res) => {
  const { id, fullname, email } = req.body;
  db.query(
    'UPDATE users SET fullname = ?, email = ? WHERE id = ?',
    [fullname, email, id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Utilisateur modifié avec succès!' });
    }
  );
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur supprimé avec succès!' });
  });
};
