import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import ProductService from "../services/product.service"

class ProductController {
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.body?.title
            const price = req.body?.price
            const description = req.body?.description
            const categories = req.body?.categories
            
            if (!description || !title || !price)
                return res.status(400).json({
                    message: 'All fields are required [title, price, description]',
                })
            const response = await ProductService.createProduct({ title, description, price }, categories)
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', 'Product created successfully')
            return res.status(201).json(response)
        } catch (error) {
            console.log({error})
            return next(error)
        }
    }
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
            const response = await ProductService.getByPK(Number(id))
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
            const response = await ProductService.updateOne({ id }, data)
            if (!response) return res.status(400).json({ message: 'Product Does Not Exist' })

            return res.status(200).json({ id, message: "update was successful"})
        } catch (error) {
            return next(error)
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Product ${id}`)
        try {
            const response = await ProductService.deleteOne({ id })
            if (!response) return res.status(404).json({ message: 'Product Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default ProductController