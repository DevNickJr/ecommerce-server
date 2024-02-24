import { Request } from "express"

export type Compulsory<T> = {
  [K in keyof T]-?: T[K];
};

export interface IUser {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string 
    role?: string
}

export interface CustomRequest extends Request {
  user: {
      id: number;
  };
}
