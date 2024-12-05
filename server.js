const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configurer la connexion MySQL
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodebd',
});

con.connect((err) => {
    if (err) {
        console.error('Erreur de connexion :', err.message);
        return;
    }
    console.log('Connexion réussie à MySQL !');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes principales
// 1. Ajouter un utilisateur (Admin uniquement)
app.post('/api/users', (req, res) => {
    const { username, password, role } = req.body;
    if (role !== 'admin') {
        return res.status(403).json({ message: "Vous n'avez pas l'autorisation d'ajouter un utilisateur." });
    }

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    con.query(sql, [username, password, role], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json({ message: 'Utilisateur ajouté avec succès', results });
    });
});

// 2. Modifier un utilisateur (Admin ou utilisateur modifiant ses infos)
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    // Vérifiez si l'utilisateur essaie de changer son rôle (admin uniquement)
    if (role && role !== 'user') {
        return res.status(403).json({ message: "Modification du rôle non autorisée." });
    }

    const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
    con.query(sql, [username, password, userId], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', results });
    });
});

// 3. Supprimer un utilisateur (Admin uniquement)
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    con.query(sql, [userId], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', results });
    });
});

// 4. Obtenir tous les utilisateurs (Admin uniquement)
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, username, role FROM users';
    con.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
    });
});

// 5. Se connecter (Tous les utilisateurs)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    con.query(sql, [username, password], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const user = results[0];
        res.status(200).json({
            message: 'Connexion réussie',
            user: { id: user.id, username: user.username, role: user.role },
        });
    });
});

// Page d'accueil (Affichage d'un formulaire)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userForm.html'));
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
