import socket from './initSocket'
import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { addMessage, removeMessages } from '../slices/messagesSlice'
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice'
import axios from 'axios'
import path from '../routes'
import store from '../slices/index'

const getMessagesIdsForRemove = (messages, channelId) => {
  const values = Object.values(messages)
  return values
    .filter(message => +message.channelId === +channelId)
    .map(message => message.id)
}

const removeMessagesFromServer = (ids) => {
  const { auth } = store.getState()
  const { headers } = auth
  ids.forEach(async (id) => {
    try {
      await axios.delete(path.messages(id), { headers })
    }
    catch (e) {
      console.log(`Error removing message with ID ${id}. Error: ${e}`)
    }
  })
}

const SocketContext = createContext()

const SocketProvider = ({children}) => {
  const dispatch = useDispatch()

  socket.on('connect', () => {
    console.log(`New socket connection. Socked ID: ${socket.id}`)
  })

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message))
  })

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel))
  })

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel))
  })

  socket.on('removeChannel', async ({ id }) => {
    const { messages } = store.getState()
    const messagesIdsForRemove = getMessagesIdsForRemove(messages.messages, id)
    await removeMessagesFromServer(messagesIdsForRemove)
    dispatch(removeChannel(id))
    dispatch(removeMessages(messagesIdsForRemove))
  })

  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
