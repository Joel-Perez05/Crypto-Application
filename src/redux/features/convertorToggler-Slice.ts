import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialTogglerStateType = {
  toggler: string;
};

const initialState: InitialTogglerStateType = {
  toggler: "coins",
};

const toggle = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleConvertor: (state, action: PayloadAction<string>) => {
      state.toggler = action.payload;
    },
  },
});

export const { toggleConvertor } = toggle.actions;
export default toggle.reducer;
