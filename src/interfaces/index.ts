import { Request } from 'express';

export interface Error{
  message?: string;
}

export interface Result{
  rows: Record<string, any>[];
}

export interface userRequest extends Request {
  status: number;
}
