const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

/// select department for budget
const departmentBudgetQuestions = [
  {
    type: "list",
    message: "Which department do you want to view total utlized budget?",
    name: "selection",
  },
];

// get all employees by department
const promptBudgetByDepartment = function () {
  // get all departments
  //console.log("ok, going to prompt for managers");
  return department
    .getAllForChoices()
    .then((departments) => {
      // populate the departmentQuetions with the department list from the database
      departmentBudgetQuestions[0].choices = departments;
      //console.log("got departments");
      //console.log(departments);
      // now ask the user to chooose which department they want
      return inquirer
        .prompt(departmentBudgetQuestions)
        .then((answer) => {
          // get all employers for this department
          //console.log(answer);
          return department.getBudgetForId(answer.selection).finally(() => {
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

module.exports = promptBudgetByDepartment;
