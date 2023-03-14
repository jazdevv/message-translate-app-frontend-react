import { createSlice } from "@reduxjs/toolkit";

const chatRoomSlice = createSlice({
    name:"chatRoomId",
    initialState:{
        id: null
    },
    reducers:{
        setRoomId: (state,action)=>{
            state.id = action.payload
        }
    }
})

export const {setRoomId} = chatRoomSlice.actions;

export {chatRoomSlice}