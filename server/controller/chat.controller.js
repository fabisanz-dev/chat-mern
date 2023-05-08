import { findMessage, saveMessage } from '../service/chat.service.js'

const createMessage = ({ body }, res) => {
  saveMessage(body)
    .then(msg => {
      res.status(201).json(msg)
    })
    .catch(error => {
      res.status(500).send({ msg: error.message })
    })
}

const getMessage = (req, res) => {
  findMessage()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.status(500).send({ msg: error.message })
    })
}

export { createMessage, getMessage }
