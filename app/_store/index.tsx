import { configureStore } from "@reduxjs/toolkit";

import themeColorSlice from "./themeColorSlice";
import latestPriceSlice from "./latestPriceSlice";
import authSlice from "./authSlice";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer: {
    themeColor: themeColorSlice.reducer,
    latestPrice: latestPriceSlice.reducer,
    auth: authSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});

export const themeColorActions = themeColorSlice.actions;
export const latestPriceActions = latestPriceSlice.actions;
export const authActions = authSlice.actions;
export const favoriteActions = favoriteSlice.actions;

export default store;
