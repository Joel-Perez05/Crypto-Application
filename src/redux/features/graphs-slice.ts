import { createSlice } from "@reduxjs/toolkit";

type CoinObjTypes = {
  name: string;
  pricesArr: [number, number][];
  volumeArr: [number, number][];
  price: number;
  volume: number;
};

type InitialGraphDataStateTypes = {
  coinA: CoinObjTypes;
  coinB: CoinObjTypes;
};

const initialGraphState: InitialGraphDataStateTypes = {
  coinA: {
    name: "",
    pricesArr: [],
    volumeArr: [],
    price: 0,
    volume: 0,
  },
  coinB: {
    name: "",
    pricesArr: [],
    volumeArr: [],
    price: 0,
    volume: 0,
  },
};

const graphs = createSlice({
  name: "graphs",
  initialState: initialGraphState,
  reducers: {
    resetGraphs: (state) => {
      state.coinA = initialGraphState.coinA;
      state.coinB = initialGraphState.coinB;
    },
    toggleInitialGraph: (state, action) => {
      state.coinA = action.payload;
      state.coinB = initialGraphState.coinB;
    },
    selectCoinNames: (state, action) => {
      state.coinA = action.payload.coinA;
      state.coinB = action.payload.coinB;
    },
  },
});

export const { toggleInitialGraph, selectCoinNames, resetGraphs } =
  graphs.actions;
export default graphs.reducer;
