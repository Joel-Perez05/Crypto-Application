import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

type InitialIntervalStateType = {
  interval: number;
};

const initialState: InitialIntervalStateType = {
  interval: 334,
};

const interval = createSlice({
  name: "interval",
  initialState,
  reducers: {
    toggleInterval: (state, action) => {
      state.interval = action.payload;
    },
  },
});

export const useSelectedInterval = () => {
  return useAppSelector((state) => state.interval.interval);
};

export const { toggleInterval } = interval.actions;
export default interval.reducer;
