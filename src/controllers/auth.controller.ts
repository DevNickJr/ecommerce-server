import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import AuthService from '../services/auth.service'

class AuthController {
    static async signup(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email || ''
        const password = req.body.password || ''
        const firstName = req.body.firstName || ''
        const lastName = req.body.lastName || ''

        if (!email || !password || !lastName || !firstName)
            return res.status(400).json({
                message: 'All fields are required [email, password]',
            })

        try {
            const response = await AuthService.signup({ email, password, firstName,lastName })
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', 'user created successfully')
            return res.status(201).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async signin(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email || ''
        const password = req.body.password || ''

        if ((!email) || !password)
            return res.status(400).json({
                message: 'All fields are required [userName or email and password]',
            })

        try {
            const response = await AuthService.signin({ email, password })
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', `user ${response?.user?.id} logged in successfully`)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }
}

export default AuthController