import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authRecuder from "./auth/slice.js";
import publicCalculator from "./publicCalculator/slice.js";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const authPersisteredReducer = persistReducer(authPersistConfig, authRecuder);

export const store = configureStore({
  reducer: {
    auth: authPersisteredReducer,
    publicCalculator: publicCalculator,
  },
});

export let persistor = persistStore(store);
