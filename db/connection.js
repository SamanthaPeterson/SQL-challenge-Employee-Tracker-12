const mysql = require("mysql");
const util = require("util");
const cTable = require('console.table');
const connection = require('./config/connection');
const inquirer = require('inquirer');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const PORT = process.env.PORT || 3001;
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


// const db = mysql.createConnection({
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: 'DLP82418!s',
//     database: 'employee-tracker-db',
// });

// db.connect((error) => {
//     if (error) throw error;

// db.query = util.promisify(db.query);

// module.exports = db;