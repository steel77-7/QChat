import { createSlice } from "@reduxjs/toolkit";

const currChat={
    _id:null,
    email:null,
    name:null,
    profilePic:null,
    isGroupchat:false

}
const initialState:any={
currChat : currChat,
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
            state.currChat = currChat;
            state.groupchat = false;
        }
    }

})


export const{ setCurrChat,resetCurrChat} = currChatSlice.actions

export default currChatSlice.reducer