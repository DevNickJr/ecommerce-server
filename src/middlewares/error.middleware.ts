import { Application } from "express"
import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/customError"
import logger from '../utils/logger'
import { BaseError, SequelizeScopeError } from "sequelize"
import { Error } from "sequelize"


const errorMiddleware = (app: Application) => {
    
    // custom 404 && this will replace default express Not Found response for security reasons
    app.use((req: Request, res: Response) => {
        res.status(404).send('Sorry, Resource Not Found!')
    })

    // custom error handler && this will replace default express error response for security reasons

    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        // console.log("You said to display: ", err.name, err.message, err.status, err, bb?.sqlMessage)
        if (err.name == "SequelizeUniqueConstraintError") {
            const sqlError = err as any
            const message = sqlError.errors[0]?.message || "Unique constraint error"
            logger.log('error', `status: ${400} ,message: ${message}`)
            return res.status(400).json({ message })
        }
        const status = err.status || 500
        const message = err.message || err
        logger.log('error', `status: ${status} ,message: ${message}`)
        return res.status(status).json({ message })
    })
}

export default errorMiddleware

// /* eslint no-unused-vars: ["error", { "args": "none" }] */
