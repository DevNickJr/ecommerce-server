import { Router } from "express"
import authRoutes from './auth.route'
import userRoutes from './user.route'
import categoryRoutes from './category.route'
import cartRoutes from './cart.route'
import productRoutes from './product.route'
import orderRoutes from './order.route'
// const postRoutes = require('./post')
// const commentRoutes = require('./comment')
// const conversationRoutes = require('./conversation')
// const messageRoutes = require('./message')

const router = Router()

// routes
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/cart', cartRoutes)
router.use('/orders', orderRoutes)
// router.use('/posts', postRoutes)
// router.use('/posts/:postId/comments', commentRoutes)
// router.use('/conversations', conversationRoutes)
// router.use('/messages', messageRoutes)

export default router