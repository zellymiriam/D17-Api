import db from './config';
import { Users,Roles } from './tables';

const createTables = async ()=>{
  await  db.query(Roles, (err: any, res: any) => {
    if (err){throw err;}
  });
  await  db.query(Users, (err: any, res: any) => {
    if (err){throw err;}
  });
};

export default createTables;
