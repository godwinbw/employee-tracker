const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

/// select department for deletion
const questions = [
  {
    type: "list",
    message: "Which employee do you want to delete?",
    name: "selection",
  },
];

const promptDeleteEmployee = function () {
  // get all roles
  //console.log("ok, going to prompt for managers");
  return employee
    .getAllEmployeesForChoices()
    .then((employees) => {
      // populate the questions with the role list from the database
      questions[0].choices = employees;
      //console.log("got departments");
      //console.log(departments);
      // now ask the user to chooose which department they want
      return inquirer
        .prompt(questions)
        .then((answer) => {
          // get all employers for this department
          //console.log(answer);
          return employee.deleteById(answer.selection).finally(() => {
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

module.exports = promptDeleteEmployee;
