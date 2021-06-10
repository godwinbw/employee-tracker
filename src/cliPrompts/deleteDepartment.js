const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

/// select department for deletion
const departmentQuestions = [
  {
    type: "list",
    message: "Which department do you want to delete?",
    name: "selection",
  },
];

// get all employees by department
const promptDeleteDepartment = function () {
  // get all departments
  //console.log("ok, going to prompt for managers");
  return department
    .getAllForChoices()
    .then((departments) => {
      // populate the departmentQuetions with the department list from the database
      departmentQuestions[0].choices = departments;
      //console.log("got departments");
      //console.log(departments);
      // now ask the user to chooose which department they want
      return inquirer
        .prompt(departmentQuestions)
        .then((answer) => {
          // get all employers for this department
          //console.log(answer);
          return department.deleteById(answer.selection).finally(() => {
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

module.exports = promptDeleteDepartment;
