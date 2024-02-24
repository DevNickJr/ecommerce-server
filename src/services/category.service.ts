import { Category } from "../models"
import CRUD from "./crud"


class CategoryService extends CRUD<Category> {
   
}

export default new CategoryService(Category, 'Category')