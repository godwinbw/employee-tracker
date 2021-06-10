const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

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

// this function will validate numeric input is in range of 0 to 999,999
const validateSalaryInputEntry = function (input) {
  if (input) {
    let salary = parseFloat(input);
    if (salary < 0) {
      console.log("The salary must be greater than 0.00.  Try again.");
    } else if (salary > 999999.0) {
      console.log("The salary must be less than 999999.00. Try again.");
    } else {
      return true;
    }
  } else {
    console.log("This entry is required.  Try again.");
    return false;
  }
};

// add role questions
const questions = [
  {
    name: "title",
    type: "input",
    message: "What is role's title (Required) ?",
    validate: validateInputEntry,
  },
  {
    name: "salary",
    type: "input",
    message: "What is role's salary (Required) ?",
    validate: validateSalaryInputEntry,
  },
  {
    type: "list",
    message: "What department does the role belong to?",
    name: "departmentId",
    // will add choices programmatically
  },
];

const promptAddRole = function () {
  // first get all departments
  return department
    .getAllForChoices()
    .then((departments) => {
      // populate the departmentQuetions with the department list from the database
      questions[2].choices = departments;

      return inquirer.prompt(questions).then(function (answer) {
        return role
          .add(answer.title, answer.salary, answer.departmentId)
          .finally(() => {
            return true;
          });
      });
    })
    .catch((err) => {
      //console.log(err);
      //console.log("...had an error getting all manangers");
      return true;
    });
};

module.exports = promptAddRole;
