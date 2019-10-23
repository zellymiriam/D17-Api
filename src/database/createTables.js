/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const db = require('./config');
import { Users,Roles } from './tables';

const createTables = async ()=>{
  await  db.query(Roles, (err, res) => {
    if (err){throw err;}
  });
  await  db.query(Users, (err, res) => {
    if (err){throw err;}
  });
};

module.exports = createTables;
