import { MakeNullishOptional } from "sequelize/types/utils";
import { Category, Product } from "../models"

import CRUD from "./crud"
import { Op } from "sequelize";


class ProductService extends CRUD<Product> {
    async createProduct(fields: MakeNullishOptional<Product["_creationAttributes"]>, categories: string[]): Promise<Product> {
        const data = await this.model.create(fields);

        const catgs = await Category.findAll({ where: { title: {
            [Op.in]: categories
        }}});

        await data.addCategories(catgs);
        // const data = await this.model.create(fields);
        return data;
    }
}

export default new ProductService(Product, 'Product')