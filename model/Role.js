const db = require("../db/connection");

// create a role class
class Role {
  constructor() {
    this.db = db;
  }

  getAll() {
    //const sql = "SELECT * FROM department";
    //const sql =
    //  "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name)) FROM department";
    const sql = `SELECT role.title, role.id, department.name AS department, role.salary FROM role
                 LEFT JOIN department
                 ON role.department_id = department.id`;

    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        //let json_rows = JSON.stringify(
        //  rows[0]["JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name))"]
        //);
        return rows;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = Role;
