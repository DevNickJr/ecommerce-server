import { CreationAttributes } from "sequelize"
import { Order, Product } from "../models/db"
import CustomError from "../utils/customError"
import CRUD from "./crud"
import { Op } from "sequelize";


class OrderService extends CRUD<Order> {
    async createOrder(fields: CreationAttributes<Order>, productIds: string[]): Promise<Order> {
        const data = await this.model.create(fields);
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)


        const products = await Product.findAll({ where: { id: {
            [Op.in]: productIds
        }}});
        
        await data.addProducts(products);
        // const data = await this.model.create(fields);
        return data;
    }

    async updateOrder(id: number, UserId: number, data: any) {

        const order = await this.getByPK(id)
        if (!order) throw new CustomError("Order does not exist", 404)

        const orderItem = order.toJSON()
        
        if (orderItem.userId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = order.update(data)
        return response
      }

      async delete(id: number, UserId: number) {
        const order = await this.getByPK(id)

        if (!order) throw new CustomError("order does not exist", 404)

        const orderItem = order.toJSON()
        
        if (orderItem.userId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = order.destroy()
        return response
    }
   
}

export default new OrderService(Order, 'Order')