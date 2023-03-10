import { createSlice } from "@reduxjs/toolkit";

const chatRoomsSlice = createSlice({
    name:"rooms",
    initialState:[{
        rooms: [],
        loading: true
    }],
    reducers:{
        initialSetRooms: (state,action)=>{
            state.rooms = action.payload;
            state.loading = false
        }
    }
})

export {chatRoomsSlice}