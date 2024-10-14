import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/useSlice";
import currChatReducer from "./reducers/currChat";
import appData from "./reducers/appDataSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload"],
        ignoredPaths: ["appData.socketInstance"],
      },
    }),
  reducer: {
    user: userReducer,
    currChat: currChatReducer,
    appData: appData,
  },
});
