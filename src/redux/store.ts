import { configureStore, combineReducers } from "@reduxjs/toolkit";
import assetsReducer from "./features/assets-Slice";
import intervalReducer from "./features/interval-Slice";
import currencyReducer from "./features/currency-Slice";
import togglerReducer from "./features/convertorToggler-Slice";
import sortReducer from "./features/sort-Slice";
import convertReducer from "./features/conversion-Slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "./createNoopStorage";

const currencyPersistConfig = {
  key: "currency",
  storage: storage,
  whitelist: ["currency", "symbol"],
};

const rootReducer = combineReducers({
  currency: persistReducer(currencyPersistConfig, currencyReducer),
  assets: assetsReducer,
  interval: intervalReducer,
  toggler: togglerReducer,
  sort: sortReducer,
  convert: convertReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
