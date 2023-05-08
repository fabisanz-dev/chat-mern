import { useContext } from 'react'
import { ChatContext } from '../context/chat.context'

export const useChat = () => {
  return useContext(ChatContext)
}
