
const db = require('../../db/connection');
const connection = require('./config/connection');

// function to show all departments 
showDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};


// function to add a department 
addDepartment = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log('Please enter a department');
          return false;
        }
      }
    }])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!");

        showDepartments();
      });
    });
};


// function to view employee by department
employeeDepartment = () => {
  console.log('Showing employee by departments...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// function to delete department
deleteDepartment = () => {
  const deptSql = `SELECT * FROM department`;

  connection.promise().query(deptSql, (err, data) => {
    if (err) throw err;

    const dept = data.map(({
      name,
      id
    }) => ({
      name: name,
      value: id
    }));

    inquirer.prompt([{
        type: 'list',
        name: 'dept',
        message: "What department do you want to delete?",
        choices: dept
      }])
      .then(deptChoice => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        connection.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showDepartments();
        });
      });
  });
};


