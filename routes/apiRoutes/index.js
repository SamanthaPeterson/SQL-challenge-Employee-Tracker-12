const express = require('express');
const router = express.Router();

router.use(require('./managerRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./employeeoutes'));

module.exports = router;
