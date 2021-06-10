const cTable = require("console.table");
const Department = require("./model/Department");
const Role = require("./model/Role");
const Employee = require("./model/Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

department
  .getAll()
  .then((rows) => {
    console.table(JSON.parse(rows));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("got all departments");
  });

role
  .getAll()
  .then((rows) => {
    console.table(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("got all roles");
  });

employee
  .getAll()
  .then((rows) => {
    console.table(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("got all employees");
  });
