import 'dotenv/config'
import app from './middleware/express'
import { connectToDatabase } from './model/database.model'
import router from './router/api'

app.use('/api', router)
const startServer = async () => {
  await connectToDatabase()
  app.listen(8081, () => {
    console.log('listening on 8081')
  })
}

startServer()
