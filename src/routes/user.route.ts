import { Router } from 'express';
import UserController from '../controllers/user.controller'
import authenticate from '../middlewares/authenticate.middleware'
import isCurrentUser from "../middlewares/is-current-user.middleware";
import authorize from "../middlewares/authorize.middleware";

const router = Router()

// authentication middleware
router.use(authenticate);

router.get('/', authorize(["ADMIN"]), UserController.getAllUsers)

router.get('/:id', UserController.getUser)

// middleware to confirm current user
router.param("id", isCurrentUser)

router.patch('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)


export default router
// router.get('/find', UserController.findUser)