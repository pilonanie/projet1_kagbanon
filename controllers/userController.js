const db = require('../server').db;

// Afficher le profil de l'utilisateur
exports.showProfile = (req, res) => {
    const userId = req.session.user.id;
    
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur de récupération des informations');
        }
        res.render('user/profile', { user: results[0] });
    });
};

// Mettre à jour le profil de l'utilisateur
exports.updateProfile = (req, res) => {
    const userId = req.session.user.id;
    const { username, email } = req.body;

    db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la mise à jour');
        }
        req.session.user.username = username; // Mettre à jour la session avec le nouveau nom d'utilisateur
        req.session.user.email = email; // Mettre à jour l'email dans la session
        res.redirect('/user/profile');
    });
};
