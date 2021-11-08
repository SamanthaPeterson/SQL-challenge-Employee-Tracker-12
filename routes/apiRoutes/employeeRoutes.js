const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get the total votes for all the managers
router.get('/votes', (req, res) => {
  const sql = `SELECT managers.*, departments.name AS department_name, 
                COUNT(candidate_id) 
                AS count FROM votes 
                LEFT JOIN managers ON votes.candidate_id = managers.id 
                LEFT JOIN departments ON managers.department_id = departments.id 
                GROUP BY candidate_id 
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

// Create a vote record
router.post('/vote', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'employee_id', 'candidate_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO votes (employee_id, candidate_id) VALUES (?,?)`;
  const params = [body.employee_id, body.candidate_id];

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
