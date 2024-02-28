import { CreationAttributes, Op } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";
import { Category, Product } from "../models"

import CRUD from "./crud"


class ProductService extends CRUD<Product> {
    async createProduct(fields: CreationAttributes<Product>, categories: string[]): Promise<Product> {
        const data = await this.model.create(fields);

        const catgs = await Category.findAll({ where: { title: {
            [Op.in]: categories
        }}});
        return data;
    }
}

export default new ProductService(Product, 'Product')