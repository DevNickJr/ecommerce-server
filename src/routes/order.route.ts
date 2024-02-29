import { NextFunction, Response, Router, Request } from 'express';
import authenticate from '../middlewares/authenticate.middleware'
import isCurrentUser from "../middlewares/is-current-user.middleware";
import authorize from "../middlewares/authorize.middleware";
import OrderController from '../controllers/order.controller';
import { CustomRequest } from '../interfaces';

const router = Router()

const orderRouteWrapper = (fn: (req: CustomRequest, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>)  => {
    return (req: Request, res: Response, next: NextFunction) => {
        return fn(req as CustomRequest, res, next);
    }
} 

// authentication middleware
router.use(authenticate);

router.post('/',  orderRouteWrapper(OrderController.createOrder))

router.get('/', orderRouteWrapper(OrderController.getAllOrders))

router.get('/:id', orderRouteWrapper(OrderController.getOrder))
// router.get('/find', authorize(["ADMIN"]), orderRouteWrapper(OrderController.findUser))

// middleware to confirm current user

router.patch('/:id',  authorize(["ADMIN"]), orderRouteWrapper(OrderController.updateOrder))

router.delete('/:id',  authorize(["ADMIN"]), orderRouteWrapper(OrderController.deleteOrder))

// add and remove categories from Order


export default router