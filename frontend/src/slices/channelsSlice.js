import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  channels: {},
  activeChannel: null,
}

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const { payload } = action
      state.channels = payload
      const firstChannelId = Object.keys(payload)[0]
      state.activeChannel = payload[firstChannelId]
    },
    addChannel: (state, action) => {
      const { payload } = action
      state.channels[payload.id] = payload
    },
    removeChannel: (state, action) => {
      const { payload: id } = action
      const { [id]: removed, ...restChannels} = state.channels // eslint-disable-line no-unused-vars
      state.channels = restChannels
    },
    setActiveChannel: (state, action) => {
      const { payload } = action
      state.activeChannel = payload
    }
  },
})

export const { addChannels, addChannel, removeChannel, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer
