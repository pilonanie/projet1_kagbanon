const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Page d'accueil
app.get('/', (req, res) => {
    res.render('index');
});

// Serveur
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
