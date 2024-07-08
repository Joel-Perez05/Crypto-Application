import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

export type InitialCurrencyStateType = {
  currency: string;
  symbol: string;
};

const getInitialCurrencyState = (): InitialCurrencyStateType => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedCurrency = localStorage.getItem("selectedCurrency");
      if (storedCurrency) {
        return JSON.parse(storedCurrency);
      }
    }
  } catch (error) {
    console.error("Error retrieving currency from local storage:", error);
  }
  return {
    currency: "USD",
    symbol: "$",
  };
};

const initialState: InitialCurrencyStateType = getInitialCurrencyState();

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
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem(
            "selectedCurrency",
            JSON.stringify({ currency, symbol })
          );
        }
      } catch (error) {
        console.error("Error saving currency to local storage:", error);
      }
    },
  },
});

export const useSelectedCurrency = () => {
  return useAppSelector((state) => state.currency);
};

export const { currencyToggler } = currencySlice.actions;
export default currencySlice.reducer;
