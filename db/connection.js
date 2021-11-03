const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'DLP82418!s',
    database: 'employee-tracker-db',
});

db.connect();

db.query = util.promisify(db.query);

module.exports = db;