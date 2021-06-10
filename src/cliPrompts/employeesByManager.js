const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

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

module.exports = promptEmployeesByManager;
