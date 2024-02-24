import { CartItem } from "../models"
import CRUD from "./crud"


class CartItemService extends CRUD<CartItem> {
   
}

export default new CartItemService(CartItem, 'CartItem')