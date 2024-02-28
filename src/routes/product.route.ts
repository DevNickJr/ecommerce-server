import { Router } from 'express';
import authenticate from '../middlewares/authenticate.middleware'
import isCurrentUser from "../middlewares/is-current-user.middleware";
import authorize from "../middlewares/authorize.middleware";
import ProductController from '../controllers/product.controller';

const router = Router()

// authentication middleware

router.get('/', ProductController.getAllProducts)

router.get('/:id', ProductController.getProduct)
// router.get('/find', authorize(["ADMIN"]), ProductController.findUser)

// middleware to confirm current user

router.use(authenticate);

router.post('/', authorize(["ADMIN"]), ProductController.createProduct)


router.patch('/:id',  authorize(["ADMIN"]), ProductController.updateProduct)

router.delete('/:id',  authorize(["ADMIN"]), ProductController.deleteProduct)


export default router