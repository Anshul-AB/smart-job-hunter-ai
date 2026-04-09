import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/serviceHelper"; 
const initialState = {
  token: getToken(), // 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;