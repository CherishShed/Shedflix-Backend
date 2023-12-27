import 'dotenv/config'
import express from 'express'
import passport from './auth'
import session from 'express-session'
import cors from 'cors'

const app = express()
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

export default app
