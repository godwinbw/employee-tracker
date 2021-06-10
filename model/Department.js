const db = require("../db/connection");

// create a department function
class Department {
  constructor() {
    this.db = db;
  }

  getAll() {
    //const sql = "SELECT * FROM department";
    const sql =
      "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name)) FROM department";
    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        let json_rows = JSON.stringify(
          rows[0]["JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name))"]
        );
        return json_rows;
      })
      .catch((err) => {
        return err;
      });
  }

  getBudgetForDepartment(departmentName) {
    const sql = ``;
  }
}

module.exports = Department;
