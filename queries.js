const pool = require('./db');

async function getDepartments() {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
}

async function getRoles() {
  const res = await pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id');
  return res.rows;
}

async function getEmployees() {
  const res = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, 
                                (SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employee AS manager WHERE manager.id = employee.manager_id) AS manager 
                                FROM employee 
                                LEFT JOIN role ON employee.role_id = role.id 
                                LEFT JOIN department ON role.department_id = department.id`);
  return res.rows;
}

module.exports = { getDepartments, getRoles, getEmployees };
