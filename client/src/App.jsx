import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { useChat } from './hooks/useChat'
const socket = io('http://localhost:4000')

function App() {
  const [myMessage, setMyMessage] = useState({ from: '', message: '' })
  const [messages, setMessages] = useState([])

  const { getChat, postChat } = useChat()

  useEffect(() => {
    let subscribe = true
    const getChatMsg = async () => {
      const data = await getChat()
      if (subscribe) setMessages(data)
    }
    getChatMsg().catch(console.error)
    return () => (subscribe = false)
  }, [getChat])

  useEffect(() => {
    socket.on('shared-message', message => {
      setMessages([...messages, message])
    })
    return () => {
      socket.off('shared-message')
    }
  }, [messages])

  const handleSubmit = e => {
    e.preventDefault()
    setMessages([...messages, myMessage])
    socket.emit('message', myMessage)
    postChat(myMessage)
    setMyMessage({ ...myMessage, message: '' })
  }

  return (
    <div className='container'>
      <h1>Chat Mern</h1>
      <form
        onSubmit={handleSubmit}
        className='form'>
        <input
          type='text'
          name='from'
          id='from'
          placeholder='Nombre'
          onChange={e => setMyMessage({ ...myMessage, from: e.target.value })}
          value={myMessage.from || ''}
        />
        <textarea
          name='message'
          id='message'
          placeholder='Mensaje...'
          cols='10'
          rows='5'
          onChange={e =>
            setMyMessage({ ...myMessage, message: e.target.value })
          }
          value={myMessage.message || ''}
          disabled={!myMessage.from ? 'disabled' : ''}
        />
        <button
          type='submit'
          className='button-chat'
          disabled={!myMessage.from ? true : ''}>
          Enviar
        </button>
      </form>
      <ul className='list-chat'>
        {messages?.map((message, index) => (
          <li
            key={index}
            className={`list-chat-item ${
              message.from === myMessage.from ? 'chat-me' : 'chat-received'
            }`}>
            {message.from === myMessage.from ? (
              <b>Me</b>
            ) : (
              <b>{message.from}</b>
            )}
            : {message.message}
          </li>
        ))}
        {!messages.length && (
          <li
            style={{
              textAlign: 'center',
              marginTop: '50%',
            }}>
            Sin registros en el historial de chat.
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
