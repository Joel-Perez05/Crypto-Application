import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "@/app/utils/CoinPageTypes";
import { useAppSelector } from "../store";

type SortState = {
  field: keyof Coin | "";
  sortedCoins: Coin[];
};

const initialState: SortState = {
  field: "",
  sortedCoins: [],
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortedCoins(state, action: PayloadAction<Coin[]>) {
      state.sortedCoins = action.payload;
    },
    sortCoins(state, action: PayloadAction<string>) {
      console.log(action.payload);
      if (action.payload === "#") {
        state.sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
      } else if (action.payload === "Name") {
        state.sortedCoins.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      } else if (action.payload === "Price") {
        state.sortedCoins.sort(
          (a: any, b: any) => b.current_price - a.current_price
        );
      } else if (action.payload === "1h%") {
        state.sortedCoins.sort(
          (a: any, b: any) =>
            b.price_change_percentage_1h_in_currency -
            a.price_change_percentage_1h_in_currency
        );
      } else if (action.payload === "24h%") {
        state.sortedCoins.sort(
          (a: any, b: any) =>
            b.price_change_percentage_24h_in_currency -
            a.price_change_percentage_24h_in_currency
        );
      } else if (action.payload === "7d%") {
        state.sortedCoins.sort(
          (a: any, b: any) =>
            b.price_change_percentage_7d_in_currency -
            a.price_change_percentage_7d_in_currency
        );
      }
    },
  },
});

export const useSortedCoins = () => {
  return useAppSelector((state) => state.sort.sortedCoins);
};

export const { setSortedCoins, sortCoins } = sortSlice.actions;
export default sortSlice.reducer;
