import { Attributes, CreationAttributes, WhereOptions } from "sequelize";
import { CartItem, Product } from "../models"
import CRUD from "./crud"
import CustomError from "../utils/customError";


class CartItemService extends CRUD<CartItem> {
    async create(fields: CreationAttributes<CartItem>): Promise<CartItem> {
        // fields.
        const product = await Product.findByPk(fields.productId) 
        if (!product) throw new CustomError("Product does not exist", 404)
        
        const productExist = await this.getOne({ productId: fields.productId }) 
        if (productExist) {
            const num = productExist.quantity + fields.quantity
            const data = await productExist.update({
                quantity: num > 0 ? num : 1,
            });
            // const data = await this.model.create(fields);
            return data;
            
        }

        const data = await this.model.create(fields);
        // const data = await this.model.create(fields);
        return data;

    }
    
    async updateItem(id: number, UserId: number, data: any) {

        const item = await this.getByPK(id)

        if (!item) throw new CustomError("Item does not exist", 404)

        const cartItem = item.toJSON()
        
        if (cartItem.userId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = item.update(data)
        return response
      }

      async delete(id: number, UserId: number) {
        const item = await this.getByPK(id)

        if (!item) throw new CustomError("Item does not exist", 404)

        const cartItem = item.toJSON()
        
        if (cartItem.userId !== UserId) {
            throw new CustomError("You can't perform this action", 403)
        }
        
        const response = item.destroy()
        return response
    }
   
}

export default new CartItemService(CartItem, 'CartItem')