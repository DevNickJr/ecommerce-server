import { Application } from "express"
import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/customError"
import logger from '../utils/logger'


const errorMiddleware = (app: Application) => {
    // custom 404 && this will replace default express Not Found response for security reasons
    app.use((req: Request, res: Response) => {
        res.status(404).send('Sorry, Resource Not Found!')
    })

    // custom error handler && this will replace default express error response for security reasons

    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500
        const message = err.message || err
        logger.log('error', `status: ${status} ,message: ${message}`)
        return res.status(status).json({ message })
    })
}

export default errorMiddleware

// /* eslint no-unused-vars: ["error", { "args": "none" }] */
