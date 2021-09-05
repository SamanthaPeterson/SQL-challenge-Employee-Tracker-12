//npm i 
//npm i nodemon
//npm i express
//npm i dotenv
//npm i node
//npm i mysql2
//npm i inquirer
//npm i console.table
//const cTable = require('console.table');


//https://www.npmjs.com/package/nodemon
//https://www.npmjs.com/package/dotenv
//https://www.npmjs.com/package/express
//https://www.npmjs.com/package/node
//https://www.npmjs.com/package/mysql2
//https://www.npmjs.com/package/inquirer
//https://www.npmjs.com/package/console.table

// Dependencies
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const nodemon = require("nodemon");
const mysql2 = require("mysql2");

const cTable = require('cTable');
const inquirer = require("inquirer");



class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err ) {
                  console.log(err.sql);
                  console.log("");
                  return reject( err );
              }
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

module.exports = Database;
