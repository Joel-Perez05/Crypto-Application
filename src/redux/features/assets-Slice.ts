import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { uid } from "uid";

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
  try {
    const existingAssets = JSON.parse(
      localStorage.getItem("assets") || "[]"
    ) as AssetStateType[];
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
      const newAsset: AssetStateType = {
        id: uid(),
        ...action.payload,
      };

      state.value.push(newAsset);

      localStorage.setItem("assets", JSON.stringify(state.value));
    },
    deleteAsset: (state, action: PayloadAction<string>) => {
      const assetIdToDelete = action.payload;
      const existingAssets: AssetStateType[] = JSON.parse(
        localStorage.getItem("assets") || "[]"
      );
      const updatedAssets = existingAssets.filter(
        (asset) => asset.id !== assetIdToDelete
      );

      localStorage.setItem("assets", JSON.stringify(updatedAssets));
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

export const { addNewAsset, deleteAsset } = assets.actions;
export default assets.reducer;
