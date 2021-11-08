import { createConnection } from 'mysql2';

const db = createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'DLP82418!s',
  database: 'db_employee_tracker'
});

export default db;
