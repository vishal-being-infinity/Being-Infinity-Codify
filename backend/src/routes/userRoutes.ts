//Routes for user-related endpoints
import { Router } from 'express'
import { createRandomUser, getAllUsers } from '../controllers/userController.js'

const userRouter = Router()
userRouter.get('/all', getAllUsers)
userRouter.get('/create', createRandomUser)

export default userRouter