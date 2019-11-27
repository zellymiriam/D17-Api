import { Request, Response } from 'express';
import Validation from '../helpers/validation';
import { getRole } from '../helpers/role';
import { getPhoneNumber, validatePhoneNunber } from '../helpers/phoneNumber';
import { resHandler } from '../helpers/resHandler';
import { userRequest } from '../interfaces';
import sendCode from '../helpers/sendVerificationCode';
import {generateToken ,decodeToken}from '../helpers/jwtToken'
import dbQuery from '../helpers/queries'

const { isRequired, isNumber } = Validation;

/**
 * Handles user CRUD.
 * @class
 *
 * @return {void}
 */

class User {

  /**
 * Handles adding a user.
 * @func addUser
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async addUser(req: Request,res: Response){
    const { firstName,lastName , phoneNumber,role } = req.body;
    const data = { firstName,lastName , phoneNumber,role };
    const error = await handleChecks(res,data);

    if (error){
      return resHandler(res,false,error);
    }

    const text = 'INSERT INTO users(first_name, last_name,phone_number,role) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [firstName,lastName , phoneNumber,role];
    const result = await dbQuery(res,text,values)

    await delete result.password

    return resHandler(res,true,result,201);
  }

  /**
 * Handles sending a verification code to the users number.
 * @func sendVerificationCode
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async sendVerificationCode(req: Request,res: Response){
    const {phoneNumber} =req.body
    const validate = isRequired({ phoneNumber });
    const phoneNumberExists = await getPhoneNumber(res,phoneNumber);

    const code = Math.floor(Math.random() * 90000) + 10000

    if(validate){
      return resHandler(res,false,validate);
    }

    if(!phoneNumberExists){
      return resHandler(res,false,'Phone number not found',404);
    }

    sendCode(phoneNumber,code).then(async (result: any)=>{
      if (result.body){
        const token = await generateToken(res,{phoneNumber,code})

        return resHandler(res,true,token,200);
      }
    }).catch((err: any)=>{
      return resHandler(res,false,err.message)
    })
  }

  /**
 * Handles phone number verification.
 * @func verifyUser
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async verifyUser(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const {code} = req.headers
    const{verificationCode}=req.body
    const validate = isNumber({ verificationCode });

    if (!code){
      return resHandler(res,false,'missing code header')
    }

    if(validate){
      return resHandler(res,false,validate);
    }
    const decoded= await decodeToken(res,code)
    if(!decoded.code){
      return;
    }

    if(decoded.code!==verificationCode){
      return resHandler(res,false,'Invalid code')
    }

    const text = 'UPDATE users SET is_verified=$1 WHERE phone_number=$2 RETURNING id,phone_number';
    const values = [true,decoded.phoneNumber];
    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,200);
  }
}

/**
 * Handles validations checks for UserController.
 * @func handleChecks
 *
 * @param {object}   data
 *
 * @return {String}
 */
const handleChecks = async( res: Response,data: any)=>{
  const { firstName,lastName,phoneNumber,role } = data;

  const validate = isRequired({ firstName,lastName,phoneNumber,role });
  const userRole = await getRole(role);
  const phoneNumberExists = await getPhoneNumber(res,phoneNumber);
  const isValidPhoneNumber = validatePhoneNunber(phoneNumber);

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
