import { CustomRequest } from "../interfaces"
import CustomError from "../utils/customError"
import { NextFunction, Request, Response } from "express"


const isCurrentUser =  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user.id === Number(req.params.id)) {
            next()
        } else {
            throw new CustomError('Unauthorized access: You are not allowed to perform this action', 400)
        }
    } catch (error) {
        next(error)
    }
}

export default isCurrentUser