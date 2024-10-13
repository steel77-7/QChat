import { createSlice } from "@reduxjs/toolkit"




const user={ 
    _id:null,
    email:null,
    name:null,
    uername:null,
    profilePic:null,
    friends:[],

}

const initialState = {
    user: user,
    isAuthenticated: false,
  };
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload
        },
        setIsAuthenticated :(state,action)=>{
            state.isAuthenticated = action.payload
        },
        logout:(state)=>{
        state.isAuthenticated = false
        }
    }
})

export const{setUser,setIsAuthenticated,logout }= userSlice.actions;

export default userSlice.reducer