import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: {},
  defaultChannel: null,
  activeChannel: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const { payload } = action
      state.channels = payload
      const [firstChannel] = Object.values(payload)
      state.defaultChannel = firstChannel
      state.activeChannel = firstChannel
    },
    addChannel: (state, action) => {
      const { payload } = action
      state.channels[payload.id] = payload
    },
    renameChannel: (state, action) => {
      const { payload } = action
      state.channels[payload.id] = payload
    },
    removeChannel: (state, action) => {
      const { payload: id } = action
      const { [id]: removed, ...restChannels } = state.channels // eslint-disable-line no-unused-vars
      state.channels = restChannels
      state.activeChannel = state.defaultChannel
    },
    setActiveChannel: (state, action) => {
      const { payload } = action
      state.activeChannel = payload
    },
  },
})

export const { addChannels, addChannel, renameChannel, removeChannel, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer
