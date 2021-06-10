const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

/// select department
const departmentEmployeeQuestions = [
  {
    type: "list",
    message: "Which department do you want to view employees for?",
    name: "selection",
  },
];

// get all employees by department
const promptEmployeesByDepartment = function () {
  // get all departments
  //console.log("ok, going to prompt for managers");
  return department
    .getAllForChoices()
    .then((departments) => {
      // populate the departmentQuetions with the department list from the database
      departmentEmployeeQuestions[0].choices = departments;
      //console.log("got departments");
      //console.log(departments);
      // now ask the user to chooose which department they want
      return inquirer
        .prompt(departmentEmployeeQuestions)
        .then((answer) => {
          // get all employers for this department
          //console.log(answer);
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

module.exports = promptEmployeesByDepartment;
