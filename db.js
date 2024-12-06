const mysql = require('mysql');

// Crée la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;
