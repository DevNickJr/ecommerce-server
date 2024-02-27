import { NextFunction, Request, Response } from "express"
import UserService from '../services/user.service'
import logger from '../utils/logger'

class UserController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            logger.log('info', 'Getting all users')
            const response = await UserService.getAll()
            if (!response) return res.status(404).json({ message: 'No user found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting user ${id}`)
        try {
            const response = await UserService.getByPK(id)
            if (!response) return res.status(404).json({ message: 'User Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating user ${id}`)

        try {
            const response = await UserService.update(Number(id), data)
            if (!response) return res.status(400).json({ message: 'User Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting user ${id}`)
        try {
            const response = await UserService.deleteOne({ id })
            if (!response) return res.status(404).json({ message: 'User Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    // static async findUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         logger.log('info', `Finding users ${req.query.search}`)
    //         const response = await UserService.findUser({}, 
    //             { 
    //                 $or: [
    //                    { userName: {$regex : new RegExp(req.query.search, "i")} },
    //                    { email: {$regex : new RegExp(req.query.search, "i")} },
    //                 ],
    //                 _id: {$not: {$eq: req.user._id}}
    //             }
    //         )
    //         if (!response) return res.status(404).json({ message: 'No user found' })
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

}

export default UserController