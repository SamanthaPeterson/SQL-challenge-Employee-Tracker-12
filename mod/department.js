
//const db = require('../../db/connection');
const connection = require('../../db/connection.js');
require('console.table') 

// function to show all departments 
showAllDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  // connection.promise().query(sql, (err, rows) => {
  //   if (err) throw err;
  //   console.table(rows);
  //   promptUser();
  // });
  connection.promise().query(sql).then(([rows])  => {
    console.table(rows);
  })
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
viewEmployeeByDepartment = () => {
  console.log('Showing employee by departments...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
              FROM employee 
              LEFT JOIN job_title ON employee.job_title_id = job_title.id 
            LEFT JOIN department ON job_title.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

//view employee by department
// viewEmployeeByDepartment = () => {
//   console.log("Viewing employees by department\n");

//   var query =
//     `SELECT d.id, d.name, r.salary AS budget
//   FROM employee e
//   LEFT JOIN role r
// 	ON e.role_id = r.id
//   LEFT JOIN department d
//   ON d.id = r.department_id
//   GROUP BY d.id, d.name`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const departmentChoices = res.map(data => ({
//       value: data.id, name: data.name
//     }));

//     console.table(res);
//     console.log("Department view succeed!\n");

//     promptDepartment(departmentChoices);
//   });
// }


// function to delete department
removeDepartment = () => {
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

//  'View All Departments',--Done
  // 'View All Employees By Department',--done
      //      'Add Department', --done
      // 'Remove Department', -- done


  mod.exports = {
  showAllDepartments, removeDepartment, 
  addDepartment, viewEmployeeByDepartment
}