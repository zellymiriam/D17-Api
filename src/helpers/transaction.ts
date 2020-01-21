import db from '../database/config';

/**
 * Gets a transaction.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */
export  const getTransaction = async (id: string)=>{
  const text = 'SELECT * FROM transactions WHERE id=$1';
  const values = [id];

  try {
    const trans = await db.query(text, values);

    return { data:trans.rows[0] };
  } catch (error) {
    return { error:error.message };
  }
};
