import { Attributes, WhereOptions } from "sequelize";
import { CartItem } from "../models"
import CRUD from "./crud"
import CustomError from "../utils/customError";


class CartItemService extends CRUD<CartItem> {
    async updateItem(id: number, UserId: number, data: any) {

        const item = await this.getByPK(id)

        if (!item) throw new CustomError("Item does not exist", 404)

        const cartItem = item.toJSON()
        
        if (cartItem.UserId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = item.update(data)
        return response
      }

      async delete(id: number, UserId: number) {
        const item = await this.getByPK(id)

        if (!item) throw new CustomError("Item does not exist", 404)

        const cartItem = item.toJSON()
        
        if (cartItem.UserId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = item.destroy({ force: true })
        return response
    }
   
}

export default new CartItemService(CartItem, 'CartItem')