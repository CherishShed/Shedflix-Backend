import { Request, Response } from 'express'
import { User, userType } from '../model/database.model'

const userController = {
  getLoggedInUser: async (req: Request, res: Response) => {
    const loggedInUser = req.user as userType
    const foundUser = await User.findById(loggedInUser.id, {
      first_name: 1,
      last_name: 1,
      user_name: 1,
      favourites: 1,
    })
    res.status(200).json({ user: foundUser })
  },
  addToFavourites: async (req: Request, res: Response) => {
    const { id, title, poster_path } = req.body
    const loggedInUser = req.user as userType
    try {
      const foundUser = await User.findById(loggedInUser.id)
      foundUser?.favourites.push({ id, title, poster_path })
      foundUser?.save()
      return res.status(200).json({ message: 'Added to Favourites' })
    } catch (error) {
      return res.status(500).json({ message: 'An error occured' })
    }
  },
  removeFromFavourites: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const loggedInUser = req.user as userType
      const foundUser = await User.findById(loggedInUser.id)
      if (foundUser) {
        foundUser.favourites = foundUser.favourites.filter(movie => {
          movie.id != parseInt(id)
        })
        foundUser?.save()
      }
      return res.status(200).json({ message: 'Removed Favourites' })
    } catch (error) {
      return res.status(500).json({ message: 'An error occured' })
    }
  },
}

export default userController
