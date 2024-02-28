import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import CartService from "../services/cart.service"
import { CustomRequest } from "../interfaces"

class CartController {
    static async createItem(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const UserId = req.user.id
            const ProductId = req.body?.ProductId
            const quantity = req.body?.quantity
            
            if (!UserId || !ProductId || !quantity)
                return res.status(400).json({
                    message: 'All fields are required [UserId, ProductId, quantity]',
                })
            const response = await CartService.create({ UserId: Number(UserId), ProductId: Number(ProductId), quantity: Number(quantity) })
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', 'Category created successfully')
            return res.status(201).json(response)
        } catch (error) {
            console.log({error})
            return next(error)
        }
    }
    static async getCartItems(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const UserId = req.user.id
            logger.log('info', 'Getting all Cart Items')
            const response = await CartService.getAll({ query: { UserId } })
            if (!response) return res.status(404).json({ message: 'No Item found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getCartItem(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting Cart Item ${id}`)
        try {
            // const UserId = req.user.id
            const response = await CartService.getByPK(Number(id))
            if (!response) return res.status(404).json({ message: 'Item Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateCartItem(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Cart ${id}`)

        try {
            const UserId = req.user.id
            const response = await CartService.updateItem(Number(id), UserId, data)

            if (!response) return res.status(400).json({ message: 'Item Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteItem(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Cart ${id}`)
        try {
            const UserId = req.user.id

            const response = await CartService.delete(Number(id), UserId)

            // if (!response) return res.status(400).json({ message: 'Item Does Not Exist' })

            return res.status(200).json(response)

            // const response = await CartService.deleteOne({id})
            // if (!response) return res.status(404).json({ message: 'Item Does Not Exist' })

            // return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default CartController