import { Request, Response } from 'express';
import Validation from '../helpers/validation';
import { resHandler } from '../helpers/resHandler';
import db from '../database/config';
import dbQuery from '../helpers/queries'
import { userRequest } from '../interfaces';
import { getTransaction } from '../helpers/transaction';
import { getUser } from '../helpers/user';
import QueryHelper from '../helpers/queryHelper';

const { isRequired, isNumber } = Validation;
const today = new Date()
const query   = new QueryHelper()
/**
 * Handles Loans CRUD.
 * @class
 *
 * @return {void}
 */

class Loan {

  static _validate(req:userRequest,res:any, userData:any,type:string){
    const { amount,interest_rate,reference} = req.body;
    const validate = type==='payment'&&isRequired({reference})
    const isNotNumber = type==='request'
    ?isNumber({amount,interest_rate})
    :isNumber({amount})
    let error;
  
    if(!userData){
      error = 'User not found'
    }else if (validate){
      error = validate
    }else if(isNotNumber){
      error = isNotNumber
    }
    return error
  }

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
    const text = `INSERT INTO loans(amount,user_id,interest_rate,balance,made_by,type,reference)
                   VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

    const {data,error} = await getUser(user)

    const isInvalid = Loan._validate(req,res,data,'request')

    if(isInvalid) {
     return  resHandler(res,false,isInvalid,400);
    }

    const interest = interest_rate/100
    const balance = Math.floor(amount*(interest+1))
    const reference = Math.floor(Math.random() * Date.now())
    const values = [amount, user,interest_rate,balance,req?.user?.id,'request',reference]

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,201);
  }

  /**
 * Handles loan payment
 * @func
 *
 * @param {object}   req
 *
 * @param {Object}   res
 *
 * @return {Response}
 */
  static async loanPayment(expressRequest: Request,res: Response){
    const req = expressRequest as userRequest;
    const { user,amount,reference} = req.body;
    const text = `INSERT INTO loans(amount,user_id,interest_rate,balance,made_by,type,reference)
                   VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

    const {data} = await getUser(user)
    const isInvalid = Loan._validate(req,res,data, 'payment')
    
    if(isInvalid) {
      return resHandler(res,false,isInvalid,400);
    }

    const loan = await dbQuery(res, 
      `SELECT * from loans WHERE reference=$1 ORDER BY created_at DESC LIMIT 1`,
      [reference]
    )

    if(!loan){
      return resHandler(res,false,'Loan not found',400);
    }
    const balance = loan?.balance - amount
    const values = [amount, user,loan?.interest_rate,balance,req?.user?.id,'payment', reference]

    const result = await dbQuery(res,text,values)

    return resHandler(res,true,result,201);
  }

    /**
   * Handles fetching loan transactions
   * @func addLoan
   *
   * @param {object}   req
   *
   * @param {Object}   res
   *
   * @return {Response}
   */
  static async getLoanTransactions(expressRequest: Request,res: Response){

    const {error,data} = await query.findAll('loans')

    if(error){
      return resHandler(res,true,error,400);
    }

    return resHandler(res,true,data,200);
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
