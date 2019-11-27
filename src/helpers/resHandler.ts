import { Response } from 'express';

/**
 * Handles response
 * @func resHandler
 *
 * @param {Response}   res
 *
 * @param {boolean} success describes the status of the action
 *
 * @param {number}   statusCode
 *
 * @param {any}   data
 *
 * @return {Object}
 */
export  const resHandler = (res: Response, success: boolean,  data: any, statusCode=400)=>{
  const key = success?'data':'error'

  return res.status(statusCode).send({
    success,
    [key]: data,
  });
};
