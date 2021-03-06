const cTable = require("console.table");
const Role = require("../model/Role");

// this function tests all the methods of the ROLE class
function testRoleModel() {
  console.log("-------- TEST : ROLE CLASS -------");
  const role = new Role();

  // get all roles
  role.getAll().finally(() => {
    console.log("got all roles");
  });

  // delete role 3 (VP Marketing)
  role.deleteById(3).finally(() => {
    console.log("deleted role 3 (VP Marketing");
  });

  // add a role into janitorial department
  role.add("night crew janitor", 15000.0, 6).finally(() => {
    console.log("added janitorial department");
  });
}

// now run the test
testRoleModel();
