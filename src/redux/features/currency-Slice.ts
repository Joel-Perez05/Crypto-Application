import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

export type InitialCurrencyStateType = {
  currency: string;
  symbol: string;
};

const initialState: InitialCurrencyStateType = {
  currency: "USD",
  symbol: "$",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    currencyToggler: (
      state,
      action: PayloadAction<InitialCurrencyStateType>
    ) => {
      const { currency, symbol } = action.payload;
      state.currency = currency;
      state.symbol = symbol;
    },
  },
});

export const { currencyToggler } = currencySlice.actions;
export default currencySlice.reducer;
