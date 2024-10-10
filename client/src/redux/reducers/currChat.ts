import { createSlice } from "@reduxjs/toolkit";

const currChat={
    email:null,
    name:null,
    uername:null,
    profilePic:null,
  //  friends:[],
}
const initialState:any={
currChat : currChat,
groupchat:false
}

const currChatSlice=createSlice({
    name:"currChat",
    initialState,
    reducers:{
        setCurrChat : (state,action)=>{
            state.currChat = action.payload
        },
        resetCurrChat : (state)=>{
            state.currChat = currChat;
            state.groupchat = false;
        }
    }

})


export const{ setCurrChat,resetCurrChat} = currChatSlice.actions

export default currChatSlice.reducer