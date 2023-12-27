import express from 'express'
import 'dotenv/config'
import passport from '../middleware/auth'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, userType } from '../model/database.model'
const router = express.Router()

router.post('/login', async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.findOne({ user_name: userName })
    if (!user) {
      res
        .status(401)
        .json({ auth: false, message: 'User not found', user: null })
      return
    }
    const match = await compare(password, user.password)
    if (!match) {
      res
        .status(401)
        .json({ auth: false, message: 'Incorrrect Password', user: null })
      return
    }
    const accessToken = jwt.sign(
      { id: user._id, userName: user.user_name },
      process.env.ACCESS_TOKEN_SECRET!
    )
    res.status(200).json({
      auth: true,
      message: 'Login successful',
      user,
      accessToken,
    })
    return
  } catch (error) {
    if (error) {
      res.status(500).json({ errors: [{ msg: 'Error authenticating user' }] })
      return
    }
  }
})

router.post('/signup', async (req, res) => {
  const { userName, password, firstName, lastName } = req.body
  const hashedPassword = await hash(password, 10)

  try {
    const existingUser = await User.findOne({ user_name: userName })
    if (!existingUser) {
      User.create({
        user_name: userName,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      }).then(result => {
        res.status(200).json({ auth: true, user: result })
      })
    } else {
      res.status(409).json({ auth: false, message: 'User already exists' })
    }
  } catch (error) {
    res.status(500).json({ auth: false, user: null })
  }
})
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const loggedInUser = req.user as userType
    const foundUser = await User.findById(loggedInUser.id)
    res.status(200).json({ user: foundUser })
  }
)

export default router
