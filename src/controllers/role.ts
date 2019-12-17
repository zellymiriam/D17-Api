import { Request, Response } from 'express';
import Validation from '../helpers/validation';
import { resHandler } from '../helpers/resHandler';
import dbQuery from '../helpers/queries'

const { isRequired } = Validation;

/**
 * Handles role CRUD.
 * @class
 *
 * @return {void}
 */

class Role {

  /**
 * Handles adding a role.
 * @func addRole
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async addRole(req: Request,res: Response){
    const { name} = req.body;
    const validate = isRequired({name})
    const text = 'INSERT INTO roles(name) VALUES($1) RETURNING *';
    const values = [name];

    if (validate){
      return resHandler(res,false,validate);
    }

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,201);
  }
}

export default Role;
