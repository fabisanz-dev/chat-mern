import { createContext } from 'react'
import { ApiService } from '../config/service'

const ChatContext = createContext()

const url = import.meta.env.VITE_API_URL
const apiService = new ApiService(url)

const ChatProvider = ({ children }) => {
  const getChat = () => apiService.get('chat')
  const postChat = (message = { from: '', message: '' }) =>
    apiService.post('chat', message)
  return (
    <ChatContext.Provider
      value={{
        getChat,
        postChat,
      }}>
      {children}
    </ChatContext.Provider>
  )
}
export { ChatContext, ChatProvider }
