import { NextFunction, Request, Response } from "express"
import { CustomRequest, Roles } from "../interfaces"
import CustomError from "../utils/customError"

const authorize = (roles: Roles[]) =>
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            if (req.user.role === 'ADMIN') {
                next()
            }

            if (roles.includes(req.user.role)) {
                throw new CustomError('Unauthorized access: You are not allowed to perform this action', 400)
            }
            next()
        } catch (error) {
            next(error)
        }
}

export default authorize