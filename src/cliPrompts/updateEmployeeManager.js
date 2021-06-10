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
    message: "Which employee do you want to update their manager?",
    name: "id",
    // will add choices programatically
  },
  {
    type: "list",
    message: "Who is this employee's new manager?",
    name: "managerId",
    // will add choices programmatically
  },
];

const promptUpdateEmployeeManager = function () {
  // get all employees
  return employee
    .getAllEmployeesForChoices()
    .then((employees) => {
      // populate the questions with the role list from the database
      questions[0].choices = employees;
      //console.log("got departments");
      //console.log(departments);

      // now ask the user to chooose which employee will be their manager?
      return employee
        .getAllEmployeesForChoices()
        .then((managers) => {
          // populate the quetions with the role list from the database
          // we need to add a choice to this list, a NULL choice
          // an employee doesn't have to have a role
          managers.push({
            name: "No manager for this employee",
            value: null,
          });
          questions[1].choices = managers;

          return inquirer.prompt(questions).then(function (answer) {
            return employee
              .updateEmployeeManager(answer.id, answer.managerId)
              .finally(() => {
                return true;
              });
          });
        })
        .catch((err) => {
          return true;
        });
    })
    .catch((err) => {
      //console.log(err);
      //console.log("...had an error getting all manangers");
      return true;
    });
};

module.exports = promptUpdateEmployeeManager;
