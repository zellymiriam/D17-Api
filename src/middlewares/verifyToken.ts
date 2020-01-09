/* eslint-disable @typescript-eslint/ban-ts-ignore */
import jwt from 'jsonwebtoken';
import { resHandler } from '../helpers/resHandler';

const verifyToken = (req: any,res:any ,next: any)=>{
  const header = req.headers['authorization'];
  if (typeof header === 'undefined'){
    return resHandler(res,false,'Authorization header missing',401)
  }
  const bearer = header.split(' ');
  const token = bearer[1];
  req.token = token;
  const secretKey  = process.env.SECRET_KEY;/* eslint-disable-line no-undef */
  // @ts-ignore
  return  jwt.verify(req.token, secretKey, (err:any, user:any)=>{
    if(err){
      return resHandler(res,false,err.message,401)
    } else {


      req.user = user;
      return  next();
    }
  });
};
export default verifyToken;
