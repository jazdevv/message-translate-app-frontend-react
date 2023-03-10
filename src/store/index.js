import { configureStore } from '@reduxjs/toolkit'
import {serverUrlSlice} from './slices/serverUrl'
import { chatRoomsSlice } from './slices/chatRoomsSlice'
import { UserDataApi, useGetLoggUserDataQuery } from './apis/UserDataApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
  reducer: {
    serverUrl: serverUrlSlice.reducer,
    rooms: chatRoomsSlice.reducer,
    [UserDataApi.reducerPath]:UserDataApi.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(UserDataApi.middleware)
})

setupListeners(store.dispatch)

export * from './apis/UserDataApi'
export { store }