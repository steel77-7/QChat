import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./reducers/useSlice"
import currChatReducer from './reducers/currChat'
export const store = configureStore({
    reducer:{
        user : userReducer,
        currChat : currChatReducer
    }
})