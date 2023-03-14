import { configureStore } from '@reduxjs/toolkit'
import { serverUrlSlice } from './slices/serverUrl'
import { chatRoomsSlice } from './slices/chatRoomsSlice'
import { isLoggedSlice } from './slices/isLoggedSlice'
import { chatRoomSlice } from './slices/chatRoomIdSlice'
import { UserDataApi } from './apis/UserDataApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
  reducer: {
    serverUrl: serverUrlSlice.reducer,
    rooms: chatRoomsSlice.reducer,
    isLogged: isLoggedSlice.reducer,
    chatRoomId: chatRoomSlice.reducer, 
    [UserDataApi.reducerPath]:UserDataApi.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(UserDataApi.middleware)
})

setupListeners(store.dispatch)
export { initialSetRooms } from './slices/chatRoomsSlice'
export { setIsLogged } from './slices/isLoggedSlice'
export { setRoomId } from './slices/chatRoomIdSlice'
export * from './apis/UserDataApi'
export { store }