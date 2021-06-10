const inquirer = require("inquirer");
const Department = require("../model/Department");
const Role = require("../model/Role");
const Employee = require("../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

// this function will ensure that a question has an answer provided by the user
const validateInputEntry = function (input) {
  if (input) {
    return true;
  } else {
    console.log("This entry is required.  Try again.");
    return false;
  }
};

/// select manager
const managerQuestions = [
  {
    type: "list",
    message: "Which manager do you want to view employees for?",
    name: "selection",
  },
];

const promptEmployeesByManager = function () {
  // get all managers
  //console.log("ok, going to prompt for managers");
  return employee
    .getAllManagersForChoices()
    .then((managers) => {
      // populate the managerQuestions with the manager list from the database
      managerQuestions[0].choices = managers;
      //console.log("got managers");
      //console.log(managers);
      // now ask the user to chooose which manager they want
      return inquirer
        .prompt(managerQuestions)
        .then((answer) => {
          // get all employers for this manager
          //console.log(answer);
          return employee.getAllByManagerId(answer.selection).finally(() => {
            return true;
          });
        })
        .finally(() => {
          return true;
        });
    })
    .catch((err) => {
      //console.log(err);
      //console.log("...had an error getting all manangers");
      return true;
    });
};

/// select department
const departmentQuestions = [
  {
    type: "list",
    message: "Which department do you want to view employees for?",
    name: "selection",
  },
];

const promptEmployeesByDepartment = function () {
  // get all departments
  console.log("ok, going to prompt for managers");
  return department
    .getAllForChoices()
    .then((departments) => {
      // populate the departmentQuetions with the department list from the database
      departmentQuestions[0].choices = departments;
      console.log("got departments");
      console.log(departments);
      // now ask the user to chooose which department they want
      return inquirer
        .prompt(departmentQuestions)
        .then((answer) => {
          // get all employers for this department
          console.log(answer);
          return employee.getAllByDepartmentId(answer.selection).finally(() => {
            return true;
          });
        })
        .finally(() => {
          return true;
        });
    })
    .catch((err) => {
      //console.log(err);
      //console.log("...had an error getting all manangers");
      return true;
    });
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
    } else if (answer.selection === "2. View all roles") {
      return await role.getAll();
    } else if (answer.selection === "3. View all employees") {
      return await employee.getAll();
    } else if (answer.selection === "4. View all employees by manager") {
      return promptEmployeesByManager();
    } else if (answer.selection === "5. View all employees by department") {
      return promptEmployeesByDepartment();
    } else if (
      answer.selection === "6. View total utilized budget of a department"
    ) {
      console.log("need to do this");
    } else if (answer.selection === "15. Exit") {
      return false;
    }
  });
};

const cli = function () {
  return new Promise(async function (resolve, reject) {
    // start accepting user input until they exit
    do {
      keepGoing = await promptOverall();
    } while (keepGoing);

    // user wants to exit
    resolve(true);
  });
};

module.exports = cli;
