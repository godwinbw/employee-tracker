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

// add department questions
const questions = [
  {
    name: "name",
    type: "input",
    message: "What is the department's name (Required) ?",
    validate: validateInputEntry,
  },
];

const promptAddDepartment = function () {
  return inquirer.prompt(questions).then(function (answer) {
    return department.add(answer.name).finally(() => {
      return true;
    });
  });
};

module.exports = promptAddDepartment;
