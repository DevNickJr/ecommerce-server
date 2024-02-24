import { Product } from "../models"
import CRUD from "./crud"


class ProductService extends CRUD<Product> {
   
}

export default new ProductService(Product, 'Product')