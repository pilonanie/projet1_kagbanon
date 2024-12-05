const db = require('../server').db;
const bcrypt = require('bcryptjs');

// Récupérer un utilisateur par son identifiant
exports.getUserById = (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    });
};

// Récupérer un utilisateur par son nom d'utilisateur
exports.getUserByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    });
};

// Créer un nouvel utilisateur
exports.createUser = (username, password, email, role, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', 
    [username, hashedPassword, email, role], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results.insertId);
        }
    });
};

// Mettre à jour un utilisateur
exports.updateUser = (id, username, email, callback) => {
    db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', 
    [username, email, id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Vérifier le mot de passe de l'utilisateur
exports.verifyPassword = (username, password, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            const user = results[0];
            if (user && bcrypt.compareSync(password, user.password)) {
                callback(null, user);
            } else {
                callback('Mot de passe incorrect', null);
            }
        }
    });
};
