import db from '../database/config';

/**
 * Gets user by ID.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */

class QueryHelper{
 
    async findById(tableName:string,id: string){
        const text = `SELECT * FROM ${tableName} WHERE id=$1`;
        const values = [id];
        
        try {
            const data = await db.query(text, values);
        
            return { data:data.rows[0] };
        } catch (error) {
            return { error:error.message };
        }
    };

    async findAll(tableName:string){
        const text = `SELECT * FROM ${tableName}`;

        try {
            const data = await db.query(text);
        
            return { data:data.rows };
        } catch (error) {
            return { error:error.message };
        }
    };
}

export default QueryHelper
