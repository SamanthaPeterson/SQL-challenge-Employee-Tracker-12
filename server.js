const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// // Use apiRoutes
// app.use('/api', apiRoutes);

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });
// Dependencies



//const fs = require("fs");
//const path = require("path");
require("dotenv").config();


// get the client
//const mysql = require('mysql2');
//const mysql = require('mysql2/promise');

// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    //   password: process.env.DB_PASSWORD,
    database: "employee_tracker_db"
});


/*
Start calls to the database 
*/
async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    //console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    //console.log("Number of rows returned: " + rows.length);

    let roles = [];
    for (const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function getDepartmentNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    //console.log("Number of rows returned: " + rows.length);

    let departments = [];
    for (const row of rows) {
        departments.push(row.name);
    }

    return departments;
}

// Given the name of the department, what is its id?
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// Given the name of the role, what is its id?
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// need to find the employee.id of the named manager
async function getEmployeeId(fullName) {
    // First split the name into first name and last name
    let employee = getFirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function viewAllRoles() {
    console.log("");
    // SELECT * FROM role;
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

async function viewAllDepartments() {
    // SELECT * from department;

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllEmployees() {
    console.log("");

    // SELECT * FROM employee;
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllEmployeesByDepartment() {
    // View all employees by department
    // SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);
    console.log("");
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

// Will return an array with only two elements in it: 
// [first_name, last_name]
function getFirstAndLastName(fullName) {
    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length - 1];
    let first_name = " ";
    for (let i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}

async function updateEmployeeRole(employeeInfo) {
    // Given the name of the role, what is the role id?
    // Given the full name of the employee, what is their first_name and last_name?
    // UPDATE employee SET role_id=1 WHERE employee.first_name='Mary Kay' AND employee.last_name='Ash';
    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndLastName(employeeInfo.employeeName);

    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args = [roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}

async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    // INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);
    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}

async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

async function addRole(roleInfo) {
    // INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${title}`);
}

/* 
End of calls to the database
*/

async function mainPrompt() {
    return new Promise(function (resolve, reject) {

        inquirer
            .prompt([{
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "Add department",
                    "Add employee",
                    "Add role",
                    "Remove employee",
                    "Update employee role",
                    "View all departments",
                    "View all employees",
                    "View all employees by department",
                    "View all roles",
                    "Exit"
                ]
            }])
            .then(data => {
                resolve(data.action)
            })
    })
}

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: [
                // populate from db
                ...roles
            ]
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: [
                // populate from db
                ...managers
            ]
        }
        ])
}

async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
        .prompt([{
            type: "list",
            message: "Which employee do you want to remove?",
            name: "employeeName",
            choices: [
                // populate from db
                ...employees
            ]
        }])
}

async function getDepartmentInfo() {
    return inquirer
        .prompt([{
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }])
}

async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
        .prompt([{
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [
                // populate from db
                ...departments
            ]
        }
        ])
}

async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([{
            type: "list",
            message: "Which employee do you want to update?",
            name: "employeeName",
            choices: [
                // populate from db
                ...employees
            ]
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices: [
                // populate from db
                ...roles
            ]
        }
        ])

}

async function main() {
    let exitLoop = false;
    while (!exitLoop) {
        const prompt = await mainPrompt();

        switch (prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }

            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0); // successful exit
                return;
            }

            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}

// Close your database connection when Node exits
process.on("exit", async function (code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();

//mysql
//npm i 
//npm i nodemon
//npm i express
//npm i dotenv
//npm i node
//npm i mysql2
//npm i inquirer
//npm i console.table
//const cTable = require('console.table');
//npm i node@lts
//npm i node
//npm i mysql

//https://www.npmjs.com/package/nodemon
//https://www.npmjs.com/package/dotenv
//https://www.npmjs.com/package/express
//https://www.npmjs.com/package/node
//https://www.npmjs.com/package/mysql2
//https://www.npmjs.com/package/inquirer
//https://www.npmjs.com/package/console.table
//https://dev.mysql.com/doc/refman/8.0/en/connecting-disconnecting.html
