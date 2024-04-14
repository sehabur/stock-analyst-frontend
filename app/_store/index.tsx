import { configureStore } from "@reduxjs/toolkit";

import themeColorSlice from "./themeColorSlice";
import latestPriceSlice from "./latestPriceSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    themeColor: themeColorSlice.reducer,
    latestPrice: latestPriceSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const themeColorActions = themeColorSlice.actions;
export const latestPriceActions = latestPriceSlice.actions;
export const authActions = authSlice.actions;

export default store;
