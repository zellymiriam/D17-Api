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
}

export default Validation;
