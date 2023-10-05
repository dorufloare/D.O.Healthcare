const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'login_register',
  port: 3002,
});

module.exports = db;