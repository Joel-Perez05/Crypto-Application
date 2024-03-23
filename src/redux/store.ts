import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./features/assets-Slice";
import themeReducer from "./features/theme-Slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    assetsReducer,
    themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
