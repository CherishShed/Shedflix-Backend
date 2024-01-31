import mongoose, { Document } from 'mongoose'
import 'dotenv/config'

export const connectToDatabase = async () => {
  mongoose
    .connect(process.env.CONNECTION_STRING!, {
      dbName: 'shedflix',
    })
    .then(() => {
      console.log('Database Connection Succeeded')
    })
    .catch(err => {
      console.log(`An error occurred connecting to database: ${err}`)
    })
}
mongoose.connection.on('error', err => {
  console.log(
    `An error occurred connecting to database: ${err},\n...reconnecting`
  )
  mongoose
    .connect(process.env.CONNECTION_STRING!, {
      dbName: 'shedflix',
    })
    .then(() => {
      console.log('Database Connection Succeeded')
    })
    .catch(err => {
      console.log(`An error occurred connecting to database ${err}`)
    })
})

export interface userType extends Document {
  user_name: string
  password: string
  first_name: string
  last_name: string
  favourites: number[]
}
const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    favourites: {
      type: [Number],
    },
  },
  { timestamps: true }
)

export const User = mongoose.model<userType>('User', userSchema)
