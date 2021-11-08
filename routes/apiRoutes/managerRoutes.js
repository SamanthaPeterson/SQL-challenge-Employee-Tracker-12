const express = require('express');
const router = express.Router();
const db = require('../../db/connection').default;
const inputCheck = require('../../utils/inputCheck');

// Get all managers and their department affiliation
router.get('/managers', (req, res) => {
  const sql = `SELECT managers.*, departments.name 
                AS department_name 
                FROM managers 
                LEFT JOIN departments 
                ON managers.department_id = departments.id`;

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

// Get single manager with department affiliation
router.get('/manager/:id', (req, res) => {
  const sql = `SELECT managers.*, departments.name 
               AS department_name 
               FROM managers 
               LEFT JOIN departments 
               ON managers.department_id = departments.id 
               WHERE managers.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create a manager
router.post('/manager', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'salary'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO managers (first_name, last_name, salary, department_id) VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.salary,
    body.department_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Update a manager's department
router.put('/manager/:id', (req, res) => {
  const errors = inputCheck(req.body, 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE managers SET department_id = ? 
               WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'manager not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete a manager
router.delete('/manager/:id', (req, res) => {
  const sql = `DELETE FROM managers WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'manager not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;
