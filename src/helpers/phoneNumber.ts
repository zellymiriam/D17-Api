import { Response } from 'express';
import dbQuery from '../helpers/queries'

/**
 * Gets phnone number.
 * @func getPhoneNumber
 *
 * @param {String}   phoneNumber
 *
 * @return {Object}
 */
export  const getPhoneNumber = async (res: Response, phoneNumber: string)=>{
  const text = 'SELECT phone_number,id FROM users WHERE phone_number=$1';
  const values = [phoneNumber];
  const result = await dbQuery(res,text,values)

  return result
};

export const validatePhoneNumber=(phoneNumber: string)=>{
  const match = /^\d+$/.test(phoneNumber);

  return match && phoneNumber.length===10;
};
