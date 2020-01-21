/**
 * Handles validation.
 * @class
 *
 * @return {void} Return value description.
 */

class Validation {

  /**
     * Handles missing fields and values.
     *
     *  @param {Object} data     data to be validated
     *
     * @return {String} It returns the error message
     */
  static  isRequired(data: any){
    let error;

    Object.keys(data).forEach((key)=>{
      if(!data[key]){
        error = `${key} is required`;
      }

      if(data[key]&&data[key].trim().length<1){
        error = `${key} is required`;
      }
    });
    return error;
  }

  /**
     * validates number.
     *
     *  @param {Object} data    data to be validated
     *
     * @return {String} It returns the error message
     */
  static  isNumber(data: any){
    let error;

    Object.keys(data).forEach((key)=>{
      if(typeof data[key] !== 'number'){
        error = `${key}  should be a number`;
      }
    });
    return error;
  }

  /**
     * validates password.
     *
     *  @param {String} pwd    password to be validated
     *
     * @return {String} It returns the error message
     */
  static  validatePassword(password: string,confirmPassword: string){
    const re = '(?=.*?[0-9])(?=.*?[A-Za-z]).+'
    const validate = Validation.isRequired({password,confirmPassword})

    if(validate){
      return validate
    }
    if (password.length<6){
      return 'Password should have atleast 6 characters';
    }

    if (!password.match(re)){
      return 'Password should contain atleat 1 letter and 1 number';
    }
    if (password!==confirmPassword){
      return 'Passwords do not match';
    }
  }

  static  isEmail(email: string){
    const re = /^\S+@\S+\.\S+$/

    if (!email.match(re)){
      return 'Invalid email';
    }
  }

  static  validateTransactionType(data: string){
    const types = ['Deposit','Loan','Fine']

    if (!types.includes(data)){
      return 'type should be Deposit, or Loan or Fine';
    }
  }
}

export default Validation;
