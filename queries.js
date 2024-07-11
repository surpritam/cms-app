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

async function getEmployeesByManager(manager_id) {
    const res = await pool.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, 
              (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
               FROM employee AS manager WHERE manager.id = employee.manager_id) AS manager 
       FROM employee 
       LEFT JOIN role ON employee.role_id = role.id 
       LEFT JOIN department ON role.department_id = department.id 
       WHERE employee.manager_id = $1`, [manager_id]);
    return res.rows;
}

async function getEmployeesByDepartment(department_id) {
    const res = await pool.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, 
              (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
               FROM employee AS manager WHERE manager.id = employee.manager_id) AS manager 
       FROM employee 
       LEFT JOIN role ON employee.role_id = role.id 
       LEFT JOIN department ON role.department_id = department.id 
       WHERE department.id = $1`, [department_id]);
    return res.rows;
}

async function addDepartment(name) {
    const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
}

async function addRole(title, salary, department_id) {
    const res = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return res.rows[0];
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
    const res = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    return res.rows[0];
}

async function updateEmployeeRole(employee_id, new_role_id) {
    const res = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [new_role_id, employee_id]);
    return res.rows[0];
}

module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getEmployeesByManager, getEmployeesByDepartment};
