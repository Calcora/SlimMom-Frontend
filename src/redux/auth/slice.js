import {
  createSlice,
  // isFulfilled,
  // isPending,
  // isRejected,
} from "@reduxjs/toolkit";
import { registerUser } from "./operations.js";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export default authSlice.reducer;
