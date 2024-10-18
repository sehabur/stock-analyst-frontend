import { createSlice } from "@reduxjs/toolkit";

const latestPriceSlice = createSlice({
  name: "latestPrice",
  initialState: [],
  reducers: {
    setData: (state: any, { payload }: { payload: any }) => {
      return payload;
    },
  },
});

export default latestPriceSlice;
