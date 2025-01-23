import { createSlice } from "@reduxjs/toolkit";

type InitialIntervalStateType = {
  interval: number;
  converterInterval: number;
};

const initialState: InitialIntervalStateType = {
  interval: 334,
  converterInterval: 168,
};

const interval = createSlice({
  name: "interval",
  initialState,
  reducers: {
    toggleInterval: (state, action) => {
      state.interval = action.payload;
    },
    toggleConvertorInterval: (state, action) => {
      state.converterInterval = action.payload;
    },
  },
});
export const { toggleInterval, toggleConvertorInterval } = interval.actions;
export default interval.reducer;
