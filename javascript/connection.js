// Dependencies
const Sequelize = require('sequelize');

// Creates mySQL connection using Sequelize
// Include your MySQL user/password information
const sequelize = process.env.employee_tracker_db_URL
  ? new Sequelize(process.env.employee_tracker_db_URL)
  : new Sequelize('employee_tracker_db', 'root', '', {
      host: 'localhost',
      port: 3002,
      password: "",
      dialect: 'mysql'
    });

// Exports the connection for other files to use
module.exports = sequelize;


//mysql
// npm i 
// npm i nodemon
// npm i express
// npm i dotenv
// npm i node
// npm i mysql2
// npm i inquirer
// npm i console.table
// const cTable = require('console.table');
// npm i node@lts
// npm i node
// npm i mysql

// https://www.npmjs.com/package/nodemon
// https://www.npmjs.com/package/dotenv
// https://www.npmjs.com/package/express
// https://www.npmjs.com/package/node
// https://www.npmjs.com/package/mysql2
// https://www.npmjs.com/package/inquirer
// https://www.npmjs.com/package/console.table
// https://dev.mysql.com/doc/refman/8.0/en/connecting-disconnecting.html
