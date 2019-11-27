import {  Response } from 'express';
import db from '../database/config';
import { resHandler } from './resHandler';

/**
 * Handles database query.
 * @func dbQuery
 *
 * @param {Response}   res
 *
 * @param {String}   text
 *
 * @param {any}   values
 *
 * @return {Object}
 */
const dbQuery = async (res: Response, text: string,values: any )=>{
  try {
    const resp = await db.query(text, values)
    return resp.rows[0]
  } catch (error) {
    return  resHandler(res,false,error.message!);
  }
}

export default dbQuery;
