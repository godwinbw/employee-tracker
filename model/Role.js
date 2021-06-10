const db = require("../db/connection");
const cTable = require("console.table");

// create a role class
class Role {
  constructor() {
    this.db = db;
  }

  getAll() {
    //const sql = "SELECT * FROM department";
    //const sql =
    //  "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name)) FROM department";
    const sql = `SELECT r.id, r.title, d.name AS department, r.salary FROM role r
                 LEFT JOIN department d
                 ON r.department_id = d.id`;

    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        //let json_rows = JSON.stringify(
        //  rows[0]["JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name))"]
        //);
        console.log(" ");
        console.table(rows);
        console.log(" ");
        return rows;
      })
      .catch((err) => {
        console.table(err);
        console.log(" ");
        return err;
      });
  }

  getAllForChoices() {
    // return a list of all roles - response is formatted to be used
    // as an enquirer choices list

    const sql = `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'value', value)) as role_list FROM
                  (SELECT id as value, title as name FROM role r
                  WHERE r.title IS NOT NULL) as abc`;

    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows[0]["role_list"];
      })
      .catch((err) => {
        // if an error, return empty array
        return [];
      });
  }

  deleteById(roleId) {
    const sql = `DELETE FROM role r
                    WHERE r.id = ?`;

    return this.db
      .promise()
      .query(sql, [roleId])
      .then(([rows, fields]) => {
        console.log(" ");
        console.log("Deleted role id " + roleId);
        console.log(" ");
        return rows;
      })
      .catch((err) => {
        console.log(" ");
        console.log("Error trying to delete role id" + roleId);
        console.log(" ");
        return err;
      });
  }

  add(title, salary, departmentId) {
    const sql = `INSERT INTO role (title, salary, department_id)
                  VALUES (?, ?, ?)`;
    return this.db
      .promise()
      .query(sql, [title, salary, departmentId])
      .then(([rows, fields]) => {
        console.log(" ");
        console.log("Added role " + title);
        console.log(" ");
        return rows;
      })
      .catch((err) => {
        console.log(" ");
        console.log("Error trying to add role " + title);
        console.log(" ");
        console.table(err);
        console.log(" ");
        return err;
      });
  }
}

module.exports = Role;
