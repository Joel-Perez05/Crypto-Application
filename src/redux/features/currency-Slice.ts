import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

export type InitialCurrencyStateType = {
  currency: string;
  symbol: string;
};

const initialState: InitialCurrencyStateType = {
  currency: "usd",
  symbol: "$",
};

const currency = createSlice({
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

export const useSelectedCurrency = () => {
  return useAppSelector((state) => state.currencyReducer);
};
export const { currencyToggler } = currency.actions;
export default currency.reducer;
