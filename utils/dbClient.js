const { Client } = require('pg'); // or mysql2 for MySQL

async function queryDb(sql, params = []) {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  await client.connect();
  const res = await client.query(sql, params);
  await client.end();
  return res.rows;
}

module.exports = { queryDb };
