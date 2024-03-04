import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import OrderService from "../services/order.service"
import { CustomRequest } from "../interfaces"
import { Product } from "../models/db"

class OrderController {
    static async createOrder(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const UserId = req.user.id
            const productIds = req.body?.products
       
            if (!productIds)
                return res.status(400).json({
                    message: 'Products are required [products]',
                })
            const response = await OrderService.createOrder({ userId: UserId }, productIds)
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', 'Product created successfully')
            return res.status(201).json(response)
        } catch (error) {
            console.log({error})
            return next(error)
        }
    }
    static async getAllOrders(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const UserId = req.user.id
            logger.log('info', 'Getting all Orders')
            const response = await OrderService.getAll({ 
                options: { 
                    where: { userId: UserId },
                    include: Product,
                } })
            if (!response) return res.status(404).json({ message: 'No Order found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getOrder(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting Order ${id}`)
        try {
            const response = await OrderService.getByPK(Number(id), { include: Product })
            if (!response) return res.status(404).json({ message: 'Order Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateOrder(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Order ${id}`)

        try {
            const UserId = req.user.id

            const response = await OrderService.updateOrder(Number(id), UserId, data)

            if (!response) return res.status(400).json({ message: 'Order Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteOrder(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Order ${id}`)
        try {
            const UserId = req.user.id

            const response = await OrderService.delete(Number(id), UserId)
            // if (!response) return res.status(404).json({ message: 'Order Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default OrderController