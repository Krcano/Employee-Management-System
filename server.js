const mysql = require("mysql2");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "KSQLserver2021#",
    database: "business_db",
  },
  console.log(`Connected to the business_db database.`)
);

function questionPrompts() {
  inquirer
    .prompt({
      type: "list",
      name: "usersChoice",
      message: "What would you like to do first?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee",
      ],
    })
    .then((data) => {
      if (data.usersChoice === "view all departments") {
        db.query("SELECT * FROM departments", function (err, results) {
          console.log(results);
        });
      } else if (data.usersChoice === "view all roles") {
        db.query("SELECT * FROM roles", function (err, results) {
          console.log(results);
        });
      } else if (data.usersChoice === "view all employees") {
        db.query("SELECT * FROM employees", function (err, results) {
          console.log(results);
        });
      }
    });
}

