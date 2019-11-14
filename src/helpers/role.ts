import db from '../database/config';

/**
 * Gets a role.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */
export  const getRole = async (id: string)=>{
  const text = 'SELECT * FROM roles WHERE id=$1';
  const values = [id];

  try {
    const role = await db.query(text, values);

    return { data:role.rows[0] };
  } catch (error) {
    return { error:error.message };
  }
};
