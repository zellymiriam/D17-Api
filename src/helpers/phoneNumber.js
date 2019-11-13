import db from '../database/config';

/**
 * Gets phnone number.
 * @func
 *
 * @param {String}   phoneNumber
 *
 * @return {Object}
 */
export  const getPhoneNumber = async (phoneNumber)=>{
  const text = 'SELECT phone_number FROM users WHERE phone_number=$1';
  const values = [phoneNumber];

  try {
    const result = await db.query(text, values);

    return { data:result.rows[0] };
  } catch (error) {
    return { error:error.message };
  }
};

export const validatePhoneNunber=(phoneNumber)=>{
  const match = /^\d+$/.test(phoneNumber);

  return match && phoneNumber.length===10;
};
