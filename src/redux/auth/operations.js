import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    console.log("Login User dispatched");
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (_, thunkAPI) => {
    console.log("Register User dispatched");
  }
);

