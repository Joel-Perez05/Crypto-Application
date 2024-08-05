import { createSlice } from "@reduxjs/toolkit";

type CoinObjTypes = {
  name: string;
  prices: [number, number][];
  volume: [number, number][];
};

type InitialGraphDataStateTypes = {
  coinA: CoinObjTypes;
  coinB: CoinObjTypes;
};

const initialGraphState: InitialGraphDataStateTypes = {
  coinA: {
    name: "",
    prices: [],
    volume: [],
  },
  coinB: {
    name: "",
    prices: [],
    volume: [],
  },
};

const graphs = createSlice({
  name: "graphs",
  initialState: initialGraphState,
  reducers: {
    toggleGraph: (state, action) => {
      state.coinA = action.payload;
    },
  },
});

export const { toggleGraph } = graphs.actions;
export default graphs.reducer;
