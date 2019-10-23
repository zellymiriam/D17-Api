/* eslint-disable no-console */
const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString:process.env.DB_URI
});

pool.connect()
  .then(()=>
    console.log('connected to database')
  )
  .catch((e)=>  console.log('error'+e));

module.exports = pool;
