import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import CategoryService from "../services/category.service"

class CategoryController {
    static async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.body?.title || ''
    
            if (!title)
                return res.status(400).json({
                    message: 'Title is required',
                })
            const response = await CategoryService.create({ title })
            if (!response) return res.status(400).json({ message: 'Something went wrong' })

            logger.log('info', 'Category created successfully')
            return res.status(201).json(response)
        } catch (error) {
            console.log({error})
            return next(error)
        }
    }
    static async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            logger.log('info', 'Getting all Categories')
            const response = await CategoryService.getAll()
            if (!response) return res.status(404).json({ message: 'No Category found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getCategory(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting Category ${id}`)
        try {
            const response = await CategoryService.getByPK(id)
            if (!response) return res.status(404).json({ message: 'Category Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateCategory(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Category ${id}`)

        try {
            const response = await CategoryService.updateOne({ id }, data)
            if (!response) return res.status(400).json({ message: 'Category Does Not Exist' })

            return res.status(200).json({ id, message: "update was successful"})
        } catch (error) {
            return next(error)
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting Category ${id}`)
        try {
            const response = await CategoryService.deleteOne({ id })
            if (!response) return res.status(404).json({ message: 'Category Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

}

export default CategoryController