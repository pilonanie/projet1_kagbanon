const bcrypt = require('bcryptjs');
const db = require('../server').db;
const session = require('express-session');

// Affichage de la page de connexion
exports.showLoginPage = (req, res) => {
    res.render('admin/login');  // Vue de la page de connexion pour les administrateurs
};

// Connexion de l'utilisateur
exports.login = (req, res) => {
    const { username, password } = req.body;
    
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la connexion');
        }

        if (results.length === 0) {
            return res.send('Utilisateur non trouvé');
        }

        const user = results[0];
        
        // Vérification du mot de passe
        if (bcrypt.compareSync(password, user.password)) {
            req.session.user = { id: user.id, username: user.username, role: user.role, email: user.email }; // Enregistrement de l'utilisateur dans la session
            return res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/user/profile'); // Redirection en fonction du rôle de l'utilisateur
        } else {
            return res.send('Mot de passe incorrect');
        }
    });
};

// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la déconnexion');
        }
        res.redirect('/');  // Redirection vers la page d'accueil
    });
};

// Affichage de la page d'inscription
exports.showRegisterPage = (req, res) => {
    res.render('admin/register');  // Vue d'inscription
};

// Inscription de l'utilisateur
exports.register = (req, res) => {
    const { username, password, email, role } = req.body;

    // Vérification si l'utilisateur existe déjà
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de l\'inscription');
        }

        if (results.length > 0) {
            return res.send('Cet utilisateur existe déjà');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', 
        [username, hashedPassword, email, role], (err, result) => {
            if (err) {
                console.log(err);
                return res.send('Erreur lors de la création de l\'utilisateur');
            }
            res.redirect('/auth/login');  // Redirection vers la page de connexion après inscription
        });
    });
};
