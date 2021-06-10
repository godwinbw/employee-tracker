const cTable = require("console.table");
const Department = require("../model/Department");

// this function tests all the methods of the department model class

function testDepartmentModel() {
  console.log("-------- TEST : DEPARTMENT CLASS -------");
  const department = new Department();

  // get all departments
  department.getAll().finally(() => {
    console.log("got all departments");
  });

  // get budget for department 3 (product)
  department.getBudgetForId(3).finally(() => {
    console.log("got budget for department 3");
  });

  // delete department 1 (sales)
  department.deleteById(1).finally(() => {
    console.log("deleted department 1");
  });

  // add a department name
  department.add("Janitorial").finally(() => {
    console.log("added janitorial department");
  });
}

// now run the test
testDepartmentModel();
