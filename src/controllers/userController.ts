import { Request, Response } from 'express'
import { User, userType } from '../model/database.model'

const userController = {
  getLoggedInUser: async (req: Request, res: Response) => {
    const loggedInUser = req.user as userType
    const foundUser = await User.findById(loggedInUser.id, {
      first_name: 1,
      last_name: 1,
      user_name: 1,
    })
    res.status(200).json({ user: foundUser })
  },
}

export default userController
