const db = require("../db/connection");
const cTable = require("console.table");

// create a department function
class Department {
  constructor() {
    this.db = db;
  }

  getAll() {
    const sql = "SELECT * FROM department";
    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
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
    // return a list of all departments - response is formatted to be used
    // as an enquirer choices list

    const sql = `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'value', value)) as department_list FROM
                  (SELECT id as value, name as name FROM department d
                  WHERE d.name IS NOT NULL) as abc`;

    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows[0]["department_list"];
      })
      .catch((err) => {
        // if an error, return empty array
        return [];
      });
  }

  getBudgetForId(departmentId) {
    const sql = `SELECT d.name as department_name, COUNT(r.salary) as employee_count, SUM(r.salary) AS total_salary
                FROM employee e
                LEFT JOIN role r ON r.id = e.role_id
                LEFT JOIN department d ON d.id = r.department_id
                WHERE d.id = ?`;
    return this.db
      .promise()
      .query(sql, [departmentId])
      .then(([rows, fields]) => {
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

  deleteById(departmentId) {
    const sql = `DELETE FROM department d
                    WHERE d.id = ?`;

    return this.db
      .promise()
      .query(sql, [departmentId])
      .then(([rows, fields]) => {
        console.log(" ");
        console.log("Deleted department id " + deparmentId);
        console.log(" ");
        return rows;
      })
      .catch((err) => {
        return err;
      });
  }

  add(departmentName) {
    const sql = `INSERT INTO department (name)
                    VALUES (?)`;
    return this.db
      .promise()
      .query(sql, [departmentName])
      .then(([rows, fields]) => {
        console.log(" ");
        console.log("Added department " + departmentName);
        console.log(" ");
        return rows;
      })
      .catch((err) => {
        console.log(" ");
        console.log("Error trying to add department " + departmentName);
        console.log(" ");
        console.table(err);
        console.log(" ");
        return err;
      });
  }
}

module.exports = Department;
