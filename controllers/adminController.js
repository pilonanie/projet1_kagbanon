const db = require('../server').db;

// Afficher la liste des utilisateurs pour l'administrateur
exports.showUsersList = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la récupération des utilisateurs');
        }
        res.render('admin/users', { users: results });  // Affiche la liste des utilisateurs
    });
};

// Afficher le formulaire de création d'un nouvel utilisateur
exports.showCreateUserPage = (req, res) => {
    res.render('admin/create-user');  // Page pour créer un nouvel utilisateur
};

// Créer un nouvel utilisateur
exports.createUser = (req, res) => {
    const { username, password, email, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de l\'inscription de l\'utilisateur');
        }

        if (results.length > 0) {
            return res.send('Cet utilisateur existe déjà');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insertion du nouvel utilisateur
        db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', 
        [username, hashedPassword, email, role], (err, result) => {
            if (err) {
                console.log(err);
                return res.send('Erreur lors de la création de l\'utilisateur');
            }
            res.redirect('/admin/users');  // Redirection vers la liste des utilisateurs après création
        });
    });
};

// Afficher le formulaire de modification d'un utilisateur
exports.showEditUserPage = (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la récupération des informations de l\'utilisateur');
        }

        if (results.length === 0) {
            return res.send('Utilisateur non trouvé');
        }

        res.render('admin/edit-user', { user: results[0] });  // Page pour éditer l'utilisateur
    });
};

// Mettre à jour les informations d'un utilisateur
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, email, role } = req.body;

    db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', 
    [username, email, role, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la mise à jour');
        }
        res.redirect('/admin/users');  // Redirection vers la liste des utilisateurs après modification
    });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Erreur lors de la suppression de l\'utilisateur');
        }
        res.redirect('/admin/users');  // Redirection vers la liste des utilisateurs après suppression
    });
};
