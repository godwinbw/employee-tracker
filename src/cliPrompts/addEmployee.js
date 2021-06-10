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

// add role questions
const questions = [
  {
    name: "firstName",
    type: "input",
    message: "What is employee's first name (Required) ?",
    validate: validateInputEntry,
  },
  {
    name: "lastName",
    type: "input",
    message: "What is employee's last name (Required) ?",
    validate: validateInputEntry,
  },
  {
    type: "list",
    message: "What is this employee's role?",
    name: "roleId",
    // will add choices programmatically
  },
  {
    type: "list",
    message: "Who is this employee's manager?",
    name: "managerId",
    // will add choices programmatically
  },
];

const promptAddEmployee = function () {
  // first get all roles
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
      questions[2].choices = roles;

      // now we need to get the potential managers for this employee
      return employee
        .getAllEmployeesForChoices()
        .then((employees) => {
          // now we need to add manager choices to the questions
          // we need to add a NULL choice to this, an employee does not have to have a manager
          employees.push({
            name: "No manager for this employee",
            value: null,
          });
          questions[3].choices = employees;

          return inquirer.prompt(questions).then(function (answer) {
            return employee
              .add(
                answer.firstName,
                answer.lastName,
                answer.roleId,
                answer.managerId
              )
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

module.exports = promptAddEmployee;
