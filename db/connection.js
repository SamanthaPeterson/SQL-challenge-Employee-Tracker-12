const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'DLP82418!s',
  database: 'db_employee_tracker'
  },
  console.log(`Connected to the inventory_db database.`)
  );


constructor.exports = db;
