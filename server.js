const mysql = require("mysql2");
const inquirer = require("inquirer");
const Table = require("console.table");

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
          console.table(results);
          questionPrompts();
        });
      }
      // Needs to show the name of the dept that it belongs to
      else if (data.usersChoice === "View all roles") {
        db.query("SELECT * FROM role", function (err, results) {
          console.table(results);
          questionPrompts();
        });
      }
      // NEEDS TO SHOW MANAGERS and dept names instead of the numbers
      else if (data.usersChoice === "View all employees") {
        db.query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,role.department_id FROM employee JOIN role ON employee.role_id = role.id",
          function (err, results) {
            console.table(results);
            questionPrompts();
          }
        );
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
          
          // needs to be able to add the employee to employee table when a new employee is created!!
          db.query(
            `INSERT INTO employee (first_name, lastname, role_id) VALUES (${data.firstName}, ${data.lastName}, ${data.id}) JOIN role on employee.role_id = role_id )`,
            function (err, results) {
              if(err){
                console.log(err)
              }
              console.log(`\n You just added a ${data.firstName} as a new employee`);
              console.log()
              
            }
          );
          // console.log(data);
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
        }
      );
      questionPrompts();
    });
}

// ADD A ROLE FUNCTION
function addRole() {
  db.query("SELECT name, id FROM department", function (err, results) {
    const departmentNames = results.map((dept) => {
      return {
        name: dept.name,
        value: dept.id,
      };
    });
    // console.log(departmentNames)
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the new title?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the new role's salary?",
        },
        {
          type: "list",
          name: "department",
          message: "What department will this role take place in?",
          choices: departmentNames,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", ${data.department})  `,
          function (err, results) {
            console.log(departmentNames);
            console.log(
              `\n You just added ${data.title} with a salary of ${data.salary} as a new role`
            );
            return results;
          }
        );
        questionPrompts();
      });
  });
}

questionPrompts();
