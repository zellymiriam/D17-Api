import { Request } from 'express';

export interface Error{
  message?: string;
}

export interface userRequest extends Request {
  headers: {
    code: string;
  };
}
