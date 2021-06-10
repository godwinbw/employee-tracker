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
    message: "Which employee do you want to update their role?",
    name: "id",
    // will add choices programatically
  },
  {
    type: "list",
    message: "What is this employee's new role?",
    name: "roleId",
    // will add choices programmatically
  },
];

const promptUpdateEmployeeRole = function () {
  // get all employees
  return employee
    .getAllEmployeesForChoices()
    .then((employees) => {
      // populate the questions with the role list from the database
      questions[0].choices = employees;
      //console.log("got departments");
      //console.log(departments);

      // now ask the user to chooose which role they want
      return role
        .getAllForChoices()
        .then((roles) => {
          // populate the quetions with the role list from the database
          // we need to add a choice to this list, a NULL choice
          // an employee doesn't have to have a role
          roles.push({
            name: "No role for this employee",
            value: null,
          });
          questions[1].choices = roles;

          return inquirer.prompt(questions).then(function (answer) {
            return employee
              .updateEmployeeRole(answer.id, answer.roleId)
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

module.exports = promptUpdateEmployeeRole;
