import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import numeral from "numeral";

export type SelectedCoinType = {
  name: string;
  price: number;
  qty: number | string;
  symbol: string;
  prices: [number];
};

type InitialConvertStateTypes = {
  coinA: SelectedCoinType;
  coinB: SelectedCoinType;
};

const initialState: InitialConvertStateTypes = {
  coinA: {
    name: "",
    price: 0,
    qty: 0,
    symbol: "",
    prices: [0],
  },
  coinB: {
    name: "",
    price: 0,
    qty: 0,
    symbol: "",
    prices: [0],
  },
};

const calculateQty = (qtyA: number | any, priceA: number, priceB: number) => {
  const coinATotal = qtyA * priceA;
  const coinBQty = coinATotal / priceB;

  if (priceA >= priceB) {
    const roundedCoinBQty = Math.floor(coinBQty * 10) / 10;
    return roundedCoinBQty;
  } else {
    const coinBQtyStrArr = coinBQty.toFixed(20).toString().split("");
    let slicedArr;
    for (let i = 2; i < coinBQtyStrArr.length; i++) {
      if (coinBQtyStrArr[i] !== "0") {
        slicedArr = coinBQtyStrArr.slice(0, i + 2);
        break;
      }
    }
    const joinedStr = slicedArr!.join("");
    return joinedStr;
  }
};

const convert = createSlice({
  name: "convert",
  initialState,
  reducers: {
    updateCoinA: (state, action: PayloadAction<SelectedCoinType>) => {
      const updatedCoinA = action.payload;
      state.coinA = updatedCoinA;
      if (updateCoinA.name && state.coinB.qty) {
        const coinBQty = calculateQty(
          updatedCoinA.qty,
          updatedCoinA.price,
          state.coinB.price
        );
        state.coinB = { ...state.coinB, qty: coinBQty };
      }
    },
    updateCoinAQty: (state, action: PayloadAction<number>) => {
      const updatedCoinA = action.payload;
      state.coinA = { ...state.coinA, qty: updatedCoinA };

      if (state.coinA.name && state.coinA.price && state.coinB.price) {
        const coinBQty = calculateQty(
          updatedCoinA,
          state.coinA.price,
          state.coinB.price
        );
        state.coinB = { ...state.coinB, qty: coinBQty };
      }
    },
    updateCoinB: (state, action: PayloadAction<SelectedCoinType>) => {
      const updatedCoinB = action.payload;

      if (state.coinA.name && state.coinA.price && updatedCoinB.price) {
        const coinBQty = calculateQty(
          state.coinA.qty,
          state.coinA.price,
          updatedCoinB.price
        );
        state.coinB = { ...updatedCoinB, qty: coinBQty };
      } else {
        state.coinB = { ...updatedCoinB, qty: 0 };
      }
    },
    updateCoinBQty: (state, action: PayloadAction<number>) => {
      state.coinB = { ...state.coinB, qty: action.payload };
    },
  },
});

export const { updateCoinA, updateCoinAQty, updateCoinB, updateCoinBQty } =
  convert.actions;
export default convert.reducer;
