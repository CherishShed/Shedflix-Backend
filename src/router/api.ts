import express from 'express'
import 'dotenv/config'
import passport from '../middleware/auth'
import userController from '../controllers/userController'
import authController from '../controllers/authController'
const router = express.Router()

router.post('/login', authController.loginUser)

router.post('/signup', authController.registerUser)
router.get(
  '/userDetails',
  passport.authenticate('jwt', { session: false }),
  userController.getLoggedInUser
)
router.get('/logout', authController.logout)
router.put(
  '/favourites/:id',
  passport.authenticate('jwt', { session: false }),
  userController.addToFavourites
)
router.patch(
  '/favourites/:id',
  passport.authenticate('jwt', { session: false }),
  userController.removeFromFavourites
)
export default router
