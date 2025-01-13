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
    toggleInitialGraph: (state, action) => {
      state.coinA = action.payload;
    },
    selectCoinNames: (state, action) => {
      console.log(action.payload);

      state = action.payload;
    },
  },
});

export const { toggleInitialGraph, selectCoinNames } = graphs.actions;
export default graphs.reducer;
