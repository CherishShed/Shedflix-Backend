import express from 'express'
import 'dotenv/config'
import passport from '../middleware/auth'
import userController from 'controllers/userController'
import authController from 'controllers/authController'
const router = express.Router()

router.post('/login', authController.loginUser)

router.post('/signup', authController.registerUser)
router.get(
  '/userDetails',
  passport.authenticate('jwt', { session: false }),
  userController.getLoggedInUser
)

export default router
