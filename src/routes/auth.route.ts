import { Router } from "express"
import authController from '../controllers/auth.controller'

const router = Router()

router.post('/register', authController.signup)
router.post('/login', authController.signin)


export default router