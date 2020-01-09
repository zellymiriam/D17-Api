import { Request } from 'express';

export interface Error{
  message?: string;
}

export interface userRequest extends Request {
  headers: {
    code: string;
  };
  file: string;
}

export interface RoleType {
  id?: string;
  name?: string;
}

export interface ErrorType {
  massage?: string;
}

export interface GetRoleType  {
  data?: RoleType;
  error?: ErrorType;
}
