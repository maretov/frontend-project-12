import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import channelsReducer from './channelsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  }
})

export default store
