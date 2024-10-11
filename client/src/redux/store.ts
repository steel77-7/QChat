import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/useSlice";
import currChatReducer from "./reducers/currChat";
import appData from "./reducers/appDataSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    currChat: currChatReducer,
    appData: appData,
  },
});
