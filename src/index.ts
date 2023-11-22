import express from 'express'
import cors from 'cors'
const app = express()
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'Done' })
})

app.listen(8081, () => {
  console.log('listening on 8081')
})
