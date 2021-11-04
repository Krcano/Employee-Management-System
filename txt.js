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
        // Needs to show additional info like title dept salary and manager name
        else if (data.usersChoice === "View all employees") {
          db.query("SELECT  FROM employee", function (err, results) {
            console.table(results);
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
  
  db.query(
      "INSERT INTO employee(first_name, last_name, manager_id) SELECT salary, title FROM role INNER JOIN role ON employee.role_id = role.title ",
      function (err, results) {
        const info = results.map((element) => {
          console.table(element);
          return element;
        })})
  
  
      //   INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, role.department_id) INNER JOIN department ON role.department_id = department.id
  
  
  
  
  
  
      
      // db.query("SELECT name, id FROM department", function (err, results) {
      // const departmentNames = results.map((dept) => {
      //     return{
      //       name: dept.name,
      //       value: dept.id,
      //     }
      //   });


      // FOR VIEW ALL EMPLOYEES QUERY
      // SELECT employee.*, role.title, role.salary,role.department_id FROM employee JOIN role ON employee.role_id = role.id
      
      
      // SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,role.department_id FROM employee JOIN role ON employee.role_id = role.id


      // FOR VIEW ALL ROLES
      //   else if (data.usersChoice === "View all roles") {
      //   db.query("SELECT * FROM role", function (err, results) {
      //     console.table(results);
      //     questionPrompts();
      //   });
      // }