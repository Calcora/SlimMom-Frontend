import { createSlice } from "@reduxjs/toolkit";
import { getTodayDiary } from "./operations.js";

const initialState = {
  calculator_Data: {
    height: null,
    age: null,
    currentWeight: null,
    desiredWeight: null,
    bloodType: null,
  },
  data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenProducts: [],
  },
  selectedDate: null,
  selectedDate_Data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenProducts: [],
  },
};

const userDiarySlice = createSlice({
  name: "userDiary",
  initialState,
  reducers: {
    setSelectedDate_Data(state, action) {
      state.selectedDate_Data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodayDiary.pending, (state) => {
      state.selectedDate = new Date().toISOString().split("T")[0].toString();
    });
    builder.addCase(getTodayDiary.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.selectedDate = action.payload.date;
      state.selectedDate_Data = action.payload.data;
    });
  },
});

export default userDiarySlice.reducer;
