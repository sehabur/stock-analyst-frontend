import { createSlice } from '@reduxjs/toolkit';

const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState: 'light',
  reducers: {
    setThemeColor: (state: any, { payload }: { payload: string }) => {
      return payload;
    },
  },
});

export default themeColorSlice;
