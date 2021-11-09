const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KSQLserver2021#",
  database: "business_db",
});

// Initial Prompt
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
      } else if (data.usersChoice === "View all roles") {
        db.query(
          "SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id",
          function (err, results) {
            console.table(results);
            questionPrompts();
          }
        );
      } else if (data.usersChoice === "View all employees") {
        db.query(
          `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
          FROM employee  LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`,
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
        updateEmployeeRole();
      }
    });
}

function addEmployee() {
  db.query(
    "SELECT employee.first_name, employee.last_name, employee.id AS employee_id, role.title, role.id FROM role LEFT JOIN employee On employee.role_id = role.id  ",
    function (err, results) {
      console.log(results);
      const titles = results.map((element) => {
        return {
          name: element.title,
          value: element.id,
        };
      });
      const managers = results.map((names)=>{
        
        return {
          name: `${names.first_name} ${names.last_name}`,
          value: names.employee_id,
        }
        
      })
      console.log(managers)
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
          {
            type:"list",
            name: "manager",
            message: "Who is their manager?",
            choices: managers,
          }
        ])
        .then((data) => {
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.role}, ${data.manager})`,
            function (err, results) {
              if (err) {
                console.log(err);
              }
              console.log(
                `\n You just added a ${data.firstName} as a new employee`
              );
            }
          );
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
          }
        );
        questionPrompts();
      });
  });
}

// UPDATING EMPLOYEE
function updateEmployeeRole() {
  db.query(
    "SELECT role.title, employee.* FROM employee LEFT JOIN role ON role.id = employee.role_id",
    function (err, results) {
      console.log(results);
      const names = results.map((element) => {
        return {
          name: `${element.first_name} ${element.last_name}`,
          value: element.id,
        };
      });
      const roles = results.map((element) => {
        return { name: element.title, value: element.role_id };
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "name",
            message: "Which employee would you like to change",
            choices: names,
          },
          {
            type: "list",
            name: "role",
            message: "What is their new role?",
            choices: roles,
          },
        ])
        .then((data) => {
          db.query(
            `UPDATE employee SET role_id = "${data.role}" WHERE employee.id = ${data.name}`,

            console.log(data)
          );
          questionPrompts();
        });
    }
  );
}

questionPrompts();
