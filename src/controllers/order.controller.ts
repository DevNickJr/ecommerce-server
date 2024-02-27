import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import OrderService from "../services/order.service"

class OrderController {
    static async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            logger.log('info', 'Getting all Orders')
            const response = await OrderService.getAll()
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
            const response = await OrderService.getByPK(id)
            if (!response) return res.status(404).json({ message: 'Order Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateOrder(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Order ${id}`)

        try {
            const response = await OrderService.updateOne({ id }, data)
            if (!response) return res.status(400).json({ message: 'Order Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Order ${id}`)
        try {
            const response = await OrderService.deleteOne({ id })
            if (!response) return res.status(404).json({ message: 'Order Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default OrderController