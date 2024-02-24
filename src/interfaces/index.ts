import { Request } from "express"

export type Compulsory<T> = {
  [K in keyof T]-?: T[K];
};

export type Roles = "USER" | "ADMIN"

export interface IUser {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string 
    role?: Roles
}

export interface CustomRequest extends Request {
  user: Compulsory<IUser>
}
