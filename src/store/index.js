import { configureStore } from '@reduxjs/toolkit'
import {serverUrlSlice} from './slices/serverUrl'
import { chatRoomsSlice } from './slices/chatRoomsSlice'

const store = configureStore({
  reducer: {
    serverUrl: serverUrlSlice.reducer,
    rooms: chatRoomsSlice.reducer
  },
})

export { store }