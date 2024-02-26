import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import ProductService from "../services/product.service"

class ProductController {
    static async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            logger.log('info', 'Getting all Products')
            const response = await ProductService.getAll()
            if (!response) return res.status(404).json({ message: 'No Product found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting Product ${id}`)
        try {
            const response = await ProductService.getByPK(id)
            if (!response) return res.status(404).json({ message: 'Product Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Product ${id}`)

        try {
            const response = await ProductService.updateOne(id, data)
            if (!response) return res.status(400).json({ message: 'Product Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Product ${id}`)
        try {
            const response = await ProductService.deleteOne(id)
            if (!response) return res.status(404).json({ message: 'Product Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default ProductController