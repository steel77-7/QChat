import { createSlice } from "@reduxjs/toolkit";

const settings = {
  theme: null,
};
const initialState = {
  socketInstance: null,
  settings,
};

const appData = createSlice({
  name: "appData",
  initialState: initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socketInstance = action.payload;
    },
    setTheme: (state, action) => {
      state.settings.theme = action.payload;
    },
    resetSocket: (state) => {
      state.socketInstance = null;
    },
  },
});

export const { setSocket, setTheme, resetSocket } = appData.actions;


export default appData.reducer;
