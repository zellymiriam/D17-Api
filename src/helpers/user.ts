import db from '../database/config';

/**
 * Gets a users.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */
export  const getUser = async (id: string)=>{
  const text = 'SELECT * FROM users WHERE id=$1';
  const values = [id];

  try {
    const role = await db.query(text, values);

    return { data:role.rows[0] };
  } catch (error) {
    return { error:error.message };
  }
};
