import { createSlice } from "@reduxjs/toolkit";

const serverUrlSlice = createSlice({
    name:"serverUrl",
    initialState:"http://127.0.0.1:3001",
    reducers:{
        
    }
})

export {serverUrlSlice}