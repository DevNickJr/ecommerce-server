import { Router } from 'express';
import UserController from '../controllers/user.controller'
import authenticate from '../middlewares/authenticate.middleware'
import isCurrentUser from "../middlewares/is-current-user.middleware";
import authorize from "../middlewares/authorize.middleware";

const router = Router()

// authentication middleware
router.use(authenticate);

router.get('/', authorize(["ADMIN"]), UserController.getAllUsers)

router.get('/find', authorize(["ADMIN"]), UserController.findUser)

// middleware to confirm current user
router.param("id", isCurrentUser)

router.get('/:id', authorize(["ADMIN"]), UserController.getUser)

router.patch('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)


export default router