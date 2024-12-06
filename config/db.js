const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'user_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = db;
