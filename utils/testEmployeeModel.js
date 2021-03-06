const cTable = require("console.table");
const Employee = require("../model/Employee");

// this function tests all the methods of the employee class
function testEmployeeModel() {
  console.log("-------- TEST : EMPLOYEE CLASS -------");
  const employee = new Employee();

  // get all departments
  employee.getAll().finally(() => {
    console.log("got all employees");
  });

  // get employees for manager id 1 (ceo)
  employee.getAllByManagerId(1).finally(() => {
    console.log("got all employees for manager 1 (ceo)");
  });

  // get all employees for department 4 (development)
  employee.getAllByDepartmentId(4).finally(() => {
    console.log("all employees for department 4 (development");
  });

  // get by employee id
  employee.getById(37).finally(() => {
    console.log("got employee 37");
  });

  // update employee manager
  employee.updateEmployeeManager(37, 12).finally(() => {
    console.log("updated employee manager");
  });

  // update employee role
  employee.updateEmployeeRole(37, 17).finally(() => {
    console.log("updated employee role");
  });

  // delete by id
  employee.deleteById(40).finally(() => {
    console.log("deleted employee 40");
  });

  // add an employee
  employee.add("Joe", "AddaBoy", 17, 12).finally(() => {
    console.log("added janitorial department");
  });
}

// now run the test
testEmployeeModel();
