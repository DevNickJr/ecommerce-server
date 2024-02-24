import { Order } from "../models"
import CRUD from "./crud"


class OrderService extends CRUD<Order> {
   
}

export default new OrderService(Order, 'Order')