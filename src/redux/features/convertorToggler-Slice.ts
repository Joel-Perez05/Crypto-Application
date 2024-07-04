import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

type InitialTogglerStateType = {
  toggler: string;
};

const initialState = {
  toggler: "coins",
};

const toggle = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleConvertor: (state, action) => {
      state.toggler = action.payload;
    },
  },
});

export const useSelectedToggler = () => {
  return useAppSelector((state) => state.togglerReducer.toggler);
};

export const { toggleConvertor } = toggle.actions;
export default toggle.reducer;
