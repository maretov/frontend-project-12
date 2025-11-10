import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: {},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const { payload } = action
      payload.forEach((channel) => {
        state.channels[channel.id] = channel
      })
    },
    addChannel: (state, action) => {
      const { payload } = action
      state.channels[payload.id] = payload
    },
    removeChannel: (state, action) => {
      const { payload: id } = action
      const { [id]: removed, ...restChannels} = state.channels
      state.channels = restChannels
    },
  },
})

export const { addChannels, addChannel, removeChannel } = channelsSlice.actions
export default channelsSlice.reducer
