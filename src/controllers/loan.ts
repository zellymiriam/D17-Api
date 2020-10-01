import { Request, Response } from 'express';
import Validation from '../helpers/validation';
import { resHandler } from '../helpers/resHandler';
import db from '../database/config';
import dbQuery from '../helpers/queries'
import { userRequest } from '../interfaces';
import { getTransaction } from '../helpers/transaction';
import { getUser } from '../helpers/user';

const { isRequired, isNumber } = Validation;
const today = new Date()
/**
 * Handles transaction CRUD.
 * @class
 *
 * @return {void}
 */

class Loan {

  /**
 * Handles adding a loan
 * @func addLoan
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async addLoan(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const { user,amount,interest_rate} = req.body;
    const validate = isRequired({user})
    const isNotNumber = isNumber({amount,interest_rate})
    const text = 'INSERT INTO loans(amount,user_id,interest_rate,balance,made_by) VALUES($1,$2,$3,$4,$5) RETURNING *';

    const userResp = await getUser(user)
    const interest = interest_rate/100
    const balance = Math.floor(amount*(interest+1))

    const values = [amount, user,interest_rate,balance,req?.user?.id]

    if(!userResp.data){
      return resHandler(res,false,'User not found',404);
    }

    if (validate){
      return resHandler(res,false,validate);
    }
    if (isNotNumber){
        return resHandler(res,false,isNotNumber);
    }

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,201);
  }

  /**
 * Handles viewing  user transactions
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async getUserTransactions(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const {params,user} = req

    const text  =`SELECT
          users.id as user_id,
          transactions.id as transaction_id,
          first_name,
          last_name,
          email,
          amount,
          phone_number,
          type,
          made_by,
          transactions.created_at
          FROM users
          INNER JOIN transactions ON transactions.user_id = users.id
          WHERE user_id=$1 AND is_deleted=false
          ORDER BY transactions.created_at DESC
          `

    const values = [params.userId];
    const { name } = user.role

    if(user.id!==params.userId 
      && !(name ==='admin' || name==='superAdmin')){
      return resHandler(res,false,'You are not allowed to perform this action',403);
    }    

    const result = await db.query(text, values)

    if(!result){
      return resHandler(res,true,[],200);
    }
    return resHandler(res,true,result.rows,200);
  }

  /**
 * Handles viewing all transactions
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async getTransactions(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;

    const text = `SELECT
                  users.id as user_id,
                  transactions.id as transaction_id,
                  first_name,
                  last_name,
                  email,
                  amount,
                  phone_number,
                  type,
                  made_by,
                  transactions.created_at
                  FROM users
                  INNER JOIN transactions ON transactions.user_id = users.id
                  WHERE is_deleted=false
                  ORDER BY transactions.created_at DESC`

    const result = await db.query(text)

    if(!result){
      return resHandler(res,true,[],200);
    }

    return resHandler(res,true,result.rows,200);
  }

  /**
 * Handles deleting transactions
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async deleteTransaction(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const text = 'UPDATE transactions SET is_deleted=$1,updated_at=$2 WHERE id=$3 RETURNING *';
    const values = [true,today,req.params.id];
    const transaction = await getTransaction(req.params.id)

    if(!transaction.data  || transaction.data.is_deleted){
      return resHandler(res,false,'Transaction not found',404);
    }

    if (transaction.data.type==='Deposit'){
      const newtext = 'UPDATE users SET account_balance=account_balance-$1,updated_at=$2 WHERE id=$3 ';
      const newvalues = [transaction.data.amount,today,transaction.data.user_id];

      db.query(newtext, newvalues)
    }

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,200);
  }

  /**
 * Handles  transactions undo
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async undoTransaction(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const text = 'UPDATE transactions SET is_deleted=$1,updated_at=$2 WHERE id=$3 AND is_deleted=$4 RETURNING *';
    const values = [false,today,req.params.id,true];
    const transaction = await getTransaction(req.params.id)

    if(!transaction.data  || !transaction.data.is_deleted){
      return resHandler(res,false,'Transaction not found',404);
    }

    if (transaction.data.type==='D'){
      const newtext = 'UPDATE users SET account_balance=account_balance+$1,updated_at=$2 WHERE id=$3 ';
      const newvalues = [transaction.data.amount,today,transaction.data.user_id];

      db.query(newtext, newvalues)
    }

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,200);
  }
}

export default Loan;
