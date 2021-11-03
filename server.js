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
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
        "Exit Program",
      ],
    })
    .then((data) => {
      if (data.usersChoice === "View all departments") {
        db.query("SELECT * FROM department", function (err, results) {
          console.log(results);
          questionPrompts();
        });
      } else if (data.usersChoice === "View all roles") {
        db.query("SELECT * FROM role", function (err, results) {
          console.log(results);
          questionPrompts();
        });
      } else if (data.usersChoice === "View all employees") {
        db.query("SELECT * FROM employee", function (err, results) {
          console.log(results);
          questionPrompts();
        });
      } else if (data.usersChoice === "Exit Program") {
        console.log("See ya later");
        process.exit();
      } else if (data.usersChoice === "Add a department") {
        addDepartment();
      } else if (data.usersChoice === "Add a role") {
        addRole();
      } else if (data.usersChoice === "Add an employee") {
        addEmployee();
      } else if (data.usersChoice === "Update an employee") {
        updateEmployee();
      }
    });
}

// ADD AN EMPLOYEE FUNCTION
function addEmployee() {
  // const managers =[];
  // db.query(SELECT * )
  // select all employees innerjoin role id onto roles table
  // WHERE role.title = managers
  // add managers, ids, and department name from the role table into the managers array
  // use managers array as the choices for the inquirer prompt question
  db.query(
    "SELECT role.title, role.id, department.name AS Department_name FROM role INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      const titles = results.map((element) => {
        return {
          name: `${element.title} from ${element.Department_name}`,
          value: element.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "What role do they have?",
            choices: titles,
          },
          {
            type: "input",
            name: "firstName",
            message: "Whatis their first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is their last name?",
          },
        ])
        .then((data) => {
          console.log(data);
          questionPrompts();
        });
    }
  );
}

// ADDs A DEPARTMENT FUNCTION
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the new department name?",
    })
    .then((data) => {
      db.query(
        `INSERT INTO department(id, name) VALUES (id, "${data.department}")`,
        function (err, results) {
          console.log(`\n You just added the ${data.department} department.`);
        });
      questionPrompts();
    });
}

// ADD A ROLE FUNCTION
function addRole() {
  db.query(
    "SELECT role.title, role.id, department.name AS Department_name FROM role INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      const titles = results.map((element) => {
        return {
          name: `${element.title} from ${element.Department_name}`,
          value: element.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "What role do they have?",
            choices: titles,
          },
          {
            type: "input",
            name: "firstName",
            message: "Whatis their first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is their last name?",
          },
        ])
        .then((data) => {
          console.log(data);
          questionPrompts();
        });
    }
  );
}

questionPrompts();
