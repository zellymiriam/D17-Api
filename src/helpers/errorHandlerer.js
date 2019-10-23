/**
 * Handles errors.
 * @func
 *
 * @param {Object}   res
 *
 * @param {number}   statusCode
 *
 * @param {String}   error
 *
 * @return {Object}
 */
export  const errorHandler = (res,  error, statusCode=400)=>{

  return res.status(statusCode).send({
    success:false,
    error
  });
};
