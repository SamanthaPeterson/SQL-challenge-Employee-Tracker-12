//do i have everything i need for a manager role? 

//const db = require('../../db/connection');
const connection = require('../../db/connection');
require('console.table') 

//const inputCheck = require('../../utils/inputCheck');

// function to show all employees 
showAllEmployees = () => {
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

  connection.promise().query(sql).then(([rows])  => {
    console.table(rows);
  })

};

// function to add an employee 
addEmployee = () => {
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
      })
    }

// function to update an employee 
updateEmployee = () => {
    // get employees from employee table 
    const employeeSql = `SELECT * FROM employee`;

    connection.promise().query(employeeSql, (err, data) => {
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

          connection.promise().query(job_titleSql, (err, data) => {
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

                  showEmployees();
                });
              });
          });
        });
    });
  }

// function to delete employees
deleteEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
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

          showEmployees();
        });
      });
  });
};


// function to update an employee 
updateManager = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

    connection.promise().query(sql).then(([rows])  => {
    console.table(rows);
  })
};

    //  'show All Employees',-
  // 'View All Employees By Department',
  // 'Update Employee',  --done
      // 'Update Manager',-
  //   'Add Employee',--done
  // 'Remove Employee', 


      constructor.exports = {
  deleteEmployee, updateEmployee, addEmployee, updateManager, showAllEmployees
}