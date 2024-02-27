import { CustomRequest } from "../interfaces"
import CustomError from "../utils/customError"
import { NextFunction, Request, Response } from "express"


const current = async (req: CustomRequest, res: Response, next: NextFunction, id: string) => {
    try {
        // console.log(req.user.id, req.params, req.params.id, id)
        if (req.user.role === 'ADMIN') {
            next()
        }
        else if (req.user.id === Number(req.params.id)) {
            next()
        } else {
            throw new CustomError('Unauthorized access: You are not allowed to perform this action', 400)
        }
    } catch (error) {
        next(error)
    }
}

const isCurrentUser = (req: Request, res: Response, next: NextFunction, id: string) => {
    return current(req as CustomRequest, res, next, id);
} 

export default isCurrentUser