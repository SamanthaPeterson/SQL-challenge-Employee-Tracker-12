//const express = require('express');
const connection = require('./db/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//const validate = require('./javascript/validate');

const {
  deleteDepartment,
  employeeDepartment,
  addDepartment,
  showDepartments
} = require('./Modles/models/department')

const {
  deleteEmployee, 
  updateEmployee, 
  addEmployee, 
  updateManager
} = require('./Modles/models/employee')

const {
  deleteRole,
  addRole,
  showRoles
} = require('./Modles/models/employee')

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
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'View All Employees By Department',
        'View Department Budgets',
        'Update Employee',
        'Update Manager',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Remove Employee',
        'Delete Role',
        'Remove Department',
        'showRoles',
        'Exit'
      ]
    }])
    .then((answers) => {
      const {
        choices
      } = answers;

      // if (choices === 'View All Employees') {
      //   viewAllEmployees();
      // }

      if (choices === 'View All Departments') {
        showDepartments();
      }

      // if (choices === 'View All Employees By Department') {
      //   viewEmployeesByDepartment();
      // }

      if (choices === 'Add Employee') {
        addEmployee();
      }

      if (choices === 'Remove Employee') {
        removeEmployee();
      }

      if (choices === 'Update Employee') {
        updateEmployee();
      }

      if (choices === 'Update Manager') {
        updateManager();
      }

      // if (choices === 'Show Roles') {
      //   showRoles();
      // }

      if (choices === 'Add Role') {
        addRole();
      }

      // if (choices === 'Delete Role') {
      //   deleteRole();
      // }

      if (choices === 'Add Department') {
        addDepartment();
      }

      if (choices === 'Remove Department') {
       deleteDepartment();
      }

      if (choices === 'Exit') {
        connection.end();
      }
    });
};
module.exports = {promptUser}