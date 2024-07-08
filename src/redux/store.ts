import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import assetsReducer from "./features/assets-Slice";
import themeReducer from "./features/theme-Slice";
import intervalReducer from "./features/interval-Slice";
import currencyReducer from "./features/currency-Slice";
import togglerReducer from "./features/convertorToggler-Slice";
import sortReducer from "./features/sort-Slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  currency: currencyReducer,
  theme: themeReducer,
  assets: assetsReducer,
  interval: intervalReducer,
  toggler: togglerReducer,
  sort: sortReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
