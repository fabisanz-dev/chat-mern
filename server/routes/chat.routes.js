import { Router } from 'express'
import { createMessage, getMessage } from '../controller/chat.controller.js'

const router = Router()

router.route('/').get(getMessage).post(createMessage)

export { router }
