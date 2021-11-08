const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get the total roles for all the managers
router.get('/roles', (req, res) => {
  const sql = `SELECT managers.*, departments.name AS department_name, 
                COUNT(manager_id) 
                AS count FROM roles 
                LEFT JOIN managers ON roles.manager_id = managers.id 
                LEFT JOIN departments ON managers.department_id = departments.id 
                GROUP BY manager_id 
                ORDER BY count DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Create a role record
router.post('/role', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'employee_id', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO roles (employee_id, manager_id) VALUES (?,?)`;
  const params = [body.employee_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

module.exports = router;
