import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    console.log("Login User dispatched");
    try {
      const response = await api.post("auth/login", _);
      console.log("Login response:", response);
      if (response.status === 200) {
        toast.success("Login successful ✔");
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (_, thunkAPI) => {
    console.log("Register User dispatched");
    try {
      const response = await api.post("auth/register", _);
      console.log("Registration response:", response);
      if (response.status === 201) {
        return response.data;
      } else {
        toast.error("Registration failed: " + response.data.message);
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
