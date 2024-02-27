import { Router } from 'express';
import authorize from "../middlewares/authorize.middleware";
import CategoryController from '../controllers/category.controller';
import authenticate from '../middlewares/authenticate.middleware';

const router = Router()

router.post('/', CategoryController.createCategory)

router.get('/', CategoryController.getAllCategories)

// router.get('/find', authorize(["ADMIN"]), CategoryController.findCategory)
 
// middleware to confirm current Category
// router.param("id", isCurrentUser)

router.get('/:id', CategoryController.getCategory)

router.use(authenticate);

// authorze middleware
router.use(authorize(["ADMIN"]));

router.patch('/:id', CategoryController.updateCategory)

router.delete('/:id', CategoryController.deleteCategory)


export default router