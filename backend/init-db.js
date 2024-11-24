const fs = require('fs');
const path = require('path');
const knex = require('knex');
require('dotenv').config();


const db = knex({
  client: process.env.DB_CLIENT || 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true // ability to execute sql files
    // no database name yet to provide here
  },
});

const sqlFilePath = path.join(__dirname, './db/init.sql');

fs.readFile(sqlFilePath, 'utf8', async (err, sql) => {
  if (err) {
    console.error('Error reading SQL file:', err);
    process.exit(1);
  }

  try {
    await db.raw(sql);
    console.log('Database initialised successfully.');
  } catch (error) {
    console.error('Error executing SQL file:', error);
  } finally {
    db.destroy();
  }
});
