
// Dependencies
import { createConnection } from 'mysql2';
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";

// import nodemon from "nodemon";
// import mysql2 from "mysql2";

// import cTable from 'cTable';
// import inquirer from "inquirer";



class Database {
  constructor( config ) {
      this.connection = createConnection( config );
  }
  // //creating a new promise & error handling
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

export default Database;


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
