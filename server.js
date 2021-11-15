//const express = require('express');
const connection = require('./db/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//const validate = require('./javascript/validate');

const {
  removeDepartment,
  viewEmployeeByDepartment,
  addDepartment,
  showAllDepartments
} = require('./constructor/department')

const {
  deleteEmployee, 
  updateEmployee, 
  addEmployee, 
  updateManager,
  showAllEmployees
} = require('./constructor/employee')

const {
  deleteJob_title,
  addJob_title,
  showJob_titles
} = require('./constructor/job_title')

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
        'View Department Budgets',
        'Update Employee',
        'Update Manager',
        'Add Employee',
        'Add Job_title',
        'Add Department',
        'Delete Employee',
        'Delete Job_title',
        'Remove Department',
        'show Job titles',
        'Exit'
      ]
    }])
    .then((answers) => {
      const {
        choices
      } = answers;

      if (choices === 'Show All Employees') {
        showAllEmployees();
      }
    

      if (choices === 'Show All Departments') {
        showAllDepartments();
        promptUser();
      }

      if (choices === 'View All Employees By Department') {
        viewEmployeesByDepartment();
      }

      if (choices === 'Add Employee') {
        addEmployee();
      }

      if (choices === 'Remove Employee') {
        deleteEmployee();
      }

      if (choices === 'Update Employee') {
        updateEmployee();
      }

      if (choices === 'Update Manager') {
        updateManager();
      }

      if (choices === 'Show Job_titles') {
        showJob_titles();
      }

      if (choices === 'Add Job_title') {
        addJob_title();
      }

      if (choices === 'Delete Job_title') {
        deleteJob_title();
      }

      if (choices === 'Add Department') {
        addDepartment();
      }

      if (choices === 'Remove Department') {
      removeDepartment();
      }

      if (choices === 'Exit') {
        connection.end();
      }
    });
};
constructor.exports = {promptUser}