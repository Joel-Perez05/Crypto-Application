import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import assetsReducer from "./features/assets-Slice";
import themeReducer from "./features/theme-Slice";
import intervalReducer from "./features/interval-Slice";
import currencyReducer from "./features/currency-Slice";

import { TypedUseSelectorHook, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currency", "symbol"],
};

const rootReducer = combineReducers({
  currencyReducer: persistReducer(persistConfig, currencyReducer),
  themeReducer,
  assetsReducer,
  intervalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
