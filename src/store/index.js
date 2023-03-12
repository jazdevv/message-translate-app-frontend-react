import { configureStore } from '@reduxjs/toolkit'
import { serverUrlSlice } from './slices/serverUrl'
import { chatRoomsSlice } from './slices/chatRoomsSlice'
import { isLoggedSlice } from './slices/isLoggedSlice'
import { UserDataApi } from './apis/UserDataApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
  reducer: {
    serverUrl: serverUrlSlice.reducer,
    rooms: chatRoomsSlice.reducer,
    isLogged: isLoggedSlice.reducer,
    [UserDataApi.reducerPath]:UserDataApi.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(UserDataApi.middleware)
})

setupListeners(store.dispatch)
export { initialSetRooms } from './slices/chatRoomsSlice'
export { setIsLogged } from './slices/isLoggedSlice'
export * from './apis/UserDataApi'
export { store }