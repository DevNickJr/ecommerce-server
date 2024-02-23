import { Router } from "express"
import authRoutes from './auth.route'
// const userRoutes = require('./user')
// const postRoutes = require('./post')
// const commentRoutes = require('./comment')
// const conversationRoutes = require('./conversation')
// const messageRoutes = require('./message')

const router = Router()

// routes
router.use('/auth', authRoutes)
// router.use('/users', userRoutes)
// router.use('/posts', postRoutes)
// router.use('/posts/:postId/comments', commentRoutes)
// router.use('/conversations', conversationRoutes)
// router.use('/messages', messageRoutes)

export default router