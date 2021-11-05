const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
{
      //port: 3306,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'employee_tracker_db'
    },
    console.log ('connected to the employee_tracker_db.')
    )

module.exports = db;