const db = require('../config/db');

// Connexion utilisateur
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la connexion' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Créer une session pour l'utilisateur connecté
        const user = results[0];
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({ message: 'Connexion réussie', user: req.session.user });
    });
};

// Déconnexion utilisateur
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        }

        res.status(200).json({ message: 'Déconnexion réussie' });
    });
};
