const inquirer = require("inquirer");
const Department = require("../model/Department");

const department = new Department();

// this function will ensure that a question has an answer provided by the user
const validateInputEntry = function (input) {
  if (input) {
    return true;
  } else {
    console.log("This entry is required.  Try again.");
    return false;
  }
};

// overall command line interface flow control
// Selection questions
const overallQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "selection",
    choices: [
      "1. View all departments",
      "2. View all roles",
      "3. View all employees",
      "4. View all employees by manager",
      "5. View all employees by department",
      "6. View total utilized budget of a department",
      "7. Add a department",
      "8. Delete a department",
      "9. Add a role",
      "10. Delete a role",
      "11. Add an employee",
      "12. Delete an employee",
      "13. Update an employee role",
      "14. Update an employee's manager",
      "15. Exit",
    ],
  },
];

const promptOverall = function () {
  return inquirer.prompt(overallQuestions).then(async function (answer) {
    //console.log(answer);
    if (answer.selection === "1. View all departments") {
      return await department.getAll();
    } else if (answer.selection === "15. Exit") {
      return false;
    }
  });
};

const cli = async function () {
  // start accepting user input until they exit
  do {
    keepGoing = await promptOverall();
  } while (keepGoing);

  // now exit
  process.kill(process.pid, "SIGTERM");
};

module.exports = cli;
