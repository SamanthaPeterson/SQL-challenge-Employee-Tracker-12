//const express = require('express');
const connection = require('./db/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//const validate = require('./javascript/validate');

const {
  removeDepartment,
  viewEmployeeByDepartment
  addDepartment,
  showDepartments,
  showAllDepartments
} = require('./Modles/models/department')

const {
  deleteEmployee, 
  updateEmployee, 
  addEmployee, 
  updateManager,
  showAllEmployees
} = require('./Modles/models/employee')

const {
  deleteJob_title,
  addJob_title,
  showJob_titles
} = require('./Modles/models/job_title')

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
        'View All Job_titles',
        'View All Departments',
        'View All Employees By Department',
        'View Department Budgets',
        'Update Employee',
        'Update Manager',
        'Add Employee',
        'Add Job_title',
        'Add Department',
        'Remove Employee',
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

      if (choices === 'View All Employees') {
        viewAllEmployees();
      }

      if (choices === 'Show All Departments') {
        showDepartments();
      }

      if (choices === 'View All Employees By Department') {
        viewEmployeesByDepartment();
      }

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
module.exports = {promptUser}