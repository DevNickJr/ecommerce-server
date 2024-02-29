import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middlewares/authenticate.middleware';
import CartController from '../controllers/cart.controller';
import { CustomRequest } from '../interfaces';

const router = Router()

const cartRoute = (fn: (req: CustomRequest, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>)  => {
    return (req: Request, res: Response, next: NextFunction) => {
        return fn(req as CustomRequest, res, next);
    }
} 

// authentication middleware
router.use(authenticate);

router.post('/', cartRoute(CartController.createItem))

router.get('/', cartRoute(CartController.getCartItems));

// // router.get('/find', (req: Request, res: Response, next: NextFunction) => {
//     return CartController.getCartItem(req as CustomRequest, res, next);
// } authorize(["ADMIN"]), CartController.findCategory)
 
// middleware to confirm current Category
// router.param("id", isCurrentUser)

router.get('/:id', cartRoute(CartController.getCartItem))

router.use(authenticate);

router.patch('/:id', cartRoute(CartController.updateCartItem))

router.delete('/:id', cartRoute(CartController.deleteItem))


export default router