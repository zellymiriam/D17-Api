import { resHandler } from '../helpers/resHandler';

/**
 * Checks user if user is allowed to access endpoint.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */

export  const isPermitted =  (roles: Array<string>)=>{

  const isAllowed = async (req: any) =>{
    try {
      const {name} = req.user.role
      if(roles.includes(name)){
        return  true
      }
      return false

    } catch (error) {
      return false;
    }
  }
 
  return async (req: any,res: any ,next: any)=>{
    const permit = await isAllowed(req)
    if(permit ){
      return next()
    }

    return resHandler(res,false,'You are not allowed to perform this action.', 403)
  }
}
