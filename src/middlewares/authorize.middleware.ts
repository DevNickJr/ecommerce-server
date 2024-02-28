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
        if (req.user.role === 'ADMIN' || roles.includes(req.user.role)) {
            next()
        }
        else {
            throw new CustomError('Forbidden Resource: You are not allowed to access this resource', 403)
        }
    } catch (error) {
        next(error)
    }
}



export default authorize