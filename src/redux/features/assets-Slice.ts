import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { uid } from "uid";

type AssestStateType = {
  id: string;
  coinId: string;
  purchasePrice: number;
  currentPrice: number;
  date: string;
};

type InitialStateType = {
  value: AssestStateType[];
};

const initialState: InitialStateType = {
  value: [],
};

export type InitialAssetType = {
  coinId: string;
  purchasePrice: number;
  currentPrice: number;
  date: string;
};

export const getAssets = createAsyncThunk("assets/getAssets", async () => {
  try {
    const existingAssets = JSON.parse(localStorage.getItem("assets") || "[]");
    return existingAssets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
});

export const assets = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addNewAsset: (state, action: PayloadAction<InitialAssetType>) => {
      const newAsset: AssestStateType = {
        id: uid(),
        ...action.payload,
      };

      state.value.push(newAsset);

      localStorage.setItem("assets", JSON.stringify(state.value));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAssets.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { addNewAsset } = assets.actions;
export default assets.reducer;
