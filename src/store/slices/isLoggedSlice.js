import { createSlice } from "@reduxjs/toolkit";

const isLoggedSlice = createSlice({
    name:"isLogged",
    initialState:{
        isLogged: false
    },
    reducers:{
        setIsLogged: (state,action)=>{
            console.log(action.payload)
            state.isLogged = action.payload
        }
    }
})

export const {setIsLogged} = isLoggedSlice.actions;

export {isLoggedSlice}