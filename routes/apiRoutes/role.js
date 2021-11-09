const db = require('../../db/connection');
const connection = require('./config/connection');

const inputCheck = require('../../utils/inputCheck');

// function to show all roles 
showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

// function to add a role 
addRole = () => {
  inquirer.prompt([{
        type: 'input',
        name: 'role',
        message: "What role do you want to add?",
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.log('Please enter a role');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the salary of this role?",
        validate: addSalary => {
          if (isNAN(addSalary)) {
            return true;
          } else {
            console.log('Please enter a salary');
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT name, id FROM department`;

      connection.promise().query(roleSql, (err, data) => {
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
            message: "What department is this role in?",
            choices: dept
          }])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!");

              showRoles();
            });
          });
      });
    });
};

// grab roles from roles table
const roleSql = `SELECT role.id, role.title FROM role`;

connection.promise().query(roleSql, (err, data) => {
if (err) throw err;

const roles = data.map(({
  id,
  title
}) => ({
  name: title,
  value: id
}));

inquirer.prompt([{
    type: 'list',
    name: 'role',
    message: "What is the employee's role?",
    choices: roles
  }])
  .then(roleChoice => {
    const role = roleChoice.role;
    params.push(role);

    const managerSql = `SELECT * FROM employee`;

    connection.promise().query(managerSql, (err, data) => {
      if (err) throw err;

      const managers = data.map(({
        id,
        first_name,
        last_name
      }) => ({
        name: first_name + " " + last_name,
        value: id
      }));

      // console.log(managers);

      inquirer.prompt([{
          type: 'list',
          name: 'manager',
          message: "Who is the employee's manager?",
          choices: managers
        }])
        .then(managerChoice => {
          const manager = managerChoice.manager;
          params.push(manager);

          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log("Employee has been added!")

            showEmployees();
          });
        });
    });
  });
});
});
};


// function to delete role
deleteRole = () => {
  const roleSql = `SELECT * FROM role`;

  connection.promise().query(roleSql, (err, data) => {
    if (err) throw err;

    const role = data.map(({
      title,
      id
    }) => ({
      name: title,
      value: id
    }));

    inquirer.prompt([{
        type: 'list',
        name: 'role',
        message: "What role do you want to delete?",
        choices: role
      }])
      .then(roleChoice => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showRoles();
        });
      });
  });
};