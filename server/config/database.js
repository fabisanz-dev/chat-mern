import mongoose from 'mongoose'

import { DB_URL } from './env.js'

const dbConnect = async () => {
  mongoose.set('strictQuery', false)

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  mongoose
    .connect(DB_URL, options)
    .then(() => {
      console.log('Database connected')
    })
    .catch((err) => {
      console.error('Database connection error: ', err)
    })
}

export default dbConnect
