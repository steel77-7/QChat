import { createSlice } from "@reduxjs/toolkit";


const initialState:any={
currChat : null,
notification:false
}

const currChatSlice=createSlice({
    name:"currChat",
    initialState,
    reducers:{
        setCurrChat : (state,action)=>{
            state.currChat = action.payload
        },
        setNotification : (state,action)=>{
            state.notification = action.payload
        },
        resetCurrChat : (state)=>{
            state.currChat = null;
            state.groupchat = false;
        }
    }

})


export const{ setCurrChat,resetCurrChat} = currChatSlice.actions

export default currChatSlice.reducer