const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "app",
    // Your MySQL password
    password: "shoe",
    database: "employee_tracker",
  }
  //console.log("Connected to the employee_tracker database.")
);

module.exports = db;
