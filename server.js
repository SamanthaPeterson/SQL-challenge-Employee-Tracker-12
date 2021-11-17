//const express = require('express');
const connection = require('./db/connection');

const inquirer = require('inquirer');
const cTable = require('console.table');

//const validate = require('./javascript/validate');

connection.connect((error) => {
  if (error) throw error;
  console.log(``);

  promptUser();
});

// Prompt User for Choices
const promptUser = () => {
  inquirer.prompt([{
    name: 'choices',
    type: 'list',
    message: 'Please select an option:',
    choices: [
      'Show All Employees',
      'Show Job_titles',
      'Show All Departments',
      'View Employee By Department',
      'Update Employee',
      'Update Manager',
      'Add Employee',
      'Add Job_title',
      'Add Department',
      'Delete Employee',
      'Delete Job_title',
      'Remove Department',
      'Exit'
    ]
  }])
    .then((answers) => {
      const {
        choices
      } = answers;

      if (choices === 'Show All Employees') {
        showAllEmployees();
        //  promptUser();
      }


      if (choices === 'Show All Departments') {
        showAllDepartments();
        //promptUser();
      }

      if (choices === 'View Employee By Department') {
        viewEmployeeByDepartment();
        //promptUser();
      }

      if (choices === 'Add Employee') {
        addEmployee();
        //promptUser();
      }

      if (choices === 'Delete Employee') {
        deleteEmployee();
        //promptUser();
      }

      if (choices === 'Update Employee') {
        updateEmployee();
        //promptUser();
      }

      if (choices === 'Update Manager') {
        updateManager();
        //promptUser();
      }

      if (choices === 'Show Job_titles') {
        showJob_titles();
        //promptUser();
      }

      if (choices === 'Add Job_title') {
        addJob_title();
        //promptUser();
      }

      if (choices === 'Delete Job_title') {
        deleteJob_title();
        //promptUser();
      }

      if (choices === 'Add Department') {
        addDepartment();
        //promptUser();
      }

      if (choices === 'Remove Department') {
        removeDepartment();
        //promptUser();
      }

      if (choices === 'Exit') {
        connection.end();
      }
    });
};

// function to show all employees 
const showAllEmployees = () => {
  console.log('Showing all employees...\n');
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      job_title.title, 
                      department.name AS department,
                      job_title.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
                      FROM employee
                      LEFT JOIN job_title ON employee.job_title_id = job_title.id
                      LEFT JOIN department ON job_title.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql).then(([rows]) => {
    console.table(rows);
    promptUser();
  })

};

// function to show all job_titles 
const showJob_titles = () => {
  console.log('Showing all job_titles...\n');

  const sql = `SELECT job_title.id, job_title.title, department.name AS department
              FROM job_title
              INNER JOIN department ON job_title.department_id = department.id`;

  connection.promise().query(sql).then(([rows]) => {
    console.table(rows);
    promptUser();
  })
};


// function to show all departments 
const showAllDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  // connection.promise().query(sql, (err, rows) => {
  //   if (err) throw err;
  //   console.table(rows);
  //   promptUser();
  // });
  connection.promise().query(sql).then(([rows]) => {
    console.table(rows);
    promptUser();
  })
};

// function to add an employee 
const addEmployee = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'fistName',
    message: "What is the employee's first name?",
    validate: addFirst => {
      if (addFirst) {
        return true;
      } else {
        console.log('Please enter a first name');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's last name?",
    validate: addLast => {
      if (addLast) {
        return true;
      } else {
        console.log('Please enter a last name');
        return false;
      }
    }
  }
  ])
    .then(answer => {
      const params = [answer.fistName, answer.lastName]
      const job_titleSql = `SELECT * FROM job_title`;

      connection.query(job_titleSql, (err, data) => {
        if (err) throw err;

        const job_titles = data.map(({
          id,
          title
        }) => ({
          name: title,
          value: id
        }));
        inquirer.prompt([{
          type: 'list',
          name: 'job_title',
          message: "What is the employee's job_title?",
          choices: job_titles
        }])
          .then(job_titleChoice => {
            const job_title = job_titleChoice.job_title;
            params.push(job_title);
            const employeeSql = `SELECT * FROM employee`;

            connection.query(employeeSql, (err, data) => {
              if (err) throw err;

              const employees = data.map(({
                id,
                first_name,
                last_name
              }) => ({
                name: first_name + " " + last_name,
                value: id
              }));

              inquirer.prompt([{
                type: 'list',
                name: 'name',
                message: "Who is the manager?",
                choices: employees
              }])
                .then(empChoice => {
                  const employee = empChoice.name;
            
                  params.push(employee);

                  // console.log(params)

                  const sql = `INSERT INTO employee (first_name, last_name, job_title_id, manager_id) VALUES (?,?,?,?)`;

                  connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");

                    showAllEmployees();
                  });
                });
            });
          });
      });
    })
}

const updateEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({
      id,
      first_name,
      last_name
    }) => ({
      name: first_name + " " + last_name,
      value: id
    }));

    inquirer.prompt([{
      type: 'list',
      name: 'name',
      message: "Which employee would you like to update?",
      choices: employees
    }])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const job_titleSql = `SELECT * FROM job_title`;

        connection.query(job_titleSql, (err, data) => {
          if (err) throw err;

          const job_titles = data.map(({
            id,
            title
          }) => ({
            name: title,
            value: id
          }));

          inquirer.prompt([{
            type: 'list',
            name: 'job_title',
            message: "What is the employee's new job_title?",
            choices: job_titles
          }])
            .then(job_titleChoice => {
              const job_title = job_titleChoice.job_title;
              params.push(job_title);

              let employee = params[0]
              params[0] = job_title
              params[1] = employee


              // console.log(params)

              const sql = `UPDATE employee SET job_title_id = ? WHERE id = ?`;

              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                showAllEmployees();
              });
            });
        });
      });
  });
}


// function to delete employees
const deleteEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({
      id,
      first_name,
      last_name
    }) => ({
      name: first_name + " " + last_name,
      value: id
    }));

    inquirer.prompt([{
      type: 'list',
      name: 'name',
      message: "Which employee would you like to delete?",
      choices: employees
    }])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");

          showAllEmployees();
        });
      });
  });
};


// function to update an employee 
const updateManager = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({
      id,
      first_name,
      last_name
    }) => ({
      name: first_name + " " + last_name,
      value: id
    }));

    inquirer.prompt([{
      type: 'list',
      name: 'name',
      message: "Which employee would you like to update?",
      choices: employees
    }])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        inquirer.prompt([{
          type: 'list',
          name: 'manager',
          message: "What is the employee's new manager?",
          choices: employees
        }])
          .then(managerChoice => {

            const employee = managerChoice.manager;
            params.push(employee);

            let employee1 = params[0]
            params[0] = employee
            params[1] = employee1


            // console.log(params)

            const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Employee has been updated!");

              showAllEmployees();
            });
          });
      });

  });
}



// function to add a job_title 
const addJob_title = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'job_title',
    message: "What job_title do you want to add?",
    validate: addJob_title => {
      if (addJob_title) {
        return true;
      } else {
        console.log('Please enter a job_title');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'salary',
    message: "What is the salary of this job_title?",
    validate: addSalary => {
      if (!isNaN(addSalary)) {
        return true;
      } else {
        console.log('Please enter a salary');
        return false;
      }
    }
  }
  ])
    .then(answer => {
      const params = [answer.job_title, answer.salary];

      // grab dept from department table
      const job_titleSql = `SELECT name, id FROM department`;

      connection.query(job_titleSql, (err, data) => {
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
          message: "What department is this job_title in?",
          choices: dept
        }])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO job_title (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.job_title + " to job_titles!");

              showJob_titles();
            });
          });
      });
    });
};

// grab job_titles from job_titles table
const job_titleSql = `SELECT job_title.id, job_title.title FROM job_title`;

// connection.query(job_titleSql, (err, data) => {
//   if (err) throw err;

//   const job_titles = data.map(({
//     id,
//     title
//   }) => ({
//     name: title,
//     value: id
//   }));

//   inquirer.prompt([{
//     type: 'list',
//     name: 'job_title',
//     message: "What is the employee's job_title?",
//     choices: job_titles
//   }])
//     .then(job_titleChoice => {
//       const job_title = job_titleChoice.job_title;
//       params.push(job_title);

//       const managerSql = `SELECT * FROM employee`;

//       connection.promise().query(managerSql, (err, data) => {
//         if (err) throw err;

//         const managers = data.map(({
//           id,
//           first_name,
//           last_name
//         }) => ({
//           name: first_name + " " + last_name,
//           value: id
//         }));

//         // console.log(managers);

//         inquirer.prompt([{
//           type: 'list',
//           name: 'manager',
//           message: "Who is the employee's manager?",
//           choices: managers
//         }])
//           .then(managerChoice => {
//             const manager = managerChoice.manager;
//             params.push(manager);

//             const sql = `INSERT INTO employee (first_name, last_name, job_title_id, manager_id)
//                     VALUES (?, ?, ?, ?)`;

//             connection.query(sql, params, (err, result) => {
//               if (err) throw err;
//               console.log("Employee has been added!")

//               showEmployees();
//             });
//           });
//       });
//     });
// });


// function to delete job_title
const deleteJob_title = () => {
  const job_titleSql = `SELECT * FROM job_title`;

  connection.query(job_titleSql, (err, data) => {
    if (err) throw err;

    const job_title = data.map(({
      title,
      id
    }) => ({
      name: title,
      value: id
    }));

    inquirer.prompt([{
      type: 'list',
      name: 'job_title',
      message: "What job_title do you want to delete?",
      choices: job_title
    }])
      .then(job_titleChoice => {
        const job_title = job_titleChoice.job_title;
        const sql = `DELETE FROM job_title WHERE id = ?`;

        connection.query(sql, job_title, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showJob_titles();
        });
      });
  });
};



// function to add a department 
const addDepartment = () => {
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

        showAllDepartments();
      });
    });
};


// function to view employee by department
const viewEmployeeByDepartment = () => {
  console.log('Showing employee by departments...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
              FROM employee 
              LEFT JOIN job_title ON employee.job_title_id = job_title.id 
            LEFT JOIN department ON job_title.department_id = department.id`;

  connection.query(sql, (err, rows) => {
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
const removeDepartment = () => {
  const deptSql = `SELECT * FROM department`;

  connection.query(deptSql, (err, data) => {
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

          showAllDepartments();
        });
      });
  });
};


//module.exports = { promptUser }