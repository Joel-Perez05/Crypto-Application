import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { uid } from "uid";
import { useAppSelector } from "../store";

export type AssetStateType = {
  id: string;
  coinId: string;
  purchasedAmount: number;
  priceWhenPurchased: number;
  date: string;
};

type InitialStateType = {
  value: AssetStateType[];
};

const initialState: InitialStateType = {
  value: [],
};

export type InitialAssetType = {
  coinId: string;
  purchasedAmount: number;
  priceWhenPurchased: number;
  date: string;
};

export const getAssets = createAsyncThunk("assets/getAssets", async () => {
  if (typeof window !== "undefined") {
    try {
      const existingAssets = JSON.parse(
        localStorage.getItem("assets") || "[]"
      ) as AssetStateType[];
      return existingAssets;
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  } else {
    return [];
  }
});

const assets = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addNewAsset: (state, action: PayloadAction<InitialAssetType>) => {
      const newAsset: AssetStateType = {
        id: uid(),
        ...action.payload,
      };

      state.value.push(newAsset);

      if (typeof window !== "undefined") {
        localStorage.setItem("assets", JSON.stringify(state.value));
      }
    },
    deleteAsset: (state, action: PayloadAction<string>) => {
      const assetIdToDelete = action.payload;
      state.value = state.value.filter((asset) => asset.id !== assetIdToDelete);

      if (typeof window !== "undefined") {
        localStorage.setItem("assets", JSON.stringify(state.value));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAssets.fulfilled,
      (state, action: PayloadAction<AssetStateType[]>) => {
        state.value = action.payload;
      }
    );
  },
});

export const useAssets = () => {
  return useAppSelector((state) => state.assets.value);
};

export const { addNewAsset, deleteAsset } = assets.actions;
export default assets.reducer;
