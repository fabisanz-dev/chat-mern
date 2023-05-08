import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
})

export const Chat = mongoose.model('Chat', ChatSchema)
