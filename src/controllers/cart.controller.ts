import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import CartService from "../services/cart.service"

class CartController {
    static async getAllCarts(req: Request, res: Response, next: NextFunction) {
        try {
            logger.log('info', 'Getting all Carts')
            const response = await CartService.getAll()
            if (!response) return res.status(404).json({ message: 'No Cart found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getCart(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting Cart ${id}`)
        try {
            const response = await CartService.getByPK(id)
            if (!response) return res.status(404).json({ message: 'Cart Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateCart(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Cart ${id}`)

        try {
            const response = await CartService.updateOne(id, data)
            if (!response) return res.status(400).json({ message: 'Cart Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteCart(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Cart ${id}`)
        try {
            const response = await CartService.deleteOne(id)
            if (!response) return res.status(404).json({ message: 'Cart Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default CartController