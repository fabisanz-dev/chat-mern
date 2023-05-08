import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { PORT, URL_FRONTEND } from './config/env.js'
import dbConnect from './config/database.js'
import mainRouter from './routes/index.js'

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}

app.use(cors())

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)
const io = new SocketServer(server, {
  pingTimeout: 60000,
  cors: {
    //origin: '*',
  },
})

dbConnect()
app.use('/api', mainRouter)

io.on('connection', socket => {
  console.log('listen', socket.id)
  socket.on('message', message => {
    socket.broadcast.emit('shared-message', message)
    console.log('message', message)
  })
})

server.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`)
})
