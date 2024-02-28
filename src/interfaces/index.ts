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

export interface ICategory {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    title: string
}
export interface IOrder {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    UserId: number
    status?: string
}

export interface IOrderProduct {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    OrderId: number
    ProductId: number
    quantity: number
    price: number
}

export interface ICartItem {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    UserId: number
    ProductId: number
    quantity: number
}

export interface IProduct {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number
    title: string
    price: number
    description: string
}

export interface CustomRequest extends Request {
  user: Compulsory<IUser>
}
