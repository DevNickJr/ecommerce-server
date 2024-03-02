import { CreationAttributes, Op } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";
import { Category, Product } from "../models"

import CRUD from "./crud"
import CustomError from "../utils/customError";


class ProductService extends CRUD<Product> {
    async createProduct(fields: CreationAttributes<Product>, categories: string[]): Promise<Product> {
        const data = await this.model.create(fields);
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)


        const catgs = await Category.findAll({ where: { title: {
            [Op.in]: categories
        }}});
        
        await data.addCategories(catgs);
        // const data = await this.model.create(fields);
        return data;
    }
    async addCategories(id: number, categories: string[]): Promise<Product> {
        const product = await this.model.findByPk(id)
        if (!product) throw new CustomError(`${this.serviceName} does not exist`, 404)

        const catgs = await Category.findAll({ where: { title: {
            [Op.in]: categories
        }}});
        
        await product.addCategories(catgs);
        // const data = await this.model.create(fields);
        return product;
    }

    async removeCategories(id: number, categories: string[]): Promise<Category[]> {
        const product = await this.model.findByPk(id)
        if (!product) throw new CustomError(`${this.serviceName} does not exist`, 404)

        const catgs = await Category.findAll({ where: { title: {
            [Op.in]: categories
        }}});
        
        await product.removeCategories(catgs);
        // const data = await this.model.create(fields);
        return catgs;
    }

    async getCategories(id: number): Promise<Category[]> {
        const product = await this.model.findByPk(id)
        if (!product) throw new CustomError(`${this.serviceName} does not exist`, 404)
        
        const categories = await product.getCategories()
        // const data = await this.model.create(fields);
        return categories;
    }

    async getProduct(id: number) {
        const data = await this.model.findByPk(id, {
            include: Category,
        })
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)

        // const categories = await data.getCategories()
        console.log({ data })
        // return { ...data.toJSON(), categories }
        return data
    }
}

export default new ProductService(Product, 'Product')