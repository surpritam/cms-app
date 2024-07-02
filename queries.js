const pool = require('./db');

async function getDepartments() {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
}

async function getRoles() {
  const res = await pool.query('SELECT * FROM role');
  return res.rows;
}

async function getEmployees() {
  const res = await pool.query('SELECT * FROM employee');
  return res.rows;
}

module.exports = { getDepartments, getRoles, getEmployees };
