import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { resHandler } from './resHandler';

const secretKey = process.env.SECRET_KEY

export const generateToken = async (res: Response, data: any, exp: string)=>{
  try {
    const token =  await jwt.sign(data, secretKey!, { expiresIn: exp })
    return token
  } catch (error) {
    return resHandler(res,false,error.message)
  }
}

export const decodeToken=async (res: Response,token: string): Promise<any>=>{
  try {
    const decoded = jwt.verify(token, secretKey!);
    return decoded
  } catch(err) {

    return resHandler(res,false,err.message)
  }
}
