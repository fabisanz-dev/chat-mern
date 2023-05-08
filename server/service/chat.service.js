import { Chat } from '../model/chat.model.js'

const saveMessage = async (message = { from: '', message: '' }) => {
  if (!('from' in message && 'message' in message)) {
    throw new Error('Campos invalidos')
  }
  const _msg = new Chat(message)
  try {
    const savedMsg = await _msg.save()
    return { msg: `Mensaje guardado` }
  } catch (error) {
    throw new Error(error)
  }
}

const findMessage = async (req, res) => {
  try {
    const message = await Chat.find()
    return message
  } catch (error) {
    throw new Error(error)
  }
}

export { saveMessage, findMessage }
