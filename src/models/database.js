const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'celtatsas_sucvirtual'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to database!');
});

module.exports = connection;
