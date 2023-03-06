import { configureStore } from '@reduxjs/toolkit'
import {serverUrlSlice} from './slices/serverUrl'

const store = configureStore({
  reducer: {
    serverUrl: serverUrlSlice.reducer
  },
})

export { store }