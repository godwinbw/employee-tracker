const promptBudgetByDepartment = require("./budgetByDepartment");
const promptEmployeesByDepartment = require("./employeesByDepartment");
const promptEmployeesByManager = require("./employeesByManager");
const promptDeleteDepartment = require("./deleteDepartment");
const promptAddDepartment = require("./addDepartment");
const promptAddRole = require("./addRole");
const promptDeleteRole = require("./deleteRole");
const promptAddEmployee = require("./addEmployee");
const promptDeleteEmployee = require("./deleteEmployee");
const promptUpdateEmployeeRole = require("./updateEmployeeRole");
const promptUpdateEmployeeManager = require("./updateEmployeeManager");

const inquirer = require("inquirer");
const Department = require("../../model/Department");
const Role = require("../../model/Role");
const Employee = require("../../model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

// overall command line interface flow control
// Selection questions
const overallQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "selection",
    choices: [
      "1. View all departments",
      "2. View all roles",
      "3. View all employees",
      "4. View all employees by manager",
      "5. View all employees by department",
      "6. View total utilized budget of a department",
      "7. Add a department",
      "8. Delete a department",
      "9. Add a role",
      "10. Delete a role",
      "11. Add an employee",
      "12. Delete an employee",
      "13. Update an employee role",
      "14. Update an employee's manager",
      "15. Exit",
    ],
  },
];

const promptOverall = function () {
  return inquirer.prompt(overallQuestions).then(async function (answer) {
    //console.log(answer);
    if (answer.selection === "1. View all departments") {
      return await department.getAll();
    } else if (answer.selection === "2. View all roles") {
      return await role.getAll();
    } else if (answer.selection === "3. View all employees") {
      return await employee.getAll();
    } else if (answer.selection === "4. View all employees by manager") {
      return promptEmployeesByManager();
    } else if (answer.selection === "5. View all employees by department") {
      return promptEmployeesByDepartment();
    } else if (
      answer.selection === "6. View total utilized budget of a department"
    ) {
      return promptBudgetByDepartment();
    } else if (answer.selection === "7. Add a department") {
      return promptAddDepartment();
    } else if (answer.selection === "8. Delete a department") {
      return promptDeleteDepartment();
    } else if (answer.selection === "9. Add a role") {
      return promptAddRole();
    } else if (answer.selection === "10. Delete a role") {
      return promptDeleteRole();
    } else if (answer.selection === "11. Add an employee") {
      return promptAddEmployee();
    } else if (answer.selection === "12. Delete an employee") {
      return promptDeleteEmployee();
    } else if (answer.selection === "13. Update an employee role") {
      return promptUpdateEmployeeRole();
    } else if (answer.selection === "14. Update an employee's manager") {
      return promptUpdateEmployeeManager();
    } else if (answer.selection === "15. Exit") {
      return false;
    }
  });
};

module.exports = promptOverall;
