import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/customError"
import { User } from "../models"
import { CustomRequest } from '../interfaces'

const JWT_SEC = process.env.JWT_SEC


const authenticationMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    
    try {
        const authorize = req.headers?.authorization || req.headers?.Authorization
        if (!authorize) throw new CustomError("Unauthorized access: You're Not Middlewared", 401)


        const [, token] = typeof authorize === "string" ? authorize.split(' ') : []
        if (!token) throw new CustomError("Unauthorized access: You're Not Authenticated", 401)
        // console.log(token, JWT_SEC)

        if (!JWT_SEC) {
            console.log("JWT Secret Not Provided")
            throw new CustomError('Internal Server Error', 500)
        }

        const decoded = jwt.verify(token, JWT_SEC) as JwtPayload
        
        const user = await User.findByPk(decoded.id)

        if (!user) throw new CustomError('Unauthorized access: User does not exist', 401)
        // console.log("successssss", decoded, user)

        req.user = user.toJSON()

        next()
    } catch (error) {
        next(error)
    }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    return authenticationMiddleware(req as CustomRequest, res, next);
} 


export default authenticate
