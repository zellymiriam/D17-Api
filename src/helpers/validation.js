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
     *  @param {Object} data     Description.
     *
     * @return {String} It returns the error message
     */
  static  isRequired(data){
    let error;

    Object.keys(data).forEach((key)=>{
      if(!data[key]){
        error = `${key} is required`;
      }

      if(data[key].trim().length<1){
        error = `${key} is required`;
      }
    });
    return error;
  }
}
export default Validation;
