import { getRole } from '../helpers/role';
import { resHandler } from '../helpers/resHandler';

/**
 * Gets a role.
 * @func
 *
 * @param {String}   id
 *
 * @return {Object}
 */
export  const isAdmin = async (req: any,res: any ,next: any)=>{

  try {
    const role = await getRole(req.user.role)
    const {data} = role

    if (data!.name ==='admin' || data!.name==='superAdmin'){
      return  next()
    }
    return resHandler(res,false,'You are not authorized to perform this action.', 401)

  } catch (error) {
    return { error:error.message };
  }
}
