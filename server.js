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
        'Update Employee Role',
        'Update Employee Manager',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Remove Employee',
        'Remove Role',
        'Remove Department',
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

      // if (choices === 'Add Employee') {
      //   addEmployee();
      // }

      // if (choices === 'Remove Employee') {
      //   removeEmployee();
      // }

      // if (choices === 'Update Employee Role') {
      //   updateEmployeeRole();
      // }

      // if (choices === 'Update Employee Manager') {
      //   updateEmployeeManager();
      // }

      // if (choices === 'View All Roles') {
      //   viewAllRoles();
      // }

      // if (choices === 'Add Role') {
      //   addRole();
      // }

      // if (choices === 'Remove Role') {
      //   removeRole();
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