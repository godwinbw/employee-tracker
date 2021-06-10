const cTable = require("console.table");
const Department = require("../model/Department");

// this function tests all the methods of the department model class

function testDepartmentModel() {
  console.log("-------- TEST : DEPARTMENT CLASS -------");
  const department = new Department();

  // get all departments
  department
    .getAll()
    .then((rows) => {
      console.table(rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("got all departments");
    });

  // get budget for department 3 (product)
  department
    .getBudgetForId(3)
    .then((rows) => {
      console.table(rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("got budget for department 3");
    });

  // delete department 1 (sales)
  department
    .deleteById(1)
    .then((rows) => {
      console.table(rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("deleted department 1");
    });

  // add a department name
  department
    .add("Janitorial")
    .then((rows) => {
      console.table(rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("added janitorial department");
    });
}

// now run the test
testDepartmentModel();
