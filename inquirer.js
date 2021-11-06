



function employeeInquirer(titles) {
  inquirer.prompt([
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
    // {
    //   type: "list",
    //   name: "manager",
    //   message: "Who will be their manager?",
    //   choices: managers,
    // },
  ]);
}



module.exports = employeeInquirer();