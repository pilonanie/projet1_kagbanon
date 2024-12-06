const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'nodedb', // Assurez-vous que cette base existe
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes principales
app.get('/', (req, res) => {
    res.render('index'); // Page avec les boutons Admin/User
});

// Routes pour les administrateurs
app.get('/admin/register', (req, res) => {
    res.render('admin/register');
});

app.post('/admin/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database error');
        }
        res.redirect('/admin/login');
    });
});

app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.admin = results[0];
            res.redirect('/admin/dashboard');
        } else {
            res.send('Invalid credentials');
        }
    });
});

app.get('/admin/dashboard', (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('admin/dashboard', { users: results });
    });
});

app.post('/admin/delete/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

app.post('/admin/update/:id', (req, res) => {
    const userId = req.params.id;
    const { username } = req.body;
    const query = 'UPDATE users SET username = ? WHERE id = ?';
    db.query(query, [username, userId], (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// Routes pour les utilisateurs
app.get('/user/register', (req, res) => {
    res.render('user/register');
});

app.post('/user/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database error');
        }
        res.redirect('/user/login');
    });
});

app.get('/user/login', (req, res) => {
    res.render('user/login');
});

app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/user/profile');
        } else {
            res.send('Invalid credentials');
        }
    });
});

app.get('/user/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
    res.render('user/profile', { user: req.session.user });
});

app.post('/user/profile', (req, res) => {
    const { username } = req.body;
    const userId = req.session.user.id;
    const query = 'UPDATE users SET username = ? WHERE id = ?';
    db.query(query, [username, userId], (err) => {
        if (err) throw err;
        req.session.user.username = username;
        res.redirect('/user/profile');
    });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
