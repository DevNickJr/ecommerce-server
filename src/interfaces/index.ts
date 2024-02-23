import { CreationOptional } from "sequelize";

export interface IUser {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string 
    role?: string
  }