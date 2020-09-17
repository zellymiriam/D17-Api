/* eslint-disable no-console */
import db from './config';
import { tables, alterTables } from './tables';

export const createTables = ()=>{
  const tablesPromise= new Promise((resolve, reject) => {

    db.query(tables, (err: any,  res: any ) => {
      if (err) {
        throw err;
      }

      resolve('Successfuly created tables')
    })
  })
  tablesPromise.then((successMessage) => {
    console.log(successMessage)
  });

  return tablesPromise
}

export const alterTablesQuery =()=>{
  const alterPromise  =new Promise((resolve, reject) => {
    db.query(alterTables, (err: any,  res: any ) => {
      if (err) {
        throw err;
      }

      resolve('Successfully altered tables')
    })
  })
  alterPromise.then((successMessage) => {
    console.log(successMessage)
  });

  return alterPromise
}

const runMigrations =  async()=>{
  await createTables()
  await alterTablesQuery()
  process.exit(0)
}

runMigrations();
