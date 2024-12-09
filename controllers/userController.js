const db = require('../config/db');

// Consulter les informations personnelles
exports.getUserInfo = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT id, name, email FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json(results[0]);
    });
};

// Modifier les informations personnelles
exports.updateUserInfo = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql, [name, email, password, id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la modification des informations utilisateur' });
        }
        res.status(200).json({ message: 'Informations utilisateur modifiées avec succès' });
    });
};
