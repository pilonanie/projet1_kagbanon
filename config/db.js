const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = db;
