import { NextFunction, Request, Response } from "express"
import { CustomRequest, Roles } from "../interfaces"
import CustomError from "../utils/customError"

const authorize = (roles: Roles[]) => {

    const authorizeFn = (req: Request, res: Response, next: NextFunction) => {
        return authorizationMiddleware(req as CustomRequest, res, next, roles);
    } 
    return authorizeFn
}

const authorizationMiddleware =  async (req: CustomRequest, res: Response, next: NextFunction, roles: Roles[]) => {
    try {
        if (req.user.role === 'ADMIN') {
            next()
        }
        if (!roles.includes(req.user.role)) {
            throw new CustomError('Unauthorized access: You are not allowed to access this resource', 400)
        }
        next()
    } catch (error) {
        next(error)
    }
}



export default authorize