import { configureStore } from '@reduxjs/toolkit';

import themeColorSlice from './themeColorSlice';

const store = configureStore({
  reducer: {
    themeColor: themeColorSlice.reducer,
  },
});
export const themeColorActions = themeColorSlice.actions;

export default store;
