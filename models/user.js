const db = require('../config/db');

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Fonction pour récupérer un utilisateur par ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id_user = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

// Fonction pour ajouter un nouvel utilisateur
const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users (login, status) VALUES (?, ?)',
            [userData.login, userData.status],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};

// Fonction pour mettre à jour un utilisateur
const updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET login = ?, status = ? WHERE id_user = ?',
            [userData.login, userData.status, id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};

// Fonction pour supprimer un utilisateur
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id_user = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
