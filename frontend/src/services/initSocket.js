import { io } from 'socket.io-client'
import store from '../slices/index'
import { addMessage, removeMessages } from '../slices/messagesSlice'
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice'
import axios from 'axios'
import path from '../routes'

const initSocket = () => {
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

  const socket = io()

  socket.on('connect', () => {
    console.log(`New socket connection. Socked ID: ${socket.id}`)
  })

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message))
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel))
  })

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel))
  })

  socket.on('removeChannel', async ({ id }) => {
    const { messages } = store.getState()
    const messagesIdsForRemove = getMessagesIdsForRemove(messages.messages, id)
    await removeMessagesFromServer(messagesIdsForRemove)
    store.dispatch(removeChannel(id))
    store.dispatch(removeMessages(messagesIdsForRemove))
  })
}

export default initSocket
