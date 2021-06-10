const db = require("../db/connection");
const cTable = require("console.table");

// create a employee class
class Employee {
  constructor() {
    this.db = db;
  }

  getAll() {
    // get all employees, along with role, department, and manager information
    const sql = `SELECT e.id, e.first_name, e.last_name, re.title, de.name as department, re.salary,
                CONCAT_WS('', m.first_name, ' ', m.last_name) AS manager_name, rm.title as manager_title
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

  getAllManagers() {
    // return a list of all employees that are managers
    const sql = `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'value', value)) as manager_list FROM
                  (SELECT e.id as value,
                  CONCAT_WS('',e.first_name, ' ', e.last_name, ' - (', r.title, ')') AS name FROM employee e
                  LEFT JOIN role r ON e.role_id = r.id) as emp_role
                  WHERE emp_role.value IN
                  (SELECT DISTINCT m.manager_id FROM employee m WHERE m.manager_id IS NOT NULL)`;

    return this.db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows[0]["manager_list"];
      })
      .catch((err) => {
        // if an error, return empty array
        return [];
      });
  }

  getAllByManagerId(managerId) {
    // get all employees, along with role, department, and manager information for a given manager id
    const sql = `SELECT e.id, e.first_name, e.last_name, re.title, de.name as department, re.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name, rm.title as manager_title
                FROM employee e
                LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN role re ON e.role_id = re.id
                LEFT JOIN role rm ON m.role_id = rm.id
                LEFT JOIN department de ON re.department_id = de.id
                LEFT JOIN department dm ON rm.department_id = dm.id
                WHERE m.id = ?`;

    return this.db
      .promise()
      .query(sql, [managerId])
      .then(([rows, fields]) => {
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

  getAllByDepartmentId(departmentId) {
    // get all employees, along with role, department, and manager information for a given department id
    const sql = `SELECT e.id, e.first_name, e.last_name, re.title, de.name as department, re.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name, rm.title as manager_title
                FROM employee e
                LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN role re ON e.role_id = re.id
                LEFT JOIN role rm ON m.role_id = rm.id
                LEFT JOIN department de ON re.department_id = de.id
                LEFT JOIN department dm ON rm.department_id = dm.id
                WHERE de.id = ?`;

    return this.db
      .promise()
      .query(sql, [departmentId])
      .then(([rows, fields]) => {
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

  getById(employeeId) {
    // get employee info for a single employee id
    const sql = `SELECT e.id, e.first_name, e.last_name, re.title, de.name as department, re.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name, rm.title as manager_title
                FROM employee e
                LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN role re ON e.role_id = re.id
                LEFT JOIN role rm ON m.role_id = rm.id
                LEFT JOIN department de ON re.department_id = de.id
                LEFT JOIN department dm ON rm.department_id = dm.id
                WHERE e.id = ?`;

    return this.db
      .promise()
      .query(sql, [employeeId])
      .then(([rows, fields]) => {
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

  updateEmployeeManager(employeeId, newManagerId) {
    // update the employee with employeeId by changing the manager id to the newManagerId
    const sql = `UPDATE employee e
                  SET manager_id = ?
                  WHERE id = ?`;

    return this.db
      .promise()
      .query(sql, [newManagerId, employeeId])
      .then(([rows, fields]) => {
        // after we do the update, just return info for this one employee
        return this.getById(employeeId)
          .then(([rows, fields]) => {
            console.table(rows);
            console.log(" ");
            return rows;
          })
          .catch((err) => {
            console.table(err);
            console.log(" ");
            return err;
          });
      })
      .catch((err) => {
        console.table(err);
        console.log(" ");
        return err;
      });
  }

  updateEmployeeRole(employeeId, newRoleId) {
    // update the employee with employeeId by changing the role id to the newRoleId
    const sql = `UPDATE employee e
                  SET role_id = ?
                  WHERE id = ?`;

    return this.db
      .promise()
      .query(sql, [newRoleId, employeeId])
      .then(([rows, fields]) => {
        // after we do the update, just return info for this one employee
        return this.getById(employeeId)
          .then(([rows, fields]) => {
            console.table(rows);
            console.log(" ");
            return rows;
          })
          .catch((err) => {
            console.table(err);
            console.log(" ");
            return err;
          });
      })
      .catch((err) => {
        console.table(err);
        console.log(" ");
        return err;
      });
  }

  deleteById(employeeId) {
    const sql = `DELETE FROM employee e
                    WHERE e.id = ?`;

    return this.db
      .promise()
      .query(sql, [employeeId])
      .then(([rows, fields]) => {
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

  add(firstName, lastName, roleId, managerId) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id )
                  VALUES (?, ?, ?, ?)`;
    return this.db
      .promise()
      .query(sql, [firstName, lastName, roleId, managerId])
      .then(([rows, fields]) => {
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
}

module.exports = Employee;
