import {
  createSlice,
  // isFulfilled,
  // isPending,
  // isRejected,
} from "@reduxjs/toolkit";
// import {
//   loginUser,
//   refreshUserToken,
//   logoutUser,
//   registerUser,
//   currentUser,
// } from "./operations";

// Utils
// import toast from "react-hot-toast";

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
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
