const db = require("../db/connection");

// create a employee class
class Employee {
  constructor() {
    this.db = db;
  }

  getAll() {
    //const sql = "SELECT * FROM department";
    //const sql =
    //  "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name)) FROM department";
    const sql = `SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee_name, re.title, de.name as department, re.salary,
                    CONCAT(m.first_name, ' ', m.last_name) AS manager_name, rm.title as manager_title
                    FROM employee e
                    LEFT JOIN employee m ON e.manager_id = m.id
                    LEFT JOIN role re ON e.role_id = re.id
                    LEFT JOIN role rm ON m.role_id = rm.id
                    LEFT JOIN department de ON re.department_id = de.id
                    LEFT JOIN department dm ON rm.department_id = dm.id`;

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

module.exports = Employee;
