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
        console.table(rows);
        return true;
      })
      .catch((err) => {
        console.table(err);
        return err;
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
        return rows;
      })
      .catch((err) => {
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
        return rows;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = Department;
