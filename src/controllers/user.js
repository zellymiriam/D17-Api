import db from '../database/config';
import Validation from '../helpers/validation';
import { getRole } from '../helpers/role';
import { getPhoneNumber, validatePhoneNunber } from '../helpers/phoneNumber';
import { errorHandler } from '../helpers/errorHandlerer';

const { isRequired } = Validation;

/**
 * Handles user CRUD.
 * @class
 *
 * @return {void}
 */

class User {

  /**
 * Handles adding a user.
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Object}
 */
  static async addUser(req,res){
    const { firstName,lastName , phoneNumber,role } = req.body;
    const data = { firstName,lastName , phoneNumber,role };
    const error = await handleChecks(data);

    if (error){

      return errorHandler(res,error);
    }

    const text = 'INSERT INTO users(first_name, last_name,phone_number,role) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [firstName,lastName , phoneNumber,role];

    db.query(text, values, (err, result) => {
      if (err) {
        return errorHandler(res,err.message);
      } else {
        return res.status(201).send({
          success:true,
          data:result.rows[0]
        });
      }
    });
  }
}

/**
 * Handles validations checks for UserController.
 * @func
 *
 * @param {object}   data
 *
 * @return {String}
 */
const handleChecks = async( data)=>{
  const { firstName,lastName,phoneNumber,role } = data;

  const validate = isRequired({ firstName,lastName,phoneNumber,role });
  const userRole = await getRole(role);
  const phoneNumberExists = await getPhoneNumber(phoneNumber);
  const isValidPhoneNumber = validatePhoneNunber(phoneNumber)
 // console.log(isValidPhoneNumber)

  if (validate){
    return validate;
  }
if (!isValidPhoneNumber){
  return 'Invalid phone number';

}

  if(userRole.error){
    return 'Role does not exist';
  }
  if(phoneNumberExists.data){
    return 'Phone number already exists';
  }
};

export default User;
