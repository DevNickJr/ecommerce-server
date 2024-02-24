import { NextFunction, Router, Response, Request } from "express"
import UserController from '../controllers/user.controller'
import authenticate from '../middlewares/authenticate.middleware'
import { CustomRequest } from "../interfaces";
import isCurrentUser from "../middlewares/is-current-user.middleware";

const router = Router()

// router.use(authenticate)
router.use((req: Request, res: Response, next: NextFunction) => {
    return authenticate(req as CustomRequest, res, next);
});

router.get('/', UserController.getAllUsers)

// router.get('/find', UserController.findUser)

router.get('/:id', UserController.getUser)

router.use((req: Request, res: Response, next: NextFunction) => {
    return isCurrentUser(req as CustomRequest, res, next);
});

router.put('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)


module.exports = router