import express from 'express'
import userRoute from './userRoute.js';
const router = express.Router()

router.use('/', userRoute )
router.use('/signin', userRoute )
router.use('/login', userRoute )

export default router