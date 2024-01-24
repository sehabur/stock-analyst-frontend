import { configureStore } from '@reduxjs/toolkit'

import themeColorSlice from './themeColorSlice'
import latestPriceSlice from './latestPriceSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorSlice.reducer,
    latestPrice: latestPriceSlice.reducer
  }
})

export const themeColorActions = themeColorSlice.actions
export const latestPriceActions = latestPriceSlice.actions

export default store
